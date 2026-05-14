import type { Metadata } from 'next'
import PageHeader from '@/components/directory/PageHeader'
import LogoGrid from '@/components/directory/LogoGrid'
import { servicios } from '@/data/sites/escazu/servicios'

export const metadata: Metadata = {
  title: 'Servicios',
  description: 'Fitness, bienestar, estética y servicios en Momentum Escazú.',
}

export default function ServiciosPage() {
  return (
    <>
      <PageHeader
        eyebrow="Directorio · Escazú"
        title="Servicios"
        description="Fitness, bienestar, estética y más en Momentum Escazú."
        count={servicios.length}
        countLabel="servicios"
        sectionLinks={[
          { href: '/escazu/gastronomia',   label: 'Gastronomía',   active: false },
          { href: '/escazu/servicios',     label: 'Servicios',     active: true  },
          { href: '/escazu/centro-medico', label: 'Centro Médico', active: false },
          { href: '/escazu/oficentro',     label: 'Oficentro',     active: false },
        ]}
      />
      <LogoGrid tenants={servicios} basePath="/escazu" siteId="escazu" />
    </>
  )
}
