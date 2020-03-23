import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { TransactionsService } from '../src/transactions/transactions.service';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  const transactionsService = { findAll: () => ['test'] };

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(TransactionsService)
      .useValue(transactionsService)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });

  it('GET /transactions', async done => {
    request(app.getHttpServer())
      .get('/transactions')
      .expect(200)
      .expect({
        data: transactionsService.findAll(),
      });
    done();
  });

  afterEach(() => app.close());
});
