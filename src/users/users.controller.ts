import { Controller, Post, Body, Res, HttpStatus } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user-dto';
import { User } from './interfaces/user.interface';
import { UsersService } from './users.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Registration')
@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post()
  async create(@Res() res, @Body() dto: CreateUserDto): Promise<User> {
    const user = await this.userService.create(dto);

    return res.status(HttpStatus.CREATED).json({
      message: 'User has been created successfully',
      data: {
        '_id': user._id,
        username: user.username,
      }
    });
  }
}
