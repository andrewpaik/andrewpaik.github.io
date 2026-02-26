"use client";

import { motion } from "framer-motion";
import ScrollReveal from "@/components/ui/ScrollReveal";

const skills = [
  {
    title: "AI / ML",
    description: "Deep learning, NLP, computer vision. From Jupyter notebooks to production pipelines.",
    accent: "var(--color-accent-primary)",
  },
  {
    title: "Blockchain & DeFi",
    description: "Protocol research, smart contracts, on-chain analytics. I read whitepapers for fun.",
    accent: "var(--color-accent-secondary)",
  },
  {
    title: "Data Science",
    description: "Making messy data tell stories. Statistical modeling, visualization, automated analysis.",
    accent: "var(--color-accent-primary)",
  },
  {
    title: "Full-Stack Dev",
    description: "React, Next.js, Python, Node. If it needs building, I'll figure out the stack.",
    accent: "var(--color-accent-warm)",
  },
  {
    title: "Finance",
    description: "Investment research, portfolio strategy, financial modeling. The quantitative kind.",
    accent: "var(--color-accent-secondary)",
  },
];

export default function SkillsGrid() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-6">
        <ScrollReveal>
          <span className="section-number">01</span>
          <h2
            className="font-[family-name:var(--font-display)] font-bold tracking-[-0.03em] mt-2 mb-16"
            style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}
          >
            What I actually do
          </h2>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[1px] bg-[var(--color-border)] rounded-2xl overflow-hidden">
          {skills.map((skill, i) => (
            <motion.div
              key={skill.title}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{
                delay: i * 0.06,
                duration: 0.5,
              }}
              className="bg-[var(--color-bg-primary)] p-8 hover:bg-[var(--color-bg-secondary)] transition-colors duration-300 group"
            >
              <div
                className="w-2 h-2 rounded-full mb-6 group-hover:scale-150 transition-transform"
                style={{ backgroundColor: skill.accent }}
              />
              <h3 className="font-[family-name:var(--font-display)] text-lg font-bold tracking-[-0.02em] mb-3">
                {skill.title}
              </h3>
              <p className="text-[var(--color-text-secondary)] text-sm leading-relaxed">
                {skill.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
