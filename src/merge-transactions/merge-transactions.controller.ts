import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { MergeTransactionsService } from './merge-transactions.service';

@Controller('merge-transactions')
export class MergeTransactionsController {
  constructor(
    private readonly mergeTransactionsService: MergeTransactionsService,
  ) {}

  @Get()
  async findAll() {
    return this.mergeTransactionsService.findAll();
  }
}
