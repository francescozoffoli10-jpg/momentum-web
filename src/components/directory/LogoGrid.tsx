'use client'

import { useState, useMemo, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import type { Tenant } from '@/data/types'

interface LogoGridProps {
  tenants: Tenant[]
  basePath: string
  siteId: string
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function getSubcategory(category: string) {
  return category.split(' · ')[1] ?? category.split(' · ')[0] ?? ''
}

function isOpenNow(tenant: Tenant): boolean | null {
  if (!tenant.hours?.length) return null
  // Costa Rica is UTC-6 (no DST)
  const now = new Date(Date.now() - 6 * 60 * 60 * 1000) // rough UTC-6
  const day = now.getUTCDay()   // 0=Sun, 1=Mon … 6=Sat
  const hour = now.getUTCHours()
  const minute = now.getUTCMinutes()
  const currentMins = hour * 60 + minute

  const DAYS: Record<string, number[]> = {
    lun: [1], mar: [2], mié: [3], mie: [3], jue: [4], vie: [5], sáb: [6], sab: [6], dom: [0],
    'lun – vie': [1,2,3,4,5], 'lun – sáb': [1,2,3,4,5,6], 'lun – dom': [0,1,2,3,4,5,6],
    'lun - vie': [1,2,3,4,5], 'lun - sáb': [1,2,3,4,5,6], 'lun - dom': [0,1,2,3,4,5,6],
  }

  const parseTime = (t: string): number => {
    const lower = t.toLowerCase().replace(/\s/g, '')
    const pm = lower.includes('p.m.') || lower.includes('pm')
    const am = lower.includes('a.m.') || lower.includes('am')
    const clean = lower.replace(/a\.m\.|p\.m\.|am|pm/g, '').replace(':', '.')
    const parts = clean.split('.')
    let h = parseInt(parts[0] ?? '0', 10)
    const m = parseInt(parts[1] ?? '0', 10)
    if (pm && h !== 12) h += 12
    if (am && h === 12) h = 0
    return h * 60 + m
  }

  for (const row of tenant.hours) {
    const dayKey = row.days.toLowerCase().trim()
    const matchedDays = DAYS[dayKey] ?? null

    if (!matchedDays) continue
    if (!matchedDays.includes(day)) continue

    const hoursStr = row.hours.toLowerCase()
    if (hoursStr.includes('24 hora') || hoursStr.includes('abierto')) return true

    const rangeParts = hoursStr.split(/–|-|a/)
    if (rangeParts.length < 2) continue

    try {
      const open = parseTime(rangeParts[0])
      const close = parseTime(rangeParts[rangeParts.length - 1])
      if (open < close) {
        if (currentMins >= open && currentMins < close) return true
      } else {
        // Overnight
        if (currentMins >= open || currentMins < close) return true
      }
    } catch {
      // ignore parse errors
    }
  }
  return false
}

// ── Search bar ────────────────────────────────────────────────────────────────
function SearchBar({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <div style={{ position: 'relative', maxWidth: 380 }}>
      <svg
        width="14" height="14" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"
        style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'var(--mt)', pointerEvents: 'none' }}
      >
        <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
      </svg>
      <input
        type="text"
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder="Buscar local…"
        style={{
          width: '100%',
          padding: '11px 16px 11px 38px',
          background: '#fff',
          border: '0.5px solid var(--brd)',
          borderRadius: 4,
          fontSize: 13,
          color: 'var(--text)',
          fontFamily: 'inherit',
          outline: 'none',
          transition: 'border-color 0.2s, box-shadow 0.2s',
        }}
        onFocus={e => { e.target.style.borderColor = 'var(--a)'; e.target.style.boxShadow = '0 0 0 3px rgba(139,40,40,0.08)' }}
        onBlur={e => { e.target.style.borderColor = 'var(--brd)'; e.target.style.boxShadow = 'none' }}
      />
      {value && (
        <button
          onClick={() => onChange('')}
          style={{
            position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)',
            background: 'none', border: 'none', cursor: 'pointer',
            color: 'var(--mt)', padding: 2, lineHeight: 1,
          }}
          aria-label="Borrar búsqueda"
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M1 1l10 10M11 1L1 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </button>
      )}
    </div>
  )
}

