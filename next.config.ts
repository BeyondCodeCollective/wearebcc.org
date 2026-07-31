import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
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
