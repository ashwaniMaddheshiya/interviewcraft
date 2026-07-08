import { Injectable } from '@nestjs/common';
import { GoogleGenerativeAI } from '@google/generative-ai';

@Injectable()
export class AiService {
  private readonly model: any;

  constructor() {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

    this.model = genAI.getGenerativeModel({
      model: process.env.GEMINI_MODEL || 'gemini-2.5-flash',
    });
  }

  private async generate(prompt: string): Promise<string> {
    const result = await this.model.generateContent({
      contents: [
        {
          role: 'user',
          parts: [{ text: prompt }],
        },
      ],
      generationConfig: {
        temperature: 0.3,
        responseMimeType: 'application/json',
      },
    });

    return result.response.text().trim();
  }

  private sanitizeQuestionsText(raw: string): string[] {
    // Remove code fences and trim
    const cleaned = raw.replace(/```json|```/gi, '').trim();

    // Try JSON parse for array or object with questions again after cleaning
    try {
      const parsed = JSON.parse(cleaned);

      if (Array.isArray(parsed)) {
        return parsed.map((q) => String(q).trim()).filter(Boolean);
      }

      if (parsed && Array.isArray(parsed.questions)) {
        return parsed.questions
          .map((q: any) => String(q).trim())
          .filter(Boolean);
      }
    } catch {
      // Ignore and continue with line parsing
    }

    // Fallback line parsing
    const lines = cleaned
      .split(/\r?\n/)
      .map((l) => l.trim())
      .filter(
        (l) =>
          l &&
          !l.startsWith('[') &&
          !l.startsWith(']') &&
          !l.startsWith('{') &&
          !l.startsWith('}') &&
          !/^"?questions"?/i.test(l) &&
          l.toLowerCase() !== 'json',
      )
      .map((l) => l.replace(/^[-*]\s*/, ''))
      .map((l) => l.replace(/^\d+\.\s*/, ''))
      .map((l) =>
        l
          .replace(/^"/, '')
          .replace(/",?$/, '')
          .replace(/",?\s*$/, ''),
      )
      .map((l) => l.replace(/,$/, ''))
      .map((l) => l.trim())
      .filter(Boolean);

    return lines;
  }

  async generateQuestionsList(
    role: string,
    topic: string,
    experienceLabel: string,
    count = 15,
  ): Promise<string[]> {
    const prompt = `
You are a highly experienced interviewer.

Generate exactly ${count} deep, practical, and unique interview questions.

Role: ${role}
Topic: ${topic}
Experience Level: ${experienceLabel}

Guidelines:
- Questions must increase in depth according to experience level.
- A fresher should receive strong conceptual and practical questions.
- A senior should receive architecture, debugging, scalability and tradeoff questions.
- Avoid trivial "What is X?" questions.
- Questions should feel realistic and be asked by an experienced interviewer.
- Keep each question concise (1-2 sentences).
- Return ONLY a valid JSON array of strings.
`;

    const content = await this.generate(prompt);

    try {
      const arr = JSON.parse(content);
      return Array.isArray(arr)
        ? arr.map((q: any) => String(q))
        : [];
    } catch {
      const lines = this.sanitizeQuestionsText(content);
      return lines.slice(0, count);
    }
  }

  async reviewBatchWithSummary(
    role: string,
    topic: string,
    experienceLabel: string,
    items: { question: string; answer: string }[],
  ): Promise<{
    evaluations: {
      question: string;
      score: number;
      feedback: string;
    }[];
    summary: string;
    strengths: string[];
    improvements: string[];
  }> {
    const prompt = `
You are a senior interviewer reviewing a complete interview session.

Role: ${role}
Topic: ${topic}
Experience Level: ${experienceLabel}

Evaluate every answer honestly as if hiring for a real company.

Scoring Guidelines:
- Score between 0 and 10.
- Be strict according to the candidate's experience.
- Feedback should be specific and actionable.
- Mention what is missing instead of generic criticism.
- At the end provide:
  - overall summary
  - strengths
  - improvements

Interview:

${items
  .map(
    (it, i) => `
Question ${i + 1}:
${it.question}

Answer:
${it.answer}
`,
  )
  .join('\n')}

Return ONLY valid JSON in this exact format:

{
  "evaluations": [
    {
      "question": "...",
      "score": 8,
      "feedback": "..."
    }
  ],
  "summary": "...",
  "strengths": [
    "...",
    "..."
  ],
  "improvements": [
    "...",
    "..."
  ]
}
`;

    const content = await this.generate(prompt);

    try {
      const parsed = JSON.parse(content);

      const evaluations = Array.isArray(parsed.evaluations)
        ? parsed.evaluations.map((e: any) => ({
            question: String(e.question || ''),
            score: Math.max(0, Math.min(10, Number(e.score) || 0)),
            feedback: String(e.feedback || ''),
          }))
        : [];

      const strengths = Array.isArray(parsed.strengths)
        ? parsed.strengths.map((s: any) => String(s))
        : [];

      const improvements = Array.isArray(parsed.improvements)
        ? parsed.improvements.map((s: any) => String(s))
        : [];

      const summary = String(parsed.summary || '');

      return {
        evaluations,
        summary,
        strengths,
        improvements,
      };
    } catch {
      return {
        evaluations: [],
        summary: content || 'Could not parse summary.',
        strengths: [],
        improvements: [],
      };
    }
  }
}