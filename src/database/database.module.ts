import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppConfigModule } from 'src/config/app-config.module';
import { MongooseOptionsService } from 'src/config/mongoose-options.service';

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
