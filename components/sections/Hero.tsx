"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import Button from "@/components/ui/Button";
import HeroBackground from "./HeroBackground";

export default function Hero() {
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const headline = headlineRef.current;
    if (!headline) return;

    const words = headline.querySelectorAll(".hero-word");

    const tl = gsap.timeline({ delay: 0.3 });

    tl.fromTo(
      words,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.08,
        ease: "power3.out",
      }
    );

    tl.fromTo(
      taglineRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" },
      "-=0.2"
    );

    tl.fromTo(
      ctaRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" },
      "-=0.3"
    );

    tl.fromTo(
      scrollRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.8 },
      "-=0.2"
    );
  }, []);

  const headlineText =
    "I Build at the Intersection of AI, Blockchain & Real-World Impact";
  const words = headlineText.split(" ");

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      <HeroBackground />

      {/* Headlight bloom gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,212,255,0.06)_0%,transparent_70%)]" />

      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-10 mx-auto max-w-5xl px-6 text-center">
        <h1
          ref={headlineRef}
          className="font-[family-name:var(--font-display)] font-bold tracking-[-0.02em] leading-[1.1] mb-6"
          style={{ fontSize: "clamp(2.5rem, 7vw, 6rem)" }}
        >
          {words.map((word, i) => (
            <span key={i} className="hero-word inline-block opacity-0">
              {word}
              {i < words.length - 1 ? "\u00A0" : ""}
            </span>
          ))}
        </h1>

        <p
          ref={taglineRef}
          className="text-[var(--color-text-secondary)] text-lg md:text-xl max-w-2xl mx-auto mb-10 opacity-0"
        >
          USC Student &middot; AI Developer &middot; Blockchain Researcher
          &middot; Growth Lead
        </p>

        <div ref={ctaRef} className="opacity-0">
          <Button href="/projects">
            Explore My Work
            <svg
              className="w-4 h-4 transition-transform group-hover:translate-x-1"
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
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        ref={scrollRef}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-0"
      >
        <span className="font-[family-name:var(--font-mono)] text-[0.65rem] uppercase tracking-[0.2em] text-[var(--color-text-muted)]">
          Scroll
        </span>
        <div className="w-[1px] h-8 bg-gradient-to-b from-[var(--color-text-muted)] to-transparent animate-pulse" />
      </div>
    </section>
  );
}
