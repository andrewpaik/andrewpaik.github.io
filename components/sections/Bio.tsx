"use client";

import { motion } from "framer-motion";
import ScrollReveal from "@/components/ui/ScrollReveal";

export default function Bio() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_1.5fr] gap-12 md:gap-20 items-start">
          {/* Avatar + quick facts */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1.0] }}
            className="space-y-8"
          >
            <div className="w-full aspect-square max-w-xs rounded-2xl bg-gradient-to-br from-[var(--color-accent-primary)] via-[var(--color-accent-secondary)] to-[var(--color-accent-warm)] flex items-center justify-center">
              <span className="font-[family-name:var(--font-display)] text-7xl font-bold text-white/70">
                AP
              </span>
            </div>

            {/* Quick facts */}
            <div className="space-y-3">
              {[
                ["Location", "Los Angeles, CA"],
                ["School", "USC Marshall"],
                ["Focus", "AI + Blockchain"],
                ["Status", "Building things"],
              ].map(([label, value]) => (
                <div key={label} className="flex justify-between text-sm border-b border-[var(--color-border)] pb-2">
                  <span className="font-[family-name:var(--font-mono)] text-[var(--color-text-muted)] text-xs uppercase tracking-wider">
                    {label}
                  </span>
                  <span className="text-[var(--color-text-secondary)]">
                    {value}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Bio text */}
          <ScrollReveal>
            <div className="space-y-6 text-[var(--color-text-secondary)] leading-[1.85] text-base md:text-[17px]">
              <p>
                I&apos;m Andrew &mdash; a{" "}
                <span className="text-[var(--color-text-primary)]">
                  Korean American
                </span>{" "}
                student at{" "}
                <span className="text-[var(--color-text-primary)]">
                  USC Marshall
                </span>{" "}
                studying Business Administration and Data Science. But honestly,
                most of my education happens at 2am when I&apos;m deep in a
                codebase or down a crypto research rabbit hole.
              </p>
              <p>
                I got into AI because I wanted to build things that feel like
                magic. Not the buzzword kind &mdash; the kind where you show
                someone a tool you built and their first reaction is{" "}
                <em className="text-[var(--color-text-primary)]">
                  &ldquo;wait, how?&rdquo;
                </em>
              </p>
              <p>
                Blockchain clicked for me when I realized it wasn&apos;t just
                about trading &mdash; it&apos;s a fundamentally new way to build
                systems where{" "}
                <span className="text-[var(--color-accent-primary)]">
                  trust is a feature, not a requirement
                </span>
                . That&apos;s powerful. So now I spend my time at the
                intersection: building AI systems, researching DeFi protocols,
                and figuring out how these technologies reshape the way we live
                and transact.
              </p>
              <p>
                When I&apos;m not shipping code, I&apos;m probably playing basketball,
                arguing about crypto valuations, or rewatching the same three
                YouTube channels about system design.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
