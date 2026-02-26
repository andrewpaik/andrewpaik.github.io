import type { Metadata } from "next";
import { spaceGrotesk, inter, jetbrainsMono } from "@/lib/fonts";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SmoothScroll from "@/components/layout/SmoothScroll";
import CustomCursor from "@/components/layout/CustomCursor";
import MouseGlow from "@/components/ui/MouseGlow";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Andrew Paik | AI Developer & Blockchain Researcher",
    template: "%s | Andrew Paik",
  },
  description:
    "USC student building at the intersection of AI, blockchain, and real-world impact.",
  metadataBase: new URL("https://andrewpaik.github.io"),
  openGraph: {
    title: "Andrew Paik",
    description: "AI Developer & Blockchain Researcher",
    url: "https://andrewpaik.github.io",
    siteName: "Andrew Paik",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Andrew Paik",
    description: "AI Developer & Blockchain Researcher",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable}`}
      >
        <SmoothScroll>
          <CustomCursor />
          <MouseGlow />
          <Navbar />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
