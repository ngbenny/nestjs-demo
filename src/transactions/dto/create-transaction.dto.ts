import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateTransactionDto {
  @ApiProperty()
  userId: string;

  @ApiProperty({ default: 0 })
  amount: number;

  @ApiPropertyOptional()
  sourceRequestId: string;
}
