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

  get messagingConfig(): MessagingConfig {
    return {
      transport: this.configService.get<string>('messaging.transport') as 'rmq' | 'tcp',
      rmq: {
        url: this.configService.get<string>('messaging.rmq.url'),
        queue: this.configService.get<string>('messaging.rmq.queue'),
        queueOptions: {
          durable: false
        }
      },
    }
  }
  
}