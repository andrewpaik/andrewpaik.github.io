"use client";

import Link from "next/link";
import { useTrackProgress } from "@/hooks/useTrackProgress";

const links = [
  { href: "https://github.com/andrewpaik", label: "GitHub" },
  { href: "https://www.linkedin.com/in/andrew-paik-9b78882b3/", label: "LinkedIn" },
];

export default function TrackContactStation() {
  const v = useTrackProgress((s) => s.stationVisibility.contact ?? 0);

  return (
    <div className="relative flex flex-col items-center gap-4">
      <p
        className="font-[family-name:var(--font-ibm-plex-mono)] text-[0.65rem] tracking-[0.05em] text-[#7B61FF]/70"
        style={{ opacity: v, transform: `translateY(${(1 - v) * 10}px)` }}
      >
        <span className="text-[#7B61FF]">{">"}</span> connect
      </p>
      <h2
        className="font-[family-name:var(--font-ibm-plex-mono)] text-2xl md:text-3xl font-bold tracking-[-0.02em] text-white"
        style={{ opacity: v, transform: `translateY(${(1 - v) * 10}px)` }}
      >
        Let&apos;s Connect
      </h2>
      <p
        className="text-white/50 text-sm max-w-xs text-center"
        style={{
          opacity: v,
          transform: `translateY(${(1 - v) * 10}px)`,
          transitionDelay: "100ms",
        }}
      >
        Interested in collaborating or have a project in mind?
      </p>
      <div
        className="flex items-center gap-4 mt-2"
        style={{
          opacity: v,
          transform: `translateY(${(1 - v) * 10}px)`,
          transitionDelay: "200ms",
        }}
      >
        {links.map((link) => (
          <a
            key={link.label}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="font-[family-name:var(--font-ibm-plex-mono)] text-xs uppercase tracking-[0.1em] text-white/40 hover:text-[#7B61FF] transition-colors"
          >
            {link.label}
          </a>
        ))}
      </div>
      <Link
        href="/contact"
        className="mt-2 inline-flex items-center gap-2 px-5 py-2.5 border border-white text-white font-[family-name:var(--font-ibm-plex-mono)] text-xs font-medium uppercase tracking-[0.08em] hover:bg-white hover:text-[#08080A] transition-colors"
        style={{
          opacity: v,
          transform: `translateY(${(1 - v) * 10}px)`,
          transitionDelay: "300ms",
        }}
      >
        Get in touch
      </Link>
    </div>
  );
}
