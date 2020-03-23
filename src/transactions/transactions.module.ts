import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { TransactionsController } from './transactions.controller';
import { TransactionsService } from './transactions.service';
import { transactionsProviders } from './transactions.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [TransactionsController],
  providers: [
    TransactionsService,
    ...transactionsProviders
  ]
})
export class TransactionsModule {}
