import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { pick } from 'lodash';
import { Transaction } from './interfaces/transaction.interface';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { QueryTransactionsDto } from './dto/query-transactions.dto';

// FIXME avoid magic strings

@Injectable()
export class TransactionsService {
  constructor(
    @InjectModel('Transaction')
    private transactionModel: Model<Transaction>,
  ) {}

  async create(dto: CreateTransactionDto): Promise<Transaction> {
    const createdTransaction = new this.transactionModel(dto);
    return createdTransaction.save();
  }

  async findAll(query: QueryTransactionsDto): Promise<Transaction[]> {
    const sanitizedQuery: Partial<QueryTransactionsDto> = pick(query, [
      'userId',
    ]);
    return this.transactionModel.find(sanitizedQuery).exec();
  }
}
