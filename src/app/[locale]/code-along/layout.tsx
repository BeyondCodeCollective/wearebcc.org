import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Code Along Beyond: Music | Beyond Code Collective",
  description:
    "Code Along Beyond: Music — Beyond Code Collective's free YouTube coding series launches Saturday, Aug 8, with support from Apple. Four episodes, one music playlist app, built from scratch.",
  // Hidden for now — unlinked from nav/footer and kept out of search until
  // the series is ready to relaunch.
  robots: { index: false, follow: false },
  openGraph: {
    title: "Code Along Beyond: Music",
    description:
      "The free coding series returns. Season launches Saturday, Aug 8 on YouTube.",
    images: [
      {
        url: "https://www.wearebcc.org/images/code-along/playlist-card-v3.jpg",
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
