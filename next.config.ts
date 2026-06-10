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
    ];
  },
};

export default withNextIntl(nextConfig);
