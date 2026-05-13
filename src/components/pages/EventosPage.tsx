'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Link from 'next/link'
import type { SiteConfig } from '@/data/types'

const UPCOMING = [
  { label: 'Feria Gastronómica', desc: 'Una tarde de sabores locales e internacionales al aire libre.', month: 'Jun', day: '14' },
  { label: 'Noche de Vinos', desc: 'Cata guiada con sommelier. Cupos limitados.', month: 'Jun', day: '21' },
  { label: 'Feria de Emprendedores', desc: 'Marcas locales, diseño y productos únicos.', month: 'Jul', day: '05' },
  { label: 'Concierto Acústico', desc: 'Música en vivo en el espacio central de Momentum.', month: 'Jul', day: '19' },
]

interface EventosPageProps {
  site: SiteConfig
  basePath: string
}

export default function EventosPage({ site, basePath }: EventosPageProps) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <>
      {/* Hero */}
      <section style={{
        background: 'var(--dk)',
        paddingTop: 140, paddingBottom: 80,
        position: 'relative', overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background: 'radial-gradient(ellipse 50% 60% at 80% 50%, var(--a), transparent 65%)',
          opacity: 0.07,
        }} />
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 32px', position: 'relative' }}>
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}
          >
            <div style={{ width: 24, height: '0.5px', background: 'var(--a)' }} />
            <span style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--a)' }}>
              {site.name}
            </span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            style={{ fontSize: 'clamp(36px, 5vw, 64px)', fontWeight: 300, color: '#fff', letterSpacing: '-0.025em', lineHeight: 1.08, marginBottom: 20, maxWidth: 640 }}
          >
            Eventos &<br />Activaciones
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
            style={{ fontSize: 15, color: 'rgba(255,255,255,0.38)', fontWeight: 300, lineHeight: 1.8, maxWidth: 480 }}
          >
            Gastronomía, cultura, bienestar y comunidad. En Momentum los eventos forman parte de la experiencia cotidiana.
          </motion.p>
        </div>
      </section>

      {/* Coming soon banner */}
      <section style={{ background: 'var(--bg)', borderBottom: '0.5px solid var(--brd)' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '28px 32px', display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--a)', flexShrink: 0, animation: 'pulse 2s infinite' }} />
          <span style={{ fontSize: 12, color: 'var(--mt)', fontWeight: 300 }}>
            La agenda de eventos está siendo actualizada. Próximamente todos los eventos disponibles en línea.
          </span>
          <style>{`@keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.3} }`}</style>
        </div>
      </section>

      {/* Upcoming events preview */}
      <section ref={ref} style={{ background: 'var(--bg)', padding: '72px 0 100px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 32px' }}>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 48, flexWrap: 'wrap', gap: 16 }}
          >
            <div>
              <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--a)', marginBottom: 12 }}>
                Próximos eventos
              </div>
              <h2 style={{ fontSize: 'clamp(24px, 3vw, 36px)', fontWeight: 300, color: 'var(--text)', letterSpacing: '-0.02em', lineHeight: 1.1 }}>
                Lo que se viene
              </h2>
            </div>
          </motion.div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            {UPCOMING.map((ev, i) => (
              <motion.div
                key={ev.label}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.55, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '80px 1fr auto',
                  alignItems: 'center',
                  gap: 32,
                  padding: '28px 32px',
                  background: '#fff',
                  border: '0.5px solid var(--brd)',
                  borderRadius: 4,
                  marginBottom: 8,
                  cursor: 'default',
                }}
              >
                {/* Date */}
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: 28, fontWeight: 300, color: 'var(--text)', letterSpacing: '-0.03em', lineHeight: 1 }}>{ev.day}</div>
                  <div style={{ fontSize: 9, fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--a)', marginTop: 4 }}>{ev.month}</div>
                </div>
                {/* Divider */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
                  <div style={{ fontSize: 14, fontWeight: 500, color: 'var(--text)', letterSpacing: '-0.01em' }}>{ev.label}</div>
                  <div style={{ fontSize: 12, color: 'var(--mt)', lineHeight: 1.6, fontWeight: 300 }}>{ev.desc}</div>
                </div>
                {/* Tag */}
                <div style={{
                  fontSize: 9, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase',
                  color: 'var(--a)', border: '0.5px solid var(--a)', borderRadius: 2,
                  padding: '4px 10px', opacity: 0.6, whiteSpace: 'nowrap',
                }}>
                  Próximamente
                </div>
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.4 }}
            style={{ marginTop: 52, display: 'flex', gap: 16, alignItems: 'center', flexWrap: 'wrap' }}
          >
            <Link href={basePath} style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '12px 28px', background: 'var(--a)', color: '#fff',
              fontSize: 10, fontWeight: 600, letterSpacing: '0.13em', textTransform: 'uppercase', borderRadius: 2,
            }}>
              Explorar el destino
            </Link>
            <span style={{ fontSize: 12, color: 'var(--mt)', fontWeight: 300 }}>
              Seguinos en Instagram{' '}
              <a href={`https://instagram.com/${site.instagram}`} target="_blank" rel="noopener noreferrer"
                style={{ color: 'var(--a)', fontWeight: 500 }}>
                @{site.instagram}
              </a>
              {' '}para novedades.
            </span>
          </motion.div>
        </div>
      </section>
    </>
  )
}
