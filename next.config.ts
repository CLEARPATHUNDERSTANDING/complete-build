import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  experimental: {
    allowedDevOrigins: [
      "*.cloudworkstations.dev",
      "*.cluster-2ywkqesibzdhuvybgxpusl4nj2.cloudworkstations.dev",
      "6000-firebase-clear-path332026-1772579050611.cluster-2ywkqesibzdhuvybgxpusl4nj2.cloudworkstations.dev",
      "*.hosted.app",
      "localhost:9002",
      "localhost:6000"
    ],
  },
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'placehold.co' },
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'picsum.photos' },
      { protocol: 'https', hostname: 'i.postimg.cc' },
      { protocol: 'https', hostname: '*.cloudworkstations.dev' }
    ],
  },
};

export default nextConfig;
