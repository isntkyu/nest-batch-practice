import { Module } from '@nestjs/common';
import { MergeTransactionsService } from './merge-transactions.service';
import { MergeTransactionsController } from './merge-transactions.controller';
import { LowdbModule } from 'src/lowdb/lowdb.module';

@Module({
  imports: [LowdbModule],
  controllers: [MergeTransactionsController],
  providers: [MergeTransactionsService],
  exports: [MergeTransactionsService],
})
export class MergeTransactionsModule {}
