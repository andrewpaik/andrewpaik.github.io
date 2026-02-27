"use client";

import Link from "next/link";
import Tag from "@/components/ui/Tag";
import ScrollReveal from "@/components/ui/ScrollReveal";
import SectionDivider from "@/components/ui/SectionDivider";
import { projects } from "@/lib/data/projects";

const featured = projects.filter((p) => p.featured).slice(0, 3);

export default function FeaturedProjects() {
  return (
    <section className="py-28">
      <div className="mx-auto max-w-7xl px-6">
        <SectionDivider number="01" className="mb-16" />

        <ScrollReveal>
          <div className="flex items-baseline justify-between mb-16">
            <h2
              className="font-[family-name:var(--font-display)] font-bold tracking-[-0.03em]"
              style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)" }}
            >
              Selected work
            </h2>
            <Link
              href="/projects"
              className="hidden md:flex items-center gap-2 text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors text-sm link-hover"
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

        <div className="space-y-4">
          {featured.map((project, i) => (
            <ScrollReveal
              key={project.slug}
              variant="slideIn"
              direction="right"
              delay={i * 0.06}
              duration={0.5}
            >
              <Link href={`/projects/${project.slug}`} className="group block">
                <div className="relative rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-6 md:p-8 transition-all duration-300 hover:border-[var(--color-border-hover)] hover:-translate-y-1">
                  <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8">
                    <span className="font-[family-name:var(--font-mono)] text-xs text-[var(--color-text-muted)]">
                      0{i + 1}
                    </span>

                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-3 mb-2">
                        {project.category.map((cat) => (
                          <Tag key={cat}>{cat}</Tag>
                        ))}
                        <span className="font-[family-name:var(--font-mono)] text-xs text-[var(--color-text-muted)]">
                          {project.year}
                        </span>
                      </div>

                      <h3
                        className="font-[family-name:var(--font-display)] font-bold tracking-[-0.02em] mb-1 group-hover:text-[var(--color-text-secondary)] transition-colors"
                        style={{ fontSize: "clamp(1.25rem, 2.5vw, 1.75rem)" }}
                      >
                        {project.title}
                      </h3>

                      <p className="text-[var(--color-text-secondary)] text-sm max-w-xl leading-relaxed">
                        {project.description}
                      </p>
                    </div>

                    <svg
                      className="w-5 h-5 text-[var(--color-text-muted)] group-hover:text-[var(--color-text-primary)] group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300 shrink-0"
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
              </Link>
            </ScrollReveal>
          ))}
        </div>

        <div className="mt-8 md:hidden text-center">
          <Link
            href="/projects"
            className="text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] text-sm font-medium"
          >
            View all projects
          </Link>
        </div>
      </div>
    </section>
  );
}
