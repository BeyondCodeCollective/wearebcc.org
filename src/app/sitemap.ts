import type { MetadataRoute } from "next";
import landing from "@/messages/en/landing.json";

const BASE = "https://www.wearebcc.org";
const LOCALES = ["en", "es"] as const;

// Public marketing surfaces only. Gated pages (beyond-overview, decks),
// unlisted pages (theo-tech, rancho-cordova, links) and app surfaces
// (admin, dashboard, sandbox) stay out on purpose.
const PAGES = [
  "",
  "/team",
  "/platform",
  "/catalyst",
  "/partners",
  "/news",
  "/quiz",
  "/beyond-code-centers",
  "/beyond-the-game",
  "/code-along",
  "/privacy",
  "/terms",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const newsItems = (landing.news?.items ?? []) as { slug?: string; date?: string }[];
  const paths = [
    ...PAGES,
    ...newsItems.filter((p) => p.slug).map((p) => `/news/${p.slug}`),
  ];

  return paths.flatMap((path) =>
    LOCALES.map((locale) => ({
      url: `${BASE}/${locale}${path}`,
      lastModified: new Date(),
      changeFrequency: path.startsWith("/news") ? ("monthly" as const) : ("weekly" as const),
      priority: path === "" ? 1 : path === "/team" || path === "/platform" ? 0.9 : 0.7,
      alternates: {
        languages: Object.fromEntries(
          LOCALES.map((l) => [l, `${BASE}/${l}${path}`]),
        ),
      },
    })),
  );
}
