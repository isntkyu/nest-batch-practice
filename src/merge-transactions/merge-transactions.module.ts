import { Module } from '@nestjs/common';
import { MergeTransactionsService } from './merge-transactions.service';
import { MergeTransactionsController } from './merge-transactions.controller';

@Module({
  controllers: [MergeTransactionsController],
  providers: [MergeTransactionsService],
  exports: [MergeTransactionsService],
})
export class MergeTransactionsModule {}
