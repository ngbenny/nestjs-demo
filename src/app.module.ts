import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TransactionsModule } from './transactions/transactions.module';
import { DatabaseModule } from './database/database.module';
import { AppConfigModule } from './config/app-config.module';
import { BalancesModule } from './balances/balances.module';
import { RmqClientModule } from './rmq-client/rmq-client.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { LoggerModule } from './logger/logger.module';


@Module({
  imports: [
    AppConfigModule,
    DatabaseModule,
    TransactionsModule,
    BalancesModule,
    RmqClientModule,
    AuthModule,
    UsersModule,
    LoggerModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
