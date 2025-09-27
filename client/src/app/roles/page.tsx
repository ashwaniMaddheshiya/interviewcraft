import Link from "next/link";

const roles = [
  { key: "frontend", title: "Frontend", desc: "HTML/CSS, JS, React, Next.js", color: "from-[#34d399] to-[#06b6d4]" },
  { key: "backend", title: "Backend", desc: "Node, Nest, Databases", color: "from-[#f59e0b] to-[#ef4444]" },
  { key: "fullstack", title: "Full-Stack", desc: "End-to-end development", color: "from-[#8b5cf6] to-[#ec4899]" },
  { key: "mobile", title: "Mobile", desc: "React Native, Flutter, iOS", color: "from-[#10b981] to-[#3b82f6]" },
  { key: "devops", title: "DevOps", desc: "CI/CD, Cloud, Infrastructure", color: "from-[#f97316] to-[#eab308]" },
  { key: "data", title: "Data Science", desc: "ML, Analytics, Python", color: "from-[#06b6d4] to-[#8b6cf6]" },
  { key: "qa", title: "QA Engineer", desc: "Testing, Automation, Quality", color: "from-[#84cc16] to-[#22c55e]" },
  { key: "ui-ux", title: "UI/UX", desc: "Design, Research, Prototyping", color: "from-[#f43f5e] to-[#fb7185]" },
  { key: "cybersecurity", title: "Cybersecurity", desc: "Security, Penetration Testing", color: "from-[#dc2626] to-[#f59e0b]" },
  { key: "product", title: "Product", desc: "Strategy & Execution", color: "from-[#a78bfa] to-[#6366f1]" },
  { key: "hr", title: "HR", desc: "Behavioral & Communication", color: "from-[#ec4899] to-[#8b5cf6]" },
  { key: "sales", title: "Sales", desc: "Business Development", color: "from-[#059669] to-[#0d9488]" },
];

export default function RolesPage() {
  return (
    <section className="px-4 sm:px-6 py-12 sm:py-16">
      <div className="mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Choose Your Path</h2>
          <p className="text-lg text-[var(--muted)] max-w-2xl mx-auto">
            Pick a role to start your practice interview. Each role includes tailored questions 
            and topics specific to that domain.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {roles.map((r) => (
            <Link 
              key={r.key} 
              href={`/topics/${r.key}`} 
              className="group block rounded-xl p-6 bg-[var(--surface)] shadow-sm ring-1 ring-[var(--border)] hover:shadow-lg hover:scale-[1.02] transition-all duration-200 transform"
            >
              <div className={`h-2 w-12 rounded-full bg-gradient-to-r ${r.color} mb-4`} />
              <h3 className="text-xl font-semibold group-hover:translate-x-0.5 transition-transform duration-200 mb-2">
                {r.title}
              </h3>
              <p className="text-sm text-[var(--muted)] leading-relaxed">
                {r.desc}
              </p>
              <div className="mt-4 flex items-center text-xs text-[var(--primary)] font-medium group-hover:translate-x-0.5 transition-transform duration-200">
                <span>Start practicing</span>
                <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </Link>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <p className="text-sm text-[var(--muted)]">
            Don&apos;t see your role? Try the closest match or contact us to add new roles.
          </p>
        </div>
      </div>
    </section>
  );
}
