'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'

const NAV_LINKS = [
  { label: 'Inicio', href: '/torre-medica' },
  { label: 'Directorio', href: '/torre-medica/directorio' },
  { label: 'Especialidades', href: '/torre-medica#especialidades' },
  { label: 'Servicios', href: '/torre-medica/servicios' },
  { label: 'Alquileres', href: '/torre-medica/alquileres' },
  { label: 'Contacto', href: '/torre-medica/contacto' },
]

export default function TorreMedicaNav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const ACCENT = '#1B5E8A'

  return (
    <>
      <header style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        background: scrolled ? 'rgba(10,18,30,0.97)' : 'rgba(10,18,30,0.85)',
        backdropFilter: 'blur(16px)',
        borderBottom: scrolled ? '0.5px solid rgba(255,255,255,0.08)' : '0.5px solid transparent',
        transition: 'all 0.35s',
      }}>
        <div style={{
          maxWidth: 1280, margin: '0 auto', padding: '0 32px',
          height: 64, display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          {/* Logo + ecosystem breadcrumb */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 0 }}>
            <Link href="/torre-medica" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
              <Image
                src="/sites/pinares/logos/torre-medica.png"
                alt="Torre Médica Momentum"
                width={140}
                height={40}
                className="object-contain"
                style={{ height: 32, width: 'auto' }}
              />
            </Link>
            <Link
              href="/pinares"
              style={{
                marginLeft: 16, paddingLeft: 16,
                borderLeft: '0.5px solid rgba(255,255,255,0.12)',
                fontSize: 10, color: 'rgba(255,255,255,0.28)',
                letterSpacing: '0.1em', textTransform: 'uppercase',
                textDecoration: 'none', whiteSpace: 'nowrap',
                transition: 'color 0.2s',
              }}
              onMouseEnter={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.7)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.28)')}
              className="tm-ecosystem-link"
            >
              ← Momentum Pinares
            </Link>
          </div>

          {/* Desktop nav */}
          <nav style={{ display: 'flex', alignItems: 'center', gap: 2 }} className="tm-desktop-nav">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                style={{
                  fontSize: 12, fontWeight: 500, color: 'rgba(255,255,255,0.7)',
                  letterSpacing: '0.06em', padding: '8px 14px', borderRadius: 4,
                  transition: 'color 0.2s, background 0.2s', textDecoration: 'none',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.color = '#fff'
                  e.currentTarget.style.background = 'rgba(255,255,255,0.07)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.color = 'rgba(255,255,255,0.7)'
                  e.currentTarget.style.background = 'transparent'
                }}
              >
                {link.label}
              </Link>
            ))}

            {/* Call CTA */}
            <a
              href="tel:+50647020577"
              style={{
                marginLeft: 16,
                display: 'flex', alignItems: 'center', gap: 8,
                background: ACCENT, color: '#fff',
                fontSize: 12, fontWeight: 600, letterSpacing: '0.05em',
                padding: '9px 18px', borderRadius: 4,
                textDecoration: 'none', transition: 'opacity 0.2s',
              }}
              onMouseEnter={e => e.currentTarget.style.opacity = '0.88'}
              onMouseLeave={e => e.currentTarget.style.opacity = '1'}
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.44a2 2 0 0 1 1.99-2.18h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.91a16 16 0 0 0 6.18 6.18l1.76-1.76a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
              </svg>
              4702-0577
            </a>
          </nav>

          {/* Mobile hamburger */}
          <button
            onClick={() => setOpen(!open)}
            className="tm-hamburger"
            style={{
              background: 'none', border: 'none', cursor: 'pointer',
              display: 'none', flexDirection: 'column', gap: 5, padding: 8,
            }}
            aria-label="Menu"
          >
            <span style={{ display: 'block', width: 22, height: '1.5px', background: '#fff', transition: 'all 0.3s', transform: open ? 'rotate(45deg) translateY(6.5px)' : 'none' }} />
            <span style={{ display: 'block', width: 22, height: '1.5px', background: '#fff', transition: 'all 0.3s', opacity: open ? 0 : 1 }} />
            <span style={{ display: 'block', width: 22, height: '1.5px', background: '#fff', transition: 'all 0.3s', transform: open ? 'rotate(-45deg) translateY(-6.5px)' : 'none' }} />
          </button>
        </div>

        {/* Mobile menu */}
        {open && (
          <div style={{
            background: 'rgba(10,18,30,0.98)', borderTop: '0.5px solid rgba(255,255,255,0.08)',
            padding: '16px 24px 24px',
          }} className="tm-mobile-menu">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                style={{
                  display: 'block', padding: '13px 0',
                  fontSize: 15, fontWeight: 500, color: 'rgba(255,255,255,0.85)',
                  borderBottom: '0.5px solid rgba(255,255,255,0.07)',
                  textDecoration: 'none',
                }}
              >
                {link.label}
              </Link>
            ))}
            <a
              href="tel:+50647020577"
              style={{
                display: 'flex', alignItems: 'center', gap: 8, marginTop: 20,
                background: ACCENT, color: '#fff', justifyContent: 'center',
                padding: '13px 20px', borderRadius: 4,
                fontSize: 14, fontWeight: 600, textDecoration: 'none',
              }}
            >
              Llamar: 4702-0577
            </a>
            <Link
              href="/pinares"
              onClick={() => setOpen(false)}
              style={{
                display: 'block', marginTop: 12, padding: '12px 0',
                fontSize: 11, color: 'rgba(255,255,255,0.35)',
                letterSpacing: '0.1em', textTransform: 'uppercase',
                textDecoration: 'none', textAlign: 'center',
              }}
            >
              ← Volver a Momentum Pinares
            </Link>
          </div>
        )}
      </header>

      <style>{`
        @media (max-width: 768px) {
          .tm-desktop-nav { display: none !important; }
          .tm-hamburger { display: flex !important; }
          .tm-ecosystem-link { display: none !important; }
        }
      `}</style>
    </>
  )
}
