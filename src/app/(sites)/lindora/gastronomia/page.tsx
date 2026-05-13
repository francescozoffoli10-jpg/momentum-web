import type { Metadata } from 'next'
import PageHeader from '@/components/directory/PageHeader'
import LogoGrid from '@/components/directory/LogoGrid'
import { gastronomia } from '@/data/sites/lindora/gastronomia'

export const metadata: Metadata = {
  title: 'Gastronomía',
  description: 'Restaurantes y cocinas del mundo integrados al ecosistema Momentum. Una experiencia gastronómica curada para todos los gustos.',
}

export default function GastronomíaPage() {
  return (
    <>
      <PageHeader
        eyebrow="Directorio · Lindora"
        title="Gastronomía"
        description="Restaurantes y cocinas del mundo integrados al ecosistema Momentum. Una experiencia gastronómica curada para todos los gustos."
        count={11}
        countLabel="restaurantes"
        sectionLinks={[
    { href: "/lindora/gastronomia", label: "Gastronomía", active: true },
    { href: "/lindora/comercios", label: "Comercios", active: false },
    { href: "/lindora/servicios", label: "Servicios", active: false },
    { href: "/lindora/ofiplaza", label: "Ofiplaza", active: false },
    { href: "/lindora/mediplaza", label: "Mediplaza", active: false },
        ]}
      />
      <LogoGrid tenants={gastronomia} basePath="/lindora" siteId="lindora" />
    </>
  )
}
