import type { Metadata } from 'next'
import HeroSection from '@/components/home/HeroSection'
import StatsBar from '@/components/home/StatsBar'
import MarqueeStrip from '@/components/home/MarqueeStrip'
import FeaturedTenants from '@/components/home/FeaturedTenants'
import EditorialSection from '@/components/home/EditorialSection'
import RegionGrid from '@/components/home/RegionGrid'
import { lindoraSite } from '@/data/sites/lindora'
import { gastronomia, regionCards } from '@/data/sites/lindora/gastronomia'
import { fetchFeaturedTenants } from '@/sanity/lib/fetch'

export const revalidate = 300

export const metadata: Metadata = {
  title: 'Momentum Lindora',
  description: 'Un ecosistema de vida premium en Lindora, Santa Ana.',
}

export default async function LindoraHomePage() {
  const cmsFeats = await fetchFeaturedTenants('lindora')
  // Use CMS featured if available, fall back to static data
  const featured = cmsFeats.length > 0 ? cmsFeats : gastronomia.filter((t) => t.featured)
  const featuredTenants = featured.length >= 4 ? featured.slice(0, 4) : gastronomia.slice(0, 4)

  return (
    <>
      <HeroSection site={lindoraSite} basePath="/lindora" />
      <MarqueeStrip />
      <StatsBar site={lindoraSite} />
      <FeaturedTenants tenants={featuredTenants} basePath="/lindora" siteId="lindora" />
      <EditorialSection basePath="/lindora" site={lindoraSite} />
      <MarqueeStrip inverted />
      <RegionGrid cards={regionCards} basePath="/lindora" />
    </>
  )
}
