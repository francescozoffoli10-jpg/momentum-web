'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

const destinations = [
  {
    id: 'lindora',
    name: 'Lindora',
    full: 'Momentum Lindora',
    location: 'Lindora · Santa Ana',
    color: '#932D2B',
    colorLight: '#B03835',
    image: '/sites/lindora/banners/lindora-hero.webp',
    stats: [
      { label: 'Locales', value: '40+' },
      { label: 'Gastronomía', value: '11' },
      { label: 'Mediplaza', value: '8' },
    ],
    tagline: 'Gastronomía · Bienestar · Comercio · Mediplaza',
    href: '/lindora',
  },
  {
    id: 'escazu',
    name: 'Escazú',
    full: 'Momentum Escazú',
    location: 'Escazú · San José',
    color: '#56717A',
    colorLight: '#6B8A94',
    image: '/sites/escazu/banners/escazu-hero.webp',
    stats: [
      { label: 'Locales', value: '29+' },
      { label: 'Servicios', value: '18' },
      { label: 'Oficentro', value: '9' },
    ],
    tagline: 'Servicios · Salud · Oficentro',
    href: '/escazu',
  },
  {
    id: 'pinares',
    name: 'Pinares',
    full: 'Momentum Pinares',
    location: 'Curridabat · San José',
    color: '#4F5B3E',
    colorLight: '#647550',
    image: '/sites/pinares/banners/pinares-hero.webp',
    stats: [
      { label: 'Locales', value: '47+' },
      { label: 'Gastronomía', value: '16' },
      { label: 'Comercios', value: '31' },
    ],
    tagline: 'Gastronomía · Comercio · Vida',
    href: '/pinares',
  },
]

function DestinationCard({ d, index }: { d: typeof destinations[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
      style={{ position: 'relative', flex: 1, minWidth: 0 }}
    >
      <Link href={d.href} style={{ display: 'block', textDecoration: 'none' }}>
        <motion.div
          whileHover={{ y: -6 }}
          transition={{ type: 'spring', stiffness: 300, damping: 22 }}
          style={{
            position: 'relative',
            borderRadius: 4,
            overflow: 'hidden',
            cursor: 'pointer',
            height: 'clamp(480px, 60vh, 680px)',
          }}
          className="destination-card"
        >
          {/* Background image */}
          <Image
            src={d.image}
            alt={d.full}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover destination-img"
            style={{ filter: 'brightness(0.72)' }}
          />

          {/* Base gradient */}
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(to bottom, rgba(0,0,0,0.02) 0%, transparent 45%, rgba(0,0,0,0.32) 75%, rgba(0,0,0,0.65) 100%)',
          }} />

          {/* Hover color accent overlay */}
          <div
            className="card-accent-overlay"
            style={{
              position: 'absolute', inset: 0,
              background: `linear-gradient(to bottom, ${d.color}00 0%, ${d.color}22 60%, ${d.color}55 100%)`,
              opacity: 0,
              transition: 'opacity 0.5s ease',
            }}
          />

          {/* Top accent line */}
          <div style={{
            position: 'absolute', top: 0, left: 0, right: 0,
            height: 2,
            background: d.color,
            opacity: 0.7,
          }} />

          {/* Location pill — top left */}
          <div style={{
            position: 'absolute', top: 24, left: 24,
            display: 'inline-flex', alignItems: 'center', gap: 7,
            padding: '5px 12px',
            borderRadius: 100,
            border: '0.5px solid rgba(255,255,255,0.12)',
            backdropFilter: 'blur(6px)',
            background: 'rgba(255,255,255,0.05)',
          }}>
            <span style={{
              width: 5, height: 5, borderRadius: '50%',
              background: d.color, display: 'inline-block',
              boxShadow: `0 0 8px ${d.color}`,
            }} />
            <span style={{
              fontSize: 9, fontWeight: 500,
              letterSpacing: '0.16em', textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.5)',
            }}>
              {d.location}
            </span>
          </div>

          {/* Bottom content */}
          <div style={{
            position: 'absolute', bottom: 0, left: 0, right: 0,
            padding: '0 28px 28px',
          }}>
            {/* Stats row */}
            <div style={{
              display: 'flex', gap: 20, marginBottom: 20,
              paddingBottom: 18,
              borderBottom: '0.5px solid rgba(255,255,255,0.10)',
            }}>
              {d.stats.map(s => (
                <div key={s.label}>
                  <div style={{ fontSize: 20, fontWeight: 300, color: '#fff', lineHeight: 1 }}>
                    {s.value}
                  </div>
                  <div style={{
                    fontSize: 9, letterSpacing: '0.14em', textTransform: 'uppercase',
                    color: 'rgba(255,255,255,0.32)', marginTop: 4,
                  }}>
                    {s.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Name */}
            <h2 style={{
              fontSize: 'clamp(28px, 3.5vw, 42px)',
              fontWeight: 300,
              color: '#fff',
              letterSpacing: '-0.02em',
              lineHeight: 1.05,
              margin: '0 0 8px',
            }}>
              {d.name}
            </h2>

            {/* Tagline */}
            <p style={{
              fontSize: 10,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.32)',
              margin: '0 0 20px',
              fontWeight: 400,
            }}>
              {d.tagline}
            </p>

            {/* CTA */}
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
            }}>
              <span style={{
                fontSize: 10, fontWeight: 600,
                letterSpacing: '0.14em', textTransform: 'uppercase',
                color: d.color,
              }}>
                Explorar
              </span>
              <svg width="14" height="10" viewBox="0 0 14 10" fill="none">
                <path d="M0 5H12M8 1L12 5L8 9" stroke={d.color} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
        </motion.div>
      </Link>
    </motion.div>
  )
}

