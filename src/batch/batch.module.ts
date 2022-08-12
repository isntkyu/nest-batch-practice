import { TransactionsModule } from './../transactions/transactions.module';
import { Module } from '@nestjs/common';
import { BatchService } from './batch.service';
import { BatchController } from './batch.controller';
import { StoreTransactionsModule } from 'src/store-transactions/store-transactions.module';
import { MergeTransactionsModule } from 'src/merge-transactions/merge-transactions.module';

@Module({
  imports: [
    MergeTransactionsModule,
    TransactionsModule,
    StoreTransactionsModule,
  ],
  controllers: [BatchController],
  providers: [BatchService],
})
export class BatchModule {}
