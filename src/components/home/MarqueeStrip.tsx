'use client'

import { motion } from 'framer-motion'

const ITEMS = [
  { text: 'Gastronomía', dot: false },
  { text: '·', dot: true },
  { text: 'Bienestar', dot: false },
  { text: '·', dot: true },
  { text: 'Estilo de Vida', dot: false },
  { text: '·', dot: true },
  { text: 'Comercio', dot: false },
  { text: '·', dot: true },
  { text: 'Médico', dot: false },
  { text: '·', dot: true },
  { text: 'Fitness', dot: false },
  { text: '·', dot: true },
  { text: 'Santa Ana', dot: false },
  { text: '·', dot: true },
  { text: 'Costa Rica', dot: false },
  { text: '·', dot: true },
]

// Double up so the loop is seamless
const DOUBLED = [...ITEMS, ...ITEMS, ...ITEMS, ...ITEMS]

export default function MarqueeStrip({ inverted = false }: { inverted?: boolean }) {
  return (
    <div style={{
      background: inverted ? 'var(--a)' : 'var(--dk)',
      padding: '16px 0',
      overflow: 'hidden',
      borderTop: inverted ? 'none' : '0.5px solid rgba(255,255,255,0.05)',
      borderBottom: inverted ? 'none' : '0.5px solid rgba(255,255,255,0.05)',
      position: 'relative',
    }}>
      {/* Left fade */}
      <div style={{
        position: 'absolute', left: 0, top: 0, bottom: 0, width: 80, zIndex: 1,
        background: inverted
          ? 'linear-gradient(to right, var(--a), transparent)'
          : 'linear-gradient(to right, var(--dk), transparent)',
        pointerEvents: 'none',
      }} />
      {/* Right fade */}
      <div style={{
        position: 'absolute', right: 0, top: 0, bottom: 0, width: 80, zIndex: 1,
        background: inverted
          ? 'linear-gradient(to left, var(--a), transparent)'
          : 'linear-gradient(to left, var(--dk), transparent)',
        pointerEvents: 'none',
      }} />

      <motion.div
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: 32, repeat: Infinity, ease: 'linear' }}
        style={{ display: 'flex', alignItems: 'center', gap: 32, whiteSpace: 'nowrap', width: 'max-content' }}
      >
        {DOUBLED.map((item, i) => (
          <span
            key={i}
            style={{
              fontSize: item.dot ? 5 : 10,
              fontWeight: item.dot ? 400 : 500,
              letterSpacing: item.dot ? 0 : '0.2em',
              textTransform: 'uppercase',
              color: inverted
                ? (item.dot ? 'rgba(255,255,255,0.4)' : 'rgba(255,255,255,0.82)')
                : (item.dot ? 'var(--a)' : 'rgba(255,255,255,0.2)'),
              display: 'inline-block',
              lineHeight: 1,
            }}
          >
            {item.text}
          </span>
        ))}
      </motion.div>
    </div>
  )
}
