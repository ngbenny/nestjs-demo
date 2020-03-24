import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { pick } from 'lodash';
import { Balance } from './interfaces/balance.interface';
import { CreateBalanceDto, UpdateBalanceDto } from './dto/balance.dto';
import { QueryBalancesDto } from './dto/query-balances.dto';

// FIXME no magic strings

@Injectable()
export class BalancesService {
  constructor(
    @InjectModel('Balance')
    private balanceModel: Model<Balance>,
  ) {}

  async create(dto: CreateBalanceDto): Promise<Balance> {
    const createdBalance = new this.balanceModel({
      userId: dto.userId,
      amount: 0,
    });
    return await createdBalance.save();
  }

  async update(dto: UpdateBalanceDto): Promise<Balance> {
    const filter = { userId: dto.userId };
    const balance = await this.balanceModel.findOne(filter);
    if (!balance) {
      throw new Error(`Balance not found (userId=${dto.userId})`);
    }

    const newAmount = balance.amount + dto.amountChange;
    await this.balanceModel.updateOne(
      filter,
      { amount: newAmount },
      { new: true, upsert: false },
    );
    console.log(
      `Balance updated for user= ${dto.userId}, amount(old)= ${balance.amount}, amount(new)= ${newAmount}`,
    );

    return await this.balanceModel.findOne(filter);
  }

  async findAll(query: QueryBalancesDto): Promise<Balance[]> {
    const sanitizedQuery: Partial<QueryBalancesDto> = pick(query, ['userId']);
    if (!sanitizedQuery.userId) {
      throw new UnprocessableEntityException('userId is not provided');
    }
    return await this.balanceModel.find(sanitizedQuery).exec();
  }
}
