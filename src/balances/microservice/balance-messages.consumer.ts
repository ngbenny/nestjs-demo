import { Controller } from '@nestjs/common';
import { Payload, MessagePattern, RpcException } from '@nestjs/microservices';
import { BalancesService } from '../balances.service';
import {
  BalanceEventPatterns,
  QueryUserBalanceCommand,
} from '../../rmq-client/events/rmq-client.events';

@Controller()
export class BalanceMessagesConsumer {
  constructor(private balancesService: BalancesService) {}

  @MessagePattern(BalanceEventPatterns.QueryUserBalance)
  async handleBalanceQuery(@Payload() data: QueryUserBalanceCommand) {
    console.log(`Query balance for user - ${data.userId}`);
    try {
      // FIXME remove testing delay
      await new Promise(resolve => setTimeout(resolve, 500));
      return await this.balancesService.findAll({ userId: data.userId });
    } catch (error) {
      throw new RpcException(error);
    }
  }
}
