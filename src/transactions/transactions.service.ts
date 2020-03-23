import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Transaction } from './interfaces/transaction.interface';
import { CreateTransactionDto } from './dto/create-transaction.dto';

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

  async findAll(): Promise<Transaction[]> {
    return this.transactionModel.find().exec();
  }
}
