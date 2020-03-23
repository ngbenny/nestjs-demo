import { Test, TestingModule } from '@nestjs/testing';
import { TransactionsController } from './transactions.controller';
import { TransactionsService } from './transactions.service';

describe('Transactions Controller', () => {
  let controller: TransactionsController;

  const mockTransactionModel = {};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: 'TransactionModel',
          useValue: mockTransactionModel,
        },
        TransactionsService,
      ],
      controllers: [TransactionsController],
    }).compile();

    controller = module.get(TransactionsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
