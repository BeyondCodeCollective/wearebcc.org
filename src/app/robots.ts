import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // Only non-public surfaces. Unlisted marketing pages are deliberately
      // left out: robots.txt is public, so a Disallow entry would advertise
      // them, and blocking the crawler stops it from ever reading their
      // noindex tag.
      disallow: ["/api/", "/admin", "/dashboard"],
    },
    host: "https://www.wearebcc.org",
    sitemap: "https://www.wearebcc.org/sitemap.xml",
  };
}
