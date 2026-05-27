import type { Metadata } from 'next'
import PageHeader from '@/components/directory/PageHeader'
import LogoGrid from '@/components/directory/LogoGrid'
import { ofiplaza as staticOfiplaza } from '@/data/sites/lindora/ofiplaza'
import { fetchTenantsBySection } from '@/sanity/lib/fetch'
import type { Tenant } from '@/data/types'

export const metadata: Metadata = {
  title: 'Ofiplaza',
  description: 'Un ecosistema de oficinas y empresas integradas al ritmo del centro. Trabaja, come y vive sin salir de Momentum.',
}

// Revalidate every hour so new Sanity tenants appear without a redeploy
export const revalidate = 3600

export default async function OfiplazaPage() {
  // Try Sanity first; fall back to static data if CMS is unreachable
  const sanityTenants = await fetchTenantsBySection('lindora', 'ofiplaza')
  const tenants: Tenant[] = sanityTenants ?? staticOfiplaza

  return (
    <>
      <PageHeader
        eyebrow="Directorio · Lindora"
        title="Ofiplaza"
        description="Un ecosistema de oficinas y empresas integradas al ritmo del centro. Trabaja, come y vive sin salir de Momentum."
        count={tenants.length}
        countLabel="empresas"
        sectionLinks={[
    { href: "/lindora/gastronomia", label: "Gastronomía", active: false },
    { href: "/lindora/comercios", label: "Comercios", active: false },
    { href: "/lindora/servicios", label: "Servicios", active: false },
    { href: "/lindora/ofiplaza", label: "Ofiplaza", active: true },
    { href: "/lindora/mediplaza", label: "Mediplaza", active: false },
        ]}
      />
      <LogoGrid tenants={tenants} basePath="/lindora" siteId="lindora" />
    </>
  )
}
