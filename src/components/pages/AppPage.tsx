'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Link from 'next/link'
import type { SiteConfig } from '@/data/types'

interface Feature {
  sites?: string[]
  icon: JSX.Element
  title: string
  desc: string
}

const ALL_FEATURES: Feature[] = [
  {
    sites: ['pinares'],
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
      </svg>
    ),
    title: 'Parqueo con QR',
    desc: 'Generá tu código QR desde la app para entrar y salir del parqueo sin ticket físico.',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
      </svg>
    ),
    title: 'Ofertas y promociones',
    desc: 'Accedé a las ofertas y novedades de los locales del centro directamente desde tu teléfono.',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/>
      </svg>
    ),
    title: 'Novedades y eventos',
    desc: 'Enterate de lo que pasa en el centro: eventos, aperturas y comunicados del destino.',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
      </svg>
    ),
    title: 'Horarios del centro',
    desc: 'Consultá los horarios de atención del centro y sus principales locales.',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
      </svg>
    ),
    title: 'Comunicados directos',
    desc: 'Recibí avisos y comunicados del centro directamente en tu teléfono.',
  },
]

interface AppPageProps {
  site: SiteConfig
  basePath: string
}

export default function AppPage({ site, basePath }: AppPageProps) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const FEATURES = ALL_FEATURES.filter(f => !f.sites || f.sites.includes(site.id))

  return (
    <>
      {/* Hero */}
      <section style={{
        background: 'var(--dk)',
        paddingTop: 140, paddingBottom: 100,
        position: 'relative', overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
          <div style={{ position: 'absolute', top: '15%', right: '8%', width: 480, height: 480, borderRadius: '50%', background: 'radial-gradient(circle, var(--a) 0%, transparent 70%)', opacity: 0.06, filter: 'blur(40px)' }} />
          <div style={{ position: 'absolute', bottom: '10%', left: '5%', width: 320, height: 320, borderRadius: '50%', background: 'radial-gradient(circle, var(--a) 0%, transparent 70%)', opacity: 0.04, filter: 'blur(48px)' }} />
        </div>

        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 32px', position: 'relative' }}>
          <div style={{ maxWidth: 680 }}>
            <motion.div
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}
            >
              <div style={{ width: 24, height: '0.5px', background: 'var(--a)' }} />
              <span style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--a)' }}>
                App Momentum
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              style={{ fontSize: 'clamp(36px, 5vw, 64px)', fontWeight: 300, color: '#fff', letterSpacing: '-0.025em', lineHeight: 1.08, marginBottom: 20 }}
            >
              Tu destino<br />en el bolsillo.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
              style={{ fontSize: 16, color: 'rgba(255,255,255,0.38)', fontWeight: 300, lineHeight: 1.85, marginBottom: 48 }}
            >
              Consultá horarios y locales, accedé a ofertas exclusivas y mantente al tanto de lo que pasa en el centro.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
              style={{ display: 'flex', gap: 32, flexWrap: 'wrap', alignItems: 'flex-start' }}
            >
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14 }}>
                <a href="https://apps.apple.com/es/app/momentum/id1524496370?l=en-GB" target="_blank" rel="noopener noreferrer" aria-label="Descargar en App Store"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: 10, padding: '13px 22px', background: 'rgba(255,255,255,0.06)', border: '0.5px solid rgba(255,255,255,0.1)', borderRadius: 6, color: '#fff', textDecoration: 'none' }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" opacity="0.85">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                  </svg>
                  <div>
                    <div style={{ fontSize: 9, letterSpacing: '0.06em', opacity: 0.55 }}>Descargar en</div>
                    <div style={{ fontSize: 13, fontWeight: 500, letterSpacing: '0.01em' }}>App Store</div>
                  </div>
                </a>
                <a href="https://apps.apple.com/es/app/momentum/id1524496370?l=en-GB" target="_blank" rel="noopener noreferrer" aria-label="QR App Store"
                  style={{ display: 'block', padding: 8, background: '#fff', borderRadius: 8, lineHeight: 0 }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="https://api.qrserver.com/v1/create-qr-code/?size=108x108&margin=0&data=https%3A%2F%2Fapps.apple.com%2Fes%2Fapp%2Fmomentum%2Fid1524496370" alt="QR App Store" width={108} height={108} />
                </a>
                <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>Escaneá para iOS</span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14 }}>
                <a href="https://play.google.com/store/apps/details?id=com.baum.loyalty.momemtum&pcampaignid=web_share" target="_blank" rel="noopener noreferrer" aria-label="Descargar en Google Play"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: 10, padding: '13px 22px', background: 'rgba(255,255,255,0.06)', border: '0.5px solid rgba(255,255,255,0.1)', borderRadius: 6, color: '#fff', textDecoration: 'none' }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" opacity="0.85">
                    <path d="M3 20.5v-17c0-.83.94-1.3 1.6-.8l14 8.5c.6.36.6 1.24 0 1.6l-14 8.5c-.66.5-1.6.03-1.6-.8z"/>
                  </svg>
                  <div>
                    <div style={{ fontSize: 9, letterSpacing: '0.06em', opacity: 0.55 }}>Descargar en</div>
                    <div style={{ fontSize: 13, fontWeight: 500, letterSpacing: '0.01em' }}>Google Play</div>
                  </div>
                </a>
                <a href="https://play.google.com/store/apps/details?id=com.baum.loyalty.momemtum&pcampaignid=web_share" target="_blank" rel="noopener noreferrer" aria-label="QR Google Play"
                  style={{ display: 'block', padding: 8, background: '#fff', borderRadius: 8, lineHeight: 0 }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="https://api.qrserver.com/v1/create-qr-code/?size=108x108&margin=0&data=https%3A%2F%2Fplay.google.com%2Fstore%2Fapps%2Fdetails%3Fid%3Dcom.baum.loyalty.momemtum" alt="QR Google Play" width={108} height={108} />
                </a>
                <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>Escaneá para Android</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features grid */}
      <section ref={ref} style={{ background: 'var(--bg)', padding: '100px 0' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 32px' }}>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            style={{ marginBottom: 60 }}
          >
            <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--a)', marginBottom: 12 }}>
              Funcionalidades
            </div>
            <h2 style={{ fontSize: 'clamp(26px, 3.5vw, 38px)', fontWeight: 300, color: 'var(--text)', letterSpacing: '-0.02em', lineHeight: 1.1 }}>
              Todo lo que necesitás en una sola app
            </h2>
          </motion.div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }} className="app-features-grid">
            {FEATURES.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 24 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.55, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
                style={{ background: '#fff', border: '0.5px solid var(--brd)', borderRadius: 6, padding: '28px 24px 32px' }}
              >
                <div style={{ width: 40, height: 40, borderRadius: 8, background: 'var(--bg)', border: '0.5px solid var(--brd)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--a)', marginBottom: 18 }}>
                  {f.icon}
                </div>
                <div style={{ fontSize: 14, fontWeight: 500, color: 'var(--text)', letterSpacing: '-0.01em', marginBottom: 8 }}>{f.title}</div>
                <div style={{ fontSize: 13, color: 'var(--mt)', lineHeight: 1.7, fontWeight: 300 }}>{f.desc}</div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.55 }}
            style={{ marginTop: 64 }}
          >
            <Link href={basePath} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: 11, color: 'var(--mt)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
              ← Volver a {site.name}
            </Link>
          </motion.div>
        </div>
      </section>

      <style>{`
        @media (max-width: 768px) { .app-features-grid { grid-template-columns: 1fr 1fr !important; } }
        @media (max-width: 480px) { .app-features-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </>
  )
}
