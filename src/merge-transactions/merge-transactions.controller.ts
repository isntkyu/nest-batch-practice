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
import { CreateMergeTransactionDto } from './dto/create-merge-transaction.dto';
import { UpdateMergeTransactionDto } from './dto/update-merge-transaction.dto';

@Controller('merge-transactions')
export class MergeTransactionsController {
  constructor(
    private readonly mergeTransactionsService: MergeTransactionsService,
  ) {}

  // @Post()
  // create(@Body() createMergeTransactionDto: CreateMergeTransactionDto) {
  //   return this.mergeTransactionsService.create(createMergeTransactionDto);
  // }

  @Get()
  findAll() {
    return this.mergeTransactionsService.findAll();
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.mergeTransactionsService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateMergeTransactionDto: UpdateMergeTransactionDto) {
  //   return this.mergeTransactionsService.update(+id, updateMergeTransactionDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.mergeTransactionsService.remove(+id);
  // }
}
