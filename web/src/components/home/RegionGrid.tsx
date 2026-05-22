'use client'

import { useRef } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import type { RegionCard } from '@/data/types'

const PALETTE = [
  '#2C1810', '#1A1208', '#0F1A0A', '#0A1218',
  '#1A0A10', '#100818', '#180A0A', '#0A1610',
  '#181008',
]

function Card({ card, basePath, index }: { card: RegionCard; basePath: string; index: number; }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 36 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay: (index % 3) * 0.1, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link
        href={card.href ?? `${basePath}/gastronomia?cat=${encodeURIComponent(card.flag)}`}
        style={{
          display: 'block',
          position: 'relative',
          borderRadius: 4,
          overflow: 'hidden',
          aspectRatio: '1',
          background: card.color || PALETTE[index % PALETTE.length],
          transition: 'transform 0.4s cubic-bezier(0.22,1,0.36,1)',
        }}
        onMouseEnter={e => {
          e.currentTarget.style.transform = 'scale(1.02)'
          const inner = e.currentTarget.querySelector('.card-inner') as HTMLElement
          if (inner) inner.style.opacity = '1'
        }}
        onMouseLeave={e => {
          e.currentTarget.style.transform = 'scale(1)'
          const inner = e.currentTarget.querySelector('.card-inner') as HTMLElement
          if (inner) inner.style.opacity = '0'
        }}
      >
        {/* Background image */}
        {card.image && (
          <Image
            src={card.image}
            alt={card.title}
            fill
            sizes="(max-width: 768px) 50vw, 33vw"
            style={{ objectFit: 'cover', opacity: 0.75, transition: 'opacity 0.4s, transform 0.6s' }}
          />
        )}

        {/* Gradient */}
        <div style={{
          position: 'absolute', inset: 0,
          background: card.image
            ? 'linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.55) 100%)'
            : 'linear-gradient(135deg, rgba(139,40,40,0.15) 0%, transparent 60%, rgba(0,0,0,0.4) 100%)',
        }} />

        {/* Hover overlay */}
        <div className="card-inner" style={{
          position: 'absolute', inset: 0,
          background: 'rgba(139,40,40,0.12)',
          opacity: 0,
          transition: 'opacity 0.35s ease',
        }} />

        {/* Content */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '16px 16px' }}>
          <div style={{
            fontSize: 'clamp(13px, 1.4vw, 16px)', fontWeight: 500,
            color: '#fff', letterSpacing: '0.01em',
            lineHeight: 1.2, textTransform: 'capitalize',
          }}>
            {card.flag}
          </div>
          <div style={{
            fontSize: 10, color: 'rgba(255,255,255,0.35)',
            marginTop: 4, letterSpacing: '0.02em',
          }}>
            {card.restaurants.length} {card.restaurants.length === 1 ? 'opción' : 'opciones'}
          </div>
        </div>

        {/* Top-right arrow */}
        <div style={{
          position: 'absolute', top: 12, right: 12,
          width: 28, height: 28, borderRadius: '50%',
          border: '0.5px solid rgba(255,255,255,0.15)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
            <path d="M3 7L7 3M7 3H4M7 3V6" stroke="rgba(255,255,255,0.5)" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </Link>
    </motion.div>
  )
}

interface RegionGridProps {
  cards: RegionCard[]
  basePath: string
  gridTitle?: string      // defaults to "Explora por cocina"
  sectionLabel?: string   // CTA text, defaults to "Ver gastronomía"
  sectionHref?: string    // CTA href, defaults to {basePath}/gastronomia
}

export default function RegionGrid({ cards, basePath, gridTitle, sectionLabel, sectionHref }: RegionGridProps) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section style={{ background: 'var(--bg)', padding: '100px 0' }}>
      <style>{`
        @media (max-width: 600px) {
          .region-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}</style>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 32px' }}>

        {/* Header */}
        <div ref={ref} style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 52 }}>
          <div>
            <motion.div
              initial={{ opacity: 0, x: -16 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}
            >
              <div style={{ width: 20, height: '0.5px', background: 'var(--a)' }} />
              <span style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--a)' }}>
                El Directorio
              </span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.65, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              style={{ fontSize: 'clamp(26px, 3.5vw, 40px)', fontWeight: 300, color: 'var(--text)', letterSpacing: '-0.02em', lineHeight: 1.1 }}
            >
              {gridTitle ?? 'Explorá por cocina'}
            </motion.h2>
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Link
              href={sectionHref ?? `${basePath}/gastronomia`}
              style={{ fontSize: 11, color: 'var(--mt)', letterSpacing: '0.1em', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: 6, transition: 'color 0.2s' }}
              onMouseEnter={e => e.currentTarget.style.color = 'var(--a)'}
              onMouseLeave={e => e.currentTarget.style.color = 'var(--mt)'}
            >
              {sectionLabel ?? 'Ver gastronomía'}
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M3 7h8M8 4l3 3-3 3" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
          </motion.div>
        </div>

        {/* 3×3 Grid */}
        <div className="region-grid" style={{ display: 'grid', gap: 16, gridTemplateColumns: 'repeat(3, 1fr)' }}>
          {cards.slice(0, 9).map((card, i) => (
            <Card key={card.id} card={card} basePath={basePath} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
