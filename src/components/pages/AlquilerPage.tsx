'use client'

import { motion } from 'framer-motion'
import type { SiteConfig } from '@/data/types'

interface RentalBlock {
  type: string
  detail: string
  phone: string
  email?: string
}

const RENTAL_DATA: Record<string, { headline: string; blocks: RentalBlock[] }> = {
  lindora: {
    headline: 'Alquiler de locales y consultorios',
    blocks: [
      {
        type: 'Consultorios médicos',
        detail: 'Consultorios disponibles desde los 65 m²',
        phone: '+506 8835-8342',
        email: 'alquileres@momentumlindora.com',
      },
    ],
  },
  escazu: {
    headline: 'Alquiler de oficinas y locales',
    blocks: [
      {
        type: 'Oficinas y locales',
        detail: 'Oficinas disponibles desde los 40 m²',
        phone: '+506 2289 0000',
        email: 'info@momentumescazu.com',
      },
    ],
  },
  pinares: {
    headline: 'Alquiler de oficinas y locales comerciales',
    blocks: [
      {
        type: 'Oficinas',
        detail: 'Oficinas desde los 147 m² · Curridabat, contiguo al CC Momentum Pinares',
        phone: '+506 7064-0874',
        email: 'kguerrero@d506.cr',
      },
      {
        type: 'Locales comerciales',
        detail: 'Locales comerciales · Curridabat, frente al Walmart',
        phone: '+506 7064-0874',
        email: 'kguerrero@d506.cr',
      },
    ],
  },
}

export default function AlquilerPage({ site }: { site: SiteConfig }) {
  const data = RENTAL_DATA[site.id]

  return (
    <div style={{ background: 'var(--dk)', minHeight: '100vh', paddingTop: 120 }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 32px 80px' }} className="alquiler-outer">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{ marginBottom: 64 }}
        >
          <div style={{
            fontSize: 9, fontWeight: 600, letterSpacing: '0.22em',
            textTransform: 'uppercase', color: site.accentColor, marginBottom: 16,
          }}>
            Alquiler / Venta
          </div>
          <h1 style={{
            fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 300,
            color: '#fff', letterSpacing: '-0.02em', lineHeight: 1.1, marginBottom: 16,
          }}>
            {data.headline}
          </h1>
          <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.38)', fontWeight: 300, maxWidth: 520 }}>
            Ser parte del ecosistema Momentum es ser parte de una comunidad premium en crecimiento. Contáctanos para más información sobre disponibilidad.
          </p>
        </motion.div>

        {/* Rental blocks */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(320px, 100%), 1fr))', gap: 24, marginBottom: 64 }} className="alquiler-grid">
          {data.blocks.map((block, i) => (
            <motion.div
              key={block.type}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              style={{
                padding: '36px',
                background: 'rgba(255,255,255,0.03)',
                border: '0.5px solid rgba(255,255,255,0.08)',
                borderRadius: 6,
              }}
            >
              <div style={{
                width: 32, height: 2, background: site.accentColor,
                marginBottom: 24, borderRadius: 1,
              }} />
              <div style={{
                fontSize: 9, fontWeight: 600, letterSpacing: '0.18em',
                textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: 10,
              }}>
                {block.type}
              </div>
              <p style={{
                fontSize: 14, color: 'rgba(255,255,255,0.7)',
                fontWeight: 300, lineHeight: 1.65, marginBottom: 28,
              }}>
                {block.detail}
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                <a
                  href={'tel:' + block.phone}
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: 10,
                    fontSize: 13, color: '#fff', fontWeight: 400,
                    textDecoration: 'none', transition: 'opacity 0.2s',
                  }}
                  onMouseEnter={e => e.currentTarget.style.opacity = '0.7'}
                  onMouseLeave={e => e.currentTarget.style.opacity = '1'}
                >
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.5 }}>
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.48 2 2 0 0 1 3.59 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.45a16 16 0 0 0 6.29 6.29l1.41-.89a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
                  </svg>
                  {block.phone}
                </a>
                {block.email && (
                  <a
                    href={'mailto:' + block.email}
                    style={{
                      display: 'inline-flex', alignItems: 'center', gap: 10,
                      fontSize: 12, color: 'rgba(255,255,255,0.45)', fontWeight: 300,
                      textDecoration: 'none', transition: 'color 0.2s',
                    }}
                    onMouseEnter={e => e.currentTarget.style.color = 'rgba(255,255,255,0.8)'}
                    onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.45)'}
                  >
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.5 }}>
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
                    </svg>
                    {block.email}
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        <style>{`
          @media (max-width: 640px) {
            .alquiler-outer {
              padding-left: 20px !important;
              padding-right: 20px !important;
            }
          }
        `}</style>

        {/* Bottom note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          style={{
            padding: '32px',
            borderTop: '0.5px solid rgba(255,255,255,0.06)',
          }}
        >
          <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.25)', fontWeight: 300, lineHeight: 1.8, maxWidth: 600 }}>
            Momentum ofrece locales, consultorios y oficinas en un ecosistema comercial premium. Nuestros espacios están diseñados para marcas y profesionales que buscan imagen, comunidad y visibilidad de alto nivel.
          </p>
        </motion.div>
      </div>
    </div>
  )
}
