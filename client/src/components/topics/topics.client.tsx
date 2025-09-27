"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import type { ExperienceLevel } from "@/lib/api";

interface Props {
  role: string;
  topics: { key: string; title: string; items: string[] }[];
}

const experienceLevels: { level: ExperienceLevel; label: string; years: string }[] = [
  { level: "fresher", label: "Fresher", years: "0-1 years" },
  { level: "junior", label: "Junior", years: "1-3 years" },
  { level: "mid", label: "Mid-level", years: "3-6 years" },
  { level: "senior", label: "Senior", years: "6+ years" },
];

export default function ClientTopics({ role, topics }: Props) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [topic, setTopic] = useState<string | null>(null);
  const [level, setLevel] = useState<ExperienceLevel>("junior");

  const start = () => {
    if (!topic) return;
    sessionStorage.setItem("practice:meta", JSON.stringify({ role, topic, level }));
    sessionStorage.removeItem("practice:questions");
    sessionStorage.setItem("practice:answers", JSON.stringify([]));
    setOpen(false);
    router.push(
      `/practice?role=${encodeURIComponent(role)}&topic=${encodeURIComponent(topic)}&level=${encodeURIComponent(level)}`
    );
  };

  return (
    <div>
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {topics.map((t) => {
          const selected = topic === t.key;
          return (
            <div
              key={t.key}
              role="button"
              tabIndex={0}
              onClick={() => {
                setTopic(t.key);
                setOpen(true);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  setTopic(t.key);
                  setOpen(true);
                }
              }}
              className={`rounded-xl p-6 bg-[var(--surface)] shadow-sm ring-2 transition cursor-pointer hover:shadow-md hover:scale-[1.02] transform duration-200
                ${selected ? "ring-white shadow-md" : "ring-[var(--border)]"}`}
            >
              <h3 className="text-xl font-semibold">{t.title}</h3>
              <ul className="mt-2 text-sm text-[var(--muted)] list-disc list-inside space-y-1">
                {t.items.map((i) => (
                  <li key={i}>{i}</li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>

      <Modal open={open} onClose={() => setOpen(false)} title="Select Experience Level">
        <div className="space-y-4">
          <p className="text-sm text-[var(--muted)]">Choose your experience level to get appropriately tailored questions.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {experienceLevels.map(({ level: expLevel, label, years }) => (
              <button
                key={expLevel}
                onClick={() => setLevel(expLevel)}
                className={`rounded-lg border px-4 py-3 text-left transition-all duration-200 hover:scale-[1.02] 
                  ${level === expLevel 
                    ? "border-white bg-white/10 text-white shadow-md" 
                    : "border-[var(--border)] text-[var(--muted)] hover:border-white/50 hover:text-white"
                  }`}
              >
                <div className="font-medium capitalize">{label}</div>
                <div className="text-xs opacity-75 mt-1">{years}</div>
              </button>
            ))}
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <Button variant="secondary" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button onClick={start} disabled={!topic}>
              Start Practice
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
