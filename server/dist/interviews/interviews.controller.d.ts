import { InterviewsService } from './interviews.service';
import { GenerateQuestionsDto } from './dto/generate-questions.dto';
import { ReviewBatchDto } from './dto/review-batch.dto';
export declare class InterviewsController {
    private readonly interviews;
    constructor(interviews: InterviewsService);
    generate(dto: GenerateQuestionsDto): Promise<{
        role: string;
        topic: string;
        experienceLevel: import("./dto/generate-questions.dto").ExperienceLevel;
        experienceYears: number;
        questions: string[];
    }>;
    reviewBatch(dto: ReviewBatchDto): Promise<{
        role: string;
        topic: string;
        experienceLevel: import("./dto/generate-questions.dto").ExperienceLevel;
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
