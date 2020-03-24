import { NestFactory } from '@nestjs/core';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';
import { INestApplication } from '@nestjs/common';

function setupSwagger(app: INestApplication) {
  const options = new DocumentBuilder()
    .setTitle('MOVE6 Currency')
    .setDescription('MOVE6 Currency API Specs')
    .setVersion('1.0')
    .addTag('Transactions')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('/api', app, document);
}

function setupMicroservice(app: INestApplication) {
  // app.connectMicroservice<MicroserviceOptions>({
  //   transport: Transport.TCP,
  //   options: { retryAttempts: 5, retryDelay: 3000 },
  // });

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: ['amqp://admin:local123@localhost:5672/hello'],
      queue: 'currency_queue',
      queueOptions: {
        durable: false,
      },
    },
  });
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService);
  const port = config.get<number>('PORT');

  app.setGlobalPrefix('v1');
  setupSwagger(app);
  setupMicroservice(app);

  // start microservices
  await app.startAllMicroservicesAsync();

  // start web api
  await app.listen(port);

  console.log(`Application is running on: ${await app.getUrl()}`);
}

bootstrap();
