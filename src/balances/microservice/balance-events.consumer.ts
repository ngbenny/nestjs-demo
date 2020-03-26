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
import { LoftLogger } from 'src/logger/loft-logger.service';

@Controller()
export class BalanceEventsConsumer {
  constructor(
    private readonly balancesService: BalancesService,
    private readonly logger: LoftLogger,
  ) {
    this.logger.setContext('BalanceEventsConsumer');
  }

  @EventPattern(UserEventPatterns.UserCreated)
  async handleUserCreated(@Payload() data: UserCreatedEvent) {
    this.logger.log(`
Consuming event for '${UserEventPatterns.UserCreated}'
Creating balance for user: userId = ${data.userId}
    `);

    await this.balancesService.create({ userId: data.userId });
  }

  @EventPattern(TransactionEventPatterns.TransactionCreated)
  async handleTransactionCreated(@Payload() data: TransactionCreatedEvent) {
    this.logger.log(
      `Handling transaction for user - ${data.userId}, amount - ${data.amount}`,
    );

    await this.balancesService.update({
      userId: data.userId,
      amountChange: data.amount,
    });
  }
}
