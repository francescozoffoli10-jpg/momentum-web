import type { Metadata } from 'next'
import PageHeader from '@/components/directory/PageHeader'
import LogoGrid from '@/components/directory/LogoGrid'
import { mediplaza } from '@/data/sites/lindora/mediplaza'

export const metadata: Metadata = {
  title: 'Mediplaza',
  description: 'Especialistas médicos de diferentes áreas bajo un mismo techo. Salud integrada a tu estilo de vida.',
}

export default function MediplazaPage() {
  return (
    <>
      <PageHeader
        eyebrow="Directorio · Lindora"
        title="Mediplaza"
        description="Especialistas médicos de diferentes áreas bajo un mismo techo. Salud integrada a tu estilo de vida."
        count={mediplaza.length}
        countLabel="especialidades"
        sectionLinks={[
    { href: "/lindora/gastronomia", label: "Gastronomía", active: false },
    { href: "/lindora/comercios", label: "Comercios", active: false },
    { href: "/lindora/servicios", label: "Servicios", active: false },
    { href: "/lindora/ofiplaza", label: "Ofiplaza", active: false },
    { href: "/lindora/mediplaza", label: "Mediplaza", active: true },
        ]}
      />
      <LogoGrid tenants={mediplaza} basePath="/lindora" siteId="lindora" />
    </>
  )
}
