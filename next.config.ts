import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    unoptimized: true,
    domains: ['assets.aceternity.com'], // Adapte conforme necessário
  },
};

export default nextConfig;
