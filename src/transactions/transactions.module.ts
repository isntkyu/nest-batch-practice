import { Module } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { TransactionsController } from './transactions.controller';
import { RequestHttpModule } from 'src/request-http/request-http.module';
import { ReadFileModule } from 'src/read-file/read-file.module';
import { LowdbModule } from 'src/lowdb/lowdb.module';

@Module({
  imports: [RequestHttpModule, ReadFileModule, LowdbModule],
  controllers: [TransactionsController],
  providers: [TransactionsService],
  exports: [TransactionsService],
})
export class TransactionsModule {}
