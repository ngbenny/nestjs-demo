import { Controller, Get, Inject } from '@nestjs/common';
import { AppService } from './app.service';
import { ClientProxy, EventPattern } from '@nestjs/microservices';

class Message {
  text: string;
  constructor(text) {
    this.text = text;
  }
}

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,

    // @Client({ transport: Transport.TCP })
    @Inject('BALANCE_SERVICE')
    private readonly client: ClientProxy,

    @Inject('RMQ_CLIENT')
    private readonly rmqClient: ClientProxy,
    
  ) {}

  @EventPattern('ping')
  async handlePing(data: Record<string, unknown>) {
    console.log(`pong - ${data.text}`);
  }

  @Get()
  getHello(): string {
    // return this.appService.getHello();

    // const pattern = { cmd: 'sum' };
    // const payload = [1, 2, 3];
    // return this.client.send<number>(pattern, payload);

    this.rmqClient.emit<any>(
      'ping',
      new Message(`Hello World, it's now - ${new Date()}`),
    );
    return 'ping sent';
  }
}
