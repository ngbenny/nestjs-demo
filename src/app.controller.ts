import { Controller, Get, Inject } from '@nestjs/common';
import { AppService } from './app.service';
import { ClientProxy, EventPattern } from '@nestjs/microservices';

class Message {
  text: string;
  constructor(text) {
    this.text = text;
  }
}

// TODO move to user domain

export enum UserEventPatterns {
  UserCreated = 'user.created'
}

export abstract class UserEvent {
  abstract get pattern(): string;
  abstract get payload(): any;
}

export class UserCreatedEvent implements UserEvent {
  constructor(public userId: string) {}
  get payload(): any {
    return {
      userId: this.userId,
    };
  }
  get pattern(): string {
    return UserEventPatterns.UserCreated;
  }
}

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,

    @Inject('RMQ_CLIENT')
    private readonly rmqClient: ClientProxy,
  ) {}

  // @EventPattern('ping')
  // async handlePing(data: Record<string, unknown>) {
  //   console.log(`pong - ${data.text}`);
  // }

  @Get()
  getHello(): string {
    // return this.appService.getHello();

    // const pattern = { cmd: 'sum' };
    // const payload = [1, 2, 3];
    // return this.client.send<number>(pattern, payload);

    // this.rmqClient.emit<any>(
    //   'ping',
    //   new Message(`Hello World, it's now - ${new Date()}`),
    // );

    const event = new UserCreatedEvent('user123');
    this.rmqClient.emit<any>(event.pattern, event.payload);

    return 'ping sent';
  }
}
