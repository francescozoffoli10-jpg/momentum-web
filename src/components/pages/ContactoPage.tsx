'use client'

import { motion } from 'framer-motion'
import type { SiteConfig } from '@/data/types'

export default function ContactoPage({ site }: { site: SiteConfig }) {
  return (
    <div style={{ background: 'var(--dk)', minHeight: '100vh', paddingTop: 120 }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 32px 80px' }}>

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
            Contacto
          </div>
          <h1 style={{
            fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 300,
            color: '#fff', letterSpacing: '-0.02em', lineHeight: 1.1, marginBottom: 16,
          }}>
            Estamos para ayudarte
          </h1>
          <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.38)', fontWeight: 300, maxWidth: 480 }}>
            Para consultas generales, información sobre el directorio o cualquier cosa que necesites sobre {site.name}.
          </p>
        </motion.div>

        {/* Contact cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: 20,
          maxWidth: 760,
          marginBottom: 56,
        }}>

          {/* Phone */}
          <motion.a
            href={'tel:' + site.phone}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.1 }}
            style={{
              display: 'block',
              padding: '32px',
              background: 'rgba(255,255,255,0.03)',
              border: '0.5px solid rgba(255,255,255,0.08)',
              borderRadius: 6,
              textDecoration: 'none',
              transition: 'border-color 0.2s, background 0.2s',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.18)'
              e.currentTarget.style.background = 'rgba(255,255,255,0.05)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'
              e.currentTarget.style.background = 'rgba(255,255,255,0.03)'
            }}
          >
            <div style={{
              width: 36, height: 36, borderRadius: '50%',
              background: site.accentColor + '22',
              border: '0.5px solid ' + site.accentColor + '44',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              marginBottom: 20,
            }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={site.accentColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.48 2 2 0 0 1 3.59 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.45a16 16 0 0 0 6.29 6.29l1.41-.89a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
              </svg>
            </div>
            <div style={{ fontSize: 9, fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.28)', marginBottom: 8 }}>
              Teléfono
            </div>
            <div style={{ fontSize: 15, color: '#fff', fontWeight: 300, letterSpacing: '0.01em' }}>
              {site.phone}
            </div>
          </motion.a>

          {/* Email */}
          <motion.a
            href={'mailto:' + site.email}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.18 }}
            style={{
              display: 'block',
              padding: '32px',
              background: 'rgba(255,255,255,0.03)',
              border: '0.5px solid rgba(255,255,255,0.08)',
              borderRadius: 6,
              textDecoration: 'none',
              transition: 'border-color 0.2s, background 0.2s',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.18)'
              e.currentTarget.style.background = 'rgba(255,255,255,0.05)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'
              e.currentTarget.style.background = 'rgba(255,255,255,0.03)'
            }}
          >
            <div style={{
              width: 36, height: 36, borderRadius: '50%',
              background: site.accentColor + '22',
              border: '0.5px solid ' + site.accentColor + '44',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              marginBottom: 20,
            }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={site.accentColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
              </svg>
            </div>
            <div style={{ fontSize: 9, fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.28)', marginBottom: 8 }}>
              Correo
            </div>
            <div style={{ fontSize: 14, color: '#fff', fontWeight: 300, letterSpacing: '0.01em' }}>
              {site.email}
            </div>
          </motion.a>

          {/* Instagram */}
          <motion.a
            href={'https://instagram.com/' + site.instagram}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.26 }}
            style={{
              display: 'block',
              padding: '32px',
              background: 'rgba(255,255,255,0.03)',
              border: '0.5px solid rgba(255,255,255,0.08)',
              borderRadius: 6,
              textDecoration: 'none',
              transition: 'border-color 0.2s, background 0.2s',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.18)'
              e.currentTarget.style.background = 'rgba(255,255,255,0.05)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'
              e.currentTarget.style.background = 'rgba(255,255,255,0.03)'
            }}
          >
            <div style={{
              width: 36, height: 36, borderRadius: '50%',
              background: site.accentColor + '22',
              border: '0.5px solid ' + site.accentColor + '44',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              marginBottom: 20,
            }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={site.accentColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
              </svg>
            </div>
            <div style={{ fontSize: 9, fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.28)', marginBottom: 8 }}>
              Instagram
            </div>
            <div style={{ fontSize: 14, color: '#fff', fontWeight: 300 }}>
              @{site.instagram}
            </div>
          </motion.a>
        </div>

        {/* Address */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          style={{
            padding: '24px 0',
            borderTop: '0.5px solid rgba(255,255,255,0.06)',
          }}
        >
          <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.25)', fontWeight: 300, lineHeight: 2 }}>
            {site.address} · {site.city}
          </p>
        </motion.div>
      </div>
    </div>
  )
}
