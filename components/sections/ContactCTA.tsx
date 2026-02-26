"use client";

import Button from "@/components/ui/Button";
import ScrollReveal from "@/components/ui/ScrollReveal";

export default function ContactCTA() {
  return (
    <section className="py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(123,97,255,0.04)_0%,transparent_60%)]" />

      <div className="relative mx-auto max-w-7xl px-6">
        <ScrollReveal>
          <span className="section-number">03</span>
          <h2
            className="font-[family-name:var(--font-display)] font-bold tracking-[-0.04em] mt-2 mb-6"
            style={{ fontSize: "clamp(2.5rem, 6vw, 5.5rem)" }}
          >
            Got an idea?
            <br />
            <span className="text-[var(--color-text-muted)]">Let&apos;s make it real.</span>
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.15}>
          <p className="text-[var(--color-text-secondary)] text-lg mb-10 max-w-lg">
            I&apos;m always down for ambitious projects, weird ideas, and
            conversations about where AI and crypto are headed.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.3}>
          <div className="flex items-center gap-4">
            <Button href="/contact">
              Reach out
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
            <a
              href="mailto:andrew@example.com"
              className="text-[var(--color-text-secondary)] hover:text-[var(--color-accent-primary)] transition-colors text-sm link-hover"
            >
              or just email me
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
