import type { Metadata } from "next";
import { ibmPlexMono, jetbrainsMono } from "@/lib/fonts";
import Navbar from "@/components/layout/Navbar";
import ConditionalFooter from "@/components/layout/ConditionalFooter";
import SmoothScroll from "@/components/layout/SmoothScroll";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Andrew Paik — Builder, Researcher, Athlete",
    template: "%s | Andrew Paik",
  },
  description:
    "AI systems, blockchain research, and the discipline to ship. USC '26.",
  metadataBase: new URL("https://andrewpaik.github.io"),
  openGraph: {
    title: "Andrew Paik",
    description: "Builder. Researcher. Athlete.",
    url: "https://andrewpaik.github.io",
    siteName: "Andrew Paik",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Andrew Paik",
    description: "Builder. Researcher. Athlete.",
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
        className={`${ibmPlexMono.variable} ${jetbrainsMono.variable}`}
      >
        <SmoothScroll>
          <Navbar />
          <main className="min-h-screen">{children}</main>
          <ConditionalFooter />
        </SmoothScroll>
      </body>
    </html>
  );
}
