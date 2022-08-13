import { Module } from '@nestjs/common';
import { LowdbModule } from 'src/lowdb/lowdb.module';
import { RequestHttpModule } from 'src/request-http/request-http.module';
import { StoreTransactionsController } from './store-transactions.controller';
import { StoreTransactionsService } from './store-transactions.service';

@Module({
  imports: [RequestHttpModule, LowdbModule, LowdbModule],
  controllers: [StoreTransactionsController],
  providers: [StoreTransactionsService],
  exports: [StoreTransactionsService],
})
export class StoreTransactionsModule {}
