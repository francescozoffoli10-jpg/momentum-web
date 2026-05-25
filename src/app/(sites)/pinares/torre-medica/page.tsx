import type { Metadata } from 'next'
import PageHeader from '@/components/directory/PageHeader'
import LogoGrid from '@/components/directory/LogoGrid'
import HuliSearchbox from '@/components/huli/HuliSearchbox'
import { torreMedica } from '@/data/sites/pinares/torre-medica'

export const metadata: Metadata = {
  title: 'Torre Médica',
  description: 'Torre Médica Momentum Pinares — 47+ especialidades médicas, laboratorio, radiología, cirugía ambulatoria y agendamiento en línea.',
}

export default function TorreMedicaPage() {
  return (
    <>
      <PageHeader
        eyebrow="Directorio · Pinares"
        title="Torre Médica"
        description="8 pisos de servicios médicos especializados en el corazón de Curridabat. 47+ especialidades y agendamiento en línea."
        count={torreMedica.length}
        countLabel="especialistas"
        sectionLinks={[
          { href: '/pinares/gastronomia',  label: 'Gastronomía',  active: false },
          { href: '/pinares/comercios',    label: 'Comercios',    active: false },
          { href: '/pinares/servicios',    label: 'Servicios',    active: false },
          { href: '/pinares/torre-medica', label: 'Torre Médica', active: true  },
          { href: '/pinares/ofiplaza',     label: 'Ofiplaza',     active: false },
        ]}
      />
      <HuliSearchbox
        dataSite="torre-medica-momentum"
        accentColor="#4F5B3E"
        label="Buscá tu especialista médico"
        sublabel="Consultá perfiles, horarios y agendá tu cita en línea a través de nuestra plataforma Huli."
      />
      <LogoGrid tenants={torreMedica} basePath="/pinares" siteId="pinares" />
    </>
  )
}
