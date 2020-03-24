import { Injectable } from '@nestjs/common';
import { compare } from 'bcryptjs';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    console.log('validating user login', username, pass);
    const user = await this.usersService.findOne(username);
    if (!user) {
      return null;
    }
    const passed = await compare(pass, user.password);
    if (passed) {
      return {
        _id: user._id,
        username: user.username,
      };
    }
    return null;
  }

  async loginSuccess(user: any) {
    const payload = { username: user.username, _id: user._id };
    console.log('loginSuccess', payload);
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}
