import type { Metadata } from 'next'
import HeroSection from '@/components/home/HeroSection'
import StatsBar from '@/components/home/StatsBar'
import MarqueeStrip from '@/components/home/MarqueeStrip'
import FeaturedTenants from '@/components/home/FeaturedTenants'
import EditorialSection from '@/components/home/EditorialSection'
import RegionGrid from '@/components/home/RegionGrid'
import { pinaresSite } from '@/data/sites/pinares'
import { gastronomia, regionCards } from '@/data/sites/pinares/gastronomia'

export const metadata: Metadata = {
  title: 'Momentum Pinares',
  description: 'Variedad, dinamismo y todo en un solo lugar en Curridabat, San José.',
}

export default function PinaresHomePage() {
  const featured = gastronomia.filter((t) => t.featured)
  const featuredTenants = featured.length >= 4 ? featured : gastronomia.slice(0, 4)

  return (
    <>
      <HeroSection site={pinaresSite} basePath="/pinares" />
      <MarqueeStrip />
      <StatsBar site={pinaresSite} />
      <FeaturedTenants tenants={featuredTenants} basePath="/pinares" siteId="pinares" />
      <EditorialSection basePath="/pinares" site={pinaresSite} />
      <MarqueeStrip inverted />
      <RegionGrid cards={regionCards} basePath="/pinares" />
    </>
  )
}
