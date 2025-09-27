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
exports.ReviewBatchDto = exports.QAItemDto = void 0;
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const generate_questions_dto_1 = require("./generate-questions.dto");
class QAItemDto {
    question;
    answer;
}
exports.QAItemDto = QAItemDto;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], QAItemDto.prototype, "question", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], QAItemDto.prototype, "answer", void 0);
class ReviewBatchDto {
    role;
    topic;
    experienceLevel;
    items;
}
exports.ReviewBatchDto = ReviewBatchDto;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ReviewBatchDto.prototype, "role", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ReviewBatchDto.prototype, "topic", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(generate_questions_dto_1.ExperienceLevel),
    __metadata("design:type", String)
], ReviewBatchDto.prototype, "experienceLevel", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => QAItemDto),
    __metadata("design:type", Array)
], ReviewBatchDto.prototype, "items", void 0);
//# sourceMappingURL=review-batch.dto.js.map