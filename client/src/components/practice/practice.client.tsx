"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import type {
  ExperienceLevel,
  GenerateQuestionsResponse,
  ReviewResponse,
} from "@/lib/api";
import { generateQuestions, reviewBatch } from "@/lib/api";
import { Button } from "@/components/ui/Button";

export default function PracticeClient() {
  const router = useRouter();
  const params = useSearchParams();
  const role = params.get("role") || "Frontend Developer";
  const topic = params.get("topic") || "React";
  const level = (params.get("level") || "junior") as ExperienceLevel;

  const [questions, setQuestions] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<
    { question: string; answer: string }[]
  >([]);
  const [currentAnswer, setCurrentAnswer] = useState<string>("");
  const [review, setReview] = useState<ReviewResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const currentQuestion = questions[currentIndex] || "";
  const isLastQuestion = currentIndex === questions.length - 1;
  const canSubmit = useMemo(
    () => !!currentQuestion && !!currentAnswer.trim(),
    [currentQuestion, currentAnswer]
  );
  const hasProgress = answers.length > 0 || currentAnswer.trim().length > 0;

  // Experience level mapping
  const experienceYears = {
    fresher: "0-1 years",
    junior: "1-3 years",
    mid: "3-6 years",
    senior: "6+ years",
  };

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (hasProgress && !review) {
        e.preventDefault();
        e.returnValue =
          "Your progress will be lost. Are you sure you want to leave?";
        return "Your progress will be lost. Are you sure you want to leave?";
      }
    };

    const handlePopState = () => {
      if (hasProgress && !review) {
        window.history.pushState(null, "", window.location.href);

        const shouldLeave = window.confirm(
          "Your progress will be lost. Are you sure you want to leave?"
        );

        if (shouldLeave) {
          window.removeEventListener("beforeunload", handleBeforeUnload);
          window.removeEventListener("popstate", handlePopState);

          router.replace(
            `/topics/${encodeURIComponent(
              role.toLowerCase().includes("front")
                ? "frontend"
                : role.toLowerCase()
            )}`
          );
        }
      }
    };

    if (hasProgress && !review) {
      window.addEventListener("beforeunload", handleBeforeUnload);
      window.addEventListener("popstate", handlePopState);

      window.history.pushState(null, "", window.location.href);
    }

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      window.removeEventListener("popstate", handlePopState);
    };
  }, [hasProgress, review, router, role]);

  useEffect(() => {
    async function fetchQuestions() {
      try {
        setLoading(true);
        setError(null);
        const resp: GenerateQuestionsResponse = await generateQuestions(
          role,
          topic,
          level
        );
        setQuestions(resp.questions);
        setAnswers([]);
        setCurrentIndex(0);
        setCurrentAnswer("");
        setReview(null);
      } catch (e) {
        setError(
          e instanceof Error ? e.message : "Failed to generate questions"
        );
      } finally {
        setLoading(false);
      }
    }
    fetchQuestions();
  }, [role, topic, level]);

  const parseReviewData = useCallback(
    (rawReview: ReviewResponse): ReviewResponse => {
      if (rawReview.summary && rawReview.summary.includes("```json")) {
        try {
          const jsonMatch = rawReview.summary.match(/```json\n([\s\S]*?)\n```/);
          if (jsonMatch) {
            const jsonString = jsonMatch[1];
            const parsedSummary = JSON.parse(jsonString);

            const transformedEvaluations =
              parsedSummary.evaluations?.map(
                (evaluationItem: {
                  question: string;
                  score: number;
                  feedback: string;
                }) => ({
                  question: evaluationItem.question || "",
                  result: {
                    score: evaluationItem.score || 0,
                    feedback: evaluationItem.feedback || "",
                    rubric: [],
                  },
                })
              ) || [];

            return {
              ...rawReview,
              evaluations: transformedEvaluations,
              summary: parsedSummary.summary || rawReview.summary,
              strengths: parsedSummary.strengths || [],
              improvements: parsedSummary.improvements || [],
            };
          }
        } catch (e) {
          console.error("Failed to parse summary JSON:", e);
        }
      }
      return rawReview;
    },
    []
  );

  const handleSubmit = useCallback(() => {
    if (!currentQuestion || !currentAnswer.trim()) return;

    const newAnswer = {
      question: currentQuestion,
      answer: currentAnswer.trim(),
    };
    const updatedAnswers = [...answers, newAnswer];
    setAnswers(updatedAnswers);
    setCurrentAnswer("");

    if (isLastQuestion) {
      setLoading(true);
      reviewBatch({
        role,
        topic,
        experienceLevel: level,
        items: updatedAnswers,
      })
        .then((result) => {
          const parsedReview = parseReviewData(result);
          setReview(parsedReview);
        })
        .catch((e) => {
          setError(e instanceof Error ? e.message : "Failed to review session");
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setCurrentIndex(currentIndex + 1);
    }
  }, [
    currentQuestion,
    currentAnswer,
    answers,
    isLastQuestion,
    currentIndex,
    role,
    topic,
    level,
    parseReviewData,
  ]);

  if (loading && questions.length === 0) {
    return (
      <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-6">
        <div className="flex items-center gap-3">
          <div className="animate-spin rounded-full h-6 w-6 border-2 border-[var(--primary)] border-t-transparent"></div>
          <div>
            <h2 className="text-lg font-semibold">Preparing your interview…</h2>
            <p className="mt-1 text-sm text-[var(--muted)]">
              Generating 15 tailored questions for {role} — {topic} ({level})
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (loading && review === null) {
    return (
      <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-6">
        <div className="flex items-center gap-3">
          <div className="animate-spin rounded-full h-6 w-6 border-2 border-[var(--primary)] border-t-transparent"></div>
          <div>
            <h2 className="text-lg font-semibold">Reviewing your answers…</h2>
            <p className="mt-1 text-sm text-[var(--muted)]">
              AI is analyzing your responses and preparing feedback.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Session Header */}
      <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold">Practice Session</h1>
            <div className="flex flex-wrap items-center gap-2 mt-1 text-sm text-[var(--muted)]">
              <span className="capitalize">Role: {role}</span>
              <span>•</span>
              <span>Topic: {topic}</span>
              <span>•</span>
              <span className="capitalize">Level: {level}</span>
              <span className="text-xs bg-[var(--primary)]/20 text-[var(--primary)] px-2 py-1 rounded">
                {experienceYears[level]}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="rounded-md border border-red-500/50 bg-red-500/10 p-4 text-sm">
          <div className="flex items-center gap-2">
            <svg
              className="w-4 h-4 text-red-500"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                clipRule="evenodd"
              />
            </svg>
            <span className="font-medium">Error:</span>
            <span>{error}</span>
          </div>
        </div>
      )}

      {/* Question Interface */}
      {!review && questions.length > 0 && (
        <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-6">
            <h2 className="text-lg font-semibold">
              Question {currentIndex + 1} of {questions.length}
            </h2>
            <div className="flex items-center gap-4">
              <span className="text-xs text-[var(--muted)]">
                Progress: {answers.length}/{questions.length} answered
              </span>
              <div className="w-32 bg-[var(--background)] rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] h-2 rounded-full transition-all duration-300"
                  style={{
                    width: `${(answers.length / questions.length) * 100}%`,
                  }}
                />
              </div>
            </div>
          </div>

          <div className="mb-6">
            <p className="text-[var(--muted)] whitespace-pre-line leading-relaxed">
              {currentQuestion}
            </p>
          </div>

          <div className="space-y-3">
            <label className="text-sm font-medium mb-2">Your Answer</label>
            <textarea
              className="w-full rounded-lg border border-[var(--border)] bg-transparent p-4 outline-none resize-none"
              rows={6}
              placeholder="Type your answer here..."
              value={currentAnswer}
              onChange={(e) => setCurrentAnswer(e.target.value)}
            />
            <div className="flex justify-between items-center text-xs text-[var(--muted)]">
              <span>Minimum 10 characters recommended</span>
              <span>{currentAnswer.length} characters</span>
            </div>
          </div>

          <div className="mt-6 flex items-center gap-3">
            <Button
              onClick={handleSubmit}
              disabled={!canSubmit || loading}
              className="min-w-[120px]"
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                  <span>{isLastQuestion ? "Submitting..." : "Saving..."}</span>
                </div>
              ) : isLastQuestion ? (
                "Submit & Review"
              ) : (
                "Save & Next"
              )}
            </Button>
          </div>
        </div>
      )}

      {/* Results Section */}
      {review && (
        <div className="space-y-6">
          {/* Overall Score */}
          <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-6">
            <h2 className="text-2xl font-semibold mb-6">Interview Results</h2>
            <div className="flex items-center gap-6">
              <div className="text-5xl font-bold text-white">
                {review.averageScore}
              </div>
              <div>
                <div className="text-xl font-medium">Average Score</div>
                <div className="text-sm text-[var(--muted)]">Out of 10</div>
                <div className="text-xs text-[var(--muted)] mt-1">
                  {review.averageScore >= 8
                    ? "Excellent!"
                    : review.averageScore >= 6
                    ? "Good job!"
                    : review.averageScore >= 4
                    ? "Keep practicing!"
                    : "Room for improvement"}
                </div>
              </div>
            </div>
            {review.summary && (
              <div className="mt-6 p-4 rounded-lg bg-[var(--background)] border border-[var(--border)]">
                <h3 className="font-semibold mb-2">Overall Summary</h3>
                <p className="text-sm text-[var(--muted)] leading-relaxed">
                  {review.summary}
                </p>
              </div>
            )}
          </div>

          {/* Strengths */}
          {(review.strengths?.length ?? 0) > 0 && (
            <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-6">
              <h3 className="text-lg font-semibold mb-4 text-green-400 flex items-center gap-2">
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                Strengths
              </h3>
              <ul className="space-y-3">
                {(review.strengths ?? []).map((strength, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="text-green-400 mt-1">✓</span>
                    <span className="text-sm">{strength}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Improvements */}
          {(review.improvements?.length ?? 0) > 0 && (
            <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-6">
              <h3 className="text-lg font-semibold mb-4 text-orange-400 flex items-center gap-2">
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
                Areas for Improvement
              </h3>
              <ul className="space-y-3">
                {(review.improvements ?? []).map((improvement, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="text-orange-400 mt-1">→</span>
                    <span className="text-sm">{improvement}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Detailed Evaluations */}
          {review.evaluations && review.evaluations.length > 0 && (
            <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-6">
              <h3 className="text-lg font-semibold mb-6">
                Question-by-Question Analysis
              </h3>
              <div className="space-y-4">
                {review.evaluations.map((evaluation, i) => (
                  <div
                    key={i}
                    className="border border-[var(--border)] rounded-lg p-4 hover:bg-[var(--background)]/50 transition-colors"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
                      <h4 className="font-medium text-sm">Question {i + 1}</h4>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-[var(--muted)]">
                          Score:
                        </span>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            (evaluation.result?.score ?? 0) >= 7
                              ? "bg-green-500/20 text-green-400"
                              : (evaluation.result?.score ?? 0) >= 4
                              ? "bg-yellow-500/20 text-yellow-400"
                              : "bg-red-500/20 text-red-400"
                          }`}
                        >
                          {evaluation.result?.score ?? 0}/10
                        </span>
                      </div>
                    </div>
                    <p className="text-sm text-[var(--muted)] mb-3 whitespace-pre-line leading-relaxed">
                      {evaluation.question}
                    </p>
                    <p className="text-sm whitespace-pre-line leading-relaxed">
                      {evaluation.result?.feedback || "No feedback provided"}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Retake Button */}
          <div className="flex justify-end">
            <Button
              as="link"
              href={`/topics/${encodeURIComponent(
                role.toLowerCase().includes("front")
                  ? "frontend"
                  : role.toLowerCase()
              )}`}
            >
              Retake Interview
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
