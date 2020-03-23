import { Controller, Get, Post, Body, Res, HttpStatus } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { TransactionsService } from './transactions.service';
import { Transaction } from './interfaces/transaction.interface';
import { CreateTransactionDto } from './dto/create-transaction.dto';

@ApiTags('Transactions')
@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionService: TransactionsService) {}

  @Get()
  async getAll(@Res() res): Promise<Transaction[]> {
    const transactions = await this.transactionService.findAll();
    return res.status(HttpStatus.OK).json({
      data: transactions,
    });
  }

  @Post()
  async create(
    @Res() res,
    @Body() dto: CreateTransactionDto,
  ): Promise<Transaction> {
    const transaction = await this.transactionService.create(dto);
    return res.status(HttpStatus.OK).json({
      message: 'Transaction has been created successfully',
      data: transaction,
    });
  }
}
