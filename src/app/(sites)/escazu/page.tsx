import type { Metadata } from 'next'
import HeroSection from '@/components/home/HeroSection'
import StatsBar from '@/components/home/StatsBar'
import MarqueeStrip from '@/components/home/MarqueeStrip'
import FeaturedTenants from '@/components/home/FeaturedTenants'
import EditorialSection from '@/components/home/EditorialSection'
import RegionGrid from '@/components/home/RegionGrid'
import { escazuSite } from '@/data/sites/escazu'
import { allTenants } from '@/data/sites/escazu/all'
import { regionCards } from '@/data/sites/escazu/gastronomia'

export const metadata: Metadata = {
  title: 'Momentum Escazú',
  description: 'Calma, bienestar y experiencia premium en Escazú, San José.',
}

export default function EscazuHomePage() {
  // Pull featured from ALL sections — Escazú is services-led, not gastronomia-led
  const featured = allTenants.filter((t) => t.featured)
  const featuredTenants = featured.length >= 4 ? featured : allTenants.slice(0, 4)

  return (
    <>
      <HeroSection site={escazuSite} basePath="/escazu" />
      <MarqueeStrip />
      <StatsBar site={escazuSite} />
      <FeaturedTenants tenants={featuredTenants} basePath="/escazu" siteId="escazu" />
      <EditorialSection basePath="/escazu" site={escazuSite} />
      <MarqueeStrip inverted />
      <RegionGrid cards={regionCards} basePath="/escazu" />
    </>
  )
}
