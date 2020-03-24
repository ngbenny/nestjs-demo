import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TransactionsModule } from './transactions/transactions.module';
import { DatabaseModule } from './database/database.module';
import { AppConfigModule } from './config/app-config.module';
import { BalancesModule } from './balances/balances.module';
import { RmqClientModule } from './rmq-client/rmq-client.module';


@Module({
  imports: [
    AppConfigModule,
    DatabaseModule,
    TransactionsModule,
    BalancesModule,
    RmqClientModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