export default function LandingPage() {
  const cardsRef = useRef<HTMLDivElement>(null)

  return (
    <main style={{ background: '#080808', minHeight: '100vh', color: '#fff' }}>
      <style>{`
        .destination-card:hover .card-accent-overlay { opacity: 1 !important; }
        .destination-card:hover .destination-img { filter: brightness(0.46) !important; transition: filter 0.5s ease; }
        .destination-img { transition: filter 0.5s ease; }

        @media (max-width: 860px) {
          .destinations-grid { flex-direction: column !important; }
          .destinations-grid > * { flex: none !important; }
        }
      `}</style>

      {/* ── Hero ── */}
      <section style={{
        position: 'relative',
        width: '100%',
        height: '100svh',
        minHeight: 560,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        overflow: 'hidden',
      }}>
        {/* Hero background: triptych composite */}
        <div style={{ position: 'absolute', inset: 0, display: 'flex' }}>
          {destinations.map((d) => (
            <div key={d.id} style={{ flex: 1, position: 'relative' }}>
              <Image
                src={d.image}
                alt={d.full}
                fill
                priority
                className="object-cover"
                style={{ filter: 'brightness(0.55)' }}
              />
            </div>
          ))}
        </div>

        {/* Unified gradient over triptych */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to bottom, rgba(8,8,8,0.08) 0%, rgba(8,8,8,0.02) 40%, rgba(8,8,8,0.38) 85%, #080808 100%)',
        }} />

        {/* Subtle vertical dividers */}
        <div style={{
          position: 'absolute', inset: 0,
          display: 'flex',
          pointerEvents: 'none',
        }}>
          <div style={{ flex: 1 }} />
          <div style={{ width: '0.5px', background: 'rgba(255,255,255,0.06)', alignSelf: 'stretch' }} />
          <div style={{ flex: 1 }} />
          <div style={{ width: '0.5px', background: 'rgba(255,255,255,0.06)', alignSelf: 'stretch' }} />
          <div style={{ flex: 1 }} />
        </div>

        {/* Content */}
        <div style={{ position: 'relative', zIndex: 10, padding: '0 24px', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

          {/* Pre-label */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 10,
              marginBottom: 36,
            }}
          >
            <div style={{ width: 32, height: '0.5px', background: 'rgba(255,255,255,0.35)' }} />
            <span style={{
              fontSize: 10, fontWeight: 500,
              letterSpacing: '0.24em', textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.6)',
            }}>
              Costa Rica · Premium Lifestyle Ecosystem
            </span>
            <div style={{ width: 32, height: '0.5px', background: 'rgba(255,255,255,0.35)' }} />
          </motion.div>

          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <Image
              src="/brand/momentum-white.png"
              alt="Momentum"
              width={480}
              height={120}
              priority
              style={{ width: 'clamp(160px, 22vw, 320px)', height: 'auto' }}
            />
          </motion.div>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
            style={{
              fontSize: 'clamp(12px, 1.2vw, 14px)',
              color: 'rgba(255,255,255,0.28)',
              fontWeight: 300,
              letterSpacing: '0.06em',
              marginTop: 24,
              lineHeight: 1.8,
            }}
          >
            Tres destinos. Un ecosistema.
          </motion.p>

          {/* Three colored dots */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginTop: 20 }}
          >
            {destinations.map(d => (
              <div key={d.id} style={{
                width: 5, height: 5, borderRadius: '50%',
                background: d.color,
                boxShadow: `0 0 8px ${d.color}88`,
              }} />
            ))}
          </motion.div>

        </div>

        {/* Scroll CTA — anchored to bottom of hero */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.5 }}
          onClick={() => cardsRef.current?.scrollIntoView({ behavior: 'smooth' })}
          style={{
            position: 'absolute', bottom: 44, left: '50%', transform: 'translateX(-50%)',
            zIndex: 20,
            display: 'inline-flex', flexDirection: 'column', alignItems: 'center', gap: 10,
            background: 'none', border: 'none', cursor: 'pointer', color: 'inherit',
            padding: '0 20px',
          }}
        >
          <motion.span
            animate={{ opacity: [0.65, 1, 0.65] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
            style={{
              fontSize: 13, letterSpacing: '0.32em',
              color: 'rgba(255,255,255,0.95)',
              textTransform: 'uppercase',
              fontWeight: 500,
              textShadow: '0 0 20px rgba(255,255,255,0.8), 0 0 48px rgba(255,255,255,0.35)',
            }}
          >
            Descubrir
          </motion.span>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            style={{
              width: 1.5, height: 42,
              background: 'linear-gradient(to bottom, rgba(255,255,255,0.9), transparent)',
              boxShadow: '0 0 10px rgba(255,255,255,0.5), 0 0 20px rgba(255,255,255,0.2)',
            }}
          />
        </motion.button>
      </section>

      {/* ── Destination cards ── */}
      <section
        ref={cardsRef}
        style={{ padding: 'clamp(40px, 6vw, 80px) clamp(20px, 4vw, 60px) clamp(60px, 8vw, 100px)' }}
      >
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          style={{ marginBottom: 'clamp(32px, 4vw, 52px)', maxWidth: 480 }}
        >
          <p style={{
            fontSize: 9, letterSpacing: '0.20em', textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.25)', marginBottom: 14,
          }}>
            Nuestros destinos
          </p>
          <h2 style={{
            fontSize: 'clamp(26px, 3.5vw, 40px)',
            fontWeight: 300, letterSpacing: '-0.02em',
            color: '#fff', lineHeight: 1.15, margin: 0,
          }}>
            Elige tu destino Momentum
          </h2>
        </motion.div>

        {/* Cards grid */}
        <div
          className="destinations-grid"
          style={{ display: 'flex', gap: 'clamp(12px, 2vw, 20px)', alignItems: 'stretch' }}
        >
          {destinations.map((d, i) => (
            <DestinationCard key={d.id} d={d} index={i} />
          ))}
        </div>
      </section>

      {/* ── Brand strip ── */}
      <section style={{
        borderTop: '0.5px solid rgba(255,255,255,0.06)',
        padding: 'clamp(40px, 6vw, 72px) clamp(20px, 4vw, 60px)',
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 32,
      }}>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <Image
            src="/brand/momentum-white.png"
            alt="Momentum"
            width={200}
            height={50}
            style={{ width: 'clamp(100px, 14vw, 160px)', height: 'auto', opacity: 0.5 }}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.15 }}
          style={{ maxWidth: 440 }}
        >
          <p style={{
            fontSize: 'clamp(13px, 1.3vw, 15px)',
            color: 'rgba(255,255,255,0.28)',
            fontWeight: 300, lineHeight: 1.9,
            letterSpacing: '0.02em', margin: 0,
          }}>
            Momentum es más que un centro comercial. Es un ecosistema de gastronomía, bienestar,
            comercio y vida diseñado para el ritmo de Costa Rica moderna.
          </p>
        </motion.div>

        {/* Three site quick links */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          style={{ display: 'flex', flexDirection: 'column', gap: 14 }}
        >
          {destinations.map(d => (
            <Link
              key={d.id}
              href={d.href}
              style={{
                display: 'flex', alignItems: 'center', gap: 12,
                textDecoration: 'none',
                transition: 'opacity 0.2s',
              }}
              onMouseEnter={e => (e.currentTarget.style.opacity = '1')}
              onMouseLeave={e => (e.currentTarget.style.opacity = '0.5')}
            >
              <span style={{
                width: 6, height: 6, borderRadius: '50%',
                background: d.color, flexShrink: 0,
              }} />
              <span style={{
                fontSize: 11, color: 'rgba(255,255,255,0.6)',
                letterSpacing: '0.06em',
              }}>
                {d.full}
              </span>
              <span style={{ color: 'rgba(255,255,255,0.2)', fontSize: 11 }}>·</span>
              <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.04em' }}>
                {d.location}
              </span>
            </Link>
          ))}
        </motion.div>
      </section>

      {/* ── Footer ── */}
      <footer style={{
        borderTop: '0.5px solid rgba(255,255,255,0.05)',
        padding: '24px clamp(20px, 4vw, 60px)',
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 12,
      }}>
        <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.15)', letterSpacing: '0.08em' }}>
          © {new Date().getFullYear()} Momentum Costa Rica
        </span>
        <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.35)', letterSpacing: '0.12em', fontWeight: 500 }}>
          Lindora · Escazú · Pinares
        </span>
      </footer>
    </main>
  )
}
