import type { Metadata } from 'next'
import PageHeader from '@/components/directory/PageHeader'
import LogoGrid from '@/components/directory/LogoGrid'
import { servicios } from '@/data/sites/escazu/servicios'

export const metadata: Metadata = {
  title: 'Servicios',
  description: 'Salud, bienestar y servicios especializados en Momentum Escazú.',
}

export default function ServiciosPage() {
  return (
    <>
      <PageHeader
        eyebrow="Directorio · Escazú"
        title="Servicios"
        description="Especialistas en salud, bienestar y servicios médicos de calidad."
        count={servicios.length}
        countLabel="servicios"
        sectionLinks={[
    { href: "/escazu/gastronomia", label: "Gastronomía", active: false },
    { href: "/escazu/servicios", label: "Servicios", active: true },
    { href: "/escazu/oficentro", label: "Oficentro", active: false },
        ]}
      />
      <LogoGrid tenants={servicios} basePath="/escazu" siteId="escazu" />
    </>
  )
}
