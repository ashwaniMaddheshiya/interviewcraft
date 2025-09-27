import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { InterviewsService } from './interviews.service';
import { GenerateQuestionsDto } from './dto/generate-questions.dto';
import { ReviewBatchDto } from './dto/review-batch.dto';

@Controller('interviews')
export class InterviewsController {
  constructor(private readonly interviews: InterviewsService) {}

  @Post('generate')
  @HttpCode(HttpStatus.OK)
  generate(@Body() dto: GenerateQuestionsDto) {
    return this.interviews.generateQuestions(dto);
  }

  @Post('review-batch')
  @HttpCode(HttpStatus.OK)
  reviewBatch(@Body() dto: ReviewBatchDto) {
    return this.interviews.reviewBatch(dto);
  }
}
