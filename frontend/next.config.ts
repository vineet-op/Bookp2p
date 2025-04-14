import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**', // allow from any domain (can be more restrictive if needed)
      },
      {
        protocol: 'http',
        hostname: 'localhost', // allow from localhost
      },
    ],
  },
};

export default nextConfig;
