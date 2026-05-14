import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { medicalServices } from '@/data/sites/torre-medica/services'

export const metadata: Metadata = {
  title: 'Servicios Médicos',
  description: 'Servicios médicos institucionales en Torre Médica Momentum Pinares: laboratorio, radiología, fisioterapia, cirugía y más.',
}

const ACCENT = '#1B5E8A'
const ACCENT_LIGHT = '#2272AE'

export default function ServiciosPage() {
  return (
    <>
      {/* Header */}
      <div style={{ background: '#070D14', paddingTop: 120, paddingBottom: 64 }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 32px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
            <div style={{ width: 20, height: '1px', background: ACCENT }} />
            <span style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: ACCENT_LIGHT }}>
              Torre Médica Momentum
            </span>
          </div>
          <h1 style={{ fontSize: 'clamp(32px, 5vw, 56px)', fontWeight: 200, color: '#fff', letterSpacing: '-0.025em', margin: '0 0 16px' }}>
            Servicios Médicos
          </h1>
          <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.55)', margin: 0, maxWidth: 520, lineHeight: 1.6 }}>
            Los múltiples servicios de salud le brindan la atención que usted merece, con la calidad que necesita.
          </p>
        </div>
      </div>

      {/* Services grid */}
      <div style={{ background: '#fff', padding: '80px 0' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 32px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: 28 }}>
            {medicalServices.map((service) => (
              <div
                key={service.slug}
                style={{
                  borderRadius: 6, overflow: 'hidden',
                  border: '0.5px solid #E2EAF0',
                  background: '#fff',
                  boxShadow: '0 2px 16px rgba(0,0,0,0.04)',
                }}
              >
                {/* Photo */}
                <div style={{ height: 220, position: 'relative' }}>
                  <Image
                    src={service.photo!}
                    alt={service.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover"
                  />
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 40%, rgba(7,13,20,0.7) 100%)' }} />
                  <div style={{
                    position: 'absolute', bottom: 14, left: 16,
                    fontSize: 9, fontWeight: 600, color: 'rgba(255,255,255,0.8)',
                    letterSpacing: '0.16em', textTransform: 'uppercase',
                  }}>
                    {service.category}
                  </div>
                </div>

                {/* Content */}
                <div style={{ padding: '24px 24px 28px' }}>
                  <h2 style={{ fontSize: 18, fontWeight: 500, color: '#0A1018', margin: '0 0 8px', letterSpacing: '-0.01em' }}>
                    {service.name}
                  </h2>
                  <p style={{ fontSize: 13.5, color: '#5A6B78', lineHeight: 1.7, margin: '0 0 20px' }}>
                    {service.description}
                  </p>
                  <a
                    href={service.huliUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'inline-flex', alignItems: 'center', gap: 8,
                      background: ACCENT, color: '#fff',
                      fontSize: 12, fontWeight: 600, letterSpacing: '0.06em',
                      padding: '10px 20px', borderRadius: 4,
                      textDecoration: 'none', transition: 'opacity 0.2s',
                    }}
                    onMouseEnter={e => e.currentTarget.style.opacity = '0.85'}
                    onMouseLeave={e => e.currentTarget.style.opacity = '1'}
                  >
                    Ver perfil y agendar
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M2.5 9.5l7-7M5 2.5h4.5V7" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Back to directory */}
      <div style={{ background: '#F4F8FB', padding: '48px 32px', textAlign: 'center', borderTop: '0.5px solid #DDE8F0' }}>
        <p style={{ fontSize: 15, color: '#3A4D5C', marginBottom: 20 }}>
          ¿Busca un médico especialista específico?
        </p>
        <a
          href="https://directorio.torremedicamomentum.com"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            background: ACCENT, color: '#fff',
            fontSize: 13, fontWeight: 600, letterSpacing: '0.05em',
            padding: '12px 24px', borderRadius: 4,
            textDecoration: 'none',
          }}
        >
          Ver Directorio Médico Completo
        </a>
      </div>
    </>
  )
}
