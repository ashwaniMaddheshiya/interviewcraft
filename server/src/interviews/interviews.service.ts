import { Injectable } from '@nestjs/common';
import { AiService } from '../ai/ai.service';
import {
  GenerateQuestionsDto,
  ExperienceLevel,
} from './dto/generate-questions.dto';
import { ReviewBatchDto } from './dto/review-batch.dto';

function mapExperienceToYears(level: ExperienceLevel): number {
  switch (level) {
    case ExperienceLevel.Fresher:
      return 0;
    case ExperienceLevel.Junior:
      return 1;
    case ExperienceLevel.Mid:
      return 3;
    case ExperienceLevel.Senior:
      return 6;
    default:
      return 2;
  }
}

@Injectable()
export class InterviewsService {
  constructor(private readonly ai: AiService) {}

  async generateQuestions(dto: GenerateQuestionsDto) {
    const years = mapExperienceToYears(dto.experienceLevel);
    const questions = await this.ai.generateQuestionsList(
      dto.role,
      dto.topic,
      dto.experienceLevel,
      15,
    );
    return {
      role: dto.role,
      topic: dto.topic,
      experienceLevel: dto.experienceLevel,
      experienceYears: years,
      questions,
    };
  }

  async reviewBatch(dto: ReviewBatchDto) {
    const years = mapExperienceToYears(dto.experienceLevel);
    const { evaluations, summary, strengths, improvements } =
      await this.ai.reviewBatchWithSummary(
        dto.role,
        dto.topic,
        dto.experienceLevel,
        dto.items,
      );
    // compute overall score if present
    const scores = evaluations.map((e) => e.score);
    const averageScore = scores.length
      ? Number((scores.reduce((a, b) => a + b, 0) / scores.length).toFixed(2))
      : 0;
    return {
      role: dto.role,
      topic: dto.topic,
      experienceLevel: dto.experienceLevel,
      experienceYears: years,
      averageScore,
      strengths,
      improvements,
      evaluations,
      summary,
    };
  }
}
