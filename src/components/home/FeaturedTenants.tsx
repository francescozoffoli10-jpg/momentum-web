'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import type { Tenant } from '@/data/types'

interface FeaturedTenantsProps {
  tenants: Tenant[]
  basePath: string
  siteId: string
  sectionLabel?: string
  title?: string
  viewAllHref?: string
  viewAllLabel?: string
}

function TenantCard({ tenant, basePath, siteId, index }: { tenant: Tenant; basePath: string; siteId: string; index: number }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 48 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link
        href={`${basePath}/${tenant.slug}`}
        style={{
          display: 'block',
          background: '#fff',
          borderRadius: 4,
          border: '0.5px solid var(--brd)',
          overflow: 'hidden',
          transition: 'box-shadow 0.35s, transform 0.35s',
        }}
        onMouseEnter={e => {
          e.currentTarget.style.boxShadow = '0 20px 56px rgba(0,0,0,0.12)'
          e.currentTarget.style.transform = 'translateY(-5px)'
        }}
        onMouseLeave={e => {
          e.currentTarget.style.boxShadow = 'none'
          e.currentTarget.style.transform = 'translateY(0)'
        }}
      >
        {/* Image area — photo if available, logo on bg otherwise */}
        <div style={{
          height: 200,
          borderBottom: '0.5px solid var(--brd)',
          position: 'relative', overflow: 'hidden',
          background: tenant.photo ? '#111' : 'var(--bg)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          {tenant.photo ? (
            <>
              <Image
                src={tenant.photo!.startsWith('http') ? tenant.photo! : `/sites/${siteId}/photos/${tenant.photo}`}
                alt={tenant.name}
                fill
                sizes="(max-width: 768px) 100vw, 25vw"
                style={{ objectFit: 'cover', opacity: 0.82 }}
              />
              <div style={{
                position: 'absolute', inset: 0,
                background: 'linear-gradient(to bottom, transparent 40%, rgba(0,0,0,0.55) 100%)',
              }} />
              <div style={{
                position: 'absolute', bottom: 12, left: 14,
                background: 'rgba(0,0,0,0.52)', backdropFilter: 'blur(8px)',
                borderRadius: 4, padding: '5px 10px',
              }}>
                <Image
                  src={`/sites/${siteId}/logos/${tenant.logo}`}
                  alt={tenant.name}
                  width={100}
                  height={40}
                  className="object-contain"
                  style={{ maxHeight: 30, width: 'auto', height: 'auto' }}
                />
              </div>
            </>
          ) : (
            <>
              <div style={{ position: 'absolute', bottom: -16, right: -16, width: 64, height: 64, borderRadius: '50%', background: 'var(--a)', opacity: 0.05 }} />
              <div style={{ position: 'absolute', top: -20, left: -20, width: 48, height: 48, borderRadius: '50%', background: 'var(--a)', opacity: 0.03 }} />
              <Image
                src={`/sites/${siteId}/logos/${tenant.logo}`}
                alt={tenant.name}
                width={180}
                height={100}
                className="object-contain"
                style={{ maxHeight: 96, maxWidth: '75%', width: 'auto', height: 'auto' }}
              />
            </>
          )}
        </div>

        {/* Info */}
        <div style={{ padding: '18px 20px 22px' }}>
          <div style={{
            fontSize: 9, color: 'var(--a)', letterSpacing: '0.14em',
            textTransform: 'uppercase', fontWeight: 600, marginBottom: 6,
          }}>
            {tenant.category.split(' · ')[1] || tenant.category.split(' · ')[0]}
          </div>
          <div style={{ fontSize: 15, fontWeight: 500, color: 'var(--text)', marginBottom: 5, letterSpacing: '-0.01em' }}>
            {tenant.name}
          </div>
          <div style={{ fontSize: 12, color: 'var(--mt)', lineHeight: 1.6 }}>
            {tenant.tagline}
          </div>
          {/* Arrow hint */}
          <div style={{
            marginTop: 14,
            display: 'flex', alignItems: 'center', gap: 5,
            fontSize: 10, color: 'var(--a)', letterSpacing: '0.08em', textTransform: 'uppercase', fontWeight: 500,
          }}>
            Ver más
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M2 6h8M7 3l3 3-3 3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

export default function FeaturedTenants({
  tenants,
  basePath,
  siteId,
  sectionLabel = 'Gastronomía',
  title = 'Donde comer hoy',
  viewAllHref,
  viewAllLabel = 'Ver todos',
}: FeaturedTenantsProps) {
  const resolvedHref = viewAllHref ?? `${basePath}/gastronomia`
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section style={{ background: 'var(--bg)', padding: '100px 0' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 32px' }}>

        {/* Section header */}
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
                {sectionLabel}
              </span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.65, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              style={{ fontSize: 'clamp(26px, 3.5vw, 40px)', fontWeight: 300, color: 'var(--text)', letterSpacing: '-0.02em', lineHeight: 1.1 }}
            >
              {title}
            </motion.h2>
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Link
              href={resolvedHref}
              style={{
                fontSize: 11, color: 'var(--mt)', letterSpacing: '0.1em',
                textTransform: 'uppercase',
                display: 'flex', alignItems: 'center', gap: 6,
                transition: 'color 0.2s',
              }}
              onMouseEnter={e => e.currentTarget.style.color = 'var(--a)'}
              onMouseLeave={e => e.currentTarget.style.color = 'var(--mt)'}
            >
              {viewAllLabel}
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M3 7h8M8 4l3 3-3 3" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
          </motion.div>
        </div>

        <div className="featured-grid" style={{ display: 'grid', gap: 20 }}>
          {tenants.slice(0, 4).map((tenant, i) => (
            <TenantCard key={tenant.slug} tenant={tenant} basePath={basePath} siteId={siteId} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
