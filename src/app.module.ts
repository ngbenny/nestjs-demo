import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TransactionsModule } from './transactions/transactions.module';
import { DatabaseModule } from './database/database.module';
import { AppConfigModule } from './config/app-config.module';
import { Transport, ClientProxyFactory } from '@nestjs/microservices';
import { AppConfigService } from './config/app-config.service';
import { BalancesModule } from './balances/balances.module';

const rmqClientFactory = {
  provide: 'RMQ_CLIENT',
  useFactory: (config: AppConfigService) => {
    return ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: [config.amqpConfig.rmq.url],
        queue: config.amqpConfig.rmq.queue,
        queueOptions: config.amqpConfig.rmq.queueOptions,
      },
    });
  },
  inject: [AppConfigService],
};

@Module({
  imports: [
    AppConfigModule,
    DatabaseModule,
    TransactionsModule,
    BalancesModule,
  ],
  controllers: [AppController],
  providers: [AppService, rmqClientFactory],
})
export class AppModule {}
