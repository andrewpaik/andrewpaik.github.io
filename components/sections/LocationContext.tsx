"use client";

import ScrollReveal from "@/components/ui/ScrollReveal";

export default function LocationContext() {
  return (
    <section className="py-16">
      <div className="mx-auto max-w-7xl px-6">
        <ScrollReveal>
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-[var(--color-accent-primary)] animate-pulse" />
            <span className="font-[family-name:var(--font-mono)] text-sm text-[var(--color-text-secondary)] uppercase tracking-[0.1em]">
              Based in Los Angeles, CA
            </span>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
