import { ConfigService } from '@nestjs/config';

export class AppConfigService {
  constructor(private configService: ConfigService) {}

  get databaseConfig(): DatabaseConfig {
    return {
      mongoCS: this.configService.get<string>('database.mongoCS')
    }
  }
}