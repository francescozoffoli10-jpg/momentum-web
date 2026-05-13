import type { Metadata } from 'next'
import PageHeader from '@/components/directory/PageHeader'
import LogoGrid from '@/components/directory/LogoGrid'
import { servicios } from '@/data/sites/lindora/servicios'

export const metadata: Metadata = {
  title: 'Servicios',
  description: 'Todo lo que necesitas, en un solo lugar. Banca, belleza, bienestar, tatuajes y mucho más.',
}

export default function ServiciosPage() {
  return (
    <>
      <PageHeader
        eyebrow="Directorio · Lindora"
        title="Servicios"
        description="Todo lo que necesitas, en un solo lugar. Banca, belleza, bienestar, tatuajes y mucho más."
        count={9}
        countLabel="establecimientos"
        sectionLinks={[
    { href: "/lindora/gastronomia", label: "Gastronomía", active: false },
    { href: "/lindora/comercios", label: "Comercios", active: false },
    { href: "/lindora/servicios", label: "Servicios", active: true },
    { href: "/lindora/ofiplaza", label: "Ofiplaza", active: false },
    { href: "/lindora/mediplaza", label: "Mediplaza", active: false },
        ]}
      />
      <LogoGrid tenants={servicios} basePath="/lindora" siteId="lindora" />
    </>
  )
}
