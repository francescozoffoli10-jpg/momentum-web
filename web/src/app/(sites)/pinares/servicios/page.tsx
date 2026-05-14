import type { Metadata } from 'next'
import PageHeader from '@/components/directory/PageHeader'
import LogoGrid from '@/components/directory/LogoGrid'
import { servicios } from '@/data/sites/pinares/servicios'

export const metadata: Metadata = {
  title: 'Servicios',
  description: 'Fitness, bienestar y servicios especializados en Momentum Pinares.',
}

export default function ServiciosPage() {
  return (
    <>
      <PageHeader
        eyebrow="Directorio · Pinares"
        title="Servicios"
        description="Fitness, bienestar médico y servicios especializados en un solo destino."
        count={servicios.length}
        countLabel="establecimientos"
        sectionLinks={[
          { href: '/pinares/gastronomia', label: 'Gastronomía', active: false },
          { href: '/pinares/comercios',   label: 'Comercios',   active: false },
          { href: '/pinares/servicios',   label: 'Servicios',   active: true  },
          { href: '/pinares/torre-medica', label: 'Torre Médica', active: false },
          { href: '/pinares/ofiplaza',    label: 'Ofiplaza',    active: false },
        ]}
      />
      <LogoGrid tenants={servicios} basePath="/pinares" siteId="pinares" />
    </>
  )
}
