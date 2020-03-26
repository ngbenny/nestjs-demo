import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { hash } from 'bcryptjs';
import { User } from './interfaces/user.interface';
import { CreateUserDto } from './dto/create-user-dto';
import { LoftLogger } from 'src/logger/loft-logger.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('User')
    private userModel: Model<User>,
    private logger: LoftLogger,
  ) {
    this.logger.setContext('UsersService');
  }

  async create(dto: CreateUserDto): Promise<User> {
    // this.logger.debug(`Creating user: usename=${dto.username}`);
    const hashedPassword = await hash(dto.password, 10);
    const createdUser = new this.userModel({
      username: dto.username,
      password: hashedPassword,
    });
    await createdUser.save({ validateBeforeSave: true });
    return await this.userModel.findOne({ username: dto.username });
  }

  async findOne(username: string): Promise<User | undefined> {
    const filter = { username: username };
    return await this.userModel.findOne(filter);
  }
}
