import type { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Who gets to build, and how communities lead | Black Girls CODE x Beyond Code Collective",
  description:
    "Cristina Mancini at Theo x Tech 2026. Black Girls CODE and Beyond Code Collective on AI, stewardship, and who gets to build the technology.",
  // Live for anyone with the link, but kept out of search until after the talk.
  robots: { index: false, follow: false },
  openGraph: {
    title: "Who gets to build, and how communities lead.",
    description:
      "Cristina Mancini at Theo x Tech 2026 — Black Girls CODE x Beyond Code Collective.",
    url: "https://www.wearebcc.org/en/theo-tech",
    siteName: "Beyond Code Collective",
    type: "website",
  },
};

export default function TheoTechLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
