import { TransactionsModule } from './../transactions/transactions.module';
import { Module } from '@nestjs/common';
import { BatchService } from './batch.service';
import { StoreTransactionsModule } from 'src/store-transactions/store-transactions.module';
import { MergeTransactionsModule } from 'src/merge-transactions/merge-transactions.module';
import { LowdbModule } from 'src/lowdb/lowdb.module';
import { BatchController } from './batch.controller';

@Module({
  imports: [
    MergeTransactionsModule,
    TransactionsModule,
    StoreTransactionsModule,
    LowdbModule,
  ],
  controllers: [BatchController],
  providers: [BatchService],
})
export class BatchModule {}
