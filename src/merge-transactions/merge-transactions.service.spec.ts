import { Test, TestingModule } from '@nestjs/testing';
import { MergeTransactionsService } from './merge-transactions.service';

describe('MergeTransactionsService', () => {
  let service: MergeTransactionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MergeTransactionsService],
    }).compile();

    service = module.get<MergeTransactionsService>(MergeTransactionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
