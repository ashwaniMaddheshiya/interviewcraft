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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AiService = void 0;
const common_1 = require("@nestjs/common");
const openai_1 = __importDefault(require("openai"));
let AiService = class AiService {
    client;
    model;
    constructor() {
        this.client = new openai_1.default({ apiKey: process.env.OPENAI_API_KEY });
        this.model = process.env.OPENAI_MODEL || 'gpt-4o-mini';
    }
    sanitizeQuestionsText(raw) {
        const cleaned = raw.replace(/```json|```/gi, '').trim();
        try {
            const parsed = JSON.parse(cleaned);
            if (Array.isArray(parsed)) {
                return parsed.map((q) => String(q).trim()).filter(Boolean);
            }
            if (parsed && Array.isArray(parsed.questions)) {
                return parsed.questions
                    .map((q) => String(q).trim())
                    .filter(Boolean);
            }
        }
        catch {
        }
        const lines = cleaned
            .split(/\r?\n/)
            .map((l) => l.trim())
            .filter((l) => l &&
            !l.startsWith('[') &&
            !l.startsWith(']') &&
            !l.startsWith('{') &&
            !l.startsWith('}') &&
            !/^"?questions"?/i.test(l) &&
            l.toLowerCase() !== 'json')
            .map((l) => l.replace(/^[-*]\s*/, ''))
            .map((l) => l.replace(/^\d+\.\s*/, ''))
            .map((l) => l
            .replace(/^"/, '')
            .replace(/",?$/, '')
            .replace(/",?\s*$/, ''))
            .map((l) => l.replace(/,$/, ''))
            .map((l) => l.trim())
            .filter(Boolean);
        return lines;
    }
    async generateQuestionsList(role, topic, experienceLabel, count = 15) {
        const system = `You are a highly experienced interviewer. Generate ${count} deep, practical, and unique interview questions.
    They must be strictly tailored for:
    Role: ${role}
    Topic: ${topic}
    Experience Level: ${experienceLabel}
    
    Guidelines:
    - Questions must increase in depth according to experience level (e.g., a fresher gets fundamentals with practical edge cases, a senior gets architectural/system design, tradeoffs, debugging complex issues).
    - Avoid trivial "what is X?" type questions.
    - Each question should feel original, realistic, and test deeper thinking.
    - Be concise (1–2 sentences max per question).
    - Output only a valid JSON array of strings (no extra commentary).`;
        const user = `Role: ${role}\nTopic: ${topic}\nExperience Level: ${experienceLabel}`;
        const { choices } = await this.client.chat.completions.create({
            model: this.model,
            messages: [
                { role: 'system', content: system },
                { role: 'user', content: user },
            ],
            temperature: 0.5,
        });
        const content = choices[0]?.message?.content?.trim() || '[]';
        try {
            const arr = JSON.parse(content);
            return Array.isArray(arr) ? arr.map((q) => String(q)) : [];
        }
        catch {
            const lines = this.sanitizeQuestionsText(content);
            return lines.slice(0, count);
        }
    }
    async reviewBatchWithSummary(role, topic, experienceLabel, items) {
        const system = `You are a senior interviewer reviewing a full interview session for role: ${role}, topic: ${topic}, experience: ${experienceLabel}.
Be completely honest and critical — evaluate as if you were assessing a real candidate for a job.

Guidelines:
- For each answer, grade 0–10 with strictness appropriate to the candidate's level.
- Feedback must be specific and actionable (e.g., "expand on X concept" instead of "too shallow").
- Identify overall strengths and areas needing improvement.
- Provide a short summary of the candidate’s readiness for the role.

Output JSON with these keys:
{
  evaluations: [{ question, score (0–10), feedback }],
  summary: string,
  strengths: string[],
  improvements: string[]
}`;
        const user = `Role: ${role}\nTopic: ${topic}\nExperience Level: ${experienceLabel}\n\nItems:\n${items.map((it, i) => `${i + 1}. Q: ${it.question}\nA: ${it.answer}`).join('\n\n')}`;
        const { choices } = await this.client.chat.completions.create({
            model: this.model,
            messages: [
                { role: 'system', content: system },
                { role: 'user', content: user },
            ],
            temperature: 0.2,
        });
        const content = choices[0]?.message?.content?.trim() || '';
        try {
            const parsed = JSON.parse(content);
            const evaluations = Array.isArray(parsed.evaluations)
                ? parsed.evaluations.map((e) => ({
                    question: String(e.question || ''),
                    score: Math.max(0, Math.min(10, Number(e.score) || 0)),
                    feedback: String(e.feedback || ''),
                }))
                : [];
            const strengths = Array.isArray(parsed.strengths)
                ? parsed.strengths.map((s) => String(s))
                : [];
            const improvements = Array.isArray(parsed.improvements)
                ? parsed.improvements.map((s) => String(s))
                : [];
            const summary = String(parsed.summary || '');
            return { evaluations, summary, strengths, improvements };
        }
        catch {
            return {
                evaluations: [],
                summary: content || 'Could not parse summary.',
                strengths: [],
                improvements: [],
            };
        }
    }
};
exports.AiService = AiService;
exports.AiService = AiService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], AiService);
//# sourceMappingURL=ai.service.js.map