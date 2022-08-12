import { Test, TestingModule } from '@nestjs/testing';
import { StoreTransactionsService } from './store-transactions.service';

describe('StoreTransactionsService', () => {
  let service: StoreTransactionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StoreTransactionsService],
    }).compile();

    service = module.get<StoreTransactionsService>(StoreTransactionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
