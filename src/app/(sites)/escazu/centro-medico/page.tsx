import type { Metadata } from 'next'
import PageHeader from '@/components/directory/PageHeader'
import LogoGrid from '@/components/directory/LogoGrid'
import HuliSearchbox from '@/components/huli/HuliSearchbox'
import { fetchTenantsBySection } from '@/sanity/lib/fetch'
import { centroMedico as staticCentroMedico } from '@/data/sites/escazu/centro-medico'
import type { Tenant } from '@/data/types'

export const metadata: Metadata = {
  title: 'Centro Médico',
  description: 'Especialistas médicos, laboratorio, dermatología, oncología y más en el Centro Médico de Momentum Escazú.',
}

export const revalidate = 3600

export default async function CentroMedicoPage() {
  const sanityTenants = await fetchTenantsBySection('escazu', 'centro-medico')
  const tenants: Tenant[] = sanityTenants ?? staticCentroMedico
  return (
    <>
      <PageHeader
        eyebrow="Directorio · Escazú"
        title="Centro Médico"
        description="Especialistas médicos y servicios de salud de alto nivel en Momentum Escazú."
        count={tenants.length}
        countLabel="especialistas"
        sectionLinks={[
          { href: '/escazu/gastronomia',   label: 'Gastronomía',   active: false },
          { href: '/escazu/servicios',     label: 'Servicios',     active: false },
          { href: '/escazu/centro-medico', label: 'Centro Médico', active: true  },
          { href: '/escazu/oficentro',     label: 'Oficentro',     active: false },
        ]}
      />
      <HuliSearchbox
        dataSite="momentum-escazu"
        accentColor="#56717A"
        label="Buscá tu especialista médico"
        sublabel="Consultá perfiles, horarios y agendá tu cita en línea a través de nuestra plataforma Huli."
      />
      <LogoGrid tenants={tenants} basePath="/escazu" siteId="escazu" />
    </>
  )
}
