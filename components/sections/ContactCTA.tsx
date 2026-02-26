"use client";

import Button from "@/components/ui/Button";
import ScrollReveal from "@/components/ui/ScrollReveal";

export default function ContactCTA() {
  return (
    <section className="py-32 relative overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,212,255,0.04)_0%,transparent_60%)]" />

      <div className="relative mx-auto max-w-4xl px-6 text-center">
        <ScrollReveal>
          <h2
            className="font-[family-name:var(--font-display)] font-bold tracking-[-0.02em] mb-6"
            style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}
          >
            Let&apos;s Build Something.
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.15}>
          <p className="text-[var(--color-text-secondary)] text-lg md:text-xl mb-10 max-w-xl mx-auto">
            Always open to new projects, research collaborations, and
            conversations about the future of AI and blockchain.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.3}>
          <Button href="/contact">
            Get In Touch
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </Button>
        </ScrollReveal>
      </div>
    </section>
  );
}
