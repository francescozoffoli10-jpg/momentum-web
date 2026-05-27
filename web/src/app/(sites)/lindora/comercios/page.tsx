import type { Metadata } from 'next'
import PageHeader from '@/components/directory/PageHeader'
import LogoGrid from '@/components/directory/LogoGrid'
import { comercios as staticComercios } from '@/data/sites/lindora/comercios'
import { fetchTenantsBySection } from '@/sanity/lib/fetch'
import type { Tenant } from '@/data/types'

export const metadata: Metadata = {
  title: 'Comercios',
  description: 'Tiendas curadas que complementan tu estilo de vida. Moda, tecnología, automóviles y mucho más.',
}

// Revalidate every hour so new Sanity tenants appear without a redeploy
export const revalidate = 3600

export default async function ComerciosPage() {
  // Try Sanity first; fall back to static data if CMS is unreachable
  const sanityTenants = await fetchTenantsBySection('lindora', 'comercios')
  const tenants: Tenant[] = sanityTenants ?? staticComercios

  return (
    <>
      <PageHeader
        eyebrow="Directorio · Lindora"
        title="Comercios"
        description="Tiendas curadas que complementan tu estilo de vida. Moda, tecnología, automóviles y mucho más."
        count={tenants.length}
        countLabel="establecimientos"
        sectionLinks={[
    { href: "/lindora/gastronomia", label: "Gastronomía", active: false },
    { href: "/lindora/comercios", label: "Comercios", active: true },
    { href: "/lindora/servicios", label: "Servicios", active: false },
    { href: "/lindora/ofiplaza", label: "Ofiplaza", active: false },
    { href: "/lindora/mediplaza", label: "Mediplaza", active: false },
        ]}
      />
      <LogoGrid tenants={tenants} basePath="/lindora" siteId="lindora" />
    </>
  )
}
