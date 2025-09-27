export declare enum ExperienceLevel {
    Fresher = "fresher",
    Junior = "junior",
    Mid = "mid",
    Senior = "senior"
}
export declare class GenerateQuestionsDto {
    role: string;
    topic: string;
    experienceLevel: ExperienceLevel;
}
