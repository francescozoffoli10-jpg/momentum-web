import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // Skip ESLint and TypeScript errors during build
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },

  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 2592000, // 30 days for optimized images
    deviceSizes: [640, 828, 1080, 1200, 1920],
    imageSizes: [64, 96, 128, 256, 384],
    remotePatterns: [
      { protocol: 'https', hostname: 'cdn.sanity.io' },
      { protocol: 'https', hostname: 'images.unsplash.com' },
    ],
  },

  async redirects() {
    return [
      // /pinares/mediplaza → /pinares/torre-medica (renamed section)
      {
        source: '/pinares/mediplaza',
        destination: '/pinares/torre-medica',
        permanent: true,
      },
    ]
  },

  async headers() {
    return [
      {
        source: '/sites/:path*',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
      {
        source: '/brand/:path*',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
    ]
  },
}

export default nextConfig
