import { ApiProperty } from '@nestjs/swagger';

export class CreateBalanceDto {
  @ApiProperty()
  userId: string;
}

export class UpdateBalanceDto {
  @ApiProperty()
  userId: string;

  @ApiProperty()
  amountChange: number;
}

