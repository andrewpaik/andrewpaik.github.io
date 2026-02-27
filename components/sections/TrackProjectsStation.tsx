"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { projects } from "@/lib/data/projects";
import Tag from "@/components/ui/Tag";
import { useTrackProgress } from "@/hooks/useTrackProgress";
import { STATIONS, getStationPauseWidth } from "@/lib/trackConfig";

const featured = projects.filter((p) => p.featured);
const CARD_COUNT = featured.length;
const DWELL = 0.12; // First 12% of station is SprintIQ dwell
const SPREAD = 0.9; // Use 90% of scroll so last card has dwell

// Pre-compute the raw scroll window for the projects station
function getStationWindow(stationId: string) {
  const totalPauseWidth = STATIONS.reduce(
    (sum, s) => sum + getStationPauseWidth(s),
    0
  );
  const travelWidth = 1.0 - totalPauseWidth;
  const totalTrackRange =
    STATIONS[STATIONS.length - 1].progress - STATIONS[0].progress;

  let rawOffset = 0;
  for (let i = 0; i < STATIONS.length; i++) {
    const pw = getStationPauseWidth(STATIONS[i]);
    if (STATIONS[i].id === stationId) {
      return { start: rawOffset, end: rawOffset + pw };
    }
    rawOffset += pw;
    if (i < STATIONS.length - 1) {
      const trackDistance =
        STATIONS[i + 1].progress - STATIONS[i].progress;
      rawOffset += (trackDistance / totalTrackRange) * travelWidth;
    }
  }
  return { start: 0, end: 0.12 };
}

const PROJECTS_WINDOW = getStationWindow("projects");
const WINDOW_WIDTH = PROJECTS_WINDOW.end - PROJECTS_WINDOW.start;

