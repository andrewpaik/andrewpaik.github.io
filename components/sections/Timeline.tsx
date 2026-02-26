"use client";

import { motion } from "framer-motion";
import ScrollReveal from "@/components/ui/ScrollReveal";

const experiences = [
  {
    role: "Co-Founder & AI Developer",
    organization: "Serenity AI",
    period: "2024 - Present",
    description:
      "Building an agentic wellness platform with LLM orchestration and RAG for personalized mental health support.",
  },
  {
    role: "Research Analyst & Investment Lead",
    organization: "BlockchainSC",
    period: "2023 - Present",
    description:
      "Leading crypto research and investment analysis for USC's premier blockchain organization. Producing deep-dive reports on DeFi protocols and market dynamics.",
  },
  {
    role: "Data Science Research",
    organization: "Keck Graduate Institute",
    period: "2024",
    description:
      "Applied machine learning and statistical analysis to biomedical datasets. Developed automated data pipelines and predictive models.",
  },
  {
    role: "Member & Analyst",
    organization: "USC Finance Club",
    period: "2023 - Present",
    description:
      "Financial analysis, equity research, and investment strategy development within USC's finance community.",
  },
];

export default function Timeline() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-6">
        <ScrollReveal>
          <p className="label mb-4">Experience</p>
          <h2
            className="font-[family-name:var(--font-display)] font-semibold tracking-[-0.01em] mb-16"
            style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}
          >
            Where I&apos;ve Been
          </h2>
        </ScrollReveal>

        <div className="relative max-w-3xl mx-auto">
          {/* Vertical line */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-[1px] bg-[var(--color-border)] md:-translate-x-1/2" />

          {experiences.map((exp, i) => (
            <motion.div
              key={exp.organization}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                delay: i * 0.1,
                duration: 0.6,
                ease: [0.25, 0.1, 0.25, 1.0],
              }}
              className={`relative pl-8 md:pl-0 pb-12 last:pb-0 ${
                i % 2 === 0 ? "md:pr-[calc(50%+2rem)] md:text-right" : "md:pl-[calc(50%+2rem)]"
              }`}
            >
              {/* Dot */}
              <div
                className="absolute left-0 md:left-1/2 top-1 w-3 h-3 rounded-full bg-[var(--color-accent-primary)] md:-translate-x-1/2"
                style={{ animation: "pulse-glow 3s ease-in-out infinite" }}
              />

              <span className="font-[family-name:var(--font-mono)] text-xs text-[var(--color-text-muted)] block mb-1">
                {exp.period}
              </span>
              <h3 className="font-[family-name:var(--font-display)] text-lg font-semibold mb-1">
                {exp.role}
              </h3>
              <p className="text-[var(--color-accent-primary)] text-sm font-medium mb-2">
                {exp.organization}
              </p>
              <p className="text-[var(--color-text-secondary)] text-sm leading-relaxed">
                {exp.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
