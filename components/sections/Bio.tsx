"use client";

import { motion } from "framer-motion";
import ScrollReveal from "@/components/ui/ScrollReveal";

export default function Bio() {
  return (
    <section className="py-16">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
          {/* Avatar placeholder */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1.0] }}
            className="flex justify-center md:justify-end"
          >
            <div className="w-64 h-64 md:w-80 md:h-80 rounded-2xl bg-gradient-to-br from-[var(--color-accent-primary)] to-[var(--color-accent-secondary)] flex items-center justify-center">
              <span className="font-[family-name:var(--font-display)] text-6xl md:text-7xl font-bold text-white/80">
                AP
              </span>
            </div>
          </motion.div>

          {/* Bio text */}
          <ScrollReveal>
            <div className="space-y-5 text-[var(--color-text-secondary)] leading-[1.8]">
              <p>
                Hey, I&apos;m Andrew. I&apos;m a{" "}
                <span className="text-[var(--color-accent-primary)]">
                  Korean American
                </span>{" "}
                student at the{" "}
                <span className="text-[var(--color-text-primary)]">
                  USC Marshall School of Business
                </span>
                , studying Business Administration and Data Science.
              </p>
              <p>
                My work sits at the intersection of{" "}
                <span className="text-[var(--color-accent-primary)]">
                  artificial intelligence
                </span>{" "}
                and{" "}
                <span className="text-[var(--color-accent-primary)]">
                  blockchain technology
                </span>
                . I&apos;m fascinated by how these technologies can be combined to
                create systems that are both intelligent and decentralized --
                tools that solve real problems for real people.
              </p>
              <p>
                From building AI-powered biomechanics analysis tools to
                researching DeFi protocol mechanics, I approach every project
                with a blend of technical depth and business thinking. I believe
                the best technology is invisible -- it just works, beautifully.
              </p>
              <p>
                When I&apos;m not coding or researching, you&apos;ll find me on
                the basketball court, exploring new tech, or diving deep into
                crypto markets.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
