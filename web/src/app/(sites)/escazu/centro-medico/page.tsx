import type { Metadata } from 'next'
import PageHeader from '@/components/directory/PageHeader'
import LogoGrid from '@/components/directory/LogoGrid'
import { centroMedico } from '@/data/sites/escazu/centro-medico'

export const metadata: Metadata = {
  title: 'Centro Médico',
  description: 'Especialistas médicos, laboratorio, dermatología, oncología y más en el Centro Médico de Momentum Escazú.',
}

export default function CentroMedicoPage() {
  return (
    <>
      <PageHeader
        eyebrow="Directorio · Escazú"
        title="Centro Médico"
        description="Especialistas médicos y servicios de salud de alto nivel en Momentum Escazú."
        count={centroMedico.length}
        countLabel="especialistas"
        sectionLinks={[
          { href: '/escazu/gastronomia',   label: 'Gastronomía',   active: false },
          { href: '/escazu/servicios',     label: 'Servicios',     active: false },
          { href: '/escazu/centro-medico', label: 'Centro Médico', active: true  },
          { href: '/escazu/oficentro',     label: 'Oficentro',     active: false },
        ]}
      />
      <LogoGrid tenants={centroMedico} basePath="/escazu" siteId="escazu" />
    </>
  )
}
