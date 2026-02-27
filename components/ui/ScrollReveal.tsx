"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

type Variant = "fadeUp" | "slideIn" | "scaleIn" | "clipReveal" | "parallax";
type Direction = "left" | "right" | "bottom";

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  duration?: number;
  variant?: Variant;
  direction?: Direction;
  scrub?: boolean | number;
  staggerChildren?: number;
}

function getAnimationProps(variant: Variant, y: number, direction: Direction) {
  switch (variant) {
    case "slideIn": {
      const axis = direction === "bottom" ? "y" : "x";
      const dist = direction === "left" ? -40 : direction === "right" ? 40 : 30;
      return {
        from: { opacity: 0, [axis]: dist },
        to: { opacity: 1, [axis]: 0 },
      };
    }
    case "scaleIn":
      return {
        from: { opacity: 0, scale: 0.92 },
        to: { opacity: 1, scale: 1 },
      };
    case "clipReveal":
      return {
        from: { clipPath: "inset(0 0 100% 0)" },
        to: { clipPath: "inset(0 0 0% 0)" },
      };
    case "parallax":
      return {
        from: { y: y || 50 },
        to: { y: -(y || 50) },
      };
    case "fadeUp":
    default:
      return {
        from: { opacity: 0, y },
        to: { opacity: 1, y: 0 },
      };
  }
}

export default function ScrollReveal({
  children,
  className,
  delay = 0,
  y = 12,
  duration = 0.6,
  variant = "fadeUp",
  direction = "bottom",
  scrub = false,
  staggerChildren,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      const { from, to } = getAnimationProps(variant, y, direction);

      const scrollTriggerConfig: ScrollTrigger.Vars = {
        trigger: el,
        start: "top 85%",
      };

      if (scrub) {
        scrollTriggerConfig.scrub = scrub === true ? 1 : scrub;
        scrollTriggerConfig.end = "bottom 20%";
      } else {
        scrollTriggerConfig.toggleActions = "play none none none";
      }

      if (staggerChildren) {
        // Animate direct children with stagger
        const kids = el.children;
        gsap.fromTo(kids, from, {
          ...to,
          duration,
          delay,
          stagger: staggerChildren,
          ease: variant === "parallax" ? "none" : "power3.out",
          scrollTrigger: scrollTriggerConfig,
        });
      } else {
        gsap.fromTo(el, from, {
          ...to,
          duration,
          delay,
          ease: variant === "parallax" ? "none" : "power3.out",
          scrollTrigger: scrollTriggerConfig,
        });
      }
    });

    return () => ctx.revert();
  }, [delay, y, duration, variant, direction, scrub, staggerChildren]);

  const initialStyle: React.CSSProperties =
    variant === "parallax"
      ? {}
      : variant === "clipReveal"
      ? { clipPath: "inset(0 0 100% 0)" }
      : { opacity: 0 };

  return (
    <div ref={ref} className={className} style={initialStyle}>
      {children}
    </div>
  );
}
