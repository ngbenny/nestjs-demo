import { Module } from '@nestjs/common';
import { BalancesController } from './balances.controller';
import { BalancesService } from './balances.service';
import { MongooseModule } from '@nestjs/mongoose';
import { BalanceSchema } from './schemas/balance.schema';
import { BalanceEventsConsumer } from './microservice/balance-events.consumer';
import { BalanceMessagesConsumer } from './microservice/balance-messages.consumer';
import { LoggerModule } from '../logger/logger.module';

// FIXME no magic strings

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Balance', schema: BalanceSchema }]),
    LoggerModule,
  ],
  controllers: [
    BalancesController,
    BalanceEventsConsumer,
    BalanceMessagesConsumer,
  ],
  providers: [BalancesService],
})
export class BalancesModule {}
