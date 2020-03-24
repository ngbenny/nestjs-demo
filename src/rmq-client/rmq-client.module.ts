import { Module } from '@nestjs/common';
import { RmqClientController } from './api/rmq-client.controller';
import { AppConfigService } from '../config/app-config.service';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { AppService } from '../app.service';
import { AppConfigModule } from '../config/app-config.module';

const rmqClientFactory = {
  provide: 'RMQ_CLIENT',
  useFactory: (config: AppConfigService) => {
    return config.messagingConfig.transport === 'rmq' ?
     ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: [config.messagingConfig.rmq.url],
        queue: config.messagingConfig.rmq.queue,
        queueOptions: config.messagingConfig.rmq.queueOptions,
      },
    }) : ClientProxyFactory.create({
      transport: Transport.TCP,
    });
  },
  inject: [AppConfigService],
};

@Module({
  imports: [AppConfigModule],
  controllers: [RmqClientController],
  providers: [AppService, rmqClientFactory],
  exports: [rmqClientFactory],
})
export class RmqClientModule {}
