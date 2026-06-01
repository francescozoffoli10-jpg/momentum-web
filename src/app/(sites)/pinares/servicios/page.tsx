import type { Metadata } from 'next'
import PageHeader from '@/components/directory/PageHeader'
import LogoGrid from '@/components/directory/LogoGrid'
import { fetchTenantsBySection } from '@/sanity/lib/fetch'
import { servicios as staticServicios } from '@/data/sites/pinares/servicios'
import type { Tenant } from '@/data/types'

export const metadata: Metadata = {
  title: 'Servicios',
  description: 'Fitness, bienestar y servicios especializados en Momentum Pinares.',
}

export const revalidate = 3600

export default async function ServiciosPage() {
  const sanityTenants = await fetchTenantsBySection('pinares', 'servicios')
  const tenants: Tenant[] = sanityTenants ?? staticServicios
  return (
    <>
      <PageHeader
        eyebrow="Directorio · Pinares"
        title="Servicios"
        description="Fitness, bienestar médico y servicios especializados en un solo destino."
        count={tenants.length}
        countLabel="establecimientos"
        sectionLinks={[
          { href: '/pinares/gastronomia', label: 'Gastronomía', active: false },
          { href: '/pinares/comercios',   label: 'Comercios',   active: false },
          { href: '/pinares/servicios',   label: 'Servicios',   active: true  },
          { href: '/pinares/teatro',    label: 'Teatro',      active: false  },
          { href: '/pinares/torre-medica', label: 'Torre Médica', active: false },
          { href: '/pinares/ofiplaza',    label: 'Ofiplaza',    active: false },
        ]}
      />
      <LogoGrid tenants={tenants} basePath="/pinares" siteId="pinares" />
    </>
  )
}
