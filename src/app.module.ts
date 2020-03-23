import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TransactionsModule } from './transactions/transactions.module';
import { DatabaseModule } from './database/database.module';
import { AppConfigModule } from './config/app-config.module';

@Module({
  imports: [
    AppConfigModule,
    DatabaseModule,
    TransactionsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
