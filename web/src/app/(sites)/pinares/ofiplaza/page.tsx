import type { Metadata } from 'next'
import PageHeader from '@/components/directory/PageHeader'
import LogoGrid from '@/components/directory/LogoGrid'
import { ofiplaza } from '@/data/sites/pinares/ofiplaza'

export const metadata: Metadata = {
  title: 'Ofiplaza',
  description: 'Oficinas y espacios de trabajo premium en Momentum Pinares.',
}

export default function OfiplazaPage() {
  return (
    <>
      <PageHeader
        eyebrow="Directorio · Pinares"
        title="Ofiplaza"
        description="Espacios de trabajo premium en una ubicación estratégica en Curridabat."
        count={ofiplaza.length}
        countLabel="espacios"
        sectionLinks={[
          { href: '/pinares/gastronomia', label: 'Gastronomía', active: false },
          { href: '/pinares/comercios',   label: 'Comercios',   active: false },
          { href: '/pinares/servicios',   label: 'Servicios',   active: false },
          { href: '/pinares/torre-medica', label: 'Torre Médica', active: false },
          { href: '/pinares/ofiplaza',    label: 'Ofiplaza',    active: true  },
        ]}
      />
      <LogoGrid tenants={ofiplaza} basePath="/pinares" siteId="pinares" />
    </>
  )
}
