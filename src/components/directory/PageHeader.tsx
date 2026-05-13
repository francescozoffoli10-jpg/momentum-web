'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

interface SectionLink {
  href: string
  label: string
  active?: boolean
}

interface PageHeaderProps {
  eyebrow: string
  title: string
  description: string
  count: number
  countLabel: string
  sectionLinks?: SectionLink[]
}

export default function PageHeader({
  eyebrow, title, description, count, countLabel, sectionLinks,
}: PageHeaderProps) {
  return (
    <div
      style={{
        background: 'var(--dk)',
        padding: '120px 0 64px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Dot grid decoration */}
      <svg
        className="absolute right-8 top-8 opacity-10"
        width="220" height="220" viewBox="0 0 220 220"
        aria-hidden="true"
      >
        <g fill="white">
          {[20,60,100,140,180].flatMap(cy =>
            [20,60,100,140,180].map(cx =>
              <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="2" />
            )
          )}
        </g>
      </svg>

      <div className="max-w-screen-xl mx-auto px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--a)', marginBottom: 16 }}>
            {eyebrow}
          </div>
          <h1 style={{ fontSize: 'clamp(40px, 6vw, 72px)', fontWeight: 300, color: '#fff', letterSpacing: '-0.02em', lineHeight: 1, marginBottom: 16 }}>
            {title}
          </h1>
          <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.45)', fontWeight: 300, maxWidth: 480, lineHeight: 1.7, marginBottom: 20 }}>
            {description}
          </p>
          <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.25)' }}>
            <span style={{ fontSize: 28, fontWeight: 300, color: '#fff', marginRight: 6 }}>{count}</span>
            {countLabel}
          </div>
        </motion.div>

        {/* Section nav */}
        {sectionLinks && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="flex gap-2 flex-wrap mt-10"
          >
            {sectionLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  padding: '8px 16px',
                  fontSize: 10,
                  fontWeight: 500,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  borderRadius: 2,
                  transition: 'all 0.15s',
                  background: link.active ? 'var(--a)' : 'transparent',
                  color: link.active ? '#fff' : 'rgba(255,255,255,0.4)',
                  border: link.active ? 'none' : '0.5px solid rgba(255,255,255,0.15)',
                }}
              >
                {link.label}
              </Link>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  )
}
