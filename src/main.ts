import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';
import { TransactionsModule } from './transactions/transactions.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const options = new DocumentBuilder()
    .setTitle('MOVE6 Currency')
    .setDescription('MOVE6 Currency API Specs')
    .setVersion('1.0')
    .addTag('Transactions')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('/api', app, document);

  const config = app.get(ConfigService);
  await app.listen(config.get('PORT'));
}
bootstrap();
