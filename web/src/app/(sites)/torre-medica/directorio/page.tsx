import type { Metadata } from 'next'
import HuliSearchbox from '@/components/huli/HuliSearchbox'

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

      {/* Huli searchbox widget */}
      <HuliSearchbox
        dataSite="torre-medica-momentum"
        accentColor={ACCENT}
        label="Busque su especialista médico"
        sublabel="Consulte perfiles, horarios y agende su cita en línea a través de nuestra plataforma Huli."
      />
    </>
  )
}
