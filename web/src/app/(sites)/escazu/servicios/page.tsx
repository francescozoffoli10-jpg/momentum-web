import type { Metadata } from 'next'
import PageHeader from '@/components/directory/PageHeader'
import LogoGrid from '@/components/directory/LogoGrid'
import { fetchTenantsBySection } from '@/sanity/lib/fetch'
import { servicios as staticServicios } from '@/data/sites/escazu/servicios'
import type { Tenant } from '@/data/types'

export const metadata: Metadata = {
  title: 'Servicios',
  description: 'Fitness, bienestar, estética y servicios en Momentum Escazú.',
}

export const revalidate = 3600

export default async function ServiciosPage() {
  const sanityTenants = await fetchTenantsBySection('escazu', 'servicios')
  const tenants: Tenant[] = sanityTenants ?? staticServicios
  return (
    <>
      <PageHeader
        eyebrow="Directorio · Escazú"
        title="Servicios"
        description="Fitness, bienestar, estética y más en Momentum Escazú."
        count={tenants.length}
        countLabel="servicios"
        sectionLinks={[
          { href: '/escazu/gastronomia',   label: 'Gastronomía',   active: false },
          { href: '/escazu/servicios',     label: 'Servicios',     active: true  },
          { href: '/escazu/centro-medico', label: 'Centro Médico', active: false },
          { href: '/escazu/oficentro',     label: 'Oficentro',     active: false },
        ]}
      />
      <LogoGrid tenants={tenants} basePath="/escazu" siteId="escazu" />
    </>
  )
}
