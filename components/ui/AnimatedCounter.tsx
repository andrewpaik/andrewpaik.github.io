"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

interface AnimatedCounterProps {
  target: number;
  suffix?: string;
  className?: string;
  style?: React.CSSProperties;
  duration?: number;
}

export default function AnimatedCounter({
  target,
  suffix = "",
  className,
  style,
  duration,
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [displayed, setDisplayed] = useState("0");
  const hasAnimated = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const obj = { value: 0 };
    const dur = duration ?? Math.min(0.6 + target * 0.08, 1.5);

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: el,
        start: "top 85%",
        once: true,
        onEnter: () => {
          if (hasAnimated.current) return;
          hasAnimated.current = true;

          gsap.to(obj, {
            value: target,
            duration: dur,
            ease: "power2.out",
            snap: { value: 1 },
            onUpdate: () => setDisplayed(String(Math.round(obj.value))),
          });
        },
      });
    });

    return () => ctx.revert();
  }, [target, duration]);

  return (
    <span ref={ref} className={className} style={style}>
      {displayed}
      {suffix}
    </span>
  );
}
