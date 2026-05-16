import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Directorio Médico',
  description: 'Directorio completo de médicos especialistas en Torre Médica Momentum Pinares. Agende su cita en línea.',
}

const ACCENT = '#1B5E8A'

export default function DirectorioPage() {
  return (
    <>
      {/* Page header */}
      <div style={{ background: '#070D14', paddingTop: 120, paddingBottom: 64 }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 32px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
            <div style={{ width: 20, height: '1px', background: ACCENT }} />
            <span style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#2272AE' }}>
              Torre Médica Momentum
            </span>
          </div>
          <h1 style={{ fontSize: 'clamp(32px, 5vw, 56px)', fontWeight: 200, color: '#fff', letterSpacing: '-0.025em', margin: '0 0 16px' }}>
            Directorio Médico
          </h1>
          <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.55)', margin: 0, maxWidth: 520, lineHeight: 1.6 }}>
            Encuentre al especialista que necesita, consulte su perfil y agende su cita en línea a través de nuestra plataforma Huli.
          </p>
        </div>
      </div>

      {/* Iframe embed */}
      <div style={{ background: '#F8FAFB', minHeight: '80vh' }}>
        <div style={{ maxWidth: 1400, margin: '0 auto' }}>
          <iframe
            src="https://directorio.torremedicamomentum.com"
            style={{
              width: '100%',
              minHeight: '85vh',
              border: 'none',
              display: 'block',
            }}
            title="Directorio Médico Torre Médica Momentum"
            loading="lazy"
          />
        </div>
      </div>

      {/* Fallback CTA below iframe */}
      <div style={{ background: '#fff', padding: '48px 32px', textAlign: 'center', borderTop: '0.5px solid #E8EFF4' }}>
        <p style={{ fontSize: 14, color: '#5A6B78', marginBottom: 20 }}>
          ¿Problemas para ver el directorio? Acceda directamente:
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
          Abrir Directorio en nueva pestaña
          <svg width="13" height="13" viewBox="0 0 12 12" fill="none">
            <path d="M2.5 9.5l7-7M5 2.5h4.5V7" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </a>
      </div>
    </>
  )
}
