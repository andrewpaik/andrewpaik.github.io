"use client";

import { useEffect, useRef, useCallback } from "react";
import { gsap } from "@/lib/gsap";
import { useReducedMotion } from "./useReducedMotion";

interface MouseParallaxOptions {
  strength?: number;
  container?: React.RefObject<HTMLElement | null>;
}

interface MouseParallaxResult {
  x: React.MutableRefObject<number>;
  y: React.MutableRefObject<number>;
}

export function useMouseParallax({
  strength = 0.03,
  container,
}: MouseParallaxOptions = {}): MouseParallaxResult {
  const x = useRef(0);
  const y = useRef(0);
  const reduced = useReducedMotion();
  const quickX = useRef<ReturnType<typeof gsap.quickTo> | null>(null);
  const quickY = useRef<ReturnType<typeof gsap.quickTo> | null>(null);
  const target = useRef({ x: 0, y: 0 });

  const updateRefs = useCallback(() => {
    x.current = target.current.x;
    y.current = target.current.y;
  }, []);

  useEffect(() => {
    if (reduced) return;

    const isTouchDevice =
      "ontouchstart" in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return;

    quickX.current = gsap.quickTo(target.current, "x", {
      duration: 0.6,
      ease: "power3.out",
      onUpdate: updateRefs,
    });
    quickY.current = gsap.quickTo(target.current, "y", {
      duration: 0.6,
      ease: "power3.out",
      onUpdate: updateRefs,
    });

    const handleMouseMove = (e: MouseEvent) => {
      const el = container?.current;
      let nx: number, ny: number;

      if (el) {
        const rect = el.getBoundingClientRect();
        nx = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
        ny = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
      } else {
        nx = (e.clientX / window.innerWidth - 0.5) * 2;
        ny = (e.clientY / window.innerHeight - 0.5) * 2;
      }

      quickX.current?.(nx * strength * window.innerWidth);
      quickY.current?.(ny * strength * window.innerHeight);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [reduced, strength, container, updateRefs]);

  return { x, y };
}
