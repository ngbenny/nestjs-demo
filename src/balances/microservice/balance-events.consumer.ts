import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { BalancesService } from '../balances.service';
import { UserEventPatterns, UserCreatedEvent } from '../../rmq-client/events/rmq-client.events';

@Controller()
export class BalanceEventsConsumer {
  constructor(private balancesService: BalancesService){}

  @EventPattern(UserEventPatterns.UserCreated)
  async handleUserCreated(@Payload() data: UserCreatedEvent) {
    console.log(`!!Creating balance for user - ${data.userId}`);

    this.balancesService.create({ userId: data.userId });
  }
}

