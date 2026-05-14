import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 2592000, // 30 days for optimized images
    deviceSizes: [640, 828, 1080, 1200, 1920],
    imageSizes: [64, 96, 128, 256, 384],
    remotePatterns: [
      // Sanity CDN — for images served via sanityClient queries
      { protocol: 'https', hostname: 'cdn.sanity.io' },
      // Unsplash — for curated tenant stock photos
      { protocol: 'https', hostname: 'images.unsplash.com' },
    ],
  },
  // Long-lived caching for static assets
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
