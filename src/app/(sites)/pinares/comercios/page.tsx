import type { Metadata } from 'next'
import PageHeader from '@/components/directory/PageHeader'
import LogoGrid from '@/components/directory/LogoGrid'
import { fetchTenantsBySection } from '@/sanity/lib/fetch'
import { comercios as staticComercios } from '@/data/sites/pinares/comercios'
import type { Tenant } from '@/data/types'

export const metadata: Metadata = {
  title: 'Comercios',
  description: 'Tiendas, moda y servicios en Momentum Pinares.',
}

export const revalidate = 3600

export default async function ComerciosPage() {
  const sanityTenants = await fetchTenantsBySection('pinares', 'comercios')
  const tenants: Tenant[] = sanityTenants ?? staticComercios
  return (
    <>
      <PageHeader
        eyebrow="Directorio · Pinares"
        title="Comercios"
        description="Moda, hogar, servicios y mucho más en Momentum Pinares."
        count={tenants.length}
        countLabel="comercios"
        sectionLinks={[
          { href: '/pinares/gastronomia', label: 'Gastronomía', active: false },
          { href: '/pinares/comercios',   label: 'Comercios',   active: true },
          { href: '/pinares/servicios',   label: 'Servicios',   active: false },
          { href: '/pinares/teatro',    label: 'Teatro',      active: false  },
          { href: '/pinares/torre-medica', label: 'Torre Médica', active: false },
          { href: '/pinares/ofiplaza',    label: 'Ofiplaza',    active: false },
        ]}
      />
      <LogoGrid tenants={tenants} basePath="/pinares" siteId="pinares" />
    </>
  )
}
