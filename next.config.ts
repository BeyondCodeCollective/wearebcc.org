import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  // The /sandbox index lists whatever sits in public/sandbox by reading the
  // filesystem at request time. On Vercel, public/ is served from the CDN but
  // is NOT in the serverless function's filesystem unless traced in — without
  // this the deployed index renders "Nothing here yet" while the files
  // themselves serve fine.
  outputFileTracingIncludes: {
    "/[locale]/sandbox": ["./public/sandbox/**/*"],
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  async headers() {
    return [
      {
        source: "/decks/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "no-store, max-age=0, must-revalidate",
          },
        ],
      },
      // headers() matches the INCOMING path, and /beyond-the-game-deck is a
      // middleware rewrite, so the rule above never covered it. Without this the
      // shared deck URL was served cacheable while the /decks/ path it rewrites
      // to was no-store, which is exactly the setup where someone reloads and
      // still sees yesterday's slide.
      {
        source: "/beyond-the-game-deck",
        headers: [
          {
            key: "Cache-Control",
            value: "no-store, max-age=0, must-revalidate",
          },
        ],
      },
      // Sandbox files are working documents that get replaced under the same
      // filename, so the same no-store rule as /decks applies. X-Robots-Tag
      // is the static-file equivalent of the index page's noindex: unlisted,
      // not secret.
      {
        source: "/sandbox/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "no-store, max-age=0, must-revalidate",
          },
          {
            key: "X-Robots-Tag",
            value: "noindex, nofollow",
          },
        ],
      },
    ];
  },
  async redirects() {
    return [
      {
        source: "/:locale/the-forge",
        destination: "/:locale/beyond-code-centers",
        permanent: true,
      },
      {
        source: "/the-forge",
        destination: "/beyond-code-centers",
        permanent: true,
      },
      {
        source: "/:locale/after-the-game",
        destination: "/:locale/beyond-the-game",
        permanent: true,
      },
      {
        source: "/after-the-game",
        destination: "/beyond-the-game",
        permanent: true,
      },
    ];
  },
};

export default withNextIntl(nextConfig);
