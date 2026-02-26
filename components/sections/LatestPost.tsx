"use client";

import Link from "next/link";
import GlowBorder from "@/components/ui/GlowBorder";
import Tag from "@/components/ui/Tag";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { blogPosts } from "@/lib/data/blog";
import { formatDate } from "@/lib/utils";

export default function LatestPost() {
  const latest = blogPosts[0];
  if (!latest) return null;

  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-6">
        <ScrollReveal>
          <p className="label text-center mb-4">Latest Research</p>
          <h2
            className="font-[family-name:var(--font-display)] font-semibold tracking-[-0.01em] text-center mb-16"
            style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)" }}
          >
            Recent Writing
          </h2>
        </ScrollReveal>

        <ScrollReveal>
          <Link href={`/blog/${latest.slug}`} className="block max-w-3xl mx-auto">
            <GlowBorder>
              <div className="p-8">
                <div className="flex items-center gap-4 mb-4">
                  <Tag variant="accent">{latest.category}</Tag>
                  <span className="font-[family-name:var(--font-mono)] text-xs text-[var(--color-text-muted)]">
                    {formatDate(latest.date)}
                  </span>
                  <span className="font-[family-name:var(--font-mono)] text-xs text-[var(--color-text-muted)]">
                    {latest.readingTime}
                  </span>
                </div>

                <h3 className="font-[family-name:var(--font-display)] text-2xl md:text-3xl font-semibold mb-3 group-hover:text-[var(--color-accent-primary)] transition-colors">
                  {latest.title}
                </h3>

                <p className="text-[var(--color-text-secondary)] leading-relaxed mb-6">
                  {latest.description}
                </p>

                <span className="text-[var(--color-accent-primary)] text-sm font-medium inline-flex items-center gap-2">
                  Read Article
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
            </GlowBorder>
          </Link>
        </ScrollReveal>
      </div>
    </section>
  );
}
