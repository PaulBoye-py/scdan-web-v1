import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // OG images read their fonts and logo from disk at request time
  outputFileTracingIncludes: {
    "/**/opengraph-image*": ["./assets/og/**/*"],
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
    ],
  },
};

export default nextConfig;
