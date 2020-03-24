import { Test, TestingModule } from '@nestjs/testing';
import { RmqClientController } from './rmq-client.controller';

describe('RmqClient Controller', () => {
  let controller: RmqClientController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RmqClientController],
    }).compile();

    controller = module.get<RmqClientController>(RmqClientController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
