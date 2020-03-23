import { Controller, Get, Post } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { Transaction } from './interfaces/transaction.interface';

@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionService: TransactionsService) {}

  @Get()
  getAll(): Promise<Transaction[]> {
    return this.transactionService.findAll();
  }

  @Post()
  create(): Promise<Transaction> {
    return this.transactionService.create(1124);
  }
}
