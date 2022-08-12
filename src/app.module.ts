import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TransactionsModule } from './transactions/transactions.module';
import { RequestHttpModule } from './request-http/request-http.module';
import { StoreTransactionsModule } from './store-transactions/store-transactions.module';
import { MergeTransactionsModule } from './merge-transactions/merge-transactions.module';
import { ReadFileModule } from './read-file/read-file.module';
import { ScheduleModule } from '@nestjs/schedule';
import { BatchModule } from './batch/batch.module';

@Module({
  imports: [
    TransactionsModule,
    RequestHttpModule,
    StoreTransactionsModule,
    MergeTransactionsModule,
    ReadFileModule,
    ScheduleModule.forRoot(),
    BatchModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
