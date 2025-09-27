import { AiService } from '../ai/ai.service';
import { GenerateQuestionsDto, ExperienceLevel } from './dto/generate-questions.dto';
import { ReviewBatchDto } from './dto/review-batch.dto';
export declare class InterviewsService {
    private readonly ai;
    constructor(ai: AiService);
    generateQuestions(dto: GenerateQuestionsDto): Promise<{
        role: string;
        topic: string;
        experienceLevel: ExperienceLevel;
        experienceYears: number;
        questions: string[];
    }>;
    reviewBatch(dto: ReviewBatchDto): Promise<{
        role: string;
        topic: string;
        experienceLevel: ExperienceLevel;
        experienceYears: number;
        averageScore: number;
        strengths: string[];
        improvements: string[];
        evaluations: {
            question: string;
            score: number;
            feedback: string;
        }[];
        summary: string;
    }>;
}
