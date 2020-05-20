import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

import { GlobalInterceptor } from '../src/common/interceptor/global.interceptor';
import { TransformInterceptor } from '../src/common/interceptor/transform.interceptor';
// import { ErrorsInterceptor } from '../src/common/interceptor/errors.interceptor';
import { HttpExceptionFilter } from '../src/common/filters/errors.exception';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();

    app.setGlobalPrefix('api');
    app.useGlobalFilters(new HttpExceptionFilter());
    app.useGlobalInterceptors(new GlobalInterceptor());
    // app.useGlobalInterceptors(new ErrorsInterceptor());
    app.useGlobalInterceptors(new TransformInterceptor());

    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/api/v1/test/cat')
      .expect(200)
      .then((response: any) => {
        expect(response.body.data).toBe('Hello World!');
      })
  });
});
