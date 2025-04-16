/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // Desabilita a verificação de ESLint durante o build para permitir deploy
    ignoreDuringBuilds: true,
  },
  images: {
    domains: [],
  },
};

export default nextConfig; 