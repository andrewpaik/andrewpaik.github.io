"use client";

import TextReveal from "@/components/ui/TextReveal";

export default function AboutHero() {
  return (
    <section className="pt-32 pb-16">
      <div className="mx-auto max-w-7xl px-6">
        <p className="label mb-4">About Me</p>
        <div style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}>
          <TextReveal
            as="h1"
            className="font-[family-name:var(--font-display)] font-bold tracking-[-0.02em] leading-[1.1] max-w-4xl"
            stagger={0.06}
          >
            Building the future with AI and blockchain.
          </TextReveal>
        </div>
      </div>
    </section>
  );
}
