"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

export default function AboutHero() {
  const line1Ref = useRef<HTMLDivElement>(null);
  const line2Ref = useRef<HTMLDivElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.3 });

    tl.fromTo(
      line1Ref.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }
    );

    tl.fromTo(
      line2Ref.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" },
      "-=0.3"
    );

    tl.fromTo(
      subRef.current,
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" },
      "-=0.2"
    );
  }, []);

  return (
    <section className="pt-32 pb-12">
      <div className="mx-auto max-w-7xl px-6">
        <p className="label mb-6">About</p>
        <div ref={line1Ref} className="opacity-0">
          <h1
            className="font-[family-name:var(--font-display)] font-bold tracking-[-0.04em] leading-[0.95]"
            style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}
          >
            Athlete first.
          </h1>
        </div>
        <div ref={line2Ref} className="opacity-0">
          <h1
            className="font-[family-name:var(--font-display)] font-bold tracking-[-0.04em] leading-[0.95] text-[var(--color-text-muted)]"
            style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}
          >
            Builder always.
          </h1>
        </div>
        <p
          ref={subRef}
          className="text-[var(--color-text-secondary)] text-lg mt-6 max-w-lg leading-relaxed opacity-0"
        >
          The long version is more interesting.
        </p>
      </div>
    </section>
  );
}
