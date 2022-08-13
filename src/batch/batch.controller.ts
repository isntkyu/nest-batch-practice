import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { RequestLog } from 'src/interface/RequestLog';
import { BatchService } from './batch.service';

@Controller('batch')
export class BatchController {
  constructor(private readonly batchService: BatchService) {}

  @Get('logs')
  async findAllBatchLogs(): Promise<{
    fail: RequestLog[];
    success: RequestLog[];
  }> {
    return this.batchService.getAllBatchLogs();
  }
}
