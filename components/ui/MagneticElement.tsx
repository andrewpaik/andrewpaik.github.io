"use client";

import { useRef, useCallback, useEffect, useState } from "react";
import { gsap } from "@/lib/gsap";

interface MagneticElementProps {
  children: React.ReactNode;
  className?: string;
  strength?: number;
  scale?: number;
  deadZone?: number;
  as?: "div" | "span" | "button";
}

export default function MagneticElement({
  children,
  className,
  strength = 0.08,
  scale = 1,
  deadZone = 5,
  as: Tag = "div",
}: MagneticElementProps) {
  const ref = useRef<HTMLElement>(null);
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    setIsTouch("ontouchstart" in window || navigator.maxTouchPoints > 0);
  }, []);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (isTouch || !ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      // Dead zone — no movement if cursor is very close to center
      const dist = Math.sqrt(x * x + y * y);
      if (dist < deadZone) return;

      gsap.to(ref.current, {
        x: x * strength,
        y: y * strength,
        scale,
        duration: 0.4,
        ease: "power2.out",
      });
    },
    [strength, scale, deadZone, isTouch]
  );

  const handleMouseLeave = useCallback(() => {
    if (isTouch || !ref.current) return;
    gsap.to(ref.current, {
      x: 0,
      y: 0,
      scale: 1,
      duration: 0.7,
      ease: "elastic.out(1, 0.5)",
    });
  }, [isTouch]);

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
