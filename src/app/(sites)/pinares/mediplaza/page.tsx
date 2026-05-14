import type { Metadata } from 'next'
import PageHeader from '@/components/directory/PageHeader'
import LogoGrid from '@/components/directory/LogoGrid'
import { mediplaza } from '@/data/sites/pinares/mediplaza'

export const metadata: Metadata = {
  title: 'Mediplaza',
  description: 'Especialistas médicos y servicios de salud en Momentum Pinares.',
}

export default function MediplazaPage() {
  return (
    <>
      <PageHeader
        eyebrow="Directorio · Pinares"
        title="Mediplaza"
        description="Especialistas médicos de alto nivel en el corazón de Curridabat."
        count={mediplaza.length}
        countLabel="especialidades"
        sectionLinks={[
          { href: '/pinares/gastronomia', label: 'Gastronomía', active: false },
          { href: '/pinares/comercios',   label: 'Comercios',   active: false },
          { href: '/pinares/servicios',   label: 'Servicios',   active: false },
          { href: '/pinares/mediplaza',   label: 'Mediplaza',   active: true  },
          { href: '/pinares/ofiplaza',    label: 'Ofiplaza',    active: false },
        ]}
      />
      <LogoGrid tenants={mediplaza} basePath="/pinares" siteId="pinares" />
    </>
  )
}
