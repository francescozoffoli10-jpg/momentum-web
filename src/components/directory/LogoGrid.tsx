'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import type { Tenant } from '@/data/types'

interface LogoGridProps {
  tenants: Tenant[]
  basePath: string
  siteId: string
}

export default function LogoGrid({ tenants, basePath, siteId }: LogoGridProps) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section ref={ref} style={{ background: 'var(--bg)', padding: '64px 0' }}>
      <div className="max-w-screen-xl mx-auto px-8">
        <div
          className="grid gap-4"
          style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))' }}
        >
          {tenants.map((tenant, i) => (
            <motion.div
              key={tenant.slug}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.45, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
            >
              <Link
                href={`${basePath}/${tenant.slug}`}
                className="group block h-full"
                style={{
                  background: '#fff',
                  border: '0.5px solid var(--brd)',
                  borderRadius: 4,
                  overflow: 'hidden',
                  transition: 'box-shadow 0.2s, border-color 0.2s, transform 0.2s',
                }}
                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLElement
                  el.style.boxShadow = '0 4px 20px rgba(0,0,0,0.07)'
                  el.style.transform = 'translateY(-2px)'
                  el.style.borderColor = 'rgba(139,40,40,0.2)'
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLElement
                  el.style.boxShadow = 'none'
                  el.style.transform = 'translateY(0)'
                  el.style.borderColor = 'var(--brd)'
                }}
              >
                {/* Logo */}
                <div
                  style={{
                    height: 110,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: 20,
                    background: 'var(--bg)',
                    borderBottom: '0.5px solid var(--brd)',
                  }}
                >
                  <Image
                    src={`/sites/${siteId}/logos/${tenant.logo}`}
                    alt={tenant.name}
                    width={120}
                    height={60}
                    className="object-contain"
                    style={{ maxHeight: 52, width: 'auto' }}
                  />
                </div>
                {/* Info */}
                <div style={{ padding: '12px 14px' }}>
                  <div style={{ fontSize: 9, color: 'var(--a)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 3 }}>
                    {tenant.category.split(' · ')[1]}
                  </div>
                  <div style={{ fontSize: 13, fontWeight: 500, color: 'var(--text)' }}>
                    {tenant.name}
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
