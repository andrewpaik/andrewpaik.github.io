import type { Metadata } from "next";
import AboutHero from "@/components/sections/AboutHero";
import Bio from "@/components/sections/Bio";
import SkillsGrid from "@/components/sections/SkillsGrid";
import Timeline from "@/components/sections/Timeline";

export const metadata: Metadata = {
  title: "About Me",
  description:
    "Andrew Paik — athlete, AI developer, blockchain researcher. USC '26.",
};

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <Bio />
      <SkillsGrid />
      <Timeline />
    </>
  );
}
