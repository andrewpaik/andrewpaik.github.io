"use client";

import { motion } from "framer-motion";
import TextReveal from "@/components/ui/TextReveal";
import { cn } from "@/lib/utils";

interface ProjectHeaderProps {
  activeFilter: string;
  onFilterChange: (filter: string) => void;
  categories: string[];
}

export default function ProjectHeader({
  activeFilter,
  onFilterChange,
  categories,
}: ProjectHeaderProps) {
  return (
    <section className="pt-32 pb-12">
      <div className="mx-auto max-w-7xl px-6">
        <p className="label mb-4">Projects</p>
        <TextReveal
          as="h1"
          className="font-[family-name:var(--font-display)] font-bold tracking-[-0.02em] leading-[1.1] mb-4"
          stagger={0.06}
        >
          Things I&apos;ve Built
        </TextReveal>
        <p className="text-[var(--color-text-secondary)] text-lg mb-12 max-w-2xl">
          A selection of projects spanning AI, blockchain, and full-stack
          development.
        </p>

        {/* Filter bar */}
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <motion.button
              key={cat}
              onClick={() => onFilterChange(cat)}
              className={cn(
                "relative px-4 py-2 rounded-full text-sm font-medium transition-colors",
                activeFilter === cat
                  ? "text-[var(--color-bg-primary)]"
                  : "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] border border-[var(--color-border)] hover:border-[var(--color-border-hover)]"
              )}
            >
              {activeFilter === cat && (
                <motion.div
                  layoutId="activeFilter"
                  className="absolute inset-0 bg-[var(--color-accent-primary)] rounded-full"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                />
              )}
              <span className="relative z-10">{cat}</span>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
}
