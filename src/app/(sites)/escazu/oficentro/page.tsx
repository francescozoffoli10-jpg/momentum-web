import type { Metadata } from 'next'
import PageHeader from '@/components/directory/PageHeader'
import LogoGrid from '@/components/directory/LogoGrid'
import { oficentro } from '@/data/sites/escazu/oficentro'

export const metadata: Metadata = {
  title: 'Oficentro',
  description: 'Oficinas y empresas premium en Momentum Escazú.',
}

export default function OficentroPage() {
  return (
    <>
      <PageHeader
        eyebrow="Directorio · Escazú"
        title="Oficentro"
        description="Empresas, profesionales y oficinas premium integradas al ecosistema."
        count={oficentro.length}
        countLabel="empresas"
        sectionLinks={[
    { href: "/escazu/gastronomia", label: "Gastronomía", active: false },
    { href: "/escazu/servicios", label: "Servicios", active: false },
    { href: "/escazu/oficentro", label: "Oficentro", active: true },
        ]}
      />
      <LogoGrid tenants={oficentro} basePath="/escazu" siteId="escazu" />
    </>
  )
}
