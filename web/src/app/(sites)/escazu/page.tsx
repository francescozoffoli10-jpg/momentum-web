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
  // Curated cross-section: food + wellness + medical — 4 strong picks
  const featured = allTenants.filter((t) => t.featured).slice(0, 4)
  const featuredTenants = featured.length >= 4 ? featured : allTenants.slice(0, 4)

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
        gridTitle="Explora el directorio"
        sectionLabel="Ver todos los servicios"
        sectionHref="/escazu/servicios"
      />
    </>
  )
}
