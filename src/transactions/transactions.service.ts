import { Injectable, Inject } from '@nestjs/common';
import { Model } from 'mongoose';
import { Transaction } from './interfaces/transaction.interface';

// FIXME avoid magic strings

@Injectable()
export class TransactionsService {
  constructor(
    @Inject('TRANSACTION_MODEL')
    private transactionModel: Model<Transaction>,
  ) {}

  async create(amount: number): Promise<Transaction> {
    const createdTransaction = new this.transactionModel({amount});
    return createdTransaction.save();
  }

  async findAll(): Promise<Transaction[]> {
    return this.transactionModel.find().exec();
  }
}
