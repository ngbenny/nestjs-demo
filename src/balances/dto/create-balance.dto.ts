import { ApiProperty } from '@nestjs/swagger';

export class CreateBalanceDto {
  @ApiProperty()
  userId: string;
}
