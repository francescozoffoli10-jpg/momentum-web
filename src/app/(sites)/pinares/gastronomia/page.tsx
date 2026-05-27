import type { Metadata } from 'next'
import PageHeader from '@/components/directory/PageHeader'
import LogoGrid from '@/components/directory/LogoGrid'
import { fetchTenantsBySection } from '@/sanity/lib/fetch'
import { gastronomia as staticGastronomia } from '@/data/sites/pinares/gastronomia'
import type { Tenant } from '@/data/types'

export const metadata: Metadata = {
  title: 'Gastronomía',
  description: 'Restaurantes y opciones gastronómicas en Momentum Pinares.',
}

export const revalidate = 3600

export default async function GastronomiaPage({ searchParams }: { searchParams: Promise<{ cat?: string }> }) {
  const { cat } = await searchParams
  const sanityTenants = await fetchTenantsBySection('pinares', 'gastronomia')
  const tenants: Tenant[] = sanityTenants ?? staticGastronomia
  return (
    <>
      <PageHeader
        eyebrow="Directorio · Pinares"
        title="Gastronomía"
        description="La mayor variedad gastronómica del ecosistema Momentum, toda en Curridabat."
        count={tenants.length}
        countLabel="opciones"
        sectionLinks={[
          { href: '/pinares/gastronomia', label: 'Gastronomía', active: true },
          { href: '/pinares/comercios',   label: 'Comercios',   active: false },
          { href: '/pinares/servicios',   label: 'Servicios',   active: false },
          { href: '/pinares/torre-medica', label: 'Torre Médica', active: false },
          { href: '/pinares/ofiplaza',    label: 'Ofiplaza',    active: false },
        ]}
      />
      <LogoGrid tenants={tenants} basePath="/pinares" siteId="pinares" initialCategory={cat} />
    </>
  )
}
