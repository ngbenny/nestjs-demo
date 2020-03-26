import { Module } from '@nestjs/common';
import { MyLogger } from './my-logger.service';
import { LoftLogger } from './loft-logger.service';

@Module({
  providers: [MyLogger, LoftLogger],
  exports: [MyLogger, LoftLogger]
})
export class LoggerModule {}
