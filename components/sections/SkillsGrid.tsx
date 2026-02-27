"use client";

import ScrollReveal from "@/components/ui/ScrollReveal";
import SectionDivider from "@/components/ui/SectionDivider";
import AnimatedCounter from "@/components/ui/AnimatedCounter";

const stats = [
  { number: 6, label: "Projects shipped" },
  { number: 2, label: "Companies cofounded" },
  { number: 3, label: "Research papers" },
  { number: 4, label: "Active roles" },
];

export default function SkillsGrid() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-6">
        <SectionDivider number="01" className="mb-16" />

        <ScrollReveal>
          <h2
            className="font-[family-name:var(--font-display)] font-bold tracking-[-0.03em] mb-16"
            style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}
          >
            By the numbers
          </h2>
        </ScrollReveal>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-[1px] bg-[var(--color-border)]">
          {stats.map((stat, i) => (
            <ScrollReveal
              key={stat.label}
              variant="scaleIn"
              delay={i * 0.1}
              duration={0.5}
            >
              <div className="bg-[var(--color-bg-primary)] p-8 md:p-10">
                <AnimatedCounter
                  target={stat.number}
                  className="font-[family-name:var(--font-display)] font-bold tracking-[-0.03em] block mb-2"
                  style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)" }}
                />
                <span className="font-[family-name:var(--font-mono)] text-xs text-[var(--color-text-muted)] uppercase tracking-[0.1em]">
                  {stat.label}
                </span>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
