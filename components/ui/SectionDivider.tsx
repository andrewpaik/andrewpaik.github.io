"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

interface SectionDividerProps {
  number?: string;
  className?: string;
}

export default function SectionDivider({ number, className }: SectionDividerProps) {
  const lineRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: lineRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });

      tl.fromTo(
        lineRef.current,
        { scaleX: 0, transformOrigin: "left center" },
        { scaleX: 1, duration: 0.8, ease: "power3.inOut" }
      );

      if (labelRef.current) {
        tl.fromTo(
          labelRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.3, ease: "power3.out" },
          "-=0.2"
        );
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className={className}>
      <div className="flex items-center gap-4">
        <div
          ref={lineRef}
          className="flex-1 h-[1px] bg-[var(--color-border)]"
          style={{ transform: "scaleX(0)", transformOrigin: "left center" }}
        />
        {number && (
          <span
            ref={labelRef}
            className="font-[family-name:var(--font-mono)] text-[0.65rem] text-[var(--color-text-muted)] tracking-[0.05em] opacity-0"
          >
            {number}
          </span>
        )}
      </div>
    </div>
  );
}
