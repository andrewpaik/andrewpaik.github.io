"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

interface TextRevealProps {
  children: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  className?: string;
  delay?: number;
  stagger?: number;
  splitBy?: "words" | "chars";
}

export default function TextReveal({
  children,
  as: Tag = "h1",
  className,
  delay = 0,
  stagger = 0.08,
  splitBy = "words",
}: TextRevealProps) {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const elements = container.querySelectorAll(".split-item");

    gsap.fromTo(
      elements,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger,
        delay,
        ease: "power3.out",
      }
    );
  }, [delay, stagger]);

  const items =
    splitBy === "words" ? children.split(" ") : children.split("");

  return (
    <Tag ref={containerRef as React.RefObject<never>} className={className}>
      {items.map((item, i) => (
        <span key={i} className="split-item inline-block opacity-0">
          {item}
          {splitBy === "words" && i < items.length - 1 ? "\u00A0" : ""}
        </span>
      ))}
    </Tag>
  );
}
