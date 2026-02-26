"use client";

import { useRef, useCallback, useState } from "react";
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

function SpotlightCard({
  skill,
  index,
}: {
  skill: (typeof skills)[0];
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [spotlightPos, setSpotlightPos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setSpotlightPos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  }, []);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.06, duration: 0.5 }}
      className="relative bg-[var(--color-bg-primary)] p-8 hover:bg-[var(--color-bg-secondary)] transition-colors duration-300 group overflow-hidden"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Mouse-following spotlight */}
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-300"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(250px circle at ${spotlightPos.x}px ${spotlightPos.y}px, ${skill.accent}10, transparent 60%)`,
        }}
      />

      <div className="relative z-10">
        <div
          className="w-2 h-2 rounded-full mb-6 group-hover:scale-150 transition-transform duration-300"
          style={{ backgroundColor: skill.accent }}
        />
        <h3 className="font-[family-name:var(--font-display)] text-lg font-bold tracking-[-0.02em] mb-3">
          {skill.title}
        </h3>
        <p className="text-[var(--color-text-secondary)] text-sm leading-relaxed">
          {skill.description}
        </p>
      </div>
    </motion.div>
  );
}

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
            <SpotlightCard key={skill.title} skill={skill} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
