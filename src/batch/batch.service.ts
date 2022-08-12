import { MergeTransactionsService } from './../merge-transactions/merge-transactions.service';
import { StoreTransactionsService } from './../store-transactions/store-transactions.service';
import { TransactionsService } from './../transactions/transactions.service';
import { Injectable } from '@nestjs/common';
import { CreateBatchDto } from './dto/create-batch.dto';
import { UpdateBatchDto } from './dto/update-batch.dto';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class BatchService {
  constructor(
    private readonly transactionsService: TransactionsService,
    private readonly storeTransactionsService: StoreTransactionsService,
    private readonly mergeTransactionsService: MergeTransactionsService,
  ) {}

  @Cron('0 10 * * * *')
  async transactionBatch() {
    // console.log(1);
    await this.transactionsService.getTransactionsByAPI();
    await this.transactionsService.getTransactionsByFile();
    await this.storeTransactionsService.getStoreTransactionsByApi();
    await this.mergeTransactionsService.insertMergeTransactions();
  }

  // create(createBatchDto: CreateBatchDto) {
  //   return 'This action adds a new batch';
  // }

  // findAll() {
  //   return `This action returns all batch`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} batch`;
  // }

  // update(id: number, updateBatchDto: UpdateBatchDto) {
  //   return `This action updates a #${id} batch`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} batch`;
  // }
}
