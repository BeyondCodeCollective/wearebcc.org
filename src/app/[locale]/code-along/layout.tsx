import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Code Along — Season 1 | Beyond Code Collective",
  description:
    "Code Along is back. Season 1 of Beyond Code Collective's free YouTube coding series premieres July 25 — four episodes, one music playlist app, built from scratch.",
  openGraph: {
    title: "Code Along — Season 1",
    description:
      "The free coding series returns. Season 1 premieres July 25 on YouTube.",
    images: [
      {
        url: "https://www.wearebcc.org/images/code-along/playlist-card.jpg",
        width: 854,
        height: 480,
        alt: "Code Along Season 1",
      },
    ],
  },
};

export default function CodeAlongLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
