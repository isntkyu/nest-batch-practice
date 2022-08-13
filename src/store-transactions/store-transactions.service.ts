import { Injectable } from '@nestjs/common';
import { StoreTransaction } from 'src/interface/StoreTransaction';
import { LowdbService } from 'src/lowdb/lowdb.service';
import { RequestHttpService } from 'src/request-http/request-http.service';
import { getCurrentDate } from 'src/utils/getCurrentTime';
import { transactionPromiseHandle } from 'src/utils/PromiseHandle';

@Injectable()
export class StoreTransactionsService {
  private readonly url = 'http://localhost:4002/store-transaction/';
  private maxRequest = 300;

  constructor(
    private readonly requestHttpService: RequestHttpService,
    private readonly lowdbService: LowdbService,
  ) {}

  updateMaxRequestOfStoreTransactionAPI(times: number) {
    this.maxRequest = times;
  }

  async getStoreTransactionsByApi(
    storeIds: any[],
  ): Promise<StoreTransaction[]> {
    const promises = [];
    for (const storeId of storeIds) {
      const requiredFirstRequestForTotalPage =
        await this.requestHttpService.postData(
          `${this.url}${storeId.storeId}`,
          {
            page: 1,
            date: storeId.date,
          },
        );

      const totalPage = requiredFirstRequestForTotalPage['pageInfo'].totalPage;

      let temp = [];
      for (let i = 1; i <= totalPage; i++) {
        temp.push(
          this.requestHttpService.postData(`${this.url}${storeId.storeId}`, {
            page: i,
            date: storeId.date,
          }),
        );
        if (i % this.maxRequest === 0 || i === totalPage) {
          promises.push(temp);
          temp = [];
        }
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

    return result['fulfilled'];
  }
}
