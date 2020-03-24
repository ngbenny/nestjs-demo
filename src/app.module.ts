import { Module, Injectable } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TransactionsModule } from './transactions/transactions.module';
import { DatabaseModule } from './database/database.module';
import { AppConfigModule } from './config/app-config.module';
import {
  ClientsModule,
  Transport,
  ClientProxyFactory,
  ClientProxy,
} from '@nestjs/microservices';
import { AppConfigService } from './config/app-config.service';

@Injectable()
export abstract class RabbitMQClientProxy extends ClientProxy {

}

class RabbitMQClientProxyFactory {
  constructor(private appConfigService: AppConfigService) {}

  static create(): any {
    return ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: ['amqp://admin:local123@localhost:5672/move6'],
        queue: 'currency_queue',
        queueOptions: {
          durable: false,
        },
      },
    });
  }
}

@Module({
  imports: [
    AppConfigModule,
    DatabaseModule,
    TransactionsModule,

    ClientsModule.register([
      { name: 'BALANCE_SERVICE', transport: Transport.TCP },
    ]),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: 'RMQ_CLIENT',
      useFactory: (config: AppConfigService) => {
        // const mathSvcOptions = configService.getMathSvcOptions();
        return ClientProxyFactory.create({
          transport: Transport.RMQ,
          options: {
            urls: ['amqp://admin:local123@localhost:5672/move6'],
            queue: 'currency_queue',
            queueOptions: {
              durable: false,
            },
          },
        });
      },
      inject: [AppConfigService],
      // useFactory: RabbitMQClientProxyFactory.create,
    },
  ],
})
export class AppModule {}
