import { Controller, Get, Post, Body, Res, HttpStatus, Query } from '@nestjs/common';
import { ApiTags, ApiQuery } from '@nestjs/swagger';
import { TransactionsService } from './transactions.service';
import { Transaction } from './interfaces/transaction.interface';
import { CreateTransactionDto } from './dto/create-transaction.dto';

function extract<T>(properties: Record<keyof T, true>){
  return function<TActual extends T>(value: TActual){
      const result = {} as T;
      for (const property of Object.keys(properties) as Array<keyof T>) {
          result[property] = value[property];
      }
      return result;
  }
}

@ApiTags('Transactions')
@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionService: TransactionsService) {}

  @Get()
  @ApiQuery({ name: 'userId', required: false })
  async getAll(@Res() res, @Query() query): Promise<Transaction[]> {
    const transactions = await this.transactionService.findAll(query);
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
