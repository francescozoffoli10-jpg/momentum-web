'use client'

import { useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import type { SiteConfig } from '@/data/types'

interface HeroSectionProps {
  site: SiteConfig
  basePath: string
}

export default function HeroSection({ site, basePath }: HeroSectionProps) {
  const ref = useRef<HTMLElement>(null)
  const [bouncing, setBouncing] = useState(false)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })

  const bgY      = useTransform(scrollYProgress, [0, 1], ['0%', '25%'])
  const logoY    = useTransform(scrollYProgress, [0, 1], ['0px', '-60px'])
  const logoO    = useTransform(scrollYProgress, [0, 0.4], [1, 0])
  const taglineY = useTransform(scrollYProgress, [0, 0.5], ['0px', '-40px'])
  const taglineO = useTransform(scrollYProgress, [0, 0.35], [1, 0])
  const scrollO  = useTransform(scrollYProgress, [0, 0.15], [1, 0])

  const handleLogoBounce = () => {
    if (bouncing) return
    setBouncing(true)
    setTimeout(() => setBouncing(false), 900)
  }

  return (
    <section
      ref={ref}
      style={{ position: 'relative', width: '100%', height: '100svh', minHeight: 640, overflow: 'hidden' }}
    >
      {/* Parallax background */}
      <motion.div style={{ position: 'absolute', inset: '-10% 0', y: bgY }}>
        <Image
          src={site.heroImage}
          alt={site.name}
          fill
          priority
          sizes="100vw"
          quality={90}
          style={{ objectFit: 'cover', filter: 'brightness(0.44)' }}
        />
      </motion.div>

      {/* Bottom fade */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(to bottom, rgba(16,8,8,0.1) 0%, transparent 30%, rgba(16,8,8,0.55) 78%, rgba(16,8,8,0.92) 100%)',
        pointerEvents: 'none',
      }} />

      {/* Subtle center softening */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse 60% 40% at 50% 52%, rgba(16,8,8,0.30) 0%, transparent 100%)',
        pointerEvents: 'none',
      }} />

      {/* Edge vignette */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse at center, transparent 38%, rgba(16,8,8,0.50) 100%)',
        pointerEvents: 'none',
      }} />

      {/* Content */}
      <div style={{
        position: 'relative', zIndex: 10,
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        height: '100%', textAlign: 'center',
        padding: '0 32px',
      }}>

        {/* Location pill */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            padding: '5px 14px',
            border: '0.5px solid rgba(255,255,255,0.14)',
            borderRadius: 100,
            marginBottom: 40,
            backdropFilter: 'blur(8px)',
            background: 'rgba(255,255,255,0.04)',
          }}
        >
          <span style={{ width: 4, height: 4, borderRadius: '50%', background: 'var(--a)', display: 'inline-block' }} />
          <span style={{ fontSize: 10, fontWeight: 500, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.72)' }}>
            {site.address} · Costa Rica
          </span>
        </motion.div>

        {/* Logo: parallax wrapper → entry anim wrapper → bounce wrapper */}
        <motion.div style={{ y: logoY, opacity: logoO }}>
          {/* Entry animation */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.35 }}
          >
            {/* Bounce / interaction layer */}
            <motion.div
              whileHover={{ y: -10, scaleX: 1.02, scaleY: 0.97 }}
              whileTap={{ scaleX: 1.12, scaleY: 0.78, y: 8 }}
              animate={bouncing ? {
                y: [0, 6, -22, -14, -20, -12, -6, 0],
                scaleX: [1, 1.1, 0.95, 1.05, 0.97, 1.02, 0.99, 1],
                scaleY: [1, 0.80, 1.08, 0.93, 1.05, 0.97, 1.01, 1],
              } : { y: 0, scaleX: 1, scaleY: 1 }}
              transition={bouncing ? {
                duration: 0.88,
                ease: 'easeOut',
                times: [0, 0.08, 0.28, 0.44, 0.59, 0.72, 0.86, 1],
              } : {
                type: 'spring',
                stiffness: 300,
                damping: 14,
              }}
              onClick={handleLogoBounce}
              style={{ cursor: 'pointer', display: 'inline-block', transformOrigin: 'center bottom' }}
              aria-label="Momentum"
            >
              <Image
                src={site.logo}
                alt={site.name}
                width={480}
                height={305}
                priority
                style={{ width: 'clamp(180px, 24vw, 340px)', height: 'auto', userSelect: 'none' }}
                draggable={false}
              />
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Tagline + CTAs */}
        <motion.div
          style={{ y: taglineY, opacity: taglineO }}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          {(() => {
            const SITE_TAGLINES: Record<string, { line1: string; line2: string }> = {
              lindora: {
                line1: 'Gastronomía · Familia · Bienestar · Comercio',
                line2: 'Tu rincón favorito en Santa Ana.',
              },
              escazu: {
                line1: 'Bienestar · Salud · Gastronomía · Negocios',
                line2: 'Calma y experiencia premium en Escazú.',
              },
              pinares: {
                line1: 'Gastronomía · Teatro · Entretenimiento · Cultura',
                line2: 'El ecosistema más completo del este.',
              },
            }
            const t = SITE_TAGLINES[site.id] ?? { line1: 'Gastronomía · Bienestar · Comercio · Vida', line2: 'Un ecosistema para tu estilo de vida.' }
            return (
              <p style={{
                fontSize: 'clamp(12px, 1.2vw, 14px)',
                color: 'rgba(255,255,255,0.68)',
                fontWeight: 400,
                maxWidth: 380,
                lineHeight: 2.1,
                marginTop: 28,
                letterSpacing: '0.05em',
              }}>
                {t.line1}<br />
                {t.line2}
              </p>
            )
          })()}

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.15, ease: [0.22, 1, 0.36, 1] }}
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, marginTop: 36 }}
          >
            <Link
              href={`${basePath}/gastronomia`}
              style={{
                padding: '12px 28px',
                background: 'var(--a)',
                color: '#fff',
                fontSize: 10,
                letterSpacing: '0.13em',
                textTransform: 'uppercase',
                fontWeight: 600,
                borderRadius: 2,
                transition: 'background 0.2s, transform 0.2s',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = 'var(--a-light)'; e.currentTarget.style.transform = 'translateY(-2px)' }}
              onMouseLeave={e => { e.currentTarget.style.background = 'var(--a)'; e.currentTarget.style.transform = 'translateY(0)' }}
            >
              Ver Directorio
            </Link>
            <Link
              href={`${basePath}/app`}
              style={{
                padding: '12px 28px',
                border: '0.5px solid rgba(255,255,255,0.18)',
                color: 'rgba(255,255,255,0.75)',
                fontSize: 10,
                letterSpacing: '0.13em',
                textTransform: 'uppercase',
                fontWeight: 400,
                borderRadius: 2,
                transition: 'border-color 0.2s, color 0.2s, transform 0.2s',
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.42)'; e.currentTarget.style.color = '#fff'; e.currentTarget.style.transform = 'translateY(-2px)' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.18)'; e.currentTarget.style.color = 'rgba(255,255,255,0.52)'; e.currentTarget.style.transform = 'translateY(0)' }}
            >
              Descargá la App
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        style={{
          opacity: scrollO,
          position: 'absolute', bottom: 32, left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
          cursor: 'default',
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
      >
        <span style={{ fontSize: 11, letterSpacing: '0.28em', color: 'rgba(255,255,255,0.55)', textTransform: 'uppercase' }}>Explorá</span>
        <motion.div
          animate={{ y: [0, 7, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5 7.5L10 12.5L15 7.5" stroke="rgba(255,255,255,0.45)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </motion.div>
      </motion.div>
    </section>
  )
}
