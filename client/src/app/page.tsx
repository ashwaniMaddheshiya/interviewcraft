import Link from "next/link";

export default function Home() {
  return (
    <section className="relative isolate overflow-hidden px-4 sm:px-6 py-16 sm:py-24 lg:py-32">
      <div className="mx-auto max-w-4xl text-center">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-[var(--primary)] to-[var(--accent)]">
          Master Interviews with AI-Powered Practice
        </h1>
        <p className="mt-6 text-lg sm:text-xl leading-8 text-[var(--muted)] max-w-3xl mx-auto">
          Practice real interview questions tailored to your role and experience level.
          Get instant feedback powered by AI to sharpen your skills and boost your confidence.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
          <Link
            href="/roles"
            className="btn-primary text-base px-8 py-3 min-w-[160px]"
          >
            Get Started  <svg className="w-4 h-4 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>

        </div>
      </div>

      {/* Features Section */}
      <div className="mt-20 sm:mt-24">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-12">Why Choose InterviewCraft?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            <div className="text-center p-6 rounded-xl bg-[var(--surface)] border border-[var(--border)]">
              <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">AI-Powered Questions</h3>
              <p className="text-sm text-[var(--muted)]">Get questions tailored to your specific role and experience level</p>
            </div>

            <div className="text-center p-6 rounded-xl bg-[var(--surface)] border border-[var(--border)]">
              <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">Instant Feedback</h3>
              <p className="text-sm text-[var(--muted)]">Receive detailed analysis and suggestions for improvement</p>
            </div>

            <div className="text-center p-6 rounded-xl bg-[var(--surface)] border border-[var(--border)]">
              <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">Practice Anytime</h3>
              <p className="text-sm text-[var(--muted)]">Access practice sessions 24/7 from anywhere</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
