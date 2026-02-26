"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Tag from "@/components/ui/Tag";
import ScrollReveal from "@/components/ui/ScrollReveal";
import TiltCard from "@/components/ui/TiltCard";
import { projects } from "@/lib/data/projects";

const featured = projects.filter((p) => p.featured).slice(0, 3);

const gradients = [
  "from-[rgba(0,212,255,0.12)] via-[rgba(123,97,255,0.06)] to-transparent",
  "from-[rgba(123,97,255,0.12)] via-[rgba(255,107,53,0.06)] to-transparent",
  "from-[rgba(255,107,53,0.08)] via-[rgba(0,212,255,0.06)] to-transparent",
];

export default function FeaturedProjects() {
  return (
    <section className="py-28">
      <div className="mx-auto max-w-7xl px-6">
        <ScrollReveal>
          <div className="flex items-baseline justify-between mb-16">
            <div>
              <span className="section-number">01</span>
              <h2
                className="font-[family-name:var(--font-display)] font-bold tracking-[-0.03em] mt-2"
                style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)" }}
              >
                Selected work
              </h2>
            </div>
            <Link
              href="/projects"
              className="hidden md:flex items-center gap-2 text-[var(--color-text-secondary)] hover:text-[var(--color-accent-primary)] transition-colors text-sm link-hover"
            >
              All projects
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
            </Link>
          </div>
        </ScrollReveal>

        <div className="space-y-6">
          {featured.map((project, i) => (
            <motion.div
              key={project.slug}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                delay: i * 0.1,
                duration: 0.7,
                ease: [0.25, 0.1, 0.25, 1.0],
              }}
            >
              <Link href={`/projects/${project.slug}`} className="group block">
                <TiltCard intensity={6} glare>
                <div className="relative rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-6 md:p-8 overflow-hidden transition-all duration-500 hover:border-[var(--color-border-hover)] hover:shadow-[0_0_60px_rgba(0,212,255,0.04)]">
                  {/* Background gradient */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${gradients[i]} opacity-0 group-hover:opacity-100 transition-opacity duration-700`}
                  />

                  <div className="relative flex flex-col md:flex-row md:items-center gap-6">
                    {/* Number */}
                    <span className="font-[family-name:var(--font-mono)] text-6xl md:text-8xl font-bold text-[var(--color-text-primary)] opacity-[0.03] absolute right-4 top-0 md:relative md:opacity-[0.06]">
                      0{i + 1}
                    </span>

                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-3 mb-3">
                        {project.category.map((cat) => (
                          <Tag key={cat} variant="accent">
                            {cat}
                          </Tag>
                        ))}
                        <span className="font-[family-name:var(--font-mono)] text-xs text-[var(--color-text-muted)]">
                          {project.year}
                        </span>
                      </div>

                      <h3
                        className="font-[family-name:var(--font-display)] font-bold tracking-[-0.02em] mb-2 group-hover:text-[var(--color-accent-primary)] transition-colors"
                        style={{ fontSize: "clamp(1.5rem, 3vw, 2.25rem)" }}
                      >
                        {project.title}
                      </h3>

                      <p className="text-[var(--color-text-secondary)] text-sm md:text-base max-w-xl leading-relaxed">
                        {project.description}
                      </p>
                    </div>

                    <svg
                      className="w-6 h-6 text-[var(--color-text-muted)] group-hover:text-[var(--color-accent-primary)] group-hover:translate-x-2 group-hover:-translate-y-2 transition-all duration-300 shrink-0"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={1.5}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M7 17L17 7M17 7H7M17 7v10"
                      />
                    </svg>
                  </div>
                </div>
                </TiltCard>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="mt-8 md:hidden text-center">
          <Link
            href="/projects"
            className="text-[var(--color-accent-primary)] text-sm font-medium"
          >
            View all projects
          </Link>
        </div>
      </div>
    </section>
  );
}
