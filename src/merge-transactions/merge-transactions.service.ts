import { Injectable } from '@nestjs/common';
import { CreateMergeTransactionDto } from './dto/create-merge-transaction.dto';
import { UpdateMergeTransactionDto } from './dto/update-merge-transaction.dto';

@Injectable()
export class MergeTransactionsService {
  async insertMergeTransactions() {}

  async findAll() {}

  // create(createMergeTransactionDto: CreateMergeTransactionDto) {
  //   return 'This action adds a new mergeTransaction';
  // }

  // findAll() {
  //   return `This action returns all mergeTransactions`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} mergeTransaction`;
  // }

  // update(id: number, updateMergeTransactionDto: UpdateMergeTransactionDto) {
  //   return `This action updates a #${id} mergeTransaction`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} mergeTransaction`;
  // }
}
