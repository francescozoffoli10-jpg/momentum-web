import type { Metadata } from 'next'
import PageHeader from '@/components/directory/PageHeader'
import LogoGrid from '@/components/directory/LogoGrid'
import { gastronomia } from '@/data/sites/escazu/gastronomia'

export const metadata: Metadata = {
  title: 'Gastronomía',
  description: 'Restaurantes y cafés curados en Momentum Escazú.',
}

export default function GastronomiaPage({ searchParams }: { searchParams: { cat?: string } }) {
  return (
    <>
      <PageHeader
        eyebrow="Directorio · Escazú"
        title="Gastronomía"
        description="Cocina de autor, restaurantes y cafés en el corazón de Escazú."
        count={gastronomia.length}
        countLabel="restaurantes"
        sectionLinks={[
          { href: '/escazu/gastronomia',   label: 'Gastronomía',   active: true  },
          { href: '/escazu/servicios',     label: 'Servicios',     active: false },
          { href: '/escazu/centro-medico', label: 'Centro Médico', active: false },
          { href: '/escazu/oficentro',     label: 'Oficentro',     active: false },
        ]}
      />
      <LogoGrid tenants={gastronomia} basePath="/escazu" siteId="escazu" initialCategory={searchParams.cat} />
    </>
  )
}
