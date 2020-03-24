import { ApiProperty } from '@nestjs/swagger';

export class QueryTransactionsDto {
  @ApiProperty()
  userId: string;
}
