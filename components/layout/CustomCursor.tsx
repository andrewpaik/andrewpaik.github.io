"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { useMediaQuery } from "@/hooks/useMediaQuery";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const isMobile = useMediaQuery("(max-width: 768px)");

  useEffect(() => {
    if (isMobile) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    const dotX = gsap.quickTo(dot, "left", { duration: 0.1, ease: "power3" });
    const dotY = gsap.quickTo(dot, "top", { duration: 0.1, ease: "power3" });
    const ringX = gsap.quickTo(ring, "left", { duration: 0.3, ease: "power3" });
    const ringY = gsap.quickTo(ring, "top", { duration: 0.3, ease: "power3" });

    const onMouseMove = (e: MouseEvent) => {
      dotX(e.clientX);
      dotY(e.clientY);
      ringX(e.clientX);
      ringY(e.clientY);
    };

    const onMouseEnterInteractive = () => {
      gsap.to(ring, { scale: 1.5, opacity: 0.5, duration: 0.3 });
      gsap.to(dot, { scale: 0.5, duration: 0.3 });
    };

    const onMouseLeaveInteractive = () => {
      gsap.to(ring, { scale: 1, opacity: 0.3, duration: 0.3 });
      gsap.to(dot, { scale: 1, duration: 0.3 });
    };

    window.addEventListener("mousemove", onMouseMove);

    const interactives = document.querySelectorAll(
      'a, button, [role="button"], input, textarea, select'
    );
    interactives.forEach((el) => {
      el.addEventListener("mouseenter", onMouseEnterInteractive);
      el.addEventListener("mouseleave", onMouseLeaveInteractive);
    });

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      interactives.forEach((el) => {
        el.removeEventListener("mouseenter", onMouseEnterInteractive);
        el.removeEventListener("mouseleave", onMouseLeaveInteractive);
      });
    };
  }, [isMobile]);

  if (isMobile) return null;

  return (
    <>
      <div
        ref={dotRef}
        className="pointer-events-none fixed z-[9998] -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-[var(--color-accent-primary)]"
        style={{ left: -100, top: -100 }}
      />
      <div
        ref={ringRef}
        className="pointer-events-none fixed z-[9997] -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full border border-[var(--color-accent-primary)] opacity-30"
        style={{ left: -100, top: -100 }}
      />
    </>
  );
}
