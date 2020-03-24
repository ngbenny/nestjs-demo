import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { BalancesService } from '../balances.service';
import {
  UserEventPatterns,
  UserCreatedEvent,
} from '../../rmq-client/events/rmq-client.events';
import {
  TransactionEventPatterns,
  TransactionCreatedEvent,
} from '../../transactions/events/transaction.events';

@Controller()
export class BalanceEventsConsumer {
  constructor(private balancesService: BalancesService) {}

  @EventPattern(UserEventPatterns.UserCreated)
  async handleUserCreated(@Payload() data: UserCreatedEvent) {
    console.log(`Creating balance for user - ${data.userId}`);

    await this.balancesService.create({ userId: data.userId });
  }

  @EventPattern(TransactionEventPatterns.TransactionCreated)
  async handleTransactionCreated(@Payload() data: TransactionCreatedEvent) {
    console.log(
      `Handling transaction for user - ${data.userId}, amount - ${data.amount}`,
    );

    await this.balancesService.update({
      userId: data.userId,
      amountChange: data.amount,
    });
  }
}
