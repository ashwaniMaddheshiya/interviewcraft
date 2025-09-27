import { ExperienceLevel } from './generate-questions.dto';
export declare class QAItemDto {
    question: string;
    answer: string;
}
export declare class ReviewBatchDto {
    role: string;
    topic: string;
    experienceLevel: ExperienceLevel;
    items: QAItemDto[];
}
