import {
  Controller,
  Post,
  Body,
  Res,
  HttpStatus,
  Inject,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user-dto';
import { User } from './interfaces/user.interface';
import { UsersService } from './users.service';
import { ApiTags } from '@nestjs/swagger';
import { UserCreatedEvent } from 'src/rmq-client/events/rmq-client.events';
import { ClientProxy } from '@nestjs/microservices';
import { MyLogger } from 'src/logger/my-logger.service';

// TODO refactor
const RMQ_CLIENT = 'RMQ_CLIENT';

@ApiTags('Registration')
@Controller('users')
export class UsersController {
  constructor(
    private readonly userService: UsersService,
    @Inject(RMQ_CLIENT)
    private readonly rmqClient: ClientProxy,
    private logger: MyLogger,
  ) {
    this.logger.setContext('UsersController');
  }

  @Post()
  async create(@Res() res, @Body() dto: CreateUserDto): Promise<User> {
    this.logger.debug(`User signing up: usename=${dto.username}`);
    try {
      const user = await this.userService.create(dto);

      const createdEvent = new UserCreatedEvent(user._id);
      this.rmqClient.emit(createdEvent.pattern, createdEvent.payload);

      return res.status(HttpStatus.CREATED).json({
        message: 'User has been created successfully',
        data: {
          _id: user._id,
          username: user.username,
        },
      });
    } catch (error) {
      this.logger.error(`Error user signing up: ${error.message}`, error);
      return res.status(HttpStatus.UNPROCESSABLE_ENTITY).json({
        message: error.message,
        error,
      });
    }
  }
}
