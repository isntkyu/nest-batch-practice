import { Injectable } from '@nestjs/common';
import { MergeTransaction } from 'src/interface/MergeTransaction';
import { LowdbService } from 'src/lowdb/lowdb.service';

@Injectable()
export class MergeTransactionsService {
  constructor(private readonly lowdbService: LowdbService) {}

  async insertMergeTransactions(mergeTransactions: MergeTransaction[]) {
    const allMergeTransaction =
      await this.lowdbService.findAllMergeTransactions();

    await this.lowdbService.insertMergeTransactions(
      mergeTransactions.filter((value) => {
        return this.isExistMergeTransaction(value, allMergeTransaction);
      }),
    );
  }

  async findAll() {
    return await this.lowdbService.findAllMergeTransactions();
  }

  private isExistMergeTransaction = (
    val: MergeTransaction,
    transactions: MergeTransaction[],
  ): boolean => {
    for (let i = 0; i < transactions.length; i++) {
      if (transactions[i].transactionId === val.transactionId) {
        return false;
      }
    }
    return true;
  };
}
