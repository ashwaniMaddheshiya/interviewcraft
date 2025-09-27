import { Suspense } from "react";
import ClientTopics from "../../../components/topics/topics.client";
import topicsByRole from "../../../data/topics.json";
import Link from "next/link";

export async function generateStaticParams() {
  return Object.keys(topicsByRole).map((role) => ({ role }));
}

export default async function TopicsPage({ params }: { params: Promise<{ role: string }> }) {
  const { role } = await params;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const topics = (topicsByRole as any)[role] ?? [];

  const roleDisplayNames: Record<string, string> = {
    frontend: "Frontend Development",
    backend: "Backend Development", 
    fullstack: "Full-Stack Development",
    mobile: "Mobile Development",
    devops: "DevOps Engineering",
    data: "Data Science",
    qa: "QA Engineering",
    "ui-ux": "UI/UX Design",
    cybersecurity: "Cybersecurity",
    product: "Product Management",
    hr: "Human Resources",
    sales: "Sales & Business Development"
  };

  return (
    <section className="px-4 sm:px-6 py-12 sm:py-16">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8">
          <div className="flex items-center gap-2 text-sm text-[var(--muted)] mb-4">
            <Link href="/roles" className="hover:text-[var(--foreground)] transition-colors">
              Roles
            </Link>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <span className="capitalize">{roleDisplayNames[role] || role}</span>
          </div>
          
          <h1 className="text-3xl sm:text-4xl font-bold capitalize mb-4">
            {roleDisplayNames[role] || role}
          </h1>
          <p className="text-lg text-[var(--muted)] max-w-2xl">
            Choose the specific areas you want to practice. Each topic includes carefully curated questions 
            tailored to your experience level.
          </p>
        </div>
        
        <Suspense fallback={
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="rounded-xl p-6 bg-[var(--surface)] border border-[var(--border)] animate-pulse">
                <div className="h-6 bg-[var(--background)] rounded mb-2"></div>
                <div className="space-y-2">
                  <div className="h-4 bg-[var(--background)] rounded"></div>
                  <div className="h-4 bg-[var(--background)] rounded w-3/4"></div>
                  <div className="h-4 bg-[var(--background)] rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        }>
          <ClientTopics role={role} topics={topics} />
        </Suspense>
      </div>
    </section>
  );
}
