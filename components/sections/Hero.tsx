"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import dynamic from "next/dynamic";
import Button from "@/components/ui/Button";
import MagneticElement from "@/components/ui/MagneticElement";

const HeroScene = dynamic(() => import("@/components/three/HeroScene"), {
  ssr: false,
});

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const line1Ref = useRef<HTMLDivElement>(null);
  const line2Ref = useRef<HTMLDivElement>(null);
  const line3Ref = useRef<HTMLDivElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.4 });

    tl.fromTo(
      statusRef.current,
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" }
    );

    [line1Ref, line2Ref, line3Ref].forEach((ref, i) => {
      if (ref.current) {
        tl.fromTo(
          ref.current,
          { opacity: 0, y: 60, clipPath: "inset(0 0 100% 0)" },
          {
            opacity: 1,
            y: 0,
            clipPath: "inset(0 0 0% 0)",
            duration: 0.8,
            ease: "power3.out",
          },
          `-=${i === 0 ? 0 : 0.5}`
        );
      }
    });

    tl.fromTo(
      taglineRef.current,
      { opacity: 0, y: 15 },
      { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" },
      "-=0.3"
    );

    tl.fromTo(
      ctaRef.current,
      { opacity: 0, y: 15 },
      { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" },
      "-=0.3"
    );

    tl.fromTo(
      scrollRef.current,
      { opacity: 0 },
      { opacity: 0.5, duration: 1 },
      "-=0.2"
    );
  }, []);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      <HeroScene />

      {/* Headlight bloom */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,212,255,0.05)_0%,transparent_60%)]" />

      {/* Subtle grid */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      <div ref={containerRef} className="relative z-10 mx-auto max-w-7xl px-6 w-full py-32">
        {/* Status pill */}
        <div ref={statusRef} className="mb-8 opacity-0">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[var(--color-border)] bg-[var(--color-bg-secondary)]">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            <span className="font-[family-name:var(--font-mono)] text-[0.65rem] text-[var(--color-text-secondary)]">
              Currently building Serenity AI
            </span>
          </div>
        </div>

        {/* Headline — stacked lines, left-aligned, huge */}
        <div className="mb-8">
          <div ref={line1Ref} className="overflow-hidden opacity-0">
            <h1
              className="font-[family-name:var(--font-display)] font-bold tracking-[-0.04em] leading-[0.95]"
              style={{ fontSize: "clamp(3rem, 8vw, 7.5rem)" }}
            >
              I make things
            </h1>
          </div>
          <div ref={line2Ref} className="overflow-hidden opacity-0">
            <h1
              className="font-[family-name:var(--font-display)] font-bold tracking-[-0.04em] leading-[0.95]"
              style={{ fontSize: "clamp(3rem, 8vw, 7.5rem)" }}
            >
              that <span className="gradient-text">think</span>.
            </h1>
          </div>
          <div ref={line3Ref} className="overflow-hidden opacity-0 mt-2">
            <p
              className="font-[family-name:var(--font-display)] font-medium tracking-[-0.02em] text-[var(--color-text-muted)]"
              style={{ fontSize: "clamp(1.2rem, 2.5vw, 2rem)" }}
            >
              And sometimes, they think back.
            </p>
          </div>
        </div>

        <p
          ref={taglineRef}
          className="text-[var(--color-text-secondary)] text-base md:text-lg max-w-lg mb-10 opacity-0 leading-relaxed"
        >
          Andrew Paik &mdash; AI developer, blockchain researcher, and USC
          student who&apos;d rather build the future than wait for it.
        </p>

        <div ref={ctaRef} className="flex items-center gap-6 opacity-0">
          <MagneticElement strength={0.2}>
            <Button href="/projects">
              See my work
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
            </Button>
          </MagneticElement>
          <MagneticElement strength={0.2}>
            <Button href="/about" variant="ghost">
              About me
            </Button>
          </MagneticElement>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        ref={scrollRef}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-0"
      >
        <span className="font-[family-name:var(--font-mono)] text-[0.6rem] uppercase tracking-[0.2em] text-[var(--color-text-muted)]">
          Scroll
        </span>
        <div className="animate-scroll-bounce">
          <div className="w-[1px] h-8 bg-gradient-to-b from-[var(--color-accent-primary)] to-transparent" />
        </div>
      </div>
    </section>
  );
}
