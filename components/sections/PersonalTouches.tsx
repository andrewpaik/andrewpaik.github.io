"use client";

import { motion } from "framer-motion";
import ScrollReveal from "@/components/ui/ScrollReveal";

const vibes = [
  "Basketball courts",
  "2am coding sessions",
  "Crypto Twitter rabbit holes",
  "System design videos",
  "Cold brew dependency",
  "Whitepaper deep dives",
  "Side project graveyard survivor",
];

export default function PersonalTouches() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-6">
        <ScrollReveal>
          <span className="section-number">03</span>
          <h2
            className="font-[family-name:var(--font-display)] font-bold tracking-[-0.03em] mt-2 mb-12"
            style={{ fontSize: "clamp(1.5rem, 3vw, 2.5rem)" }}
          >
            Beyond the terminal
          </h2>
        </ScrollReveal>

        <div className="flex flex-wrap gap-3">
          {vibes.map((vibe, i) => (
            <motion.div
              key={vibe}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{
                delay: i * 0.05,
                duration: 0.4,
                ease: [0.25, 0.1, 0.25, 1.0],
              }}
              className="px-5 py-2.5 rounded-full border border-[var(--color-border)] text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:border-[var(--color-border-hover)] transition-colors cursor-default"
            >
              {vibe}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
