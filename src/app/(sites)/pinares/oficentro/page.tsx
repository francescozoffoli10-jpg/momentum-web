import type { Metadata } from 'next'
import PageHeader from '@/components/directory/PageHeader'
import LogoGrid from '@/components/directory/LogoGrid'
import { ofiplaza as staticOfiplaza } from '@/data/sites/pinares/ofiplaza'
import { fetchTenantsBySection } from '@/sanity/lib/fetch'
import type { Tenant } from '@/data/types'

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'Oficentro',
  description: 'Oficentro premium en Momentum Pinares — espacios de trabajo estratégicos en Curridabat.',
}

export default async function OficentriPage() {
  const sanityTenants = await fetchTenantsBySection('pinares', 'oficentro')
  const tenants: Tenant[] = sanityTenants ?? staticOfiplaza

  return (
    <>
      <PageHeader
        eyebrow="Directorio · Pinares"
        title="Oficentro"
        description="Espacios de trabajo premium en una ubicación estratégica en Curridabat."
        count={tenants.length}
        countLabel="espacios"
        sectionLinks={[
          { href: '/pinares/gastronomia',  label: 'Gastronomía',  active: false },
          { href: '/pinares/comercios',    label: 'Comercios',    active: false },
          { href: '/pinares/servicios',    label: 'Servicios',    active: false },
          { href: '/pinares/teatro',       label: 'Teatro',       active: false },
          { href: '/pinares/torre-medica', label: 'Torre Médica', active: false },
          { href: '/pinares/oficentro',    label: 'Oficentro',    active: true  },
        ]}
      />
      <LogoGrid tenants={tenants} basePath="/pinares" siteId="pinares" />
    </>
  )
}
