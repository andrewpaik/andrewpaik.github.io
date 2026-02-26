import localFont from "next/font/local";
import { JetBrains_Mono } from "next/font/google";

export const clashDisplay = localFont({
  src: [
    {
      path: "../public/fonts/ClashDisplay-Medium.woff",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/fonts/ClashDisplay-Semibold.woff",
      weight: "600",
      style: "normal",
    },
    {
      path: "../public/fonts/ClashDisplay-Bold.woff",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-display",
  display: "swap",
  preload: true,
});

export const generalSans = localFont({
  src: [
    {
      path: "../public/fonts/GeneralSans-Regular.woff",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/GeneralSans-Medium.woff",
      weight: "500",
      style: "normal",
    },
  ],
  variable: "--font-body",
  display: "swap",
  preload: true,
});

export const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
  preload: false,
});
