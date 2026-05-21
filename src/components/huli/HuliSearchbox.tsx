'use client'

import { useEffect } from 'react'

interface HuliSearchboxProps {
  dataSite: string
  accentColor?: string
  label?: string
  sublabel?: string
}

export default function HuliSearchbox({
  dataSite,
  accentColor = '#1B5E8A',
  label = 'Busca tu especialista',
  sublabel = 'Consultá perfiles, especialidades y agendá tu cita en línea.',
}: HuliSearchboxProps) {
  useEffect(() => {
    if (document.getElementById('huli-js')) return
    const script = document.createElement('script')
    script.id = 'huli-js'
    script.src = 'https://search.hulilabs.com/js/plugins/loader.js'
    document.body.appendChild(script)
  }, [])

  return (
    <div style={{ background: '#F0F5F9', borderBottom: '0.5px solid #DDE6ED', padding: '52px 32px' }}>
      <div style={{ maxWidth: 860, margin: '0 auto' }}>

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
          <div style={{ width: 20, height: '1px', background: accentColor }} />
          <span style={{
            fontSize: 10, fontWeight: 600, letterSpacing: '0.14em',
            textTransform: 'uppercase', color: accentColor,
          }}>
            Directorio Médico · Huli
          </span>
        </div>
        <h2 style={{
          fontSize: 'clamp(22px, 3vw, 30px)', fontWeight: 300,
          color: '#0A1018', letterSpacing: '-0.02em', margin: '0 0 6px',
        }}>
          {label}
        </h2>
        <p style={{ fontSize: 14, color: '#5A6B78', margin: '0 0 28px', lineHeight: 1.6 }}>
          {sublabel}
        </p>

        {/* Huli widget mount point */}
        <div
          id="huli-searchbox"
          data-site={dataSite}
          data-lang="es"
          data-scroll-to-top="false"
        />

        {/* Fallback link */}
        <p style={{ marginTop: 20, fontSize: 12, color: '#8896A8' }}>
          ¿Preferís ver el directorio completo?{' '}
          <a
            href={`https://directorio.${dataSite === 'momentum-escazu' ? 'momentumescazu' : 'torremedicamomentum'}.com/es/search`}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: accentColor, textDecoration: 'none', fontWeight: 500 }}
          >
            Abrí en nueva pestaña →
          </a>
        </p>
      </div>
    </div>
  )
}
