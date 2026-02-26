import Hero from "@/components/sections/Hero";
import QuickIntro from "@/components/sections/QuickIntro";
import FeaturedProjects from "@/components/sections/FeaturedProjects";
import LatestPost from "@/components/sections/LatestPost";
import ContactCTA from "@/components/sections/ContactCTA";

export default function Home() {
  return (
    <>
      <Hero />
      <div className="section-divider" />
      <QuickIntro />
      <div className="section-divider" />
      <FeaturedProjects />
      <div className="section-divider" />
      <LatestPost />
      <div className="section-divider" />
      <ContactCTA />
    </>
  );
}
