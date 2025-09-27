import { Module } from '@nestjs/common';
import { InterviewsService } from './interviews.service';
import { InterviewsController } from './interviews.controller';
import { AiModule } from '../ai/ai.module';

@Module({
  imports: [AiModule],
  controllers: [InterviewsController],
  providers: [InterviewsService],
})
export class InterviewsModule {}
