"use client";

import Link from "next/link";
import { blogPosts } from "@/lib/data/blog";
import Tag from "@/components/ui/Tag";
import { useTrackProgress } from "@/hooks/useTrackProgress";

const latest = blogPosts[0];

export default function TrackBlogStation() {
  const v = useTrackProgress((s) => s.stationVisibility.blog ?? 0);

  return (
    <div className="relative">
      <p
        className="font-[family-name:var(--font-ibm-plex-mono)] text-[0.65rem] tracking-[0.05em] text-[#00FFFF]/70 mb-2"
        style={{ opacity: v, transform: `translateY(${(1 - v) * 10}px)` }}
      >
        <span className="text-[#00FFFF]">{">"}</span> latest_thinking
      </p>
      <h2
        className="font-[family-name:var(--font-ibm-plex-mono)] text-3xl md:text-4xl font-bold tracking-[-0.02em] text-white mb-6"
        style={{ opacity: v, transform: `translateY(${(1 - v) * 10}px)` }}
      >
        Latest Thinking
      </h2>
      <Link
        href={`/blog/${latest.slug}`}
        className="group block p-5 border border-dashed border-white/10 bg-white/[0.02] hover:border-solid hover:border-[#00FFFF]/30 transition-all"
        style={{
          opacity: v,
          transform: `translateY(${(1 - v) * 10}px)`,
          transitionDelay: "150ms",
        }}
      >
        <div className="flex items-center gap-3 mb-3">
          <Tag variant="outline" size="sm">
            {latest.category}
          </Tag>
          <span className="font-[family-name:var(--font-ibm-plex-mono)] text-[0.65rem] text-white/30">
            {latest.readingTime}
          </span>
        </div>
        <h3 className="font-[family-name:var(--font-ibm-plex-mono)] text-xl font-semibold text-white group-hover:text-[#00FFFF] transition-colors">
          {latest.title}
        </h3>
        <p className="text-white/50 text-sm mt-2 line-clamp-3">
          {latest.description}
        </p>
        <p className="font-[family-name:var(--font-ibm-plex-mono)] text-[0.65rem] text-white/30 mt-3">
          {latest.date}
        </p>
      </Link>
      <Link
        href="/blog"
        className="inline-block mt-4 font-[family-name:var(--font-ibm-plex-mono)] text-xs uppercase tracking-[0.1em] text-white/40 hover:text-[#00FFFF] transition-colors"
        style={{ opacity: v, transitionDelay: "300ms" }}
      >
        Read more &rarr;
      </Link>
    </div>
  );
}
