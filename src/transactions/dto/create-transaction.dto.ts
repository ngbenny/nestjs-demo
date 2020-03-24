import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateTransactionDto {
  @ApiProperty({ example: 'john' })
  userId: string;

  @ApiProperty({ default: 0, example: 0 })
  amount: number;

  @ApiPropertyOptional({ example: '' })
  sourceRequestId: string;
}
