import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppConfigModule } from '../config/app-config.module';
import { MongooseOptionsService } from '../config/mongoose-options.service';
@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [AppConfigModule],
      useExisting: MongooseOptionsService,
    }),
  ],
  exports: [MongooseModule],
})
export class DatabaseModule {}
