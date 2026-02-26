import Hero from "@/components/sections/Hero";
import QuickIntro from "@/components/sections/QuickIntro";
import FeaturedProjects from "@/components/sections/FeaturedProjects";
import LatestPost from "@/components/sections/LatestPost";
import ContactCTA from "@/components/sections/ContactCTA";

export default function Home() {
  return (
    <>
      <Hero />
      <QuickIntro />
      <FeaturedProjects />
      <LatestPost />
      <ContactCTA />
    </>
  );
}
