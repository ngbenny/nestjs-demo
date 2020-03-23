import { Injectable } from '@nestjs/common';
import {
  MongooseOptionsFactory,
  MongooseModuleOptions,
} from '@nestjs/mongoose';
import { AppConfigService } from '../config/app-config.service';

@Injectable()
export class MongooseOptionsService implements MongooseOptionsFactory {
  constructor(private appConfigService: AppConfigService) {}

  createMongooseOptions(): MongooseModuleOptions {
    return {
      uri: this.appConfigService.databaseConfig.mongoUri,
    };
  }
}
