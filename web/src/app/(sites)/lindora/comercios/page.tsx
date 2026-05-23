import type { Metadata } from 'next'
import PageHeader from '@/components/directory/PageHeader'
import LogoGrid from '@/components/directory/LogoGrid'
import { comercios } from '@/data/sites/lindora/comercios'

export const metadata: Metadata = {
  title: 'Comercios',
  description: 'Tiendas curadas que complementan tu estilo de vida. Moda, tecnología, automóviles y mucho más.',
}

export default function ComerciosPage() {
  return (
    <>
      <PageHeader
        eyebrow="Directorio · Lindora"
        title="Comercios"
        description="Tiendas curadas que complementan tu estilo de vida. Moda, tecnología, automóviles y mucho más."
        count={comercios.length}
        countLabel="establecimientos"
        sectionLinks={[
    { href: "/lindora/gastronomia", label: "Gastronomía", active: false },
    { href: "/lindora/comercios", label: "Comercios", active: true },
    { href: "/lindora/servicios", label: "Servicios", active: false },
    { href: "/lindora/ofiplaza", label: "Ofiplaza", active: false },
    { href: "/lindora/mediplaza", label: "Mediplaza", active: false },
        ]}
      />
      <LogoGrid tenants={comercios} basePath="/lindora" siteId="lindora" />
    </>
  )
}
