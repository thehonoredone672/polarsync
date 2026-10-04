import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'unpkg.com' },
    ],
  },
  // Allow leaflet CSS import inside components
  transpilePackages: [],
};

export default nextConfig;