// ── Category chip ─────────────────────────────────────────────────────────────
function Chip({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      style={{
        display: 'inline-flex', alignItems: 'center', gap: 5,
        padding: '6px 14px',
        fontSize: 10, fontWeight: active ? 600 : 400,
        letterSpacing: '0.09em', textTransform: 'uppercase',
        borderRadius: 2,
        border: `0.5px solid ${active ? 'var(--a)' : 'var(--brd)'}`,
        background: active ? 'var(--a)' : '#fff',
        color: active ? '#fff' : 'var(--mt)',
        cursor: 'pointer',
        fontFamily: 'inherit',
        transition: 'all 0.18s ease',
        whiteSpace: 'nowrap',
      }}
    >
      {label}
    </button>
  )
}

// ── Tenant card ───────────────────────────────────────────────────────────────
function TenantCard({ tenant, basePath, siteId, index }: {
  tenant: Tenant; basePath: string; siteId: string; index: number
}) {
  const openStatus = useMemo(() => isOpenNow(tenant), [tenant])
  const subcategory = getSubcategory(tenant.category)

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.3, delay: Math.min(index * 0.03, 0.3), ease: [0.22, 1, 0.36, 1] }}
    >
      <Link
        href={`${basePath}/${tenant.slug}`}
        style={{
          display: 'block',
          background: '#fff',
          border: '0.5px solid var(--brd)',
          borderRadius: 4,
          overflow: 'hidden',
          transition: 'box-shadow 0.2s, border-color 0.2s, transform 0.2s',
          height: '100%',
        }}
        onMouseEnter={e => {
          const el = e.currentTarget as HTMLElement
          el.style.boxShadow = '0 6px 24px rgba(0,0,0,0.08)'
          el.style.transform = 'translateY(-2px)'
          el.style.borderColor = 'rgba(var(--a-rgb, 139,40,40),0.22)'
        }}
        onMouseLeave={e => {
          const el = e.currentTarget as HTMLElement
          el.style.boxShadow = 'none'
          el.style.transform = 'translateY(0)'
          el.style.borderColor = 'var(--brd)'
        }}
      >
        {/* Logo area */}
        <div style={{
          height: 110, display: 'flex', alignItems: 'center', justifyContent: 'center',
          padding: 20, background: 'var(--bg)', borderBottom: '0.5px solid var(--brd)',
          position: 'relative',
        }}>
          <Image
            src={`/sites/${siteId}/logos/${tenant.logo}`}
            alt={tenant.name}
            width={120} height={60}
            className="object-contain"
            style={{ maxHeight: 52, width: 'auto' }}
          />
          {/* Open now badge */}
          {openStatus === true && (
            <div style={{
              position: 'absolute', top: 8, right: 8,
              display: 'inline-flex', alignItems: 'center', gap: 4,
              padding: '3px 8px',
              background: 'rgba(34,197,94,0.1)',
              border: '0.5px solid rgba(34,197,94,0.3)',
              borderRadius: 100,
            }}>
              <div style={{ width: 5, height: 5, borderRadius: '50%', background: '#22c55e' }} />
              <span style={{ fontSize: 8, fontWeight: 600, letterSpacing: '0.1em', color: '#16a34a', textTransform: 'uppercase' }}>
                Abierto
              </span>
            </div>
          )}
        </div>
        {/* Info */}
        <div style={{ padding: '12px 14px 14px' }}>
          <div style={{ fontSize: 9, color: 'var(--a)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 3, fontWeight: 500 }}>
            {subcategory}
          </div>
          <div style={{ fontSize: 13, fontWeight: 500, color: 'var(--text)', letterSpacing: '-0.01em' }}>
            {tenant.name}
          </div>
          {tenant.tagline && (
            <div style={{ fontSize: 11, color: 'var(--mt)', marginTop: 3, lineHeight: 1.5, fontWeight: 300,
              overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' as const }}>
              {tenant.tagline}
            </div>
          )}
        </div>
      </Link>
    </motion.div>
  )
}

// ── Main component ────────────────────────────────────────────────────────────
export default function LogoGrid({ tenants, basePath, siteId }: LogoGridProps) {
  const [query, setQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState<string | null>(null)

  // Build unique category list
  const categories = useMemo(() => {
    const seen = new Set<string>()
    tenants.forEach(t => {
      const sub = getSubcategory(t.category)
      if (sub) seen.add(sub)
    })
    return Array.from(seen).sort()
  }, [tenants])

  // Filter logic
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return tenants.filter(t => {
      const matchesSearch = !q
        || t.name.toLowerCase().includes(q)
        || t.category.toLowerCase().includes(q)
        || (t.tagline?.toLowerCase().includes(q) ?? false)
      const matchesCategory = !activeCategory
        || getSubcategory(t.category) === activeCategory
      return matchesSearch && matchesCategory
    })
  }, [tenants, query, activeCategory])

  const hasFilters = !!query || !!activeCategory

  return (
    <section style={{ background: 'var(--bg)', padding: '40px 0 80px' }}>
      <div className="max-w-screen-xl mx-auto px-8">

        {/* ── Controls bar ────────────────────────────────────────────────── */}
        <div style={{
          display: 'flex', flexWrap: 'wrap', gap: 16,
          alignItems: 'flex-start', justifyContent: 'space-between',
          marginBottom: 28,
          paddingBottom: 24,
          borderBottom: '0.5px solid var(--brd)',
        }}>
          <SearchBar value={query} onChange={setQuery} />

          {/* Result count */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, alignSelf: 'center' }}>
            <span style={{ fontSize: 11, color: 'var(--mt)', fontWeight: 300 }}>
              {filtered.length} {filtered.length === 1 ? 'resultado' : 'resultados'}
            </span>
            {hasFilters && (
              <button
                onClick={() => { setQuery(''); setActiveCategory(null) }}
                style={{
                  fontSize: 10, color: 'var(--a)', background: 'none', border: 'none',
                  cursor: 'pointer', fontFamily: 'inherit', letterSpacing: '0.06em',
                  paddingLeft: 6,
                }}
              >
                Limpiar filtros ×
              </button>
            )}
          </div>
        </div>

        {/* ── Category chips ───────────────────────────────────────────────── */}
        {categories.length > 1 && (
          <div style={{
            display: 'flex', flexWrap: 'wrap', gap: 8,
            marginBottom: 36,
          }}>
            <Chip
              label="Todos"
              active={activeCategory === null}
              onClick={() => setActiveCategory(null)}
            />
            {categories.map(cat => (
              <Chip
                key={cat}
                label={cat}
                active={activeCategory === cat}
                onClick={() => setActiveCategory(activeCategory === cat ? null : cat)}
              />
            ))}
          </div>
        )}

        {/* ── Grid ────────────────────────────────────────────────────────── */}
        <AnimatePresence mode="popLayout">
          {filtered.length > 0 ? (
            <motion.div
              layout
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
                gap: 16,
              }}
            >
              {filtered.map((tenant, i) => (
                <TenantCard
                  key={tenant.slug}
                  tenant={tenant}
                  basePath={basePath}
                  siteId={siteId}
                  index={i}
                />
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              style={{
                padding: '80px 0',
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12,
                textAlign: 'center',
              }}
            >
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--brd)' }}>
                <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
              </svg>
              <p style={{ fontSize: 15, color: 'var(--mt)', fontWeight: 300 }}>
                No encontramos resultados para <strong style={{ fontWeight: 500, color: 'var(--text)' }}>&quot;{query || activeCategory}&quot;</strong>
              </p>
              <button
                onClick={() => { setQuery(''); setActiveCategory(null) }}
                style={{
                  marginTop: 4, fontSize: 11, color: 'var(--a)', background: 'none', border: 'none',
                  cursor: 'pointer', fontFamily: 'inherit', letterSpacing: '0.08em',
                  textTransform: 'uppercase', fontWeight: 600,
                }}
              >
                Ver todos los locales
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
