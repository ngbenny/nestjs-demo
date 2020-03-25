import { NestFactory } from '@nestjs/core';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { INestApplication } from '@nestjs/common';
import { AppConfigService } from './config/app-config.service';
import { MyLogger } from './logger/my-logger.service';

declare const module: any;

const apiSwaggerPath = '/api';

function setupSwagger(app: INestApplication) {
  const options = new DocumentBuilder()
    .setTitle('MOVE6 Currency')
    .setDescription('MOVE6 Currency API Specs')
    .setVersion('1.0')
    .addTag('Registration')
    .addTag('Authentications')
    .addTag('Balances')
    .addTag('Transactions')
    .addTag('Mock RabbitMQ Client')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup(apiSwaggerPath, app, document);
}

function setupMicroservice(app: INestApplication, appConfig: AppConfigService) {
  appConfig.messagingConfig.transport === 'rmq'
    ? app.connectMicroservice<MicroserviceOptions>({
        transport: Transport.RMQ,
        options: {
          urls: [appConfig.messagingConfig.rmq.url],
          queue: appConfig.messagingConfig.rmq.queue,
          queueOptions: appConfig.messagingConfig.rmq.queueOptions,
        },
      })
    : app.connectMicroservice<MicroserviceOptions>({
        transport: Transport.TCP,
        options: { retryAttempts: 5, retryDelay: 3000 },
      });

  console.log(
    `Done setup microservice, transport: ${appConfig.messagingConfig.transport}`,
  );
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {logger: MyLogger});
  const appConfig = app.get(AppConfigService);

  const port = appConfig.port;

  app.setGlobalPrefix('v1');
  setupSwagger(app);
  setupMicroservice(app, appConfig);
  app.useLogger(await app.resolve(MyLogger));

  // start microservices
  await app.startAllMicroservicesAsync();

  // start web api
  await app.listen(port);

  const appUrl = await app.getUrl();
  console.log(
    `\nApplication is running on: ${appUrl}\nAPI specs: ${appUrl}${apiSwaggerPath}`,
  );

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}

bootstrap();
