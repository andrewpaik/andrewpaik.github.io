"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import Card from "@/components/ui/Card";
import Tag from "@/components/ui/Tag";
import { formatDate } from "@/lib/utils";
import type { BlogPost } from "@/lib/data/blog";

interface BlogListProps {
  posts: BlogPost[];
}

export default function BlogList({ posts }: BlogListProps) {
  return (
    <section className="pb-24">
      <div className="mx-auto max-w-7xl px-6">
        <AnimatePresence mode="popLayout">
          <div className="flex flex-col gap-6">
            {posts.map((post, i) => (
              <motion.div
                key={post.slug}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{
                  delay: i * 0.05,
                  duration: 0.4,
                  ease: [0.25, 0.1, 0.25, 1.0],
                }}
              >
                <Link href={`/blog/${post.slug}`}>
                  <Card className="group cursor-pointer">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <Tag variant="accent">{post.category}</Tag>
                          <span className="font-[family-name:var(--font-mono)] text-xs text-[var(--color-text-muted)]">
                            {formatDate(post.date)}
                          </span>
                          <span className="font-[family-name:var(--font-mono)] text-xs text-[var(--color-text-muted)]">
                            {post.readingTime}
                          </span>
                        </div>
                        <h3 className="font-[family-name:var(--font-display)] text-xl font-semibold mb-2 group-hover:text-[var(--color-accent-primary)] transition-colors">
                          {post.title}
                        </h3>
                        <p className="text-[var(--color-text-secondary)] text-sm line-clamp-2">
                          {post.description}
                        </p>
                      </div>
                      <svg
                        className="w-5 h-5 text-[var(--color-text-muted)] group-hover:text-[var(--color-accent-primary)] group-hover:translate-x-1 transition-all shrink-0"
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
                    </div>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </AnimatePresence>

        {posts.length === 0 && (
          <p className="text-center text-[var(--color-text-muted)] py-12">
            No posts in this category yet.
          </p>
        )}
      </div>
    </section>
  );
}
