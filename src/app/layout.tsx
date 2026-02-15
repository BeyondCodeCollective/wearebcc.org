import type { Metadata } from "next";
import { Space_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";

const spaceMono = Space_Mono({
  variable: "--font-space-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "Beyond Code Collective — The Future Of Tech Starts Here",
  description:
    "Beyond Code Collective provides human-powered resources for a tech-driven world. Building intergenerational equity in the technologies of today and tomorrow.",
  keywords: [
    "Beyond Code Collective",
    "BCC",
    "tech education",
    "workforce development",
    "AI literacy",
    "intergenerational equity",
  ],
  openGraph: {
    title: "Beyond Code Collective — The Future Of Tech Starts Here",
    description:
      "Beyond Code Collective provides human-powered resources for a tech-driven world.",
    url: "https://www.wearebcc.org",
    siteName: "Beyond Code Collective",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={spaceMono.variable}>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
