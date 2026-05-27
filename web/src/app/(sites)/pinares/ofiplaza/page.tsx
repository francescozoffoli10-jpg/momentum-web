import type { Metadata } from 'next'
import PageHeader from '@/components/directory/PageHeader'
import LogoGrid from '@/components/directory/LogoGrid'
import { ofiplaza as staticOfiplaza } from '@/data/sites/pinares/ofiplaza'
import { fetchTenantsBySection } from '@/sanity/lib/fetch'
import type { Tenant } from '@/data/types'

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'Ofiplaza',
  description: 'Oficinas y espacios de trabajo premium en Momentum Pinares.',
}

export default async function OfiplazaPage() {
  const sanityTenants = await fetchTenantsBySection('pinares', 'ofiplaza')
  const tenants: Tenant[] = sanityTenants ?? staticOfiplaza

  return (
    <>
      <PageHeader
        eyebrow="Directorio · Pinares"
        title="Ofiplaza"
        description="Espacios de trabajo premium en una ubicación estratégica en Curridabat."
        count={tenants.length}
        countLabel="espacios"
        sectionLinks={[
          { href: '/pinares/gastronomia', label: 'Gastronomía', active: false },
          { href: '/pinares/comercios',   label: 'Comercios',   active: false },
          { href: '/pinares/servicios',   label: 'Servicios',   active: false },
          { href: '/pinares/torre-medica', label: 'Torre Médica', active: false },
          { href: '/pinares/ofiplaza',    label: 'Ofiplaza',    active: true  },
        ]}
      />
      <LogoGrid tenants={tenants} basePath="/pinares" siteId="pinares" />
    </>
  )
}
