import type { Metadata } from "next";
import AboutHero from "@/components/sections/AboutHero";
import Bio from "@/components/sections/Bio";
import SkillsGrid from "@/components/sections/SkillsGrid";
import Timeline from "@/components/sections/Timeline";
import PersonalTouches from "@/components/sections/PersonalTouches";

export const metadata: Metadata = {
  title: "About Me",
  description:
    "Andrew Paik — USC student, AI developer, and blockchain researcher. Learn about my background, skills, and experience.",
};

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <div className="section-divider" />
      <Bio />
      <div className="section-divider" />
      <SkillsGrid />
      <div className="section-divider" />
      <Timeline />
      <div className="section-divider" />
      <PersonalTouches />
    </>
  );
}
