import type { Metadata } from 'next'
import PageHeader from '@/components/directory/PageHeader'
import LogoGrid from '@/components/directory/LogoGrid'
import { servicios as staticServicios } from '@/data/sites/lindora/servicios'
import { fetchTenantsBySection } from '@/sanity/lib/fetch'
import type { Tenant } from '@/data/types'

export const metadata: Metadata = {
  title: 'Servicios',
  description: 'Todo lo que necesitas, en un solo lugar. Banca, belleza, bienestar, tatuajes y mucho más.',
}

// Revalidate every hour so new Sanity tenants appear without a redeploy
export const revalidate = 3600

export default async function ServiciosPage() {
  // Try Sanity first; fall back to static data if CMS is unreachable
  const sanityTenants = await fetchTenantsBySection('lindora', 'servicios')
  const tenants: Tenant[] = sanityTenants ?? staticServicios

  return (
    <>
      <PageHeader
        eyebrow="Directorio · Lindora"
        title="Servicios"
        description="Todo lo que necesitas, en un solo lugar. Banca, belleza, bienestar, tatuajes y mucho más."
        count={tenants.length}
        countLabel="establecimientos"
        sectionLinks={[
    { href: "/lindora/gastronomia", label: "Gastronomía", active: false },
    { href: "/lindora/comercios", label: "Comercios", active: false },
    { href: "/lindora/servicios", label: "Servicios", active: true },
    { href: "/lindora/ofiplaza", label: "Ofiplaza", active: false },
    { href: "/lindora/mediplaza", label: "Mediplaza", active: false },
        ]}
      />
      <LogoGrid tenants={tenants} basePath="/lindora" siteId="lindora" />
    </>
  )
}
