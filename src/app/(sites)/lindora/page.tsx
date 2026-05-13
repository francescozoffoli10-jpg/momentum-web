import type { Metadata } from 'next'
import HeroSection from '@/components/home/HeroSection'
import StatsBar from '@/components/home/StatsBar'
import MarqueeStrip from '@/components/home/MarqueeStrip'
import FeaturedTenants from '@/components/home/FeaturedTenants'
import EditorialSection from '@/components/home/EditorialSection'
import RegionGrid from '@/components/home/RegionGrid'
import { lindoraSite } from '@/data/sites/lindora'
import { gastronomia, regionCards } from '@/data/sites/lindora/gastronomia'

export const metadata: Metadata = {
  title: 'Momentum Lindora',
  description: 'Un ecosistema de vida premium en Lindora, Santa Ana.',
}

export default function LindoraHomePage() {
  const featured = gastronomia.filter((t) => t.featured)

  return (
    <>
      <HeroSection site={lindoraSite} basePath="/lindora" />
      <MarqueeStrip />
      <StatsBar site={lindoraSite} />
      <FeaturedTenants tenants={featured} basePath="/lindora" siteId="lindora" />
      <EditorialSection basePath="/lindora" site={lindoraSite} />
      <MarqueeStrip inverted />
      <RegionGrid cards={regionCards} basePath="/lindora" />
    </>
  )
}
