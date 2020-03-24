import { ApiProperty } from '@nestjs/swagger';

export class QueryBalancesDto {
  @ApiProperty()
  userId: string;
}
