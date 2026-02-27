"use client";

import { useEffect, useRef, useCallback } from "react";
import gsap from "gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface TerminalIntroProps {
  onComplete: () => void;
}

export default function TerminalIntro({ onComplete }: TerminalIntroProps) {
  const reduced = useReducedMotion();
  const overlayRef = useRef<HTMLDivElement>(null);
  const topHalfRef = useRef<HTMLDivElement>(null);
  const bottomHalfRef = useRef<HTMLDivElement>(null);
  const seamRef = useRef<HTMLDivElement>(null);
  const textBlockRef = useRef<HTMLDivElement>(null);
  const skipHintRef = useRef<HTMLDivElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const skippedRef = useRef(false);
  const completedRef = useRef(false);

  // Reduced motion — bail immediately
  useEffect(() => {
    if (reduced) {
      onComplete();
    }
  }, [reduced, onComplete]);

  // Lock scroll
  useEffect(() => {
    if (reduced) return;

    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";

    return () => {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    };
  }, [reduced]);

  // Prevent scroll-through
  useEffect(() => {
    if (reduced) return;

    const overlay = overlayRef.current;
    if (!overlay) return;

    const preventScroll = (e: Event) => {
      e.preventDefault();
    };

    overlay.addEventListener("wheel", preventScroll, { passive: false });
    overlay.addEventListener("touchmove", preventScroll, { passive: false });

    return () => {
      overlay.removeEventListener("wheel", preventScroll);
      overlay.removeEventListener("touchmove", preventScroll);
    };
  }, [reduced]);

  const playCrackOpen = useCallback(
    (fast: boolean) => {
      if (completedRef.current) return;
      completedRef.current = true;

      const duration = fast ? 0.5 : 1.2;
      const crackTl = gsap.timeline({
        onComplete: () => onComplete(),
      });

      // Fade out terminal text
      crackTl.to(textBlockRef.current, {
        opacity: 0,
        scale: 0.95,
        duration: fast ? 0.2 : 0.5,
        ease: "power2.in",
      });

      // Fade out skip hint
      if (skipHintRef.current) {
        crackTl.to(
          skipHintRef.current,
          { opacity: 0, duration: 0.1 },
          "<"
        );
      }

      // Seam line appears
      crackTl.fromTo(
        seamRef.current,
        { scaleX: 0, opacity: 0 },
        { scaleX: 1, opacity: 1, duration: fast ? 0.1 : 0.2, ease: "power2.out" },
        fast ? 0.15 : 0.4
      );

      // Brief hold on seam before split
      // Halves slide apart
      crackTl.to(
        topHalfRef.current,
        { yPercent: -100, duration, ease: "power3.inOut" },
        fast ? 0.25 : 0.8
      );
      crackTl.to(
        bottomHalfRef.current,
        { yPercent: 100, duration, ease: "power3.inOut" },
        "<"
      );
      // Seam fades out
      crackTl.to(
        seamRef.current,
        { opacity: 0, duration: duration * 0.5 },
        "<0.1"
      );
    },
    [onComplete]
  );

  // Skip handler
  const handleSkip = useCallback(() => {
    if (skippedRef.current || completedRef.current) return;
    skippedRef.current = true;

    // Kill the main timeline
    if (tlRef.current) {
      tlRef.current.kill();
    }

    // Play accelerated crack-open
    playCrackOpen(true);
  }, [playCrackOpen]);

  // Skip listeners
  useEffect(() => {
    if (reduced) return;

    const overlay = overlayRef.current;
    if (!overlay) return;

    const onKey = () => handleSkip();
    const onClick = () => handleSkip();

    overlay.addEventListener("click", onClick);
    overlay.addEventListener("keydown", onKey);
    overlay.addEventListener("touchstart", onClick, { passive: true });

    return () => {
      overlay.removeEventListener("click", onClick);
      overlay.removeEventListener("keydown", onKey);
      overlay.removeEventListener("touchstart", onClick);
    };
  }, [reduced, handleSkip]);

  // Main GSAP timeline
  useEffect(() => {
    if (reduced) return;

    const lines = textBlockRef.current?.querySelectorAll(".term-line");
    if (!lines) return;

    const tl = gsap.timeline();
    tlRef.current = tl;

    // Set all lines invisible
    gsap.set(lines, { opacity: 0 });

    // Line timings (instant appear, staggered — ~5s total)
    const timings = [
      0.3,    // > sys.init
      0.7,    //   loading environment...
      1.4,    //   starfield    [OK]
      1.9,    //   track        [OK]
      2.4,    //   runner       [OK]
      3.0,    // (blank)
      3.2,    // > id
      3.7,    //   andrew paik
      4.2,    //   builder / researcher / athlete
      4.8,    // (blank)
      5.0,    // > launch
      5.4,    //   ready_
    ];

    lines.forEach((line, i) => {
      if (timings[i] !== undefined) {
        tl.to(line, { opacity: 1, duration: 0.01 }, timings[i]);
      }
    });

    // Show skip hint at 2.5s
    tl.to(skipHintRef.current, { opacity: 0.2, duration: 0.3 }, 2.5);

    // After terminal finishes, crack open (pause on "ready_" for a beat)
    tl.call(
      () => {
        if (!skippedRef.current) {
          playCrackOpen(false);
        }
      },
      [],
      6.5
    );

    return () => {
      tl.kill();
    };
  }, [reduced, playCrackOpen]);

  if (reduced) return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[100] cursor-pointer"
      role="presentation"
      tabIndex={0}
    >
      {/* Top half */}
      <div
        ref={topHalfRef}
        className="absolute top-0 left-0 right-0 h-1/2 bg-[#08080A]"
      />

      {/* Bottom half */}
      <div
        ref={bottomHalfRef}
        className="absolute bottom-0 left-0 right-0 h-1/2 bg-[#08080A]"
      />

      {/* Seam line */}
      <div
        ref={seamRef}
        className="absolute left-0 right-0 h-[2px] top-1/2 -translate-y-1/2 opacity-0"
        style={{
          background: "linear-gradient(90deg, transparent, #00D4FF, transparent)",
          boxShadow: "0 0 20px rgba(0, 212, 255, 0.6), 0 0 60px rgba(0, 212, 255, 0.3)",
        }}
      />

      {/* Terminal text block */}
      <div
        ref={textBlockRef}
        className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none"
      >
        <div
          className="max-w-[400px] w-full px-6"
          style={{
            fontFamily: "var(--font-jetbrains-mono), ui-monospace, monospace",
            fontSize: "clamp(0.7rem, 1.2vw, 0.85rem)",
            lineHeight: 1.8,
          }}
        >
          {/* > sys.init */}
          <div className="term-line" style={{ color: "#fff" }}>
            {">"} sys.init
          </div>
          {/* loading environment... */}
          <div className="term-line" style={{ color: "rgba(255,255,255,0.6)" }}>
            &nbsp;&nbsp;loading environment...
          </div>
          {/* starfield [OK] */}
          <div className="term-line" style={{ color: "rgba(255,255,255,0.6)" }}>
            &nbsp;&nbsp;starfield&nbsp;&nbsp;&nbsp;&nbsp;
            <span style={{ color: "#4AE04A" }}>[OK]</span>
          </div>
          {/* track [OK] */}
          <div className="term-line" style={{ color: "rgba(255,255,255,0.6)" }}>
            &nbsp;&nbsp;track&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <span style={{ color: "#4AE04A" }}>[OK]</span>
          </div>
          {/* runner [OK] */}
          <div className="term-line" style={{ color: "rgba(255,255,255,0.6)" }}>
            &nbsp;&nbsp;runner&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <span style={{ color: "#4AE04A" }}>[OK]</span>
          </div>
          {/* blank */}
          <div className="term-line">&nbsp;</div>
          {/* > id */}
          <div className="term-line" style={{ color: "#fff" }}>
            {">"} id
          </div>
          {/* andrew paik */}
          <div className="term-line" style={{ color: "rgba(255,255,255,0.6)" }}>
            &nbsp;&nbsp;andrew paik
          </div>
          {/* builder / researcher */}
          <div className="term-line" style={{ color: "rgba(255,255,255,0.6)" }}>
            &nbsp;&nbsp;builder / researcher
          </div>
          {/* blank */}
          <div className="term-line">&nbsp;</div>
          {/* > launch */}
          <div className="term-line" style={{ color: "#fff" }}>
            {">"} launch
          </div>
          {/* ready_ with blinking cursor */}
          <div className="term-line" style={{ color: "rgba(255,255,255,0.6)" }}>
            &nbsp;&nbsp;ready
            <span
              style={{
                animation: "terminal-blink 1s step-end infinite",
                color: "#00D4FF",
              }}
            >
              _
            </span>
          </div>
        </div>
      </div>

      {/* Skip hint */}
      <div
        ref={skipHintRef}
        className="absolute bottom-6 right-6 z-10 opacity-0 pointer-events-none"
        style={{
          fontFamily: "var(--font-jetbrains-mono), ui-monospace, monospace",
          fontSize: "0.65rem",
          letterSpacing: "0.1em",
          color: "rgba(255,255,255,1)",
        }}
      >
        click to skip
      </div>
    </div>
  );
}
