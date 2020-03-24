import { Test, TestingModule } from '@nestjs/testing';
import { BalancesController } from './balances.controller';

describe('Balances Controller', () => {
  let controller: BalancesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BalancesController],
    }).compile();

    controller = module.get<BalancesController>(BalancesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
