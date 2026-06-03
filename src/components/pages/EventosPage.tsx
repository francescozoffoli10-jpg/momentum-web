'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import type { SiteConfig, SiteEvent } from '@/data/types'

// ── helpers ──────────────────────────────────────────────────────────────────

function formatDate(iso: string) {
  const d = new Date(iso + 'T12:00:00')
  const day = d.getDate()
  const month = d.toLocaleDateString('es-CR', { month: 'long' })
  const year = d.getFullYear()
  const weekday = d.toLocaleDateString('es-CR', { weekday: 'long' })
  return { day, month, year, weekday }
}

function isUpcoming(iso: string) {
  return new Date(iso + 'T12:00:00') >= new Date()
}

// ── sub-components ────────────────────────────────────────────────────────────

function EventCard({ ev, index, accentColor, siteHeroImage }: {
  ev: SiteEvent
  index: number
  accentColor: string
  siteHeroImage: string
}) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const { day, month, weekday } = formatDate(ev.date)
  const upcoming = isUpcoming(ev.date)
  const imageSrc = ev.image ?? siteHeroImage

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
      style={{
        position: 'relative',
        borderRadius: 6,
        overflow: 'hidden',
        background: '#0e0808',
        border: '0.5px solid rgba(255,255,255,0.07)',
        display: 'grid',
        gridTemplateColumns: ev.featured ? '1fr' : '1fr 1fr',
        minHeight: ev.featured ? 480 : 320,
      }}
      className="event-card"
    >
      {/* Image half */}
      <div style={{ position: 'relative', overflow: 'hidden', minHeight: ev.featured ? 480 : 320 }}>
        <Image
          src={imageSrc}
          alt={ev.title}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          style={{ objectFit: ev.featured ? 'cover' : 'contain', objectPosition: 'center', transition: 'transform 0.6s ease' }}
          className="event-img"
        />
        {/* gradient overlay */}
        <div style={{
          position: 'absolute', inset: 0,
          background: ev.featured
            ? 'linear-gradient(to right, rgba(10,4,4,0.0) 40%, rgba(10,4,4,0.92) 100%), linear-gradient(to top, rgba(10,4,4,0.7) 0%, transparent 50%)'
            : 'none',
        }} />
        {/* Date pill — always visible on image */}
        <div style={{
          position: 'absolute', top: 24, left: 24,
          background: 'rgba(10,4,4,0.72)',
          border: '0.5px solid rgba(255,255,255,0.12)',
          backdropFilter: 'blur(12px)',
          borderRadius: 100,
          padding: '8px 16px',
          display: 'flex', alignItems: 'center', gap: 10,
        }}>
          <div style={{ textAlign: 'center', lineHeight: 1 }}>
            <div style={{ fontSize: 18, fontWeight: 300, color: '#fff', letterSpacing: '-0.02em' }}>{day}</div>
            <div style={{ fontSize: 8, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: accentColor, marginTop: 2 }}>{month}</div>
          </div>
          <div style={{ width: '0.5px', height: 28, background: 'rgba(255,255,255,0.12)' }} />
          <div style={{ fontSize: 10, fontWeight: 300, color: 'rgba(255,255,255,0.55)', letterSpacing: '0.04em', textTransform: 'capitalize' }}>
            {weekday}
          </div>
        </div>

        {/* Status badge */}
        <div style={{
          position: 'absolute', top: 24, right: 24,
          background: upcoming ? accentColor : 'rgba(255,255,255,0.1)',
          borderRadius: 2,
          padding: '4px 10px',
          fontSize: 8, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase',
          color: '#fff',
        }}>
          {upcoming ? 'Próximo evento' : 'Finalizado'}
        </div>

        {/* On featured cards — title overlays image at bottom */}
        {ev.featured && (
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '40px 40px 40px' }}>
            {ev.tag && (
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: 6, marginBottom: 14,
                fontSize: 9, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase',
                color: accentColor,
              }}>
                <span style={{ width: 16, height: '0.5px', background: accentColor, display: 'inline-block' }} />
                {ev.tag}
              </div>
            )}
            <h2 style={{ fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 300, color: '#fff', letterSpacing: '-0.025em', lineHeight: 1.05, marginBottom: 8 }}>
              {ev.title}
              {ev.subtitle && <span style={{ display: 'block', fontStyle: 'italic', opacity: 0.55, fontSize: '0.6em', marginTop: 4, fontWeight: 300 }}>{ev.subtitle}</span>}
            </h2>
          </div>
        )}
      </div>

      {/* Content half (non-featured only) — OR bottom strip on featured */}
      {!ev.featured && (
        <div style={{ padding: '40px 40px', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 0 }}>
          {ev.tag && (
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 6, marginBottom: 18,
              fontSize: 9, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase',
              color: accentColor,
            }}>
              <span style={{ width: 16, height: '0.5px', background: accentColor, display: 'inline-block' }} />
              {ev.tag}
            </div>
          )}
          <h2 style={{
            fontSize: 'clamp(22px, 2.5vw, 32px)', fontWeight: 300, color: '#fff',
            letterSpacing: '-0.02em', lineHeight: 1.1, marginBottom: 8,
          }}>
            {ev.title}
          </h2>
          {ev.subtitle && (
            <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', fontStyle: 'italic', marginBottom: 20, fontWeight: 300 }}>
              {ev.subtitle}
            </p>
          )}
          <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', lineHeight: 1.75, fontWeight: 300, marginBottom: 28 }}>
            {ev.description}
          </p>
          {ev.timeLabel && (
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 28,
              fontSize: 11, color: 'rgba(255,255,255,0.35)', fontWeight: 300, letterSpacing: '0.04em',
            }}>
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <circle cx="6" cy="6" r="5" stroke="currentColor" strokeWidth="0.8"/>
                <path d="M6 3v3l2 1.5" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round"/>
              </svg>
              {ev.timeLabel}
            </div>
          )}
          {ev.ctaLabel && ev.ctaUrl && (
            <a href={ev.ctaUrl} target="_blank" rel="noopener noreferrer"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                padding: '10px 22px',
                background: upcoming ? accentColor : 'rgba(255,255,255,0.08)',
                color: '#fff',
                fontSize: 9, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase',
                borderRadius: 2,
                alignSelf: 'flex-start',
                transition: 'opacity 0.2s',
              }}
              onMouseEnter={e => (e.currentTarget.style.opacity = '0.8')}
              onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
            >
              {ev.ctaLabel}
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                <path d="M2 5h6M5.5 2.5L8 5l-2.5 2.5" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
          )}
        </div>
      )}

      {/* Featured card bottom strip */}
      {ev.featured && (
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0,
          // This is only visible on featured cards — overlay already handles it above
          // We just need the CTA in a separate row
        }} />
      )}
    </motion.article>
  )
}

