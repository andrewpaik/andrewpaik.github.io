"use client";

const marqueeItems = [
  "AI / ML",
  "Blockchain",
  "Data Science",
  "Full-Stack Dev",
  "DeFi Research",
  "Computer Vision",
  "LLM Orchestration",
  "USC Marshall",
  "Growth Strategy",
  "Python",
  "TypeScript",
  "React",
  "Next.js",
];

export default function QuickIntro() {
  return (
    <section className="py-6 overflow-hidden border-y border-[var(--color-border)]">
      <div className="relative">
        <div className="animate-marquee flex whitespace-nowrap">
          {[...marqueeItems, ...marqueeItems].map((item, i) => (
            <span
              key={i}
              className="mx-8 font-[family-name:var(--font-mono)] text-xs uppercase tracking-[0.15em] text-[var(--color-text-muted)] flex items-center gap-8"
            >
              {item}
              <span className="text-[var(--color-accent-primary)] opacity-40">
                /
              </span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
