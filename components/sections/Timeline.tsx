"use client";

import ScrollReveal from "@/components/ui/ScrollReveal";
import SectionDivider from "@/components/ui/SectionDivider";

const experiences = [
  {
    role: "Co-Founder & AI Developer",
    organization: "Serenity AI",
    period: "2024 - Present",
    description:
      "Agentic wellness platform. LLM orchestration, RAG pipelines, and making AI that actually helps people feel better.",
    current: true,
  },
  {
    role: "Research Analyst",
    organization: "BlockchainSC",
    period: "2023 - Present",
    description:
      "Deep-dive research on DeFi protocols and market dynamics. The reports that shaped investment theses.",
    current: true,
  },
  {
    role: "Data Science Research",
    organization: "Keck Graduate Institute",
    period: "2024",
    description:
      "ML and statistical analysis on biomedical datasets. Real-world data, real-world messiness.",
    current: false,
  },
  {
    role: "Analyst",
    organization: "USC Finance Club",
    period: "2023 - Present",
    description:
      "Equity research and financial modeling. The quantitative foundation.",
    current: true,
  },
];

export default function Timeline() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-6">
        <SectionDivider number="02" className="mb-16" />

        <ScrollReveal>
          <h2
            className="font-[family-name:var(--font-display)] font-bold tracking-[-0.03em] mb-16"
            style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}
          >
            The through-line
          </h2>
        </ScrollReveal>

        <div className="space-y-0">
          {experiences.map((exp, i) => (
            <ScrollReveal
              key={exp.organization}
              variant="slideIn"
              direction="left"
              delay={i * 0.06}
              duration={0.5}
            >
              <div className="group border-b border-[var(--color-border)] py-8 hover:bg-[var(--color-bg-secondary)] -mx-6 px-6 transition-colors duration-300">
                <div className="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-8">
                  <div className="flex items-center gap-3 md:w-48 shrink-0">
                    {exp.current && (
                      <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-text-primary)] animate-breathe" />
                    )}
                    <span className="font-[family-name:var(--font-mono)] text-xs text-[var(--color-text-muted)]">
                      {exp.period}
                    </span>
                  </div>

                  <div className="flex-1">
                    <div className="flex items-baseline gap-3 mb-1">
                      <h3 className="font-[family-name:var(--font-display)] font-bold tracking-[-0.01em]">
                        {exp.role}
                      </h3>
                      <span className="text-[var(--color-text-secondary)] text-sm">
                        {exp.organization}
                      </span>
                    </div>
                    <p className="text-[var(--color-text-secondary)] text-sm leading-relaxed max-w-xl">
                      {exp.description}
                    </p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
