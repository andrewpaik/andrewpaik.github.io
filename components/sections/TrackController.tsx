"use client";

import { useEffect, useRef } from "react";
import { ScrollTrigger } from "@/lib/gsap";
import { useTrackProgress } from "@/hooks/useTrackProgress";
import { getStationSnapPoints } from "@/lib/trackConfig";

export default function TrackController() {
  const spacerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!spacerRef.current) return;

    let lastProgress = 0;
    let lastTime = performance.now();

    const trigger = ScrollTrigger.create({
      trigger: spacerRef.current,
      start: "top top",
      end: "bottom bottom",
      scrub: 0,
      onUpdate: (self) => {
        const now = performance.now();
        const dt = (now - lastTime) / 1000;
        const dp = Math.abs(self.progress - lastProgress);

        useTrackProgress.getState().setRawProgress(self.progress);
        useTrackProgress.getState().setSpeed(dt > 0 ? dp / dt : 0);

        lastProgress = self.progress;
        lastTime = now;
      },
    });

    return () => {
      trigger.kill();
    };
  }, []);

  return (
    <div
      ref={spacerRef}
      style={{ height: "800vh", position: "relative" }}
      aria-hidden="true"
    />
  );
}
