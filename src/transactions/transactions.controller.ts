import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TransactionsService } from './transactions.service';

@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Post('retry')
  async retryRejectedRequest() {
    return this.transactionsService.retryRejectedRequest();
  }

  @Post('maxRequest')
  updateMaxRequestOfTransactionAPI() {}
}
