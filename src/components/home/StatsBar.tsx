'use client'

import { useRef, useEffect, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import type { SiteConfig } from '@/data/types'

const SITE_STATS: Record<string, { value: number; suffix: string; label: string; sub: string }[]> = {
  lindora: [
    { value: 40, suffix: '+', label: 'Establecimientos', sub: 'en el ecosistema' },
    { value: 11, suffix: '',  label: 'Restaurantes',     sub: 'de cocina curada' },
    { value: 5,  suffix: '',  label: 'Zonas',            sub: 'temáticas' },
    { value: 1,  suffix: '',  label: 'Ecosistema',       sub: 'de vida completo' },
  ],
  escazu: [
    { value: 29, suffix: '+', label: 'Establecimientos', sub: 'en el ecosistema' },
    { value: 8,  suffix: '',  label: 'Restaurantes',     sub: 'y cafés curados' },
    { value: 10, suffix: '+', label: 'Especialidades',   sub: 'médicas disponibles'  },
    { value: 3,  suffix: '',  label: 'Zonas',            sub: 'diferenciadas' },
  ],
  pinares: [
    { value: 47, suffix: '+', label: 'Establecimientos', sub: 'en el ecosistema' },
    { value: 16, suffix: '',  label: 'Restaurantes',     sub: 'y opciones gastro' },
    { value: 4,  suffix: '',  label: 'Zonas',            sub: 'Gastro · Comercios · Oficentro · Torre Médica' },
    { value: 1,  suffix: '',  label: 'Destino',          sub: 'todo en un lugar' },
  ],
}

function Counter({ target, suffix, inView }: { target: number; suffix: string; inView: boolean }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!inView) return
    let start = 0
    const duration = 1600
    const step = 16
    const increment = target / (duration / step)
    const timer = setInterval(() => {
      start += increment
      if (start >= target) { setCount(target); clearInterval(timer) }
      else setCount(Math.floor(start))
    }, step)
    return () => clearInterval(timer)
  }, [inView, target])

  return <>{count}{suffix}</>
}

export default function StatsBar({ site }: { site?: SiteConfig }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const STATS = SITE_STATS[site?.id ?? 'lindora'] ?? SITE_STATS.lindora

  return (
    <section ref={ref} style={{ background: 'var(--dk)', padding: '72px 0' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 32px' }}>
        <motion.div
          initial={{ scaleX: 0 }} animate={inView ? { scaleX: 1 } : {}}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          style={{ height: '0.5px', background: 'rgba(255,255,255,0.07)', transformOrigin: 'left', marginBottom: 52 }}
        />
        <div className="stats-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)' }}>
          {STATS.map((stat, i) => (
            <motion.div key={stat.label}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              style={{
                paddingRight: i < STATS.length - 1 ? 40 : 0,
                paddingLeft: i > 0 ? 40 : 0,
                borderRight: i < STATS.length - 1 ? '0.5px solid rgba(255,255,255,0.06)' : 'none',
              }}
            >
              <div style={{ fontSize: 'clamp(40px, 5vw, 58px)', fontWeight: 300, color: '#fff', letterSpacing: '-0.04em', lineHeight: 1, marginBottom: 6 }}>
                <Counter target={stat.value} suffix={stat.suffix} inView={inView} />
              </div>
              <motion.div
                initial={{ scaleX: 0 }}
                animate={inView ? { scaleX: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.3 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                style={{ width: 24, height: 1.5, background: 'var(--a)', borderRadius: 1, transformOrigin: 'left', marginBottom: 12 }}
              />
              <div style={{ fontSize: 12, fontWeight: 500, color: 'rgba(255,255,255,0.65)', letterSpacing: '0.04em', marginBottom: 3 }}>{stat.label}</div>
              <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.22)', fontWeight: 300, letterSpacing: '0.02em' }}>{stat.sub}</div>
            </motion.div>
          ))}
        </div>
        <motion.div
          initial={{ scaleX: 0 }} animate={inView ? { scaleX: 1 } : {}}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.5 }}
          style={{ height: '0.5px', background: 'rgba(255,255,255,0.07)', transformOrigin: 'left', marginTop: 52 }}
        />
      </div>
    </section>
  )
}

