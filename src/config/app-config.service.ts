import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppConfigService {
  constructor(private configService: ConfigService) {}

  get port(): number {
    return this.configService.get<number>('PORT')
  }

  get databaseConfig(): DatabaseConfig {
    return {
      mongoUri: this.configService.get<string>('database.mongoUri')
    }
  }

  get amqpConfig(): AmqpConfig {
    return {
      rmq: {
        url: this.configService.get<string>('amqp.rmq.url'),
        queue: this.configService.get<string>('amqp.rmq.queue'),
        queueOptions: {
          durable: false
        }
      },
    }
  }
  
}