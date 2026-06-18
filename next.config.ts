import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
    ],
  },
  webpack: (config) => {
    const reactPath = path.dirname(require.resolve('react/package.json'))
    const reactDomPath = path.dirname(require.resolve('react-dom/package.json'))
    config.resolve.alias = {
      ...config.resolve.alias,
      react: reactPath,
      'react-dom': reactDomPath,
    }
    return config
  },
};

export default nextConfig;
