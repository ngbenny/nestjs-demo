import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ default: 'username', example: 'john' })
  username: string;

  @ApiProperty({ default: 'password', example: 'changeme' })
  password: string;
}
