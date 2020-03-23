import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configuration from './configuration';
import { AppConfigService } from './app-config.service';
import { MongooseOptionsService } from './mongoose-options.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      // accept multiple env files, first one take precedence
      envFilePath: ['.env'],
      load: [configuration],
    }),
  ],
  providers: [AppConfigService, MongooseOptionsService],
  exports: [AppConfigService, MongooseOptionsService],
})
export class AppConfigModule {}
