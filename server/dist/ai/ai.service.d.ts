export declare class AiService {
    private readonly client;
    private readonly model;
    constructor();
    private sanitizeQuestionsText;
    generateQuestionsList(role: string, topic: string, experienceLabel: string, count?: number): Promise<string[]>;
    reviewBatchWithSummary(role: string, topic: string, experienceLabel: string, items: {
        question: string;
        answer: string;
    }[]): Promise<{
        evaluations: {
            question: string;
            score: number;
            feedback: string;
        }[];
        summary: string;
        strengths: string[];
        improvements: string[];
    }>;
}
