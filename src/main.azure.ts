import { INestApplication } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import { GlobalInterceptor } from './common/interceptor/global.interceptor';
import { TransformInterceptor } from './common/interceptor/transform.interceptor';
import { ErrorsInterceptor } from './common/interceptor/errors.interceptor';
import { HttpExceptionFilter } from './common/filters/errors.exception';
import { ResponseService } from './common/services/response/response.service';

import * as helmet from 'helmet';

export async function createApp(): Promise<INestApplication> {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');

  app.enableCors();
  app.use(helmet());

  app.setGlobalPrefix('api');
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalInterceptors(new GlobalInterceptor());
  // app.useGlobalInterceptors(new ErrorsInterceptor());
  app.useGlobalInterceptors(new TransformInterceptor());

  await app.init();
  return app;
}
