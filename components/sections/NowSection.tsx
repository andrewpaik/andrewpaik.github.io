"use client";

import ScrollReveal from "@/components/ui/ScrollReveal";

const nowItems = [
  "Building Serenity AI's RAG pipeline",
  "Researching L2 scaling for BlockchainSC",
  "Training for spring track season",
];

export default function NowSection() {
  return (
    <section className="py-6 border-y border-[var(--color-border)]">
      <div className="mx-auto max-w-7xl px-6">
        <ScrollReveal>
          <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8">
            <span className="font-[family-name:var(--font-mono)] text-[0.65rem] uppercase tracking-[0.15em] text-[var(--color-text-muted)] shrink-0 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-text-muted)] animate-pulse-dot" />
              Now
            </span>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
              {nowItems.map((item, i) => (
                <span key={item} className="flex items-center gap-6">
                  <span className="text-sm text-[var(--color-text-secondary)]">
                    {item}
                  </span>
                  {i < nowItems.length - 1 && (
                    <span
                      className="text-[var(--color-border)] hidden md:inline"
                      style={{
                        animation: `divider-pulse 3s ease-in-out ${i * 0.5}s infinite`,
                      }}
                    >
                      /
                    </span>
                  )}
                </span>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
