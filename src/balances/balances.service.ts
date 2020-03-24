import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { pick } from 'lodash';
import { Balance } from './interfaces/balance.interface';
import { CreateBalanceDto } from './dto/create-balance.dto';
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
    return createdBalance.save();
  }

  async findAll(query: QueryBalancesDto): Promise<Balance[]> {
    const sanitizedQuery: Partial<QueryBalancesDto> = pick(query, ['userId']);
    if (!sanitizedQuery.userId) {
      throw new UnprocessableEntityException('userId is not provided');
    }
    return this.balanceModel.find(sanitizedQuery).exec();
  }
}
