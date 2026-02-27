"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import Button from "@/components/ui/Button";
import SectionDivider from "@/components/ui/SectionDivider";

export default function ContactCTA() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const headline = headlineRef.current;
    const content = contentRef.current;
    if (!section || !headline || !content) return;

    const words = headline.querySelectorAll<HTMLSpanElement>(".scrub-word");

    const ctx = gsap.context(() => {
      // Pin section and scrub word opacity as user scrolls
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 20%",
          end: "+=150%",
          pin: true,
          scrub: 1,
        },
      });

      // Each word fades from muted to full
      words.forEach((word, i) => {
        tl.fromTo(
          word,
          { opacity: 0.15 },
          { opacity: 1, duration: 1 },
          i * 0.5
        );
      });

      // After all words revealed, fade in the CTA content
      tl.fromTo(
        content,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 2 },
        words.length * 0.5 + 0.5
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const headlineWords = "I'm always building.".split(" ");

  return (
    <section ref={sectionRef} className="py-32">
      <div className="mx-auto max-w-7xl px-6">
        <SectionDivider number="03" className="mb-16" />

        <h2
          ref={headlineRef}
          className="font-[family-name:var(--font-display)] font-bold tracking-[-0.04em] mb-8"
          style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}
        >
          {headlineWords.map((word, i) => (
            <span key={i} className="scrub-word inline-block opacity-[0.15]">
              {word}
              {i < headlineWords.length - 1 ? "\u00A0" : ""}
            </span>
          ))}
        </h2>

        <div ref={contentRef} className="opacity-0">
          <p className="text-[var(--color-text-secondary)] text-lg mb-10 max-w-lg leading-relaxed">
            If you&apos;re working on something interesting &mdash; AI, crypto,
            or anything ambitious &mdash; let&apos;s talk.
          </p>

          <div className="flex items-center gap-6">
            <Button href="/contact">
              Get in touch
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
            <a
              href="mailto:andrew@example.com"
              className="text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors text-sm link-hover"
            >
              or email me directly
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
