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

      {/* Prominent Huli CTA */}
      <div style={{ background: '#fff', borderBottom: '0.5px solid var(--brd)', padding: '32px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
          <div>
            <div style={{ fontSize: 15, fontWeight: 400, color: 'var(--text)', marginBottom: 4 }}>
              Agendá tu cita en línea con cualquier especialista
            </div>
            <div style={{ fontSize: 13, color: 'var(--mt)', fontWeight: 300 }}>
              Consultá perfiles, horarios y disponibilidad en tiempo real a través de Huli.
            </div>
          </div>
          <a
            href="https://directorio.momentumescazu.com"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 10,
              padding: '13px 28px',
              background: 'var(--a)',
              color: '#fff',
              fontSize: 11, fontWeight: 600, letterSpacing: '0.12em',
              textTransform: 'uppercase', borderRadius: 2, textDecoration: 'none',
              whiteSpace: 'nowrap', flexShrink: 0,
            }}
          >
            Buscá tu doctor
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
              <path d="M2 6.5h9M7.5 2.5l4 4-4 4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </div>
      </div>

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
