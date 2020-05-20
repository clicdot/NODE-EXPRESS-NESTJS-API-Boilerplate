import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
// import { JwtModule } from '@nestjs/jwt';
import { TerminusModule } from '@nestjs/terminus';
import { AppService } from './app.service';

import { V1Module } from './api/v1/v1.module';

import { HealthcheckController } from './api/controllers/healthcheck/healthcheck.controller';

@Module({
  imports: [
    TerminusModule,
    ConfigModule.forRoot({
      envFilePath: './src/.env'
    }),
    V1Module
  ],
  controllers: [
    HealthcheckController
  ],
  providers: [AppService],
})
export class AppModule {}
