"use client";

import Link from "next/link";
import { useTrackProgress } from "@/hooks/useTrackProgress";

const facts = [
  { label: "Title", value: "AI Developer & Builder" },
  { label: "Projects", value: "05" },
  { label: "Powered", value: "AI" },
  { label: "Season", value: "2026" },
];

export default function TrackAboutStation() {
  const v = useTrackProgress((s) => s.stationVisibility.about ?? 0);

  return (
    <div className="relative">
      <p
        className="font-[family-name:var(--font-ibm-plex-mono)] text-[0.65rem] tracking-[0.05em] text-[#00D4FF]/70 mb-2"
        style={{ opacity: v, transform: `translateY(${(1 - v) * 10}px)` }}
      >
        <span className="text-[#00D4FF]">{">"}</span> quick_facts
      </p>
      <h2
        className="font-[family-name:var(--font-ibm-plex-mono)] text-3xl md:text-4xl font-bold tracking-[-0.02em] text-white mb-6"
        style={{ opacity: v, transform: `translateY(${(1 - v) * 10}px)` }}
      >
        Quick Facts
      </h2>
      <div className="flex flex-col gap-3">
        {facts.map((fact, i) => (
          <div
            key={fact.label}
            className="flex items-baseline gap-2 font-[family-name:var(--font-ibm-plex-mono)] text-sm"
            style={{
              opacity: v,
              transform: `translateY(${(1 - v) * 10}px)`,
              transitionDelay: `${150 + i * 80}ms`,
            }}
          >
            <span className="text-white/40 text-[0.7rem] uppercase tracking-[0.05em] shrink-0 w-20">
              {fact.label}
            </span>
            <span className="text-white/15 flex-1 overflow-hidden text-[0.6rem] tracking-[0.3em]">
              {"··················································".slice(0, 24)}
            </span>
            <span className="text-white shrink-0">
              {fact.value}
            </span>
          </div>
        ))}
      </div>
      <Link
        href="/about"
        className="inline-block mt-5 font-[family-name:var(--font-ibm-plex-mono)] text-xs uppercase tracking-[0.1em] text-white/40 hover:text-[#00D4FF] transition-colors"
        style={{ opacity: v, transitionDelay: "500ms" }}
      >
        Full story &rarr;
      </Link>
    </div>
  );
}
