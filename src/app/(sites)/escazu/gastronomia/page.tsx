import type { Metadata } from 'next'
import PageHeader from '@/components/directory/PageHeader'
import LogoGrid from '@/components/directory/LogoGrid'
import { fetchTenantsBySection } from '@/sanity/lib/fetch'
import { gastronomia as staticGastronomia } from '@/data/sites/escazu/gastronomia'
import type { Tenant } from '@/data/types'

export const metadata: Metadata = {
  title: 'Gastronomía',
  description: 'Restaurantes y cafés curados en Momentum Escazú.',
}

export const revalidate = 3600

export default async function GastronomiaPage({ searchParams }: { searchParams: Promise<{ cat?: string }> }) {
  const { cat } = await searchParams
  const sanityTenants = await fetchTenantsBySection('escazu', 'gastronomia')
  const tenants: Tenant[] = sanityTenants ?? staticGastronomia
  return (
    <>
      <PageHeader
        eyebrow="Directorio · Escazú"
        title="Gastronomía"
        description="Cocina de autor, restaurantes y cafés en el corazón de Escazú."
        count={tenants.length}
        countLabel="restaurantes"
        sectionLinks={[
          { href: '/escazu/gastronomia',   label: 'Gastronomía',   active: true  },
          { href: '/escazu/servicios',     label: 'Servicios',     active: false },
          { href: '/escazu/centro-medico', label: 'Centro Médico', active: false },
          { href: '/escazu/oficentro',     label: 'Oficentro',     active: false },
        ]}
      />
      <LogoGrid tenants={tenants} basePath="/escazu" siteId="escazu" initialCategory={cat} />
    </>
  )
}
