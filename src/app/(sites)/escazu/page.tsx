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
import { fetchFeaturedTenants } from '@/sanity/lib/fetch'

export const revalidate = 300

export const metadata: Metadata = {
  title: 'Momentum Escazú',
  description: 'Calma, bienestar y experiencia premium en Escazú, San José.',
}

export default async function EscazuHomePage() {
  const cmsFeats = await fetchFeaturedTenants('escazu')
  // Use CMS featured if available, fall back to static data
  const featured = cmsFeats.length > 0 ? cmsFeats : allTenants.filter((t) => t.featured)
  const featuredTenants = featured.length >= 4 ? featured.slice(0, 4) : allTenants.slice(0, 4)

  return (
    <>
      <HeroSection site={escazuSite} basePath="/escazu" />
      <MarqueeStrip />
      <StatsBar site={escazuSite} />
      <FeaturedTenants
        tenants={featuredTenants}
        basePath="/escazu"
        siteId="escazu"
        sectionLabel="Lo Mejor de Escazú"
        title="Experiencias que destacan"
        viewAllHref="/escazu/servicios"
        viewAllLabel="Ver directorio"
      />
      <EditorialSection basePath="/escazu" site={escazuSite} />
      <MarqueeStrip inverted />
      <RegionGrid
        cards={regionCards}
        basePath="/escazu"
        gridTitle="Explorá el directorio"
        sectionLabel="Ver todos los servicios"
        sectionHref="/escazu/servicios"
      />
    </>
  )
}
