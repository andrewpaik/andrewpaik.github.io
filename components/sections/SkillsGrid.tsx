"use client";

import { motion } from "framer-motion";
import Card from "@/components/ui/Card";
import ScrollReveal from "@/components/ui/ScrollReveal";

const skills = [
  {
    title: "AI / Machine Learning",
    description:
      "Building intelligent systems with deep learning, NLP, and computer vision. From model training to production deployment.",
    icon: (
      <svg
        className="w-8 h-8"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="3" />
        <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
      </svg>
    ),
  },
  {
    title: "Blockchain & DeFi",
    description:
      "Deep expertise in DeFi protocols, smart contracts, tokenomics analysis, and on-chain data research.",
    icon: (
      <svg
        className="w-8 h-8"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101" />
        <path d="M10.172 13.828a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.102 1.101" />
      </svg>
    ),
  },
  {
    title: "Data Analytics",
    description:
      "Transforming raw data into actionable insights through statistical analysis, visualization, and automated reporting.",
    icon: (
      <svg
        className="w-8 h-8"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M3 3v18h18" />
        <path d="M7 16l4-8 4 4 4-6" />
      </svg>
    ),
  },
  {
    title: "Finance",
    description:
      "Combining business acumen with quantitative analysis. Investment research, portfolio strategy, and financial modeling.",
    icon: (
      <svg
        className="w-8 h-8"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" />
      </svg>
    ),
  },
  {
    title: "Full-Stack Development",
    description:
      "End-to-end application development with modern frameworks. React, Next.js, Python, Node.js, and cloud infrastructure.",
    icon: (
      <svg
        className="w-8 h-8"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M16 18l6-6-6-6M8 6l-6 6 6 6" />
      </svg>
    ),
  },
];

export default function SkillsGrid() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-6">
        <ScrollReveal>
          <p className="label mb-4">What I Do</p>
          <h2
            className="font-[family-name:var(--font-display)] font-semibold tracking-[-0.01em] mb-16"
            style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}
          >
            Areas of Focus
          </h2>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skills.map((skill, i) => (
            <motion.div
              key={skill.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                delay: i * 0.08,
                duration: 0.5,
                ease: [0.25, 0.1, 0.25, 1.0],
              }}
            >
              <Card className="h-full group">
                <div className="text-[var(--color-text-muted)] group-hover:text-[var(--color-accent-primary)] transition-colors mb-4">
                  {skill.icon}
                </div>
                <h3 className="font-[family-name:var(--font-display)] text-lg font-semibold mb-2">
                  {skill.title}
                </h3>
                <p className="text-[var(--color-text-secondary)] text-sm leading-relaxed">
                  {skill.description}
                </p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
