"use client";

import { motion } from "framer-motion";
import ScrollReveal from "@/components/ui/ScrollReveal";

const interests = [
  {
    label: "Basketball",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M4.93 4.93c4.08 2.38 8.58 6.88 10.97 10.97M4.93 19.07c2.38-4.08 6.88-8.58 10.97-10.97M2 12h20M12 2v20" />
      </svg>
    ),
  },
  {
    label: "Emerging Tech",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
        <path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
  },
  {
    label: "Crypto Markets",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 3v18h18" />
        <path d="M7 16l4-8 4 4 4-6" />
      </svg>
    ),
  },
  {
    label: "Building Things",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
        <path d="M11.42 15.17l-5.13-5.12a2.25 2.25 0 010-3.18l5.13-5.13a2.25 2.25 0 013.18 0l5.12 5.13a2.25 2.25 0 010 3.18l-5.12 5.12a2.25 2.25 0 01-3.18 0z" />
        <path d="M14 12l-2 2-2-2 2-2 2 2z" />
      </svg>
    ),
  },
];

export default function PersonalTouches() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-6">
        <ScrollReveal>
          <p className="label mb-4">Off The Clock</p>
          <h2
            className="font-[family-name:var(--font-display)] font-semibold tracking-[-0.01em] mb-12"
            style={{ fontSize: "clamp(1.5rem, 3vw, 2.5rem)" }}
          >
            Beyond the Code
          </h2>
        </ScrollReveal>

        <div className="flex flex-wrap gap-4">
          {interests.map((interest, i) => (
            <motion.div
              key={interest.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{
                delay: i * 0.08,
                duration: 0.4,
                ease: [0.25, 0.1, 0.25, 1.0],
              }}
              className="flex items-center gap-3 px-5 py-3 rounded-xl bg-[var(--color-bg-tertiary)] border border-[var(--color-border)] hover:border-[var(--color-border-hover)] transition-colors"
            >
              <span className="text-[var(--color-accent-primary)]">
                {interest.icon}
              </span>
              <span className="text-[var(--color-text-primary)] text-sm font-medium">
                {interest.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
