import { RequestHttpService } from './../request-http/request-http.service';
import { Injectable } from '@nestjs/common';
import { ReadFileService } from 'src/read-file/read-file.service';
import { LowdbService } from 'src/lowdb/lowdb.service';
import { constants } from 'buffer';
import { Transaction } from 'src/interface/Transaction';
import { getCurrentDate } from 'src/utils/getCurrentTime';
import { csvToJSON } from 'src/utils/csvToJson';
import { transactionPromiseHandle } from 'src/utils/PromiseHandle';

@Injectable()
export class TransactionsService {
  private readonly url = 'http://localhost:4001/transaction';
  private maxRequest = 300;

  constructor(
    private readonly requestHttpService: RequestHttpService,
    private readonly readFileService: ReadFileService,
    private readonly lowdbService: LowdbService,
  ) {}

  updateMaxRequestOfTransactionAPI(times: number) {
    this.maxRequest = times;
  }

  async getTransactionsByAPI(): Promise<Transaction[]> {
    const requiredFirstRequestForTotalPage =
      await this.requestHttpService.getData(`${this.url}?page=1`);

    const totalPage = requiredFirstRequestForTotalPage['pageInfo'].totalPage;
    const transactionData: Transaction[] =
      requiredFirstRequestForTotalPage['list'];

    const promises = [];
    let temp = [];
    for (let i = 2; i <= totalPage; i++) {
      temp.push(this.requestHttpService.getData(`${this.url}?page=${i}`));
      if (i % this.maxRequest === 0 || i === totalPage) {
        promises.push(temp);
        temp = [];
      }
    }

    let values = [];

    for await (const promise of promises) {
      values = values.concat(await Promise.allSettled(promise));
    }

    const result = transactionPromiseHandle(values);

    const timestamp: string = getCurrentDate();
    this.lowdbService.insertRejectLog(
      result['rejected'].map((data) => {
        let obj = {};

        obj['url'] = data.url;
        obj['retry'] = 'N';
        obj['timestamp'] = timestamp;
        return obj;
      }),
    );

    this.lowdbService.insertResolveLog(
      result['fulfilled'].map((data) => {
        let obj = {};
        obj['url'] = data.url;
        obj['timestamp'] = timestamp;
        return obj;
      }),
    );

    return transactionData.concat(result['fulfilled']);
  }

  async getTransactionsByFile(): Promise<Transaction[]> {
    const stream =
      this.readFileService.transactionCsvFile('../transaction.csv');
    let data = '';
    return new Promise((resolve, reject) => {
      stream.on('data', (chunk) => (data += chunk.toString()));
      stream.on('end', async () => {
        const jsonData = await csvToJSON(data);
        resolve(jsonData);
      });
      stream.on('error', (err) => {
        reject(err);
      });
    });
  }

  async retryRejectedRequest() {
    const rejectedRequest = await this.lowdbService.findAllRejectLog('N');

    const promises = [];
    for (const log of rejectedRequest) {
      promises.push(this.requestHttpService.getData(log.url));
    }

    const values = await Promise.allSettled(promises);

    const result = transactionPromiseHandle(values);

    await this.lowdbService.updateSuccessRequest(result['fulfilled']);
  }
}
