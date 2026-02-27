"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import Button from "@/components/ui/Button";
import TextReveal from "@/components/ui/TextReveal";
import GradientMesh from "@/components/canvas/GradientMesh";
import { useMouseParallax } from "@/hooks/useMouseParallax";

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const nameRef = useRef<HTMLDivElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const { x: mouseX, y: mouseY } = useMouseParallax({
    strength: 0.02,
    container: sectionRef,
  });

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.2 });

      // Name — clip-path reveal from left
      if (nameRef.current) {
        tl.fromTo(
          nameRef.current,
          { clipPath: "inset(0 100% 0 0)" },
          { clipPath: "inset(0 0% 0 0)", duration: 0.6, ease: "power4.out" }
        );
      }

      // Description — simple fade
      tl.fromTo(
        descRef.current,
        { opacity: 0, y: 8 },
        { opacity: 1, y: 0, duration: 0.4, ease: "power3.out" },
        "-=0.15"
      );

      // Stats — staggered fade
      if (statsRef.current) {
        const statItems = statsRef.current.querySelectorAll(".stat-item");
        tl.fromTo(
          statItems,
          { opacity: 0 },
          { opacity: 1, duration: 0.3, stagger: 0.08, ease: "power3.out" },
          "-=0.1"
        );
      }

      // CTA buttons — slide up with stagger
      if (ctaRef.current) {
        const buttons = ctaRef.current.children;
        tl.fromTo(
          buttons,
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 0.4, stagger: 0.08, ease: "power3.out" },
          "-=0.1"
        );
      }

      // Scroll indicator — delayed fade
      tl.fromTo(
        scrollRef.current,
        { opacity: 0 },
        { opacity: 0.4, duration: 0.8 },
        "+=0.4"
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative min-h-screen flex items-center overflow-hidden">
      <GradientMesh mouseX={mouseX} mouseY={mouseY} />

      <div className="relative z-10 mx-auto max-w-7xl px-6 w-full py-32">
        <div ref={nameRef} style={{ clipPath: "inset(0 100% 0 0)" }}>
          <h1
            className="font-[family-name:var(--font-display)] font-bold tracking-[-0.04em] leading-[0.95] mb-4"
            style={{ fontSize: "clamp(3rem, 8vw, 7rem)" }}
          >
            Andrew Paik
          </h1>
        </div>

        <TextReveal
          as="p"
          animation="clipReveal"
          splitBy="chars"
          stagger={0.02}
          delay={0.5}
          className="font-[family-name:var(--font-display)] text-[var(--color-text-secondary)] tracking-[-0.02em] mb-6"
          style={{ fontSize: "clamp(1.1rem, 2.5vw, 1.5rem)" }}
        >
          Builder. Researcher. Athlete.
        </TextReveal>

        <p
          ref={descRef}
          className="text-[var(--color-text-secondary)] text-base max-w-lg mb-8 leading-relaxed opacity-0"
        >
          AI systems, blockchain research, and the discipline to ship.
        </p>

        <div
          ref={statsRef}
          className="flex flex-wrap items-center gap-4 md:gap-6 mb-10"
        >
          {["6 projects", "2 companies", "USC '26"].map((stat, i) => (
            <span key={stat} className="stat-item flex items-center gap-4 md:gap-6 opacity-0">
              <span className="font-[family-name:var(--font-mono)] text-xs tracking-[0.05em] text-[var(--color-text-muted)]">
                {stat}
              </span>
              {i < 2 && (
                <span className="text-[var(--color-border)] text-xs">/</span>
              )}
            </span>
          ))}
        </div>

        <div ref={ctaRef} className="flex items-center gap-6">
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
          <Button href="/about" variant="ghost">
            About me
          </Button>
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
        <div className="w-[1px] h-8 bg-gradient-to-b from-[var(--color-text-muted)] to-transparent" />
      </div>
    </section>
  );
}
