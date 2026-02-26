"use client";

import { ReactLenis } from "lenis/react";
import { useEffect } from "react";
import { ScrollTrigger } from "@/lib/gsap";

export default function SmoothScroll({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;
  }, []);

  return (
    <ReactLenis
      root
      options={{
        lerp: 0.1,
        duration: 1.2,
        smoothWheel: true,
        syncTouch: false,
      }}
      autoRaf={true}
      ref={(lenisRef) => {
        if (lenisRef?.lenis) {
          lenisRef.lenis.on("scroll", ScrollTrigger.update);
        }
      }}
    >
      {children}
    </ReactLenis>
  );
}
