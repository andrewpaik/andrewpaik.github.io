import type { Metadata } from "next";
import ContactHero from "@/components/sections/ContactHero";
import ContactLinks from "@/components/sections/ContactLinks";
import LocationContext from "@/components/sections/LocationContext";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Andrew Paik. Always open to new projects, research collaborations, and conversations.",
};

export default function ContactPage() {
  return (
    <>
      <ContactHero />
      <ContactLinks />
      <LocationContext />
    </>
  );
}
