import type { Metadata } from 'next'
import PageHeader from '@/components/directory/PageHeader'
import LogoGrid from '@/components/directory/LogoGrid'
import { fetchTenantsBySection } from '@/sanity/lib/fetch'
import { oficentro as staticOficentro } from '@/data/sites/escazu/oficentro'
import type { Tenant } from '@/data/types'

export const metadata: Metadata = {
  title: 'Oficentro',
  description: 'Oficinas y empresas premium en Momentum Escazú.',
}

export const revalidate = 3600

export default async function OficentroPage() {
  const sanityTenants = await fetchTenantsBySection('escazu', 'oficentro')
  const tenants: Tenant[] = sanityTenants ?? staticOficentro
  return (
    <>
      <PageHeader
        eyebrow="Directorio · Escazú"
        title="Oficentro"
        description="Empresas, profesionales y oficinas premium integradas al ecosistema."
        count={tenants.length}
        countLabel="empresas"
        sectionLinks={[
          { href: '/escazu/gastronomia',   label: 'Gastronomía',   active: false },
          { href: '/escazu/servicios',     label: 'Servicios',     active: false },
          { href: '/escazu/centro-medico', label: 'Centro Médico', active: false },
          { href: '/escazu/oficentro',     label: 'Oficentro',     active: true  },
        ]}
      />
      <LogoGrid tenants={tenants} basePath="/escazu" siteId="escazu" />
    </>
  )
}
