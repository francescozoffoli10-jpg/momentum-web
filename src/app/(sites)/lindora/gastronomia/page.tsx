import type { Metadata } from 'next'
import PageHeader from '@/components/directory/PageHeader'
import LogoGrid from '@/components/directory/LogoGrid'
import { gastronomia as staticGastronomia } from '@/data/sites/lindora/gastronomia'
import { fetchTenantsBySection } from '@/sanity/lib/fetch'
import type { Tenant } from '@/data/types'

export const metadata: Metadata = {
  title: 'Gastronomía',
  description: 'Restaurantes y cocinas del mundo integrados al ecosistema Momentum. Una experiencia gastronómica curada para todos los gustos.',
}

// Revalidate every hour so new Sanity tenants appear without a redeploy
export const revalidate = 3600

export default async function GastronomíaPage({ searchParams }: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) {
  const params = await searchParams
  const cat = typeof params.cat === 'string' ? params.cat : undefined
  // Try Sanity first; fall back to static data if CMS is unreachable
  const sanityTenants = await fetchTenantsBySection('lindora', 'gastronomia')
  const tenants: Tenant[] = sanityTenants ?? staticGastronomia

  return (
    <>
      <PageHeader
        eyebrow="Directorio · Lindora"
        title="Gastronomía"
        description="Restaurantes y cocinas del mundo integrados al ecosistema Momentum. Una experiencia gastronómica curada para todos los gustos."
        count={tenants.length}
        countLabel="restaurantes"
        sectionLinks={[
    { href: "/lindora/gastronomia", label: "Gastronomía", active: true },
    { href: "/lindora/comercios", label: "Comercios", active: false },
    { href: "/lindora/servicios", label: "Servicios", active: false },
    { href: "/lindora/ofiplaza", label: "Ofiplaza", active: false },
    { href: "/lindora/mediplaza", label: "Mediplaza", active: false },
        ]}
      />
      <LogoGrid tenants={tenants} basePath="/lindora" siteId="lindora" initialCategory={cat} />
    </>
  )
}
