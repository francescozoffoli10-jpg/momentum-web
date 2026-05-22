import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contacto',
  description: 'Contáctenos en Torre Médica Momentum Pinares. Call Center: 4702-0577. Curridabat, San José, Costa Rica.',
}

const ACCENT = '#1B5E8A'
const ACCENT_LIGHT = '#2272AE'

export default function ContactoPage() {
  return (
    <>
      <style>{`
        .tm-phone-link:hover { color: #1B5E8A !important; }
        .tm-social-link:hover { border-color: #1B5E8A !important; }
      `}</style>

      {/* Header */}
      <div style={{ background: '#070D14', paddingTop: 120, paddingBottom: 64 }}>
        <div className="tm-inner" style={{ maxWidth: 1280, margin: '0 auto', padding: '0 32px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
            <div style={{ width: 20, height: '1px', background: ACCENT }} />
            <span style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: ACCENT_LIGHT }}>
              Torre Médica Momentum
            </span>
          </div>
          <h1 style={{ fontSize: 'clamp(32px, 5vw, 56px)', fontWeight: 200, color: '#fff', letterSpacing: '-0.025em', margin: '0 0 16px' }}>
            Contacto
          </h1>
          <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.55)', margin: 0, lineHeight: 1.6 }}>
            Estamos aquí para atenderte. Llamanos o visitanos en Momentum Pinares.
          </p>
        </div>
      </div>

      {/* Content */}
      <div style={{ background: '#fff', padding: '80px 0' }}>
        <div className="tm-inner" style={{ maxWidth: 1280, margin: '0 auto', padding: '0 32px' }}>
          <div className="tm-contact-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 64 }}>

            {/* Info column */}
            <div>
              <h2 style={{ fontSize: 24, fontWeight: 400, color: '#0A1018', letterSpacing: '-0.02em', margin: '0 0 40px' }}>
                Información de contacto
              </h2>

              {/* Phone */}
              <div style={{ marginBottom: 36 }}>
                <div style={{ fontSize: 10, fontWeight: 600, color: ACCENT, letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 10 }}>
                  Call Center
                </div>
                <a
                  href="tel:+50647020577"
                  className="tm-phone-link"
                  style={{
                    fontSize: 28, fontWeight: 300, color: '#0A1018',
                    textDecoration: 'none', letterSpacing: '-0.02em', display: 'block',
                    transition: 'color 0.2s',
                  }}
                >
                  4702-0577
                </a>
              </div>

              {/* Hours */}
              <div style={{ marginBottom: 36 }}>
                <div style={{ fontSize: 10, fontWeight: 600, color: ACCENT, letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 14 }}>
                  Horario de Atención
                </div>
                {[
                  { days: 'Lunes – Viernes', hours: '8:00 am – 8:00 pm' },
                  { days: 'Sábados', hours: '8:00 am – 4:00 pm' },
                  { days: 'Domingos', hours: 'Cerrado' },
                ].map((row) => (
                  <div key={row.days} style={{ display: 'flex', justifyContent: 'space-between', padding: '9px 0', borderBottom: '0.5px solid #EEF2F5' }}>
                    <span style={{ fontSize: 14, color: '#3A4D5C' }}>{row.days}</span>
                    <span style={{ fontSize: 14, fontWeight: 500, color: row.hours === 'Cerrado' ? '#9AABB8' : '#0A1018' }}>{row.hours}</span>
                  </div>
                ))}
              </div>

              {/* Address */}
              <div style={{ marginBottom: 36 }}>
                <div style={{ fontSize: 10, fontWeight: 600, color: ACCENT, letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 10 }}>
                  Dirección
                </div>
                <p style={{ fontSize: 14, color: '#3A4D5C', lineHeight: 1.7, margin: 0 }}>
                  Centro Comercial Momentum Pinares<br />
                  Curridabat, San José, Costa Rica
                </p>
                <a
                  href="https://maps.google.com/?q=Momentum+Pinares+Curridabat"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: 6, marginTop: 12,
                    fontSize: 12, color: ACCENT, fontWeight: 600, letterSpacing: '0.06em',
                    textDecoration: 'none', textTransform: 'uppercase',
                  }}
                >
                  Ver en Google Maps
                  <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
                    <path d="M2.5 9.5l7-7M5 2.5h4.5V7" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </a>
              </div>

              {/* Social */}
              <div>
                <div style={{ fontSize: 10, fontWeight: 600, color: ACCENT, letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 12 }}>
                  Redes Sociales
                </div>
                <a
                  href="https://www.facebook.com/TorreMedicaMomentum"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="tm-social-link"
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: 8,
                    fontSize: 14, color: '#3A4D5C', textDecoration: 'none',
                    padding: '8px 16px', border: '0.5px solid #E2EAF0', borderRadius: 4,
                    transition: 'border-color 0.2s',
                  }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill={ACCENT}>
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                  </svg>
                  TorreMedicaMomentum
                </a>
              </div>
            </div>

            {/* Map */}
            <div>
              <h2 style={{ fontSize: 24, fontWeight: 400, color: '#0A1018', letterSpacing: '-0.02em', margin: '0 0 24px' }}>
                Cómo llegar
              </h2>
              <div style={{ borderRadius: 6, overflow: 'hidden', border: '0.5px solid #E2EAF0', background: '#F4F8FB', height: 400 }}>
                <iframe
                  src="https://maps.google.com/maps?q=Momentum+Pinares+Curridabat+Costa+Rica&output=embed&z=16&hl=es"
                  width="100%"
                  height="400"
                  style={{ border: 0, display: 'block' }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Mapa Torre Médica Momentum Pinares"
                />
              </div>
              <div style={{ marginTop: 24, padding: '20px 24px', background: '#F4F8FB', borderRadius: 6, border: '0.5px solid #DDE8F0' }}>
                <div style={{ fontSize: 13, color: '#5A6B78', lineHeight: 1.7 }}>
                  <strong style={{ color: '#0A1018' }}>Cómo llegar:</strong><br />
                  Ingrese al Centro Comercial Momentum Pinares en Curridabat y diríjase hacia la Torre Médica,
                  ubicada dentro del complejo. Hay estacionamiento gratuito disponible.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
