"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

interface TextRevealProps {
  children: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  className?: string;
  style?: React.CSSProperties;
  delay?: number;
  stagger?: number;
  splitBy?: "words" | "chars";
  animation?: "fadeUp" | "clipReveal" | "slideIn";
  trigger?: "load" | "scroll";
  scrub?: boolean | number;
}

export default function TextReveal({
  children,
  as: Tag = "h1",
  className,
  style,
  delay = 0,
  stagger = 0.08,
  splitBy = "words",
  animation = "fadeUp",
  trigger = "load",
  scrub = false,
}: TextRevealProps) {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const elements = container.querySelectorAll<HTMLElement>(".split-item");
    const ctx = gsap.context(() => {
      const getAnimation = () => {
        switch (animation) {
          case "clipReveal":
            return {
              from: { clipPath: "inset(0 0 100% 0)" },
              to: { clipPath: "inset(0 0 0% 0)", duration: 0.5, stagger, ease: "power4.out" },
            };
          case "slideIn":
            return {
              from: { y: "110%" },
              to: { y: "0%", duration: 0.5, stagger, ease: "power4.out" },
            };
          case "fadeUp":
          default:
            return {
              from: { opacity: 0, y: 40 },
              to: { opacity: 1, y: 0, duration: 0.6, stagger, ease: "power3.out" },
            };
        }
      };

      const { from, to } = getAnimation();

      if (trigger === "scroll") {
        gsap.fromTo(elements, from, {
          ...to,
          delay,
          scrollTrigger: {
            trigger: container,
            start: "top 85%",
            ...(scrub ? { scrub: scrub === true ? 1 : scrub, end: "top 30%" } : {}),
          },
        });
      } else {
        gsap.fromTo(elements, from, { ...to, delay });
      }
    }, container);

    return () => ctx.revert();
  }, [delay, stagger, animation, trigger, scrub]);

  const items =
    splitBy === "words" ? children.split(" ") : children.split("");

  const needsOverflow = animation === "clipReveal" || animation === "slideIn";

  return (
    <Tag ref={containerRef as React.RefObject<never>} className={className} style={style}>
      {items.map((item, i) => (
        <span
          key={i}
          className="inline-flex overflow-hidden"
          style={needsOverflow ? { overflow: "hidden", display: "inline-flex" } : undefined}
        >
          <span
            className={`split-item inline-block ${
              animation === "fadeUp" ? "opacity-0" : ""
            }`}
            style={
              animation === "clipReveal"
                ? { clipPath: "inset(0 0 100% 0)" }
                : animation === "slideIn"
                ? { transform: "translateY(110%)" }
                : undefined
            }
          >
            {item}
            {splitBy === "words" && i < items.length - 1 ? "\u00A0" : ""}
          </span>
        </span>
      ))}
    </Tag>
  );
}
