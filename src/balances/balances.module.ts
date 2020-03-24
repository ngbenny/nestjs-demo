import { Module } from '@nestjs/common';
import { BalancesController } from './balances.controller';
import { BalancesService } from './balances.service';
import { MongooseModule } from '@nestjs/mongoose';
import { BalanceSchema } from './schemas/balance.schema';
import { BalanceEventsConsumer } from './microservice/balance-events.consumer';

// FIXME no magic strings

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Balance', schema: BalanceSchema }]),
  ],
  controllers: [BalancesController, BalanceEventsConsumer],
  providers: [BalancesService],
})
export class BalancesModule {}
