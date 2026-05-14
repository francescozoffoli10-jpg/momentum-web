import type { Metadata } from 'next'
import PageHeader from '@/components/directory/PageHeader'
import LogoGrid from '@/components/directory/LogoGrid'
import { gastronomia } from '@/data/sites/pinares/gastronomia'

export const metadata: Metadata = {
  title: 'Gastronomía',
  description: 'Restaurantes y opciones gastronómicas en Momentum Pinares.',
}

export default function GastronomiaPage() {
  return (
    <>
      <PageHeader
        eyebrow="Directorio · Pinares"
        title="Gastronomía"
        description="La mayor variedad gastronómica del ecosistema Momentum, toda en Curridabat."
        count={gastronomia.length}
        countLabel="opciones"
        sectionLinks={[
          { href: '/pinares/gastronomia', label: 'Gastronomía', active: true },
          { href: '/pinares/comercios',   label: 'Comercios',   active: false },
          { href: '/pinares/servicios',   label: 'Servicios',   active: false },
          { href: '/pinares/mediplaza',   label: 'Mediplaza',   active: false },
          { href: '/pinares/ofiplaza',    label: 'Ofiplaza',    active: false },
        ]}
      />
      <LogoGrid tenants={gastronomia} basePath="/pinares" siteId="pinares" />
    </>
  )
}
