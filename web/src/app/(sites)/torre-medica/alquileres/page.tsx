import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Alquileres',
  description: 'Consultorios y espacios médicos en alquiler en Torre Médica Momentum Pinares, Curridabat.',
}

const ACCENT = '#1B5E8A'
const ACCENT_LIGHT = '#2272AE'

const BENEFITS = [
  {
    icon: '🏥',
    title: 'Infraestructura médica premium',
    description: 'Consultorios equipados con instalaciones de primer nivel, diseñados para la práctica médica moderna.',
  },
  {
    icon: '📍',
    title: 'Ubicación estratégica',
    description: 'En el corazón de Curridabat, dentro del Centro Comercial Momentum Pinares, con amplio estacionamiento.',
  },
  {
    icon: '🔬',
    title: 'Ecosistema médico completo',
    description: 'Rodeado de laboratorio, radiología, cirugía ambulatoria y decenas de especialistas.',
  },
  {
    icon: '📅',
    title: 'Horario extendido',
    description: 'Lunes a viernes de 8am a 8pm y sábados de 8am a 4pm, para maximizar su disponibilidad.',
  },
  {
    icon: '💻',
    title: 'Plataforma Huli incluida',
    description: 'Acceso a directorio médico digital, agendamiento en línea y gestión de pacientes.',
  },
  {
    icon: '🅿️',
    title: 'Estacionamiento gratuito',
    description: 'Amplio estacionamiento disponible para médicos y pacientes dentro del centro comercial.',
  },
]

export default function AlquileresPage() {
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
            Alquileres
          </h1>
          <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.55)', margin: 0, maxWidth: 560, lineHeight: 1.6 }}>
            Consultorios y espacios médicos en una de las torres de salud más completas del este de San José.
            Únase al ecosistema médico de Momentum Pinares.
          </p>
        </div>
      </div>

      {/* Benefits grid */}
      <div style={{ background: '#fff', padding: '80px 0' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 32px' }}>
          <div style={{ marginBottom: 56 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
              <div style={{ width: 20, height: '0.5px', background: ACCENT }} />
              <span style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: ACCENT }}>
                Por qué elegirnos
              </span>
            </div>
            <h2 style={{ fontSize: 'clamp(26px, 3.5vw, 38px)', fontWeight: 300, color: '#0A1018', letterSpacing: '-0.02em', margin: 0 }}>
              El mejor entorno para su práctica médica
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 28 }}>
            {BENEFITS.map((b) => (
              <div
                key={b.title}
                style={{
                  padding: '28px 28px 32px',
                  border: '0.5px solid #E2EAF0',
                  borderRadius: 6,
                  transition: 'border-color 0.3s, box-shadow 0.3s',
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.borderColor = `${ACCENT}44`
                  ;(e.currentTarget as HTMLElement).style.boxShadow = '0 8px 32px rgba(27,94,138,0.08)'
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.borderColor = '#E2EAF0'
                  ;(e.currentTarget as HTMLElement).style.boxShadow = 'none'
                }}
              >
                <div style={{ fontSize: 28, marginBottom: 16 }}>{b.icon}</div>
                <h3 style={{ fontSize: 15, fontWeight: 600, color: '#0A1018', margin: '0 0 8px', letterSpacing: '-0.01em' }}>
                  {b.title}
                </h3>
                <p style={{ fontSize: 13.5, color: '#5A6B78', lineHeight: 1.65, margin: 0 }}>
                  {b.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Contact CTA */}
      <div style={{ background: ACCENT, padding: '72px 32px', textAlign: 'center' }}>
        <h2 style={{ fontSize: 'clamp(24px, 3.5vw, 36px)', fontWeight: 300, color: '#fff', letterSpacing: '-0.02em', margin: '0 0 12px' }}>
          ¿Le interesa un consultorio?
        </h2>
        <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.7)', margin: '0 0 32px' }}>
          Contáctenos para conocer disponibilidad, precios y condiciones de arrendamiento.
        </p>
        <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
          <a
            href="tel:+50647020577"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              background: 'rgba(255,255,255,0.15)', color: '#fff',
              border: '0.5px solid rgba(255,255,255,0.35)',
              fontSize: 13, fontWeight: 600, letterSpacing: '0.05em',
              padding: '13px 26px', borderRadius: 4,
              textDecoration: 'none', transition: 'background 0.2s',
            }}
          >
            Llamar: 4702-0577
          </a>
          <a
            href="/torre-medica/contacto"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              background: '#fff', color: ACCENT,
              fontSize: 13, fontWeight: 600, letterSpacing: '0.05em',
              padding: '13px 26px', borderRadius: 4,
              textDecoration: 'none', transition: 'opacity 0.2s',
            }}
          >
            Enviar consulta
          </a>
        </div>
      </div>
    </>
  )
}
