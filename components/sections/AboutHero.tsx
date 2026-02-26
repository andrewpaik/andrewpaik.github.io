"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

export default function AboutHero() {
  const line1Ref = useRef<HTMLDivElement>(null);
  const line2Ref = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.3 });

    [line1Ref, line2Ref].forEach((ref, i) => {
      if (ref.current) {
        tl.fromTo(
          ref.current,
          { opacity: 0, y: 50, clipPath: "inset(0 0 100% 0)" },
          {
            opacity: 1,
            y: 0,
            clipPath: "inset(0 0 0% 0)",
            duration: 0.8,
            ease: "power3.out",
          },
          i === 0 ? undefined : "-=0.5"
        );
      }
    });

    tl.fromTo(
      subtitleRef.current,
      { opacity: 0, y: 15 },
      { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" },
      "-=0.3"
    );
  }, []);

  return (
    <section className="pt-32 pb-16">
      <div className="mx-auto max-w-7xl px-6">
        <p className="label mb-6">About</p>
        <div ref={line1Ref} className="overflow-hidden opacity-0">
          <h1
            className="font-[family-name:var(--font-display)] font-bold tracking-[-0.04em] leading-[0.95]"
            style={{ fontSize: "clamp(2.5rem, 6vw, 5.5rem)" }}
          >
            The short version:
          </h1>
        </div>
        <div ref={line2Ref} className="overflow-hidden opacity-0">
          <h1
            className="font-[family-name:var(--font-display)] font-bold tracking-[-0.04em] leading-[0.95] text-[var(--color-text-muted)]"
            style={{ fontSize: "clamp(2.5rem, 6vw, 5.5rem)" }}
          >
            I build AI stuff.
          </h1>
        </div>
        <p
          ref={subtitleRef}
          className="text-[var(--color-text-secondary)] text-lg mt-6 max-w-xl opacity-0 leading-relaxed"
        >
          The long version is more interesting. Keep scrolling.
        </p>
      </div>
    </section>
  );
}
