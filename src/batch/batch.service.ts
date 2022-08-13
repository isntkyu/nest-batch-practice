import { MergeTransactionsService } from './../merge-transactions/merge-transactions.service';
import { StoreTransactionsService } from './../store-transactions/store-transactions.service';
import { TransactionsService } from './../transactions/transactions.service';
import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { LowdbService } from 'src/lowdb/lowdb.service';
import { RequestLog } from 'src/interface/RequestLog';

@Injectable()
export class BatchService {
  constructor(
    private readonly transactionsService: TransactionsService,
    private readonly storeTransactionsService: StoreTransactionsService,
    private readonly mergeTransactionsService: MergeTransactionsService,
    private readonly lowdbService: LowdbService,
  ) {}

  @Cron(CronExpression.EVERY_10_SECONDS)
  async transactionBatch() {
    const transactionFromAPI =
      await this.transactionsService.getTransactionsByAPI();
    const transactionFromFILE =
      await this.transactionsService.getTransactionsByFile();

    const transactions = transactionFromAPI.concat(transactionFromFILE);

    const storeIds = transactions.map((tra) => {
      let obj = {};
      obj['storeId'] = tra.storeId;
      obj['date'] = tra.date;
      return obj;
    });

    const storeTransactions =
      await this.storeTransactionsService.getStoreTransactionsByApi(storeIds);

    const mergeTransactions = [];
    for (const tra of transactions) {
      for (const storeTra of storeTransactions) {
        if (tra.transactionId === storeTra.transactionId) {
          tra['productId'] = storeTra.productId;
          mergeTransactions.push(tra);
        }
      }
    }

    console.log(mergeTransactions);

    await this.mergeTransactionsService.insertMergeTransactions(
      mergeTransactions,
    );
  }

  async getAllBatchLogs(): Promise<{
    fail: RequestLog[];
    success: RequestLog[];
  }> {
    const rejectedLog = await this.lowdbService.findAllRejectLog();
    const resolveLog = await this.lowdbService.findAllResolveLog();

    return {
      fail: rejectedLog,
      success: resolveLog,
    };
  }
}
