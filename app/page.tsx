"use client";

import { useState, useEffect, useCallback } from "react";
import dynamic from "next/dynamic";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import TrackController from "@/components/sections/TrackController";
import TrackStation from "@/components/sections/TrackStation";
import TrackHeroStation from "@/components/sections/TrackHeroStation";
import TrackProjectsStation from "@/components/sections/TrackProjectsStation";
import TrackBlogStation from "@/components/sections/TrackBlogStation";
import TrackAboutStation from "@/components/sections/TrackAboutStation";
import TrackContactStation from "@/components/sections/TrackContactStation";
import TerminalIntro from "@/components/sections/TerminalIntro";

// Fallback components for reduced motion
import Hero from "@/components/sections/Hero";
import NowSection from "@/components/sections/NowSection";
import FeaturedProjects from "@/components/sections/FeaturedProjects";
import LatestPost from "@/components/sections/LatestPost";
import ContactCTA from "@/components/sections/ContactCTA";

const TrackScene = dynamic(
  () => import("@/components/three/TrackScene"),
  {
    ssr: false,
    loading: () => (
      <div className="fixed inset-0 z-0 bg-[#08080A] flex items-center justify-center">
        <div className="w-1 h-1 rounded-full bg-[#00D4FF] animate-pulse-dot" />
      </div>
    ),
  }
);

function ReducedMotionFallback() {
  return (
    <>
      <Hero />
      <NowSection />
      <FeaturedProjects />
      <LatestPost />
      <ContactCTA />
    </>
  );
}

export default function Home() {
  const reduced = useReducedMotion();
  const [showIntro, setShowIntro] = useState(false);
  const [introComplete, setIntroComplete] = useState(false);

  useEffect(() => {
    if (reduced) return;
    const seen = sessionStorage.getItem("terminal-intro-seen");
    if (!seen) {
      setShowIntro(true);
    } else {
      setIntroComplete(true);
    }
  }, [reduced]);

  const handleIntroComplete = useCallback(() => {
    sessionStorage.setItem("terminal-intro-seen", "1");
    setShowIntro(false);
    setIntroComplete(true);
    document.documentElement.style.overflow = "";
    document.body.style.overflow = "";
  }, []);

  if (reduced) {
    return <ReducedMotionFallback />;
  }

  return (
    <div data-theme="dark" className="relative" style={{ fontFamily: "var(--font-ibm-plex-mono), ui-monospace, monospace" }}>
      {/* 3D Canvas — fixed, full viewport */}
      <TrackScene />

      {/* Scroll spacer — creates scrollable height for ScrollTrigger */}
      <TrackController />

      {/* HTML Overlays — fixed position, fade in/out with scroll */}
      <TrackStation stationId="hero" position="center" glass={false}>
        <TrackHeroStation introComplete={introComplete} />
      </TrackStation>

      <TrackStation stationId="projects" position="right">
        <TrackProjectsStation />
      </TrackStation>

      <TrackStation stationId="blog" position="left">
        <TrackBlogStation />
      </TrackStation>

      <TrackStation stationId="about" position="right">
        <TrackAboutStation />
      </TrackStation>

      <TrackStation stationId="contact" position="left" className="!max-w-sm !left-[15%]">
        <TrackContactStation />
      </TrackStation>

      {/* Terminal boot sequence — plays once per session */}
      {showIntro && <TerminalIntro onComplete={handleIntroComplete} />}
    </div>
  );
}