export default function TrackProjectsStation() {
  const v = useTrackProgress((s) => s.stationVisibility.projects ?? 0);
  const deckRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const springVal = useRef(0);

  // Spring animation loop — decouples card display from raw scroll
  useEffect(() => {
    let raf: number;
    const STIFFNESS = 0.1;

    const animate = () => {
      const state = useTrackProgress.getState();
      const vis = state.stationVisibility.projects ?? 0;

      // Skip heavy work when not visible
      if (vis < 0.01) {
        springVal.current = 0;
        raf = requestAnimationFrame(animate);
        return;
      }

      // Compute scroll-driven target card index
      const raw = state.rawProgress;
      const sub = Math.max(
        0,
        Math.min(1, (raw - PROJECTS_WINDOW.start) / WINDOW_WIDTH)
      );
      const scrollable =
        sub <= DWELL ? 0 : (sub - DWELL) / (1 - DWELL);
      const activeFloat = Math.min(
        CARD_COUNT - 1,
        (scrollable * (CARD_COUNT - 1)) / SPREAD
      );

      // Snap target = nearest integer card index
      const target = Math.min(
        CARD_COUNT - 1,
        Math.max(0, Math.round(activeFloat))
      );

      // Spring toward target
      const diff = target - springVal.current;
      springVal.current += diff * STIFFNESS;
      if (Math.abs(diff) < 0.002) springVal.current = target;

      // Apply transforms directly to DOM (no React re-renders)
      const deck = deckRef.current;
      if (deck) {
        const displayed = springVal.current;

        for (let i = 0; i < deck.children.length; i++) {
          const el = deck.children[i] as HTMLElement;
          const rel = i - displayed; // Fractional offset from displayed position

          let x = 0,
            y = 0,
            scale = 1,
            rotate = 0,
            opacity = 1,
            zIdx = CARD_COUNT - i;

          if (rel < -0.5) {
            // Fully past — gone
            x = -240;
            y = -50;
            rotate = -14;
            opacity = 0;
            zIdx = 0;
          } else if (rel < 0) {
            // Exiting (spring animating out)
            const t = Math.abs(rel) * 2; // 0→1
            x = t * -240;
            y = t * -50;
            rotate = t * -14;
            opacity = 1 - t;
            zIdx = CARD_COUNT + 1;
          } else if (rel < 0.1) {
            // Active card (at rest)
            zIdx = CARD_COUNT + 1;
          } else {
            // Stacked behind
            y = rel * 10;
            x = rel * 5;
            scale = 1 - rel * 0.03;
            opacity = Math.max(0.25, 1 - rel * 0.22);
          }

          el.style.transform = `translateX(${x}px) translateY(${y}px) scale(${scale}) rotate(${rotate}deg)`;
          el.style.opacity = String(opacity);
          el.style.zIndex = String(zIdx);
          el.style.pointerEvents =
            rel >= -0.1 && rel < 0.3 ? "auto" : "none";
        }
      }

      // Update counter
      const counter = counterRef.current;
      if (counter) {
        const shown = Math.min(
          CARD_COUNT,
          Math.max(1, Math.round(springVal.current) + 1)
        );
        counter.textContent = `${String(shown).padStart(2, "0")} / ${String(CARD_COUNT).padStart(2, "0")}`;
      }

      raf = requestAnimationFrame(animate);
    };

    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div className="relative">
      <p
        className="font-[family-name:var(--font-ibm-plex-mono)] text-[0.65rem] tracking-[0.05em] text-[#FF00FF]/70 mb-2"
        style={{ opacity: v, transform: `translateY(${(1 - v) * 10}px)` }}
      >
        <span className="text-[#FF00FF]">{">"}</span> selected_work
      </p>
      <h2
        className="font-[family-name:var(--font-ibm-plex-mono)] text-3xl md:text-4xl font-bold tracking-[-0.02em] text-white mb-6"
        style={{ opacity: v, transform: `translateY(${(1 - v) * 10}px)` }}
      >
        Selected Work
      </h2>

      {/* Card deck */}
      <div
        ref={deckRef}
        className="relative h-[280px] w-full"
        style={{ opacity: v }}
      >
        {featured.map((project) => (
          <div
            key={project.slug}
            className="absolute inset-0"
            style={{ willChange: "transform, opacity" }}
          >
            <Link
              href={`/projects/${project.slug}`}
              className={`group block h-full p-5 border border-dashed bg-[#0a0a0f]/90 backdrop-blur-sm ${
                project.status === "building"
                  ? "border-[#00D4FF]/30 hover:border-[#00D4FF]/60"
                  : "border-white/10 hover:border-[#FF00FF]/30"
              }`}
            >
              {project.thumbnail && (
                <div className="w-full h-28 relative overflow-hidden mb-3 border border-white/5">
                  <Image
                    src={project.thumbnail}
                    alt={project.title}
                    fill
                    className="object-cover opacity-70 group-hover:opacity-90 transition-opacity duration-300"
                    sizes="400px"
                  />
                </div>
              )}
              {project.status === "building" && (
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00D4FF] animate-pulse" />
                  <span className="font-[family-name:var(--font-ibm-plex-mono)] text-[0.6rem] uppercase tracking-[0.12em] text-[#00D4FF]">
                    Currently Building
                  </span>
                </div>
              )}
              <h3
                className={`font-[family-name:var(--font-ibm-plex-mono)] text-lg font-semibold transition-colors ${
                  project.status === "building"
                    ? "text-[#00D4FF]"
                    : "text-white group-hover:text-[#FF00FF]"
                }`}
              >
                {project.title}
              </h3>
              <p className="text-white/50 text-sm mt-1 line-clamp-2">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-1.5 mt-3">
                {project.category.map((cat) => (
                  <Tag key={cat} variant="outline" size="sm">
                    {cat}
                  </Tag>
                ))}
              </div>
            </Link>
          </div>
        ))}
      </div>

      {/* Card counter + view all */}
      <div
        className="flex items-center justify-between mt-4"
        style={{ opacity: v }}
      >
        <span
          ref={counterRef}
          className="font-[family-name:var(--font-ibm-plex-mono)] text-[0.65rem] text-white/30 tracking-[0.1em]"
        >
          01 / {String(CARD_COUNT).padStart(2, "0")}
        </span>
        <Link
          href="/projects"
          className="font-[family-name:var(--font-ibm-plex-mono)] text-xs uppercase tracking-[0.1em] text-white/40 hover:text-[#FF00FF] transition-colors"
        >
          View all &rarr;
        </Link>
      </div>
    </div>
  );
}
