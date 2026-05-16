import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Torre Médica Momentum'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          background: '#070D14',
          padding: '72px 88px',
          position: 'relative',
        }}
      >
        {/* Left accent bar */}
        <div style={{ position: 'absolute', top: 0, left: 0, bottom: 0, width: 6, background: '#1B5E8A', display: 'flex' }} />

        {/* Top label */}
        <div style={{ position: 'absolute', top: 60, left: 88, display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{ width: 28, height: 1, background: '#1B5E8A', display: 'flex' }} />
          <span style={{ color: '#2272AE', fontSize: 13, fontWeight: 700, letterSpacing: 5, textTransform: 'uppercase', fontFamily: 'sans-serif' }}>
            Curridabat · San José
          </span>
        </div>

        {/* Site name */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 0, marginBottom: 24 }}>
          <div style={{ fontSize: 80, fontWeight: 200, color: '#FFFFFF', letterSpacing: -3, lineHeight: 1, display: 'flex', fontFamily: 'sans-serif' }}>
            Torre Médica
          </div>
          <div style={{ fontSize: 80, fontWeight: 700, color: '#FFFFFF', letterSpacing: -3, lineHeight: 1, display: 'flex', fontFamily: 'sans-serif' }}>
            Momentum
          </div>
        </div>

        {/* Tagline */}
        <div style={{ display: 'flex' }}>
          <span style={{ fontSize: 22, color: 'rgba(255,255,255,0.42)', fontWeight: 300, fontFamily: 'sans-serif' }}>
            47 Especialidades Médicas · Momentum Pinares · Su mejor opción de salud en el este
          </span>
        </div>
      </div>
    ),
    { ...size }
  )
}
