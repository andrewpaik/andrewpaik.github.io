"use client";

import { useRef, useCallback } from "react";
import { gsap } from "@/lib/gsap";

interface MagneticElementProps {
  children: React.ReactNode;
  className?: string;
  strength?: number;
  as?: "div" | "span" | "button";
}

export default function MagneticElement({
  children,
  className,
  strength = 0.3,
  as: Tag = "div",
}: MagneticElementProps) {
  const ref = useRef<HTMLElement>(null);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      gsap.to(ref.current, {
        x: x * strength,
        y: y * strength,
        duration: 0.4,
        ease: "power2.out",
      });
    },
    [strength]
  );

  const handleMouseLeave = useCallback(() => {
    if (!ref.current) return;
    gsap.to(ref.current, {
      x: 0,
      y: 0,
      duration: 0.7,
      ease: "elastic.out(1, 0.3)",
    });
  }, []);

  return (
    <Tag
      ref={ref as React.RefObject<HTMLDivElement & HTMLSpanElement & HTMLButtonElement>}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ display: "inline-block" }}
    >
      {children}
    </Tag>
  );
}
