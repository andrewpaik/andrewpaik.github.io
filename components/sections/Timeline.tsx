"use client";

import { motion } from "framer-motion";
import ScrollReveal from "@/components/ui/ScrollReveal";

const experiences = [
  {
    role: "Co-Founder & AI Developer",
    organization: "Serenity AI",
    period: "2024 - Present",
    description:
      "Building an agentic wellness platform. LLM orchestration, RAG pipelines, the whole deal. Trying to make AI that actually helps people feel better.",
    current: true,
  },
  {
    role: "Research Analyst",
    organization: "BlockchainSC",
    period: "2023 - Present",
    description:
      "Deep-dive research on DeFi protocols and market dynamics for USC's blockchain org. Wrote the reports that shaped our investment theses.",
    current: true,
  },
  {
    role: "Data Science Research",
    organization: "Keck Graduate Institute",
    period: "2024",
    description:
      "ML and statistical analysis on biomedical datasets. Learned that real-world data is way messier than Kaggle competitions.",
    current: false,
  },
  {
    role: "Analyst",
    organization: "USC Finance Club",
    period: "2023 - Present",
    description:
      "Equity research and financial modeling. The quantitative foundation that makes my crypto analysis sharper.",
    current: true,
  },
];

export default function Timeline() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-6">
        <ScrollReveal>
          <span className="section-number">02</span>
          <h2
            className="font-[family-name:var(--font-display)] font-bold tracking-[-0.03em] mt-2 mb-16"
            style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}
          >
            Where I&apos;ve been
          </h2>
        </ScrollReveal>

        <div className="space-y-0">
          {experiences.map((exp, i) => (
            <motion.div
              key={exp.organization}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                delay: i * 0.08,
                duration: 0.5,
                ease: [0.25, 0.1, 0.25, 1.0],
              }}
              className="group border-b border-[var(--color-border)] py-8 hover:bg-[var(--color-bg-secondary)] -mx-6 px-6 transition-colors duration-300"
            >
              <div className="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-8">
                <div className="flex items-center gap-3 md:w-48 shrink-0">
                  {exp.current && (
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
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
                    <span className="text-[var(--color-accent-primary)] text-sm">
                      {exp.organization}
                    </span>
                  </div>
                  <p className="text-[var(--color-text-secondary)] text-sm leading-relaxed max-w-xl">
                    {exp.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
