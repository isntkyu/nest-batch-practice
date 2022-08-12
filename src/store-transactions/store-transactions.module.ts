import { Module } from '@nestjs/common';
import { RequestHttpModule } from 'src/request-http/request-http.module';
import { StoreTransactionsService } from './store-transactions.service';

@Module({
  imports: [RequestHttpModule],
  providers: [StoreTransactionsService],
  exports: [StoreTransactionsService],
})
export class StoreTransactionsModule {}
