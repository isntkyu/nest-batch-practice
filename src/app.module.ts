import { Module } from '@nestjs/common';
import { TransactionsModule } from './transactions/transactions.module';
import { RequestHttpModule } from './request-http/request-http.module';
import { StoreTransactionsModule } from './store-transactions/store-transactions.module';
import { MergeTransactionsModule } from './merge-transactions/merge-transactions.module';
import { ReadFileModule } from './read-file/read-file.module';
import { ScheduleModule } from '@nestjs/schedule';
import { BatchModule } from './batch/batch.module';
import { LowdbModule } from './lowdb/lowdb.module';

@Module({
  imports: [
    TransactionsModule,
    RequestHttpModule,
    StoreTransactionsModule,
    MergeTransactionsModule,
    ReadFileModule,
    ScheduleModule.forRoot(),
    BatchModule,
    LowdbModule,
  ],
})
export class AppModule {}
