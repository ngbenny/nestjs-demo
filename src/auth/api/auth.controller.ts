import { Controller, Request, UseGuards, Post } from '@nestjs/common';
import { ApiTags, ApiBody } from '@nestjs/swagger';
import { AuthService } from '../auth.service';
import { LocalAuthGuard } from '../local-auth.guard';
import { CreateUserDto } from '../../users/dto/create-user-dto';

@ApiTags('Authentications')
@Controller()
export class AuthController {
  constructor(
    private readonly authService: AuthService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('access_tokens')
  @ApiBody({ type: CreateUserDto })
  async login(@Request() req) {
    return this.authService.loginSuccess(req.user);
  }
}
