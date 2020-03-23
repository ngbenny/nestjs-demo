import { Controller, Get, Post, Body, Res, HttpStatus } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { Transaction } from './interfaces/transaction.interface';
import { CreateTransactionDto } from './dto/create-transaction.dto';

@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionService: TransactionsService) {}

  @Get()
  getAll(): Promise<Transaction[]> {
    return this.transactionService.findAll();
  }

  @Post()
  async create(
    @Res() res,
    @Body() dto: CreateTransactionDto,
  ): Promise<Transaction> {
    const transaction = await this.transactionService.create(dto);
    return res.status(HttpStatus.OK).json({
      message: 'Transaction has been created successfully',
      transaction,
    });
  }
}
