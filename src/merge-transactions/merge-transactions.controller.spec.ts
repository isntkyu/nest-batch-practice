import { Test, TestingModule } from '@nestjs/testing';
import { MergeTransactionsController } from './merge-transactions.controller';
import { MergeTransactionsService } from './merge-transactions.service';

describe('MergeTransactionsController', () => {
  let controller: MergeTransactionsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MergeTransactionsController],
      providers: [MergeTransactionsService],
    }).compile();

    controller = module.get<MergeTransactionsController>(MergeTransactionsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
