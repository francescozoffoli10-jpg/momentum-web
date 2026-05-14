'use client'

import { motion } from 'framer-motion'
import type { SiteConfig } from '@/data/types'

// Per-site map config
const MAP_DATA: Record<string, {
  embedSrc: string
  directionsUrl: string
  landmark: string
  waze?: string
}> = {
  lindora: {
    embedSrc: 'https://maps.google.com/maps?q=Momentum+Lindora+Santa+Ana+Costa+Rica&output=embed&z=16&hl=es',
    directionsUrl: 'https://www.google.com/maps/search/?api=1&query=Momentum+Lindora+Santa+Ana+Costa+Rica',
    waze: 'https://waze.com/ul?q=Momentum+Lindora+Santa+Ana+Costa+Rica',
    landmark: 'Frente al Automercado de Lindora, Santa Ana',
  },
  escazu: {
    embedSrc: 'https://maps.google.com/maps?q=Momentum+Escazu+San+Jose+Costa+Rica&output=embed&z=16&hl=es',
    directionsUrl: 'https://www.google.com/maps/search/?api=1&query=Momentum+Escazu+Costa+Rica',
    waze: 'https://waze.com/ul?q=Momentum+Escazu+Costa+Rica',
    landmark: 'Escazú, San José, Costa Rica',
  },
  pinares: {
    embedSrc: 'https://maps.google.com/maps?q=Momentum+Pinares+Curridabat+Costa+Rica&output=embed&z=16&hl=es',
    directionsUrl: 'https://www.google.com/maps/search/?api=1&query=Momentum+Pinares+Curridabat+Costa+Rica',
    waze: 'https://waze.com/ul?q=Momentum+Pinares+Curridabat+Costa+Rica',
    landmark: 'Frente al Walmart de Curridabat',
  },
}

interface ComoLlegarPageProps {
  site: SiteConfig
}

export default function ComoLlegarPage({ site }: ComoLlegarPageProps) {
  const map = MAP_DATA[site.id]

  return (
    <div style={{ background: 'var(--dk)', minHeight: '100vh', paddingTop: 120 }}>
      {/* Header */}
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 32px 56px' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div style={{
            fontSize: 9, fontWeight: 600, letterSpacing: '0.22em',
            textTransform: 'uppercase', color: site.accentColor, marginBottom: 16,
          }}>
            Ubicación
          </div>
          <h1 style={{
            fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 300,
            color: '#fff', letterSpacing: '-0.02em', lineHeight: 1.1, marginBottom: 12,
          }}>
            Cómo llegar
          </h1>
          <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.4)', fontWeight: 300, maxWidth: 480 }}>
            {site.address}<br />{site.city}
          </p>
        </motion.div>
      </div>

      {/* Map + Info */}
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 32px 80px' }}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 320px',
            gap: 32,
            alignItems: 'start',
          }}
          className="como-llegar-grid"
        >
          {/* Map embed */}
          <div style={{
            borderRadius: 6,
            overflow: 'hidden',
            border: '0.5px solid rgba(255,255,255,0.08)',
            aspectRatio: '16/9',
            background: '#111',
          }}>
            <iframe
              src={map.embedSrc}
              width="100%"
              height="100%"
              style={{ border: 0, display: 'block', filter: 'grayscale(0.2) contrast(1.05)' }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title={`Mapa ${site.name}`}
            />
          </div>

          {/* Info panel */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

            {/* Landmark */}
            <div style={{
              padding: '24px',
              background: 'rgba(255,255,255,0.03)',
              border: '0.5px solid rgba(255,255,255,0.08)',
              borderRadius: 6,
            }}>
              <div style={{ fontSize: 9, fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: 12 }}>
                Dirección
              </div>
              <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)', lineHeight: 1.7, fontWeight: 300 }}>
                {map.landmark}
              </p>
              <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.3)', marginTop: 4, fontWeight: 300 }}>
                {site.city}
              </p>
            </div>

            {/* Contact */}
            <div style={{
              padding: '24px',
              background: 'rgba(255,255,255,0.03)',
              border: '0.5px solid rgba(255,255,255,0.08)',
              borderRadius: 6,
            }}>
              <div style={{ fontSize: 9, fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: 12 }}>
                Contacto
              </div>
              <a
                href={'tel:' + site.phone}
                style={{ fontSize: 13, color: 'rgba(255,255,255,0.65)', display: 'block', marginBottom: 6, fontWeight: 300, textDecoration: 'none', transition: 'color 0.2s' }}
                onMouseEnter={e => { e.currentTarget.style.color = '#fff' }}
                onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.65)' }}
              >
                {site.phone}
              </a>
              <a
                href={'mailto:' + site.email}
                style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)', display: 'block', fontWeight: 300, textDecoration: 'none', transition: 'color 0.2s' }}
                onMouseEnter={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.65)' }}
                onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.35)' }}
              >
                {site.email}
              </a>
            </div>

            {/* CTA Buttons */}
            <a
              href={map.directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
                padding: '14px 20px',
                background: site.accentColor,
                borderRadius: 4,
                color: '#fff',
                fontSize: 12,
                fontWeight: 500,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                textDecoration: 'none',
                transition: 'opacity 0.2s',
              }}
              onMouseEnter={e => { e.currentTarget.style.opacity = '0.85' }}
              onMouseLeave={e => { e.currentTarget.style.opacity = '1' }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="3 11 22 2 13 21 11 13 3 11"/>
              </svg>
              Cómo llegar en Google Maps
            </a>

            {map.waze && (
              <a
                href={map.waze}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
                  padding: '14px 20px',
                  background: 'rgba(255,255,255,0.05)',
                  border: '0.5px solid rgba(255,255,255,0.12)',
                  borderRadius: 4,
                  color: 'rgba(255,255,255,0.65)',
                  fontSize: 12,
                  fontWeight: 500,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  textDecoration: 'none',
                  transition: 'border-color 0.2s, color 0.2s',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)'
                  e.currentTarget.style.color = '#fff'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)'
                  e.currentTarget.style.color = 'rgba(255,255,255,0.65)'
                }}
              >
                Abrir en Waze
              </a>
            )}
          </div>
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .como-llegar-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  )
}
