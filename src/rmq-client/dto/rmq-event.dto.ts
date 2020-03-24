import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export enum MessageStyle {
  RequestResponse = 'RequestResponse',
  EventBased = 'EventBased',
}

export class CreateRmqEventDto {
  @ApiProperty({ enum: MessageStyle })
  messageStyle: MessageStyle;

  @ApiProperty()
  pattern: string;

  @ApiPropertyOptional()
  payload: any;
}

export class UsedCreatedEventDto {
  @ApiProperty()
  userId: string;
}

export class QueryUserBalanceCommandDto {
  @ApiProperty({ default: '' })
  userId: string;
}

