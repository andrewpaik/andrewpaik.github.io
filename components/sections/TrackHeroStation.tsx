"use client";

import { useEffect, useRef, useState } from "react";
import { useTrackProgress } from "@/hooks/useTrackProgress";

const FULL_NAME = "andrew paik";
const TYPE_SPEED = 100;

interface TrackHeroStationProps {
  introComplete?: boolean;
}

export default function TrackHeroStation({ introComplete = false }: TrackHeroStationProps) {
  const v = useTrackProgress((s) => s.stationVisibility.hero ?? 0);
  const [displayed, setDisplayed] = useState("");
  const [typingDone, setTypingDone] = useState(false);
  const hasStarted = useRef(false);

  useEffect(() => {
    if (!introComplete || hasStarted.current) return;
    hasStarted.current = true;

    let cancelled = false;
    let idx = 0;

    function typeForward() {
      if (cancelled) return;
      idx++;
      setDisplayed(FULL_NAME.slice(0, idx));
      if (idx < FULL_NAME.length) {
        setTimeout(typeForward, TYPE_SPEED);
      } else {
        setTypingDone(true);
      }
    }

    const initial = setTimeout(typeForward, 300);

    return () => {
      cancelled = true;
      clearTimeout(initial);
      hasStarted.current = false;
    };
  }, [introComplete]);

  const progress = FULL_NAME.length > 0 ? displayed.length / FULL_NAME.length : 0;

  return (
    <div className="flex flex-col items-center gap-4 relative">
      {/* Terminal prompt */}
      <p
        className="font-[family-name:var(--font-ibm-plex-mono)] text-[0.65rem] tracking-[0.05em] text-white/40"
        style={{ opacity: v }}
      >
        <span className="text-[#00D4FF]">{">"}</span> id.name
      </p>

      <h1
        className="text-3xl md:text-5xl lg:text-6xl font-light tracking-[0.02em] text-white transition-all duration-500"
        style={{
          fontFamily: "var(--font-ibm-plex-mono), ui-monospace, monospace",
          opacity: v,
          transform: `translateY(${(1 - v) * 12}px)`,
        }}
      >
        {displayed}
        <span
          className="text-[#00D4FF] font-normal"
          style={{ animation: "terminal-blink 1s step-end infinite" }}
        >
          |
        </span>
      </h1>

      {/* Roles — fade in with typing progress */}
      <div
        className="flex items-center gap-3 font-[family-name:var(--font-ibm-plex-mono)] text-sm tracking-wide transition-opacity duration-200"
        style={{
          opacity: progress * v,
          transform: `translateY(${(1 - v) * 12}px)`,
        }}
      >
        <span className="text-[#FF00FF]">builder</span>
        <span className="text-white/20">/</span>
        <span className="text-[#00FFFF]">researcher</span>
      </div>

      {/* Scroll indicator */}
      <div
        className="mt-8 flex flex-col items-center gap-2"
        style={{ opacity: v }}
      >
        <span className="font-[family-name:var(--font-ibm-plex-mono)] text-xs tracking-[0.15em] text-white/60">
          scroll
          <span
            className="text-[#00D4FF]"
            style={{ animation: "terminal-blink 1s step-end infinite" }}
          >
            _
          </span>
        </span>
        <div className="w-[1px] h-8 bg-gradient-to-b from-white/50 to-transparent" />
      </div>
    </div>
  );
}
