import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TransactionsModule } from './transactions/transactions.module';
import { DatabaseModule } from './database/database.module';
import { AppConfigModule } from './config/app-config.module';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    AppConfigModule,
    DatabaseModule,
    TransactionsModule,

    ClientsModule.register([
      { name: 'BALANCE_SERVICE', transport: Transport.TCP },
      {
        name: 'RMQ_CLIENT',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://admin:local123@localhost:5672/hello'],
          queue: 'currency_queue',
          queueOptions: {
            durable: false,
          },
        },
      },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
