'use client'

import { useRef } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import Link from 'next/link'
import type { SiteConfig } from '@/data/types'

const SITE_CONTENT: Record<string, {
  headline: string[]
  body: string
  categories: { label: string; desc: string }[]
  total: string
}> = {
  lindora: {
    headline: ['Un', 'lugar', 'donde', 'cada', 'visita', 'se', 'convierte', 'en', 'experiencia.'],
    body: 'Momentum Lindora es un ecosistema comercial en Santa Ana diseñado para integrar gastronomía, bienestar, comercio de calidad y servicios médicos en un solo destino.',
    categories: [
      { label: 'Gastronomía',   desc: '11 restaurantes y cafés curados' },
      { label: 'Bienestar',     desc: 'Salud, fitness y estética' },
      { label: 'Comercio',      desc: 'Marcas y servicios de calidad' },
      { label: 'Médico',        desc: 'Torre médica especializada' },
    ],
    total: '40+ establecimientos',
  },
  escazu: {
    headline: ['Calma,', 'bienestar', 'y', 'experiencia', 'en', 'un', 'solo', 'lugar.'],
    body: 'Momentum Escazú es el destino premium del ecosistema. Un espacio diseñado para quienes valoran la calma, la calidad y una experiencia de vida sin fricciones en el corazón de Escazú.',
    categories: [
      { label: 'Gastronomía',   desc: 'Restaurantes de autor y cafés' },
      { label: 'Servicios',     desc: 'Especialistas en salud y bienestar' },
      { label: 'Oficentro',     desc: 'Oficinas premium y empresas' },
      { label: 'Bienestar',     desc: 'Pilates, estética y salud integral' },
    ],
    total: '29+ establecimientos',
  },
  pinares: {
    headline: ['Todo', 'lo', 'que', 'necesitás,', 'en', 'un', 'solo', 'lugar.'],
    body: 'Momentum Pinares es el destino más dinámico del ecosistema. Con la mayor variedad de opciones gastronómicas y comerciales, es el lugar donde Curridabat se reúne.',
    categories: [
      { label: 'Gastronomía',   desc: '16 opciones para cada antojo' },
      { label: 'Comercios',     desc: 'Moda, hogar y servicios' },
      { label: 'Bienestar',     desc: 'Fitness, estética y salud' },
      { label: 'Entretenimiento', desc: 'Para toda la familia' },
    ],
    total: '47+ establecimientos',
  },
}

interface EditorialSectionProps {
  basePath: string
  site?: SiteConfig
}

export default function EditorialSection({ basePath, site }: EditorialSectionProps) {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const bgY = useTransform(scrollYProgress, [0, 1], ['-8%', '8%'])

  const content = SITE_CONTENT[site?.id ?? 'lindora'] ?? SITE_CONTENT.lindora

  return (
    <section
      ref={ref}
      style={{ position: 'relative', background: 'var(--dk)', padding: '128px 0', overflow: 'hidden' }}
    >
      <motion.div style={{ position: 'absolute', inset: '-20%', y: bgY, pointerEvents: 'none' }}>
        <div style={{ position: 'absolute', top: '20%', left: '5%', width: 480, height: 480, borderRadius: '50%', background: 'radial-gradient(circle, var(--a) 0%, transparent 70%)', opacity: 0.08, filter: 'blur(40px)' }} />
        <div style={{ position: 'absolute', bottom: '10%', right: '5%', width: 360, height: 360, borderRadius: '50%', background: 'radial-gradient(circle, var(--a) 0%, transparent 70%)', opacity: 0.05, filter: 'blur(48px)' }} />
      </motion.div>

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 32px', position: 'relative', zIndex: 1 }}>
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 52 }}
        >
          <div style={{ width: 32, height: '0.5px', background: 'var(--a)' }} />
          <span style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--a)' }}>
            {site?.name ?? 'Momentum Lindora'}
          </span>
        </motion.div>

        <h2 style={{ fontSize: 'clamp(34px, 5.5vw, 76px)', fontWeight: 300, color: '#fff', letterSpacing: '-0.03em', lineHeight: 1.12, maxWidth: 860, marginBottom: 60, display: 'flex', flexWrap: 'wrap', gap: '0 0.22em' }}>
          {content.headline.map((word, i) => (
            <motion.span key={i}
              initial={{ opacity: 0, y: 32 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: 0.1 + i * 0.07, ease: [0.22, 1, 0.36, 1] }}
              style={{ display: 'inline-block' }}
            >{word}</motion.span>
          ))}
        </h2>

        <div className="editorial-grid" style={{ display: 'grid', alignItems: 'end' }}>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.75, ease: [0.22, 1, 0.36, 1] }}
          >
            <p style={{ fontSize: 17, color: 'rgba(255,255,255,0.36)', fontWeight: 300, lineHeight: 1.9, letterSpacing: '0.01em', marginBottom: 40 }}>
              {content.body}
            </p>
            <Link href={`${basePath}/gastronomia`} style={{
              display: 'inline-flex', alignItems: 'center', gap: 10,
              padding: '13px 26px', background: 'var(--a)', color: '#fff',
              fontSize: 10, fontWeight: 600, letterSpacing: '0.13em', textTransform: 'uppercase', borderRadius: 2,
              transition: 'background 0.2s, transform 0.2s',
            }}
              onMouseEnter={e => { e.currentTarget.style.background = 'var(--a-light)'; e.currentTarget.style.transform = 'translateY(-2px)' }}
              onMouseLeave={e => { e.currentTarget.style.background = 'var(--a)'; e.currentTarget.style.transform = 'translateY(0)' }}
            >
              Explorar el directorio
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3 7h8M8 4l3 3-3 3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            {content.categories.map((item, i) => (
              <motion.div key={item.label}
                initial={{ opacity: 0, x: 20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.9 + i * 0.09, ease: [0.22, 1, 0.36, 1] }}
                style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px 0', borderBottom: '0.5px solid rgba(255,255,255,0.05)' }}
              >
                <span style={{ fontSize: 13, fontWeight: 400, color: 'rgba(255,255,255,0.65)' }}>{item.label}</span>
                <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.24)', fontWeight: 300 }}>{item.desc}</span>
              </motion.div>
            ))}
            <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 0.5, delay: 1.35 }}
              style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px 0' }}
            >
              <span style={{ fontSize: 11, fontWeight: 600, color: 'var(--a)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Total</span>
              <span style={{ fontSize: 11, color: 'var(--a)', fontWeight: 500 }}>{content.total}</span>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
