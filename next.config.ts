import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [],
    unoptimized: true, // Para permitir imagens locais sem otimização
    dangerouslyAllowSVG: true,
  },
};

export default nextConfig;
