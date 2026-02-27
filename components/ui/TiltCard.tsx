"use client";

import { useRef, useCallback, useEffect, useState } from "react";
import { gsap } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number;
  glare?: boolean;
}

export default function TiltCard({
  children,
  className,
  maxTilt = 5,
  glare = true,
}: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const glareRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    setIsTouch("ontouchstart" in window || navigator.maxTouchPoints > 0);
  }, []);

  const disabled = reduced || isTouch;

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (disabled || !cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;

      gsap.to(cardRef.current, {
        rotateY: x * maxTilt * 2,
        rotateX: -y * maxTilt * 2,
        duration: 0.3,
        ease: "power2.out",
      });

      if (glare && glareRef.current) {
        gsap.to(glareRef.current, {
          opacity: 0.04,
          x: `${(x + 0.5) * 100}%`,
          y: `${(y + 0.5) * 100}%`,
          duration: 0.3,
          ease: "power2.out",
        });
      }
    },
    [disabled, maxTilt, glare]
  );

  const handleMouseLeave = useCallback(() => {
    if (disabled || !cardRef.current) return;
    gsap.to(cardRef.current, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.6,
      ease: "power3.out",
    });

    if (glare && glareRef.current) {
      gsap.to(glareRef.current, {
        opacity: 0,
        duration: 0.4,
        ease: "power3.out",
      });
    }
  }, [disabled, glare]);

  return (
    <div
      style={{ perspective: "800px" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div
        ref={cardRef}
        className={className}
        style={{ transformStyle: "preserve-3d", position: "relative" }}
      >
        {children}
        {glare && !disabled && (
          <div
            ref={glareRef}
            className="pointer-events-none absolute inset-0 rounded-[inherit] overflow-hidden"
            style={{ opacity: 0 }}
            aria-hidden="true"
          >
            <div
              className="absolute w-[200%] h-[200%] -translate-x-1/2 -translate-y-1/2 rounded-full"
              style={{
                background:
                  "radial-gradient(circle, rgba(255,255,255,0.6) 0%, transparent 60%)",
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
}
