'use client'

import Link from 'next/link'
import Image from 'next/image'
import type { SiteConfig } from '@/data/types'

const SECTION_LABELS: Record<string, string> = {
  gastronomia: 'Gastronomía',
  comercios: 'Comercios',
  servicios: 'Servicios',
  ofiplaza: 'Ofiplaza',
  mediplaza: 'Mediplaza',
}

interface FooterProps {
  site: SiteConfig
  basePath: string
}

export default function Footer({ site, basePath }: FooterProps) {
  return (
    <footer style={{ background: 'var(--dk)', borderTop: '0.5px solid rgba(255,255,255,0.06)' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '80px 32px 40px' }}>

        <div style={{
          display: 'grid',
          gridTemplateColumns: '1.6fr 1fr 1fr',
          gap: 48,
          paddingBottom: 48,
          borderBottom: '0.5px solid rgba(255,255,255,0.06)',
          marginBottom: 32,
        }}>

          {/* Brand */}
          <div>
            <Link href={basePath}>
              <Image
                src={site.logo}
                alt={site.name}
                width={480}
                height={305}
                style={{ width: 'auto', height: 40, marginBottom: 28, opacity: 0.82 }}
              />
            </Link>
            <address style={{ fontStyle: 'normal', fontSize: 12, color: 'rgba(255,255,255,0.28)', lineHeight: 2.2 }}>
              {site.address}<br />
              {site.city}<br /><br />
              <a
                href={'tel:' + site.phone}
                style={{ color: 'rgba(255,255,255,0.28)', transition: 'color 0.2s', display: 'block' }}
                onMouseEnter={function(e) { e.currentTarget.style.color = 'rgba(255,255,255,0.65)' }}
                onMouseLeave={function(e) { e.currentTarget.style.color = 'rgba(255,255,255,0.28)' }}
              >{site.phone}</a>
              <a
                href={'mailto:' + site.email}
                style={{ color: 'rgba(255,255,255,0.28)', transition: 'color 0.2s', display: 'block' }}
                onMouseEnter={function(e) { e.currentTarget.style.color = 'rgba(255,255,255,0.65)' }}
                onMouseLeave={function(e) { e.currentTarget.style.color = 'rgba(255,255,255,0.28)' }}
              >{site.email}</a>
            </address>
            <div style={{ display: 'flex', gap: 10, marginTop: 24 }}>
              <a href={'https://instagram.com/' + site.instagram} target="_blank" rel="noopener noreferrer"
                style={{ width: 34, height: 34, borderRadius: '50%', border: '0.5px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(255,255,255,0.4)', transition: 'border-color 0.25s, color 0.25s, background 0.25s' }}
                onMouseEnter={function(e) { e.currentTarget.style.borderColor='var(--a)'; e.currentTarget.style.color='#fff'; e.currentTarget.style.background='rgba(139,40,40,0.15)' }}
                onMouseLeave={function(e) { e.currentTarget.style.borderColor='rgba(255,255,255,0.1)'; e.currentTarget.style.color='rgba(255,255,255,0.4)'; e.currentTarget.style.background='transparent' }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                </svg>
              </a>
              <a href={'https://facebook.com/' + site.facebook} target="_blank" rel="noopener noreferrer"
                style={{ width: 34, height: 34, borderRadius: '50%', border: '0.5px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(255,255,255,0.4)', transition: 'border-color 0.25s, color 0.25s, background 0.25s' }}
                onMouseEnter={function(e) { e.currentTarget.style.borderColor='var(--a)'; e.currentTarget.style.color='#fff'; e.currentTarget.style.background='rgba(139,40,40,0.15)' }}
                onMouseLeave={function(e) { e.currentTarget.style.borderColor='rgba(255,255,255,0.1)'; e.currentTarget.style.color='rgba(255,255,255,0.4)'; e.currentTarget.style.background='transparent' }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Directorio */}
          <div>
            <div style={{ fontSize: 9, fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--a)', marginBottom: 22 }}>
              Directorio
            </div>
            <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 12 }}>
              {site.sections.map(function(s) { return (
                <li key={s}>
                  <Link href={basePath + '/' + s}
                    style={{ fontSize: 13, color: 'rgba(255,255,255,0.38)', fontWeight: 300, letterSpacing: '0.01em', transition: 'color 0.2s' }}
                    onMouseEnter={function(e) { e.currentTarget.style.color='#fff' }}
                    onMouseLeave={function(e) { e.currentTarget.style.color='rgba(255,255,255,0.38)' }}
                  >{SECTION_LABELS[s]}</Link>
                </li>
              )})}
            </ul>
          </div>

          {/* Información */}
          <div>
            <div style={{ fontSize: 9, fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--a)', marginBottom: 22 }}>
              Información
            </div>
            <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 12 }}>
              {['Horarios', 'Cómo llegar', 'Ofertas', 'Eventos', 'App Momentum'].map(function(item) { return (
                <li key={item}>
                  <Link href="#"
                    style={{ fontSize: 13, color: 'rgba(255,255,255,0.38)', fontWeight: 300, letterSpacing: '0.01em', transition: 'color 0.2s' }}
                    onMouseEnter={function(e) { e.currentTarget.style.color='#fff' }}
                    onMouseLeave={function(e) { e.currentTarget.style.color='rgba(255,255,255,0.38)' }}
                  >{item}</Link>
                </li>
              )})}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.16)', letterSpacing: '0.02em' }}>
            © 2025 {site.name}. Todos los derechos reservados.
          </span>
          <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.16)', letterSpacing: '0.06em' }}>Costa Rica 🇨🇷</span>
        </div>
      </div>
    </footer>
  )
}
