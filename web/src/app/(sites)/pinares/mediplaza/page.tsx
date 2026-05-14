import type { Metadata } from 'next'
import Link from 'next/link'
import PageHeader from '@/components/directory/PageHeader'
import LogoGrid from '@/components/directory/LogoGrid'
import { mediplaza } from '@/data/sites/pinares/mediplaza'

export const metadata: Metadata = {
  title: 'Mediplaza',
  description: 'Especialistas médicos y servicios de salud en Momentum Pinares.',
}

const BLUE = '#1B5E8A'

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

      {/* Torre Médica CTA */}
      <div style={{ background: '#070D14', padding: '72px 32px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 40 }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
              <div style={{ width: 20, height: '0.5px', background: BLUE }} />
              <span style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: BLUE }}>
                Dentro de Momentum Pinares
              </span>
            </div>
            <h2 style={{ fontSize: 'clamp(24px, 3.5vw, 38px)', fontWeight: 300, color: '#fff', letterSpacing: '-0.02em', margin: '0 0 12px', lineHeight: 1.15 }}>
              Torre Médica Momentum
            </h2>
            <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.45)', margin: 0, maxWidth: 480, lineHeight: 1.65 }}>
              Un edificio médico de 8 pisos con más de 47 especialidades, laboratorio, radiología,
              cirugía ambulatoria y agendamiento en línea a través de la plataforma Huli.
            </p>
          </div>
          <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
            <Link
              href="/torre-medica/directorio"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                background: BLUE, color: '#fff',
                fontSize: 12, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase',
                padding: '13px 28px', borderRadius: 4, textDecoration: 'none',
                transition: 'opacity 0.2s',
              }}
            >
              Ver directorio médico
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M2.5 9.5l7-7M5 2.5h4.5V7" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
            <Link
              href="/torre-medica"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                background: 'transparent', color: 'rgba(255,255,255,0.6)',
                border: '0.5px solid rgba(255,255,255,0.15)',
                fontSize: 12, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase',
                padding: '13px 28px', borderRadius: 4, textDecoration: 'none',
                transition: 'border-color 0.2s, color 0.2s',
              }}
            >
              Conocer la Torre
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
