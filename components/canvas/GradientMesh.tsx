"use client";

import { useEffect, useRef, useCallback } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useMediaQuery } from "@/hooks/useMediaQuery";

interface ControlPoint {
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  speedX: number;
  speedY: number;
  phaseX: number;
  phaseY: number;
  radius: number;
  color: string;
}

interface GradientMeshProps {
  mouseX?: React.MutableRefObject<number>;
  mouseY?: React.MutableRefObject<number>;
  className?: string;
}

const COLORS_DESKTOP = [
  "rgba(180, 200, 255, 0.045)", // soft blue
  "rgba(200, 180, 240, 0.04)",  // lavender
  "rgba(255, 200, 210, 0.035)", // blush pink
  "rgba(180, 220, 240, 0.04)",  // sky
  "rgba(210, 190, 255, 0.035)", // violet
  "rgba(190, 230, 255, 0.04)",  // ice blue
];

const COLORS_MOBILE = COLORS_DESKTOP.slice(0, 3);

function createPoints(count: number, colors: string[]): ControlPoint[] {
  return Array.from({ length: count }, (_, i) => ({
    x: 0,
    y: 0,
    baseX: (i % 3) / 2.5 + 0.1 + Math.random() * 0.15,
    baseY: Math.floor(i / 3) / 2 + 0.2 + Math.random() * 0.2,
    speedX: 0.0003 + Math.random() * 0.0004,
    speedY: 0.0002 + Math.random() * 0.0003,
    phaseX: Math.random() * Math.PI * 2,
    phaseY: Math.random() * Math.PI * 2,
    radius: 0.25 + Math.random() * 0.2,
    color: colors[i % colors.length],
  }));
}

export default function GradientMesh({ mouseX, mouseY, className }: GradientMeshProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const pointsRef = useRef<ControlPoint[]>([]);
  const reduced = useReducedMotion();
  const isMobile = useMediaQuery("(max-width: 768px)");

  const render = useCallback(
    (ctx: CanvasRenderingContext2D, w: number, h: number, time: number) => {
      ctx.clearRect(0, 0, w, h);

      const mx = mouseX?.current ?? 0;
      const my = mouseY?.current ?? 0;

      for (const point of pointsRef.current) {
        point.x =
          point.baseX * w +
          Math.sin(time * point.speedX + point.phaseX) * w * 0.08 +
          mx * 0.3;
        point.y =
          point.baseY * h +
          Math.sin(time * point.speedY + point.phaseY) * h * 0.06 +
          my * 0.3;

        const r = point.radius * Math.max(w, h);
        const gradient = ctx.createRadialGradient(
          point.x,
          point.y,
          0,
          point.x,
          point.y,
          r
        );
        gradient.addColorStop(0, point.color);
        gradient.addColorStop(1, "rgba(0, 0, 0, 0)");

        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, w, h);
      }
    },
    [mouseX, mouseY]
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const count = isMobile ? 3 : 6;
    const colors = isMobile ? COLORS_MOBILE : COLORS_DESKTOP;
    pointsRef.current = createPoints(count, colors);

    const dpr = Math.min(window.devicePixelRatio, 2);

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    };

    const observer = new ResizeObserver(resize);
    observer.observe(canvas);
    resize();

    if (reduced) {
      // Single static frame
      render(ctx, canvas.getBoundingClientRect().width, canvas.getBoundingClientRect().height, 0);
      return () => observer.disconnect();
    }

    const targetFps = isMobile ? 30 : 60;
    const frameInterval = 1000 / targetFps;
    let lastFrame = 0;

    const animate = (timestamp: number) => {
      animationRef.current = requestAnimationFrame(animate);

      if (timestamp - lastFrame < frameInterval) return;
      lastFrame = timestamp;

      const rect = canvas.getBoundingClientRect();
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      render(ctx, rect.width, rect.height, timestamp);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationRef.current);
      observer.disconnect();
    };
  }, [reduced, isMobile, render]);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: -1,
      }}
      aria-hidden="true"
    />
  );
}
