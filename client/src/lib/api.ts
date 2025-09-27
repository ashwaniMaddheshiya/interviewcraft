const API_BASE = process.env.NEXT_PUBLIC_API_URL;

export interface ReviewResult { 
  score: number; 
  feedback: string; 
  rubric: string[] 
}

export interface ReviewEvaluation { 
  question: string; 
  result: ReviewResult 
}

export interface ReviewResponse {
  sessionId?: string;
  role: string;
  experienceYears?: number;
  averageScore: number;
  evaluations: ReviewEvaluation[];
  strengths?: string[];
  improvements?: string[];
  summary?: string;
}

export type ExperienceLevel = "fresher" | "junior" | "mid" | "senior";

export interface GenerateQuestionsResponse {
  role: string;
  topic: string;
  experienceLevel: ExperienceLevel;
  experienceYears: number;
  questions: string[];
}

export async function generateQuestions(role: string, topic: string, experienceLevel: ExperienceLevel): Promise<GenerateQuestionsResponse> {
  const res = await fetch(`${API_BASE}/interviews/generate`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ role, topic, experienceLevel }),
  });
  if (!res.ok) throw new Error(`Failed to generate questions: ${res.status}`);
  return res.json();
}

export async function reviewBatch(payload: { role: string; topic: string; experienceLevel: ExperienceLevel; items: { question: string; answer: string }[] }): Promise<ReviewResponse> {
  const res = await fetch(`${API_BASE}/interviews/review-batch`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error(`Failed to review batch: ${res.status}`);
  return res.json();
}
