import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';
import { HealthModule } from './health/health.module';
import { AiModule } from './ai/ai.module';
import { InterviewsModule } from './interviews/interviews.module';
import { envValidationSchema } from './config/validation';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, validationSchema: envValidationSchema }),
    ThrottlerModule.forRoot([{ ttl: 60_000, limit: 60 }]),
    HealthModule,
    AiModule,
    InterviewsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
