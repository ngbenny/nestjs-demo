import {
  Controller,
  Post,
  Inject,
  Body,
  UnprocessableEntityException,
} from '@nestjs/common';
import {
  UserCreatedEvent,
  QueryUserBalanceCommand,
} from '../events/rmq-client.events';
import { ClientProxy } from '@nestjs/microservices';
import { ApiTags } from '@nestjs/swagger';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {
  CreateRmqEventDto,
  MessageStyle,
  UsedCreatedEventDto,
  QueryUserBalanceCommandDto,
} from '../dto/rmq-event.dto';

// TODO refactor
const RMQ_CLIENT = 'RMQ_CLIENT';

@ApiTags('Mock RabbitMQ Client')
@Controller('rmq-client')
export class RmqClientController {
  constructor(
    @Inject(RMQ_CLIENT)
    private readonly rmqClient: ClientProxy,
  ) {}

  @Post('/events')
  createRmqEvent(@Body() dto: CreateRmqEventDto): Observable<any> {
    return dto.messageStyle === MessageStyle.RequestResponse
      ? this.rmqClient.send<any>(dto.pattern, dto.payload)
      : this.rmqClient.emit<any>(dto.pattern, dto.payload);
  }

  @Post('/events/user-created-events')
  createUserCreatedEvent(@Body() dto: UsedCreatedEventDto) {
    const event = new UserCreatedEvent(dto.userId);
    return this.rmqClient.emit(event.pattern, event.payload);
  }

  @Post('/messages/query-user-balance')
  createQueryUserBalanceCommand(@Body() dto: QueryUserBalanceCommandDto) {
    const msg = new QueryUserBalanceCommand(dto.userId);
    return this.rmqClient.send(msg.pattern, msg.payload).pipe(
      catchError(e => {
        throw new UnprocessableEntityException(e.message);
      }),
    );
  }
}
