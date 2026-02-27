"use client";

import ScrollReveal from "@/components/ui/ScrollReveal";

const facts = [
  { label: "Location", value: "Los Angeles, CA" },
  { label: "School", value: "USC Marshall '26" },
  { label: "Focus", value: "AI + Blockchain" },
  { label: "Other life", value: "Track & basketball" },
];

export default function Bio() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_1.5fr] gap-16 items-start">
          {/* Left — Portrait + Quick facts */}
          <div>
            <ScrollReveal variant="parallax" y={30}>
              <div className="w-full aspect-square max-w-[280px] rounded-xl bg-[var(--color-bg-tertiary)] border border-[var(--color-border)] flex items-center justify-center mb-8">
                <span className="font-[family-name:var(--font-display)] text-5xl font-bold text-[var(--color-text-muted)]">
                  AP
                </span>
              </div>
            </ScrollReveal>

            <div className="space-y-3">
              {facts.map((item, i) => (
                <ScrollReveal
                  key={item.label}
                  variant="slideIn"
                  direction="left"
                  delay={i * 0.06}
                  duration={0.4}
                >
                  <div className="flex items-baseline gap-4">
                    <span className="font-[family-name:var(--font-mono)] text-[0.65rem] uppercase tracking-[0.1em] text-[var(--color-text-muted)] w-20 shrink-0">
                      {item.label}
                    </span>
                    <span className="text-sm text-[var(--color-text-secondary)]">
                      {item.value}
                    </span>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>

          {/* Right — Bio */}
          <ScrollReveal delay={0.1}>
            <div className="space-y-6 text-[var(--color-text-secondary)] leading-[1.85]">
              <p>
                I&apos;m a developer passionate about AI-assisted development.
                Using tools like Claude and Cursor, I rapidly prototype and ship
                polished products that solve real problems.
              </p>
              <p>
                My projects span real-time systems, community platforms, premium
                web experiences, and autonomous AI agents &mdash; each built from
                starting blocks to finish line.
              </p>
              <p>
                Korean American. Los Angeles. Probably shipping code right now.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
