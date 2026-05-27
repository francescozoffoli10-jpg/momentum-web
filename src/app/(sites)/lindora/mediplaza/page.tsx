import type { Metadata } from 'next'
import PageHeader from '@/components/directory/PageHeader'
import LogoGrid from '@/components/directory/LogoGrid'
import { mediplaza as staticMediplaza } from '@/data/sites/lindora/mediplaza'
import { fetchTenantsBySection } from '@/sanity/lib/fetch'
import type { Tenant } from '@/data/types'

export const metadata: Metadata = {
  title: 'Mediplaza',
  description: 'Especialistas médicos de diferentes áreas bajo un mismo techo. Salud integrada a tu estilo de vida.',
}

// Revalidate every hour so new Sanity tenants appear without a redeploy
export const revalidate = 3600

export default async function MediplazaPage() {
  // Try Sanity first; fall back to static data if CMS is unreachable
  const sanityTenants = await fetchTenantsBySection('lindora', 'mediplaza')
  const tenants: Tenant[] = sanityTenants ?? staticMediplaza

  return (
    <>
      <PageHeader
        eyebrow="Directorio · Lindora"
        title="Mediplaza"
        description="Especialistas médicos de diferentes áreas bajo un mismo techo. Salud integrada a tu estilo de vida."
        count={tenants.length}
        countLabel="especialidades"
        sectionLinks={[
    { href: "/lindora/gastronomia", label: "Gastronomía", active: false },
    { href: "/lindora/comercios", label: "Comercios", active: false },
    { href: "/lindora/servicios", label: "Servicios", active: false },
    { href: "/lindora/ofiplaza", label: "Ofiplaza", active: false },
    { href: "/lindora/mediplaza", label: "Mediplaza", active: true },
        ]}
      />
      <LogoGrid tenants={tenants} basePath="/lindora" siteId="lindora" />
    </>
  )
}
