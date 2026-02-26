"use client";

import TextReveal from "@/components/ui/TextReveal";
import ScrollReveal from "@/components/ui/ScrollReveal";

export default function ContactHero() {
  return (
    <section className="pt-32 pb-12">
      <div className="mx-auto max-w-7xl px-6">
        <p className="label mb-4">Contact</p>
        <TextReveal
          as="h1"
          className="font-[family-name:var(--font-display)] font-bold tracking-[-0.02em] leading-[1.1] mb-6"
          stagger={0.06}
        >
          Let&apos;s Connect
        </TextReveal>
        <ScrollReveal delay={0.4}>
          <p className="text-[var(--color-text-secondary)] text-lg max-w-2xl">
            I&apos;m always interested in hearing about new projects, research
            collaborations, or just a good conversation about AI and blockchain.
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
