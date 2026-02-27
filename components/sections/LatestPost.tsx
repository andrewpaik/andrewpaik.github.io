"use client";

import Link from "next/link";
import Tag from "@/components/ui/Tag";
import ScrollReveal from "@/components/ui/ScrollReveal";
import SectionDivider from "@/components/ui/SectionDivider";
import { blogPosts } from "@/lib/data/blog";
import { formatDate } from "@/lib/utils";

export default function LatestPost() {
  const latest = blogPosts[0];
  if (!latest) return null;

  return (
    <section className="py-28">
      <div className="mx-auto max-w-7xl px-6">
        <SectionDivider number="02" className="mb-16" />

        <ScrollReveal>
          <div className="flex items-baseline justify-between mb-16">
            <h2
              className="font-[family-name:var(--font-display)] font-bold tracking-[-0.03em]"
              style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)" }}
            >
              Latest thinking
            </h2>
            <Link
              href="/blog"
              className="hidden md:flex items-center gap-2 text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors text-sm link-hover"
            >
              All posts
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

        <ScrollReveal variant="scaleIn">
          <Link href={`/blog/${latest.slug}`} className="group block">
            <div className="relative rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-8 md:p-12 transition-all duration-300 hover:border-[var(--color-border-hover)] hover:-translate-y-1">
              <div className="flex items-center gap-4 mb-6">
                <Tag>{latest.category}</Tag>
                <span className="font-[family-name:var(--font-mono)] text-xs text-[var(--color-text-muted)]">
                  {formatDate(latest.date)}
                </span>
                <span className="font-[family-name:var(--font-mono)] text-xs text-[var(--color-text-muted)]">
                  {latest.readingTime}
                </span>
              </div>

              <h3
                className="font-[family-name:var(--font-display)] font-bold tracking-[-0.02em] mb-4 group-hover:text-[var(--color-text-secondary)] transition-colors"
                style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.75rem)" }}
              >
                {latest.title}
              </h3>

              <p className="text-[var(--color-text-secondary)] leading-relaxed max-w-2xl mb-8">
                {latest.description}
              </p>

              <span className="inline-flex items-center gap-2 text-[var(--color-text-primary)] text-sm font-medium group-hover:gap-3 transition-all">
                Read the full piece
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
              </span>
            </div>
          </Link>
        </ScrollReveal>
      </div>
    </section>
  );
}
