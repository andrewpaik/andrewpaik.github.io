import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { blogPosts } from "@/lib/data/blog";
import { formatDate } from "@/lib/utils";
import Tag from "@/components/ui/Tag";

export function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  return params.then(({ slug }) => {
    const post = blogPosts.find((p) => p.slug === slug);
    if (!post) return { title: "Post Not Found" };
    return {
      title: post.title,
      description: post.description,
    };
  });
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) notFound();

  // Simple markdown-to-html conversion for the static blog posts
  const sections = post.content.split("\n\n");

  return (
    <article className="pt-32 pb-24">
      <div className="mx-auto max-w-3xl px-6">
        {/* Back link */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-[var(--color-text-secondary)] hover:text-[var(--color-accent-primary)] transition-colors text-sm mb-8"
        >
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
              d="M7 17l-4-4m0 0l4-4m-4 4h18"
            />
          </svg>
          Back to Blog
        </Link>

        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <Tag variant="accent">{post.category}</Tag>
            <span className="font-[family-name:var(--font-mono)] text-xs text-[var(--color-text-muted)]">
              {formatDate(post.date)}
            </span>
            <span className="font-[family-name:var(--font-mono)] text-xs text-[var(--color-text-muted)]">
              {post.readingTime}
            </span>
          </div>

          <h1
            className="font-[family-name:var(--font-display)] font-bold tracking-[-0.02em] leading-[1.1] mb-4"
            style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
          >
            {post.title}
          </h1>

          <p className="text-[var(--color-text-secondary)] text-lg">
            {post.description}
          </p>
        </div>

        {/* PDF / Slides downloads */}
        {(post.pdfUrl || post.slidesUrl) && (
          <div className="flex flex-wrap gap-3 mb-12">
            {post.pdfUrl && (
              <a
                href={post.pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 border border-[var(--color-border)] bg-[var(--color-bg-secondary)] hover:border-[var(--color-accent-primary)] transition-colors rounded-lg text-sm"
              >
                <svg
                  className="w-4 h-4 text-[var(--color-accent-primary)]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                  />
                </svg>
                <span className="text-[var(--color-text-secondary)]">
                  Full Memo (PDF)
                </span>
              </a>
            )}
            {post.slidesUrl && (
              <a
                href={post.slidesUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 border border-[var(--color-border)] bg-[var(--color-bg-secondary)] hover:border-[var(--color-accent-primary)] transition-colors rounded-lg text-sm"
              >
                <svg
                  className="w-4 h-4 text-[var(--color-accent-primary)]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5"
                  />
                </svg>
                <span className="text-[var(--color-text-secondary)]">
                  Slide Deck (PDF)
                </span>
              </a>
            )}
          </div>
        )}

        <div className="section-divider mb-12" />

        {/* Content */}
        <div className="space-y-6">
          {sections.map((section, i) => {
            const trimmed = section.trim();

            // Headings
            if (trimmed.startsWith("## ")) {
              return (
                <h2
                  key={i}
                  className="font-[family-name:var(--font-display)] font-semibold tracking-[-0.01em] mt-12 mb-4"
                  style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)" }}
                >
                  {trimmed.replace("## ", "")}
                </h2>
              );
            }
            if (trimmed.startsWith("### ")) {
              return (
                <h3
                  key={i}
                  className="font-[family-name:var(--font-display)] font-semibold mt-8 mb-3"
                  style={{ fontSize: "clamp(1.25rem, 2.5vw, 1.5rem)" }}
                >
                  {trimmed.replace("### ", "")}
                </h3>
              );
            }

            // Code blocks
            if (trimmed.startsWith("```")) {
              const code = trimmed.replace(/```\w*\n?/, "").replace(/```$/, "");
              return (
                <pre
                  key={i}
                  className="bg-[var(--color-bg-tertiary)] border border-[var(--color-border)] rounded-lg p-4 overflow-x-auto"
                >
                  <code className="font-[family-name:var(--font-mono)] text-sm text-[var(--color-text-secondary)]">
                    {code}
                  </code>
                </pre>
              );
            }

            // Tables
            if (trimmed.startsWith("|")) {
              const rows = trimmed.split("\n").filter((r) => !r.match(/^\|[\s-|]+\|$/));
              return (
                <div key={i} className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    {rows.map((row, ri) => {
                      const cells = row
                        .split("|")
                        .filter((c) => c.trim() !== "");
                      const Tag = ri === 0 ? "th" : "td";
                      return (
                        <tr
                          key={ri}
                          className="border-b border-[var(--color-border)]"
                        >
                          {cells.map((cell, ci) => (
                            <Tag
                              key={ci}
                              className={`px-4 py-3 text-left ${
                                ri === 0
                                  ? "font-[family-name:var(--font-mono)] text-[var(--color-text-muted)] text-xs uppercase tracking-wider"
                                  : "text-[var(--color-text-secondary)]"
                              }`}
                            >
                              {cell.trim()}
                            </Tag>
                          ))}
                        </tr>
                      );
                    })}
                  </table>
                </div>
              );
            }

            // Lists
            if (trimmed.match(/^[-*] /m)) {
              const items = trimmed.split("\n").map((l) => l.replace(/^[-*] /, ""));
              return (
                <ul key={i} className="space-y-2 ml-4">
                  {items.map((item, li) => (
                    <li
                      key={li}
                      className="text-[var(--color-text-secondary)] leading-[1.8] before:content-[''] before:inline-block before:w-1.5 before:h-1.5 before:rounded-full before:bg-[var(--color-accent-primary)] before:mr-3 before:align-middle"
                    >
                      {renderInlineMarkdown(item)}
                    </li>
                  ))}
                </ul>
              );
            }

            // Regular paragraphs
            if (trimmed.length === 0) return null;
            return (
              <p
                key={i}
                className="text-[var(--color-text-secondary)] leading-[1.8]"
              >
                {renderInlineMarkdown(trimmed)}
              </p>
            );
          })}
        </div>

        {/* Tags */}
        <div className="section-divider mt-16 mb-8" />
        <div className="flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <Tag key={tag}>{tag}</Tag>
          ))}
        </div>
      </div>
    </article>
  );
}

function renderInlineMarkdown(text: string) {
  // Simple inline markdown: **bold**, `code`, [links]
  const parts = text.split(/(\*\*[^*]+\*\*|`[^`]+`|\[[^\]]+\]\([^)]+\))/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={i} className="text-[var(--color-text-primary)] font-semibold">
          {part.slice(2, -2)}
        </strong>
      );
    }
    if (part.startsWith("`") && part.endsWith("`")) {
      return (
        <code
          key={i}
          className="font-[family-name:var(--font-mono)] text-[var(--color-accent-primary)] bg-[var(--color-bg-tertiary)] px-1.5 py-0.5 rounded text-sm"
        >
          {part.slice(1, -1)}
        </code>
      );
    }
    const linkMatch = part.match(/\[([^\]]+)\]\(([^)]+)\)/);
    if (linkMatch) {
      return (
        <a
          key={i}
          href={linkMatch[2]}
          className="text-[var(--color-accent-primary)] link-hover"
          target="_blank"
          rel="noopener noreferrer"
        >
          {linkMatch[1]}
        </a>
      );
    }
    return part;
  });
}
