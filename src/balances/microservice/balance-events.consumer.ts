import { Controller } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';

@Controller()
export class BalanceEventsConsumer {
  @EventPattern('ping')
  async handlePing(data: Record<string, unknown>) {
    console.log(`!!pong - ${data.text}`);
  }
}
