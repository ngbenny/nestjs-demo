import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppConfigService {
  constructor(private configService: ConfigService) {}

  get databaseConfig(): DatabaseConfig {
    return {
      mongoUri: this.configService.get<string>('database.mongoUri')
    }
  }

  get amqpConfig(): AmqpConfig {
    return {
      rabbitmqUri: this.configService.get<string>('amqp.rabbitmqUri')
    }
  }
  
}