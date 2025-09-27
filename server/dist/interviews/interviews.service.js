"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InterviewsService = void 0;
const common_1 = require("@nestjs/common");
const ai_service_1 = require("../ai/ai.service");
const generate_questions_dto_1 = require("./dto/generate-questions.dto");
function mapExperienceToYears(level) {
    switch (level) {
        case generate_questions_dto_1.ExperienceLevel.Fresher:
            return 0;
        case generate_questions_dto_1.ExperienceLevel.Junior:
            return 1;
        case generate_questions_dto_1.ExperienceLevel.Mid:
            return 3;
        case generate_questions_dto_1.ExperienceLevel.Senior:
            return 6;
        default:
            return 2;
    }
}
let InterviewsService = class InterviewsService {
    ai;
    constructor(ai) {
        this.ai = ai;
    }
    async generateQuestions(dto) {
        const years = mapExperienceToYears(dto.experienceLevel);
        const questions = await this.ai.generateQuestionsList(dto.role, dto.topic, dto.experienceLevel, 15);
        return {
            role: dto.role,
            topic: dto.topic,
            experienceLevel: dto.experienceLevel,
            experienceYears: years,
            questions,
        };
    }
    async reviewBatch(dto) {
        const years = mapExperienceToYears(dto.experienceLevel);
        const { evaluations, summary, strengths, improvements } = await this.ai.reviewBatchWithSummary(dto.role, dto.topic, dto.experienceLevel, dto.items);
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
};
exports.InterviewsService = InterviewsService;
exports.InterviewsService = InterviewsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [ai_service_1.AiService])
], InterviewsService);
//# sourceMappingURL=interviews.service.js.map