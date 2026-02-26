import type { Metadata } from "next";
import AboutHero from "@/components/sections/AboutHero";
import Bio from "@/components/sections/Bio";
import SkillsGrid from "@/components/sections/SkillsGrid";
import Timeline from "@/components/sections/Timeline";
import PersonalTouches from "@/components/sections/PersonalTouches";

export const metadata: Metadata = {
  title: "About Me",
  description:
    "Andrew Paik — USC student, AI developer, and blockchain researcher. The long version.",
};

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <Bio />
      <SkillsGrid />
      <Timeline />
      <PersonalTouches />
    </>
  );
}
