'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import type { SiteConfig } from '@/data/types'

const SITE_SWITCHER = [
  { id: 'lindora', name: 'Lindora', color: '#932D2B', href: '/lindora', sub: { label: 'Mediplaza',     href: '/lindora/mediplaza'    } },
  { id: 'escazu',  name: 'Escazú',  color: '#56717A', href: '/escazu',  sub: { label: 'Centro Médico', href: '/escazu/centro-medico' } },
  { id: 'pinares', name: 'Pinares', color: '#4F5B3E', href: '/pinares', sub: { label: 'Torre Médica',  href: '/pinares/torre-medica' } },
]

const SECTION_LABELS: Record<string, string> = {
  gastronomia:    'Gastronomía',
  comercios:      'Comercios',
  servicios:      'Servicios',
  ofiplaza:       'Ofiplaza',
  mediplaza:      'Mediplaza',
  oficentro:      'Oficentro',
  'centro-medico': 'Centro Médico',
  'torre-medica':  'Torre Médica',
}

interface NavProps {
  site: SiteConfig
  basePath: string
  activeSection?: string
}

export default function Nav({ site, basePath, activeSection }: NavProps) {
  const [scrolled, setScrolled] = useState(false)
  const [dirOpen, setDirOpen] = useState(false)
  const [locOpen, setLocOpen] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  // Lock body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  return (
    <>
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
        transition: 'background 0.4s ease, backdrop-filter 0.4s ease, border-color 0.4s ease',
        background: scrolled || mobileOpen ? 'rgba(16,8,8,0.97)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled && !mobileOpen ? '0.5px solid rgba(255,255,255,0.06)' : 'none',
      }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 64 }}>

          {/* Logo — uses site.logo from config */}
          <Link href={basePath} style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>
            <Image
              src={site.logo}
              alt={site.name}
              width={480}
              height={305}
              priority
              style={{ height: 34, width: 'auto', opacity: 0.92 }}
            />
          </Link>

          {/* Desktop Nav links */}
          <ul style={{ display: 'flex', alignItems: 'center', gap: 32, listStyle: 'none', margin: 0, padding: 0 }}
            className="nav-desktop">

            {/* Directorio dropdown */}
            <li style={{ position: 'relative' }}
              onMouseEnter={() => setDirOpen(true)}
              onMouseLeave={() => setDirOpen(false)}
            >
              <button style={{
                display: 'flex', alignItems: 'center', gap: 4,
                color: 'rgba(255,255,255,0.65)', fontSize: 13, fontWeight: 300,
                letterSpacing: '0.02em', background: 'none', border: 'none', cursor: 'pointer',
                transition: 'color 0.2s', fontFamily: 'inherit',
              }}
                onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
                onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.65)')}
              >
                Directorio
                <motion.svg width="10" height="6" viewBox="0 0 10 6" fill="none"
                  animate={{ rotate: dirOpen ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                </motion.svg>
              </button>

              <AnimatePresence>
                {dirOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.97 }}
                    transition={{ duration: 0.16, ease: 'easeOut' }}
                    style={{ position: 'absolute', top: '100%', left: '50%', transform: 'translateX(-50%)', paddingTop: 12 }}
                  >
                    <div style={{
                      background: 'rgba(14,6,6,0.98)',
                      border: '0.5px solid rgba(255,255,255,0.08)',
                      borderRadius: 6,
                      padding: '6px 0',
                      minWidth: 168,
                      backdropFilter: 'blur(24px)',
                      boxShadow: '0 20px 48px rgba(0,0,0,0.5)',
                    }}>
                      {site.sections.map((s) => (
                        <Link key={s} href={`${basePath}/${s}`}
                          style={{
                            display: 'block', padding: '9px 18px',
                            fontSize: 13, fontWeight: 300, letterSpacing: '0.02em',
                            color: activeSection === s ? 'var(--a)' : 'rgba(255,255,255,0.6)',
                            transition: 'color 0.15s, background 0.15s',
                          }}
                          onMouseEnter={e => { e.currentTarget.style.color = '#fff'; e.currentTarget.style.background = 'rgba(255,255,255,0.04)' }}
                          onMouseLeave={e => { e.currentTarget.style.color = activeSection === s ? 'var(--a)' : 'rgba(255,255,255,0.6)'; e.currentTarget.style.background = 'transparent' }}
                        >
                          {SECTION_LABELS[s]}
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </li>

            {(([
              site.hasEvents !== false && ['Eventos', 'eventos'],
              ['App', 'app'],
            ].filter(Boolean)) as [string, string][]).map(([label, slug]) => (
              <li key={label}>
                <Link href={`${basePath}/${slug}`}
                  style={{ color: 'rgba(255,255,255,0.65)', fontSize: 13, fontWeight: 300, letterSpacing: '0.02em', transition: 'color 0.2s' }}
                  onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.65)')}
                >{label}</Link>
              </li>
            ))}

            {/* Home / ecosystem link */}
            <li>
              <Link href="/"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 6,
                  padding: '5px 11px',
                  border: '0.5px solid rgba(255,255,255,0.1)',
                  borderRadius: 100,
                  color: 'rgba(255,255,255,0.5)',
                  fontSize: 10, fontWeight: 400, letterSpacing: '0.09em', textTransform: 'uppercase',
                  textDecoration: 'none',
                  transition: 'border-color 0.2s, color 0.2s, background 0.2s',
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.24)'; e.currentTarget.style.color = '#fff'; e.currentTarget.style.background = 'rgba(255,255,255,0.06)' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; e.currentTarget.style.color = 'rgba(255,255,255,0.5)'; e.currentTarget.style.background = 'transparent' }}
              >
                <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
                  <path d="M1 5L5.5 1L10 5V10H7V7H4V10H1V5Z" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Inicio
              </Link>
            </li>

            {/* Location switcher */}
            <li style={{ position: 'relative' }}
              onMouseEnter={() => setLocOpen(true)}
              onMouseLeave={() => setLocOpen(false)}
            >
              <button style={{
                display: 'inline-flex', alignItems: 'center', gap: 6,
                padding: '5px 10px',
                border: '0.5px solid rgba(255,255,255,0.1)',
                borderRadius: 100,
                background: 'rgba(255,255,255,0.04)',
                backdropFilter: 'blur(6px)',
                cursor: 'pointer', fontFamily: 'inherit',
                transition: 'border-color 0.2s, background 0.2s',
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.22)'; e.currentTarget.style.background = 'rgba(255,255,255,0.08)' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; e.currentTarget.style.background = 'rgba(255,255,255,0.04)' }}
              >
                <span style={{
                  width: 5, height: 5, borderRadius: '50%',
                  background: 'var(--a)', display: 'inline-block',
                  boxShadow: '0 0 6px var(--a)',
                }} />
                <span style={{
                  fontSize: 10, fontWeight: 400, letterSpacing: '0.08em',
                  color: 'rgba(255,255,255,0.55)',
                }}>
                  {site.subtitle || site.name.replace('Momentum ', '')}
                </span>
                <motion.svg width="8" height="5" viewBox="0 0 8 5" fill="none"
                  animate={{ rotate: locOpen ? 180 : 0 }}
                  transition={{ duration: 0.18 }}
                >
                  <path d="M1 1l3 3 3-3" stroke="rgba(255,255,255,0.35)" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round"/>
                </motion.svg>
              </button>

              <AnimatePresence>
                {locOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.97 }}
                    transition={{ duration: 0.16, ease: 'easeOut' }}
                    style={{ position: 'absolute', top: '100%', right: 0, paddingTop: 10 }}
                  >
                    <div style={{
                      background: 'rgba(12,8,8,0.98)',
                      border: '0.5px solid rgba(255,255,255,0.08)',
                      borderRadius: 6,
                      padding: '6px 0',
                      minWidth: 152,
                      backdropFilter: 'blur(24px)',
                      boxShadow: '0 16px 40px rgba(0,0,0,0.5)',
                    }}>
                      {SITE_SWITCHER.map(s => (
                        <div key={s.id}>
                          <Link href={s.href}
                            style={{
                              display: 'flex', alignItems: 'center', gap: 9,
                              padding: '9px 16px',
                              opacity: site.id === s.id ? 1 : 0.6,
                              transition: 'opacity 0.15s, background 0.15s',
                            }}
                            onMouseEnter={e => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.background = 'rgba(255,255,255,0.04)' }}
                            onMouseLeave={e => { e.currentTarget.style.opacity = site.id === s.id ? '1' : '0.6'; e.currentTarget.style.background = 'transparent' }}
                          >
                            <span style={{
                              width: 5, height: 5, borderRadius: '50%',
                              background: s.color, flexShrink: 0,
                              boxShadow: site.id === s.id ? `0 0 6px ${s.color}` : 'none',
                            }} />
                            <span style={{
                              fontSize: 12, fontWeight: site.id === s.id ? 500 : 300,
                              color: site.id === s.id ? '#fff' : 'rgba(255,255,255,0.6)',
                              letterSpacing: '0.02em',
                            }}>
                              {s.name}
                            </span>
                            {site.id === s.id && (
                              <span style={{
                                marginLeft: 'auto', fontSize: 9,
                                color: s.color, letterSpacing: '0.1em',
                              }}>
                                ●
                              </span>
                            )}
                          </Link>
                          {'sub' in s && s.sub && (
                            <Link href={s.sub.href}
                              style={{
                                display: 'flex', alignItems: 'center', gap: 7,
                                padding: '5px 16px 7px 30px',
                                opacity: 0.45,
                                transition: 'opacity 0.15s, background 0.15s',
                              }}
                              onMouseEnter={e => { e.currentTarget.style.opacity = '0.85'; e.currentTarget.style.background = 'rgba(255,255,255,0.03)' }}
                              onMouseLeave={e => { e.currentTarget.style.opacity = '0.45'; e.currentTarget.style.background = 'transparent' }}
                            >
                              <span style={{
                                width: 3, height: 3, borderRadius: '50%',
                                background: s.color, flexShrink: 0, opacity: 0.7,
                              }} />
                              <span style={{
                                fontSize: 10, fontWeight: 300,
                                color: 'rgba(255,255,255,0.55)',
                                letterSpacing: '0.03em',
                              }}>
                                {s.sub.label}
                              </span>
                            </Link>
                          )}
                        </div>
                      ))}
                      <div style={{ height: '0.5px', background: 'rgba(255,255,255,0.06)', margin: '4px 0' }} />
                      <Link href="/"
                        style={{
                          display: 'flex', alignItems: 'center', gap: 7,
                          padding: '8px 16px',
                          opacity: 0.4,
                          fontSize: 10, color: 'rgba(255,255,255,0.5)',
                          letterSpacing: '0.08em', textTransform: 'uppercase',
                          transition: 'opacity 0.15s',
                        }}
                        onMouseEnter={e => (e.currentTarget.style.opacity = '0.75')}
                        onMouseLeave={e => (e.currentTarget.style.opacity = '0.4')}
                      >
                        Ver todos los destinos →
                      </Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </li>

            <li>
              <Link href={`${basePath}/gastronomia`} style={{
                padding: '8px 20px',
                background: 'var(--a)',
                color: '#fff',
                fontSize: 10,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                fontWeight: 600,
                borderRadius: 2,
                transition: 'background 0.2s, transform 0.2s',
                display: 'inline-block',
              }}
                onMouseEnter={e => { e.currentTarget.style.background = 'var(--a-light)'; e.currentTarget.style.transform = 'translateY(-1px)' }}
                onMouseLeave={e => { e.currentTarget.style.background = 'var(--a)'; e.currentTarget.style.transform = 'translateY(0)' }}
              >
                Directorio
              </Link>
            </li>
          </ul>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(o => !o)}
            style={{
              display: 'none',
              background: 'none', border: 'none', cursor: 'pointer',
              color: 'rgba(255,255,255,0.8)', padding: 4,
            }}
            className="nav-hamburger"
            aria-label="Menú"
          >
            <motion.svg width="22" height="22" viewBox="0 0 22 22" fill="none"
              animate={mobileOpen ? 'open' : 'closed'}
            >
              <motion.line x1="2" y1="6" x2="20" y2="6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
                variants={{ closed: { y2: 6, y1: 6, rotate: 0, opacity: 1 }, open: { y1: 11, y2: 11, rotate: 45 } }}
                style={{ originX: '11px', originY: '11px' }}
              />
              <motion.line x1="2" y1="11" x2="20" y2="11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
                variants={{ closed: { opacity: 1 }, open: { opacity: 0 } }}
              />
              <motion.line x1="2" y1="16" x2="20" y2="16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
                variants={{ closed: { y1: 16, y2: 16, rotate: 0, opacity: 1 }, open: { y1: 11, y2: 11, rotate: -45 } }}
                style={{ originX: '11px', originY: '11px' }}
              />
            </motion.svg>
          </button>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: 'fixed', inset: 0, zIndex: 40,
              background: 'rgba(14,6,6,0.99)',
              backdropFilter: 'blur(24px)',
              paddingTop: 80, paddingLeft: 32, paddingRight: 32,
              display: 'flex', flexDirection: 'column',
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              {site.sections.map((s, i) => (
                <motion.div key={s}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 + 0.1 }}
                >
                  <Link href={`${basePath}/${s}`}
                    onClick={() => setMobileOpen(false)}
                    style={{
                      display: 'block',
                      fontSize: 'clamp(24px, 6vw, 32px)', fontWeight: 300,
                      color: activeSection === s ? 'var(--a)' : 'rgba(255,255,255,0.75)',
                      letterSpacing: '-0.01em',
                      padding: '14px 0',
                      borderBottom: '0.5px solid rgba(255,255,255,0.06)',
                    }}
                  >
                    {SECTION_LABELS[s]}
                  </Link>
                </motion.div>
              ))}
              {(([
                site.hasEvents !== false && ['Eventos', 'eventos'],
                ['App', 'app'],
              ].filter(Boolean)) as [string, string][]).map(([label, slug], i) => (
                <motion.div key={label}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: (site.sections.length + i) * 0.05 + 0.1 }}
                >
                  <Link href={`${basePath}/${slug}`}
                    onClick={() => setMobileOpen(false)}
                    style={{
                      display: 'block',
                      fontSize: 'clamp(24px, 6vw, 32px)', fontWeight: 300,
                      color: 'rgba(255,255,255,0.75)',
                      letterSpacing: '-0.01em',
                      padding: '14px 0',
                      borderBottom: '0.5px solid rgba(255,255,255,0.06)',
                    }}
                  >{label}</Link>
                </motion.div>
              ))}
            </div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              style={{ marginTop: 40, display: 'flex', flexDirection: 'column', gap: 20 }}
            >
              <Link href={`${basePath}/gastronomia`}
                onClick={() => setMobileOpen(false)}
                style={{
                  display: 'inline-flex',
                  padding: '14px 32px',
                  background: 'var(--a)',
                  color: '#fff',
                  fontSize: 11,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  fontWeight: 600,
                  borderRadius: 2,
                  alignSelf: 'flex-start',
                }}
              >
                Ver Directorio
              </Link>

              {/* Mobile location switcher */}
              <div>
                <p style={{
                  fontSize: 9, letterSpacing: '0.18em', textTransform: 'uppercase',
                  color: 'rgba(255,255,255,0.2)', marginBottom: 14,
                }}>
                  Otros destinos
                </p>
                <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                  {SITE_SWITCHER.filter(s => s.id !== site.id).map(s => (
                    <div key={s.id} style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                      <Link href={s.href}
                        onClick={() => setMobileOpen(false)}
                        style={{
                          display: 'inline-flex', alignItems: 'center', gap: 7,
                          padding: '8px 14px',
                          border: `0.5px solid ${s.color}44`,
                          borderRadius: 100,
                          background: `${s.color}11`,
                          textDecoration: 'none',
                        }}
                      >
                        <span style={{ width: 5, height: 5, borderRadius: '50%', background: s.color }} />
                        <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.6)', letterSpacing: '0.06em' }}>
                          {s.name}
                        </span>
                      </Link>
                      {'sub' in s && s.sub && (
                        <Link href={s.sub.href}
                          onClick={() => setMobileOpen(false)}
                          style={{
                            display: 'inline-flex', alignItems: 'center', gap: 6,
                            paddingLeft: 14, opacity: 0.5, textDecoration: 'none',
                          }}
                        >
                          <span style={{ width: 3, height: 3, borderRadius: '50%', background: s.color, opacity: 0.7 }} />
                          <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.5)', letterSpacing: '0.05em' }}>
                            {s.sub.label}
                          </span>
                        </Link>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Mobile home link */}
              <Link href="/"
                onClick={() => setMobileOpen(false)}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                  marginTop: 8,
                  padding: '10px 16px',
                  border: '0.5px solid rgba(255,255,255,0.1)',
                  borderRadius: 100,
                  textDecoration: 'none',
                  alignSelf: 'flex-start',
                }}
              >
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M1 5.5L6 1L11 5.5V11H8V7.5H4V11H1V5.5Z" stroke="rgba(255,255,255,0.4)" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span style={{ fontSize: 10, fontWeight: 400, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.38)' }}>
                  Inicio · Todos los destinos
                </span>
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 768px) {
          .nav-desktop { display: none !important; }
          .nav-hamburger { display: flex !important; }
        }
      `}</style>
    </>
  )
}
