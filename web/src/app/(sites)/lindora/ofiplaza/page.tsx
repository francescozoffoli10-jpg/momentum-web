import type { Metadata } from 'next'
import PageHeader from '@/components/directory/PageHeader'
import LogoGrid from '@/components/directory/LogoGrid'
import { ofiplaza } from '@/data/sites/lindora/ofiplaza'

export const metadata: Metadata = {
  title: 'Ofiplaza',
  description: 'Un ecosistema de oficinas y empresas integradas al ritmo del centro. Trabaja, come y vive sin salir de Momentum.',
}

export default function OfiplazaPage() {
  return (
    <>
      <PageHeader
        eyebrow="Directorio · Lindora"
        title="Ofiplaza"
        description="Un ecosistema de oficinas y empresas integradas al ritmo del centro. Trabaja, come y vive sin salir de Momentum."
        count={ofiplaza.length}
        countLabel="empresas"
        sectionLinks={[
    { href: "/lindora/gastronomia", label: "Gastronomía", active: false },
    { href: "/lindora/comercios", label: "Comercios", active: false },
    { href: "/lindora/servicios", label: "Servicios", active: false },
    { href: "/lindora/ofiplaza", label: "Ofiplaza", active: true },
    { href: "/lindora/mediplaza", label: "Mediplaza", active: false },
        ]}
      />
      <LogoGrid tenants={ofiplaza} basePath="/lindora" siteId="lindora" />
    </>
  )
}
