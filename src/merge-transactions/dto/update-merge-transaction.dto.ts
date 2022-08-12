import { PartialType } from '@nestjs/mapped-types';
import { CreateMergeTransactionDto } from './create-merge-transaction.dto';

export class UpdateMergeTransactionDto extends PartialType(CreateMergeTransactionDto) {}
