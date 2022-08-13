import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { StoreTransactionsService } from './store-transactions.service';

@Controller('store-transactions')
export class StoreTransactionsController {
  constructor(
    private readonly storeTransactionsService: StoreTransactionsService,
  ) {}

  @Post('maxRequest/:times')
  updateMaxRequestOfTransactionAPI(@Query('times') times: number) {
    return this.storeTransactionsService.updateMaxRequestOfStoreTransactionAPI(
      times,
    );
  }
}