// ── Main component ─────────────────────────────────────────────────────────────

interface EventosPageProps {
  site: SiteConfig
  events: SiteEvent[]
  basePath: string
}

export default function EventosPage({ site, events, basePath }: EventosPageProps) {
  const headerRef = useRef(null)
  const headerInView = useInView(headerRef, { once: true })

  const upcoming = events.filter(e => isUpcoming(e.date))
  const past = events.filter(e => !isUpcoming(e.date))

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
          background: `radial-gradient(ellipse 50% 60% at 80% 50%, var(--a), transparent 65%)`,
          opacity: 0.07,
        }} />
        <div ref={headerRef} style={{ maxWidth: 1280, margin: '0 auto', padding: '0 32px', position: 'relative' }}>
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={headerInView ? { opacity: 1, x: 0 } : {}}
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
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.75, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            style={{ fontSize: 'clamp(36px, 5vw, 64px)', fontWeight: 300, color: '#fff', letterSpacing: '-0.025em', lineHeight: 1.08, marginBottom: 20, maxWidth: 640 }}
          >
            Eventos &<br />Activaciones
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
            style={{ fontSize: 15, color: 'rgba(255,255,255,0.38)', fontWeight: 300, lineHeight: 1.8, maxWidth: 480 }}
          >
            Gastronomía, cultura, bienestar y comunidad. En Momentum los eventos forman parte de la experiencia cotidiana.
          </motion.p>
        </div>
      </section>

      {/* Events grid */}
      <section style={{ background: 'var(--dk)', padding: '64px 0 100px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 32px' }}>

          {upcoming.length === 0 && (
            <div style={{
              display: 'flex', alignItems: 'center', gap: 14, marginBottom: 64,
              padding: '20px 28px',
              background: 'rgba(255,255,255,0.03)',
              border: '0.5px solid rgba(255,255,255,0.07)',
              borderRadius: 4,
            }}>
              <div style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--a)', flexShrink: 0, animation: 'pulse 2s infinite' }} />
              <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)', fontWeight: 300 }}>
                La agenda de próximos eventos está siendo preparada. Seguinos en Instagram{' '}
                <a href={`https://instagram.com/${site.instagram}`} target="_blank" rel="noopener noreferrer"
                  style={{ color: 'var(--a)', fontWeight: 500 }}>
                  @{site.instagram}
                </a>
                {' '}para novedades.
              </span>
            </div>
          )}

          {upcoming.length > 0 && (
            <>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 40 }}>
                <div style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--a)', animation: 'pulse 2s infinite' }} />
                <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)' }}>
                  Próximos eventos
                </span>
                <div style={{ flex: 1, height: '0.5px', background: 'rgba(255,255,255,0.06)' }} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                {upcoming.map((ev, i) => (
                  <EventCard
                    key={ev.id}
                    ev={ev}
                    index={i}
                    accentColor={site.accentColor}
                    siteHeroImage={site.heroImage}
                  />
                ))}
              </div>
            </>
          )}

          {past.length > 0 && (
            <>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 72, marginBottom: 40 }}>
                <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.2)' }}>
                  Ediciones anteriores
                </span>
                <div style={{ flex: 1, height: '0.5px', background: 'rgba(255,255,255,0.04)' }} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 20, opacity: 0.6 }}>
                {past.map((ev, i) => (
                  <EventCard
                    key={ev.id}
                    ev={ev}
                    index={i}
                    accentColor={site.accentColor}
                    siteHeroImage={site.heroImage}
                  />
                ))}
              </div>
            </>
          )}

          {/* Footer CTA */}
          <div style={{ marginTop: 72, paddingTop: 48, borderTop: '0.5px solid rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 20 }}>
            <div>
              <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.25)', fontWeight: 300, letterSpacing: '0.04em', marginBottom: 6 }}>¿Querés estar al tanto?</p>
              <a href={`https://instagram.com/${site.instagram}`} target="_blank" rel="noopener noreferrer"
                style={{ display: 'inline-flex', alignItems: 'center', gap: 7, color: 'var(--a)', fontSize: 12, fontWeight: 500 }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <rect x="2" y="2" width="20" height="20" rx="5"/>
                  <circle cx="12" cy="12" r="4"/>
                  <circle cx="17.5" cy="6.5" r="1" fill="currentColor" strokeWidth="0"/>
                </svg>
                @{site.instagram}
              </a>
            </div>
            <Link href={basePath} style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '12px 28px', background: 'var(--a)', color: '#fff',
              fontSize: 9, fontWeight: 700, letterSpacing: '0.13em', textTransform: 'uppercase', borderRadius: 2,
            }}>
              Explorar el destino
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                <path d="M2 5h6M5.5 2.5L8 5l-2.5 2.5" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
          </div>
        </div>
      </section>

      <style>{`
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.3} }
        .event-card:hover .event-img { transform: scale(1.03); }
        @media (max-width: 768px) {
          .event-card { grid-template-columns: 1fr !important; }
          .event-card > div:first-child { min-height: 260px !important; }
        }
      `}</style>

      {/* ── Colaboradores CTA ─────────────────────────────────────────────────── */}
      <section style={{ background: 'var(--bg)', borderTop: '0.5px solid var(--brd)', padding: '72px 0' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 32px' }}>
          <div style={{
            display: 'grid', gridTemplateColumns: '1fr auto', gap: 48, alignItems: 'center',
          }} className="eventos-collab-grid">
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 18 }}>
                <div style={{ width: 20, height: '0.5px', background: 'var(--a)' }} />
                <span style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--a)' }}>
                  Marcas &amp; Alianzas
                </span>
              </div>
              <h2 style={{ fontSize: 'clamp(22px, 3vw, 34px)', fontWeight: 300, color: 'var(--text)', letterSpacing: '-0.02em', marginBottom: 14, lineHeight: 1.2 }}>
                ¿Querés activar tu marca en Momentum?
              </h2>
              <p style={{ fontSize: 14, color: 'var(--mt)', fontWeight: 300, lineHeight: 1.8, maxWidth: 520 }}>
                Diseñamos experiencias únicas para marcas que buscan conectar con una comunidad premium.
                Gastronomía, bienestar, entretenimiento y más — contanos tu idea.
              </p>
            </div>
            <div>
              <a
                href="https://wa.me/message/434VEBX5JFO7D1"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 10,
                  padding: '14px 28px',
                  background: '#25D366',
                  color: '#fff',
                  fontSize: 13, fontWeight: 600, letterSpacing: '0.04em',
                  borderRadius: 4,
                  textDecoration: 'none',
                  whiteSpace: 'nowrap',
                  transition: 'opacity 0.2s, transform 0.2s',
                }}
                onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.opacity = '0.9'; el.style.transform = 'translateY(-2px)' }}
                onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.opacity = '1'; el.style.transform = 'translateY(0)' }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                Hablemos por WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

    </>
  )
}
