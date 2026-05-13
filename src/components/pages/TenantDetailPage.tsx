'use client'

import Image from 'next/image'
import Link from 'next/link'
import type { Tenant, SiteConfig } from '@/data/types'
import { isOpenNow } from '@/lib/hours'

const SECTION_LABELS: Record<string, string> = {
  gastronomia: 'Gastronomía',
  comercios:   'Comercios',
  servicios:   'Servicios',
  ofiplaza:    'Ofiplaza',
  mediplaza:   'Mediplaza',
  oficentro:   'Oficentro',
}

interface TenantDetailPageProps {
  tenant: Tenant
  relatedTenants: Tenant[]
  siteId: string
  basePath: string
  site: SiteConfig
}

// ── Open status pill ──────────────────────────────────────────────────────────
function OpenBadge({ tenant }: { tenant: Tenant }) {
  const status = isOpenNow(tenant)
  if (status === null) return null
  return (
    <div style={{
      display: 'inline-flex', alignItems: 'center', gap: 5,
      padding: '4px 10px',
      background: status ? 'rgba(34,197,94,0.12)' : 'rgba(239,68,68,0.1)',
      border: `0.5px solid ${status ? 'rgba(34,197,94,0.3)' : 'rgba(239,68,68,0.25)'}`,
      borderRadius: 100,
      marginBottom: 16,
    }}>
      <div style={{
        width: 5, height: 5, borderRadius: '50%',
        background: status ? '#22c55e' : '#ef4444',
      }} />
      <span style={{
        fontSize: 9, fontWeight: 600, letterSpacing: '0.1em',
        color: status ? '#16a34a' : '#dc2626',
        textTransform: 'uppercase',
      }}>
        {status ? 'Abierto ahora' : 'Cerrado ahora'}
      </span>
    </div>
  )
}

// ── Link row ──────────────────────────────────────────────────────────────────
function LinkRow({
  label, href, isLast,
}: { label: string; href: string; isLast: boolean }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '9px 0',
        borderBottom: isLast ? 'none' : '0.5px solid var(--brd)',
        fontSize: 13, color: 'var(--text)',
        transition: 'color 0.15s',
      }}
      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = 'var(--a)' }}
      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'var(--text)' }}
    >
      <span>{label}</span>
      <span style={{ color: 'var(--a)', fontSize: 11 }}>↗</span>
    </a>
  )
}

// ── Related tenant card ───────────────────────────────────────────────────────
function RelatedCard({ tenant, siteId, basePath }: { tenant: Tenant; siteId: string; basePath: string }) {
  return (
    <Link
      href={`${basePath}/${tenant.slug}`}
      style={{
        display: 'block',
        background: '#fff',
        border: '0.5px solid var(--brd)',
        borderRadius: 4,
        overflow: 'hidden',
        transition: 'box-shadow 0.2s, transform 0.2s, border-color 0.2s',
      }}
      onMouseEnter={e => {
        const el = e.currentTarget as HTMLElement
        el.style.boxShadow = '0 6px 24px rgba(0,0,0,0.08)'
        el.style.transform = 'translateY(-2px)'
        el.style.borderColor = 'rgba(139,40,40,0.22)'
      }}
      onMouseLeave={e => {
        const el = e.currentTarget as HTMLElement
        el.style.boxShadow = 'none'
        el.style.transform = 'translateY(0)'
        el.style.borderColor = 'var(--brd)'
      }}
    >
      <div style={{
        height: 90, display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: 16, background: 'var(--bg)', borderBottom: '0.5px solid var(--brd)',
      }}>
        <Image
          src={`/sites/${siteId}/logos/${tenant.logo}`}
          alt={tenant.name}
          width={100} height={50}
          className="object-contain"
          style={{ maxHeight: 44, width: 'auto' }}
        />
      </div>
      <div style={{ padding: '10px 12px 12px' }}>
        <div style={{ fontSize: 9, color: 'var(--a)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 2, fontWeight: 500 }}>
          {tenant.category.split(' · ')[1] ?? tenant.category.split(' · ')[0]}
        </div>
        <div style={{ fontSize: 12, fontWeight: 500, color: 'var(--text)', letterSpacing: '-0.01em' }}>
          {tenant.name}
        </div>
      </div>
    </Link>
  )
}

// ── Main component ────────────────────────────────────────────────────────────
export default function TenantDetailPage({
  tenant, relatedTenants, siteId, basePath, site,
}: TenantDetailPageProps) {
  const backHref  = `${basePath}/${tenant.section}`
  const backLabel = SECTION_LABELS[tenant.section] ?? tenant.section

  // Build external link list for sidebar
  const links: { label: string; href: string }[] = []
  if (tenant.website)   links.push({ label: 'Sitio Web',  href: tenant.website })
  if (tenant.instagram) links.push({ label: 'Instagram',  href: `https://instagram.com/${tenant.instagram}` })
  if (tenant.facebook)  links.push({ label: 'Facebook',   href: `https://facebook.com/${tenant.facebook}` })
  if (tenant.whatsapp)  links.push({ label: 'WhatsApp',   href: `https://wa.me/${tenant.whatsapp}` })
  if (tenant.menuUrl)   links.push({ label: 'Menú',       href: tenant.menuUrl })

  const mapQuery = encodeURIComponent(`${tenant.name}, ${site.address}, ${site.city}`)
  const mapsHref = `https://maps.google.com/?q=${mapQuery}`

  return (
    <>
      {/* ── Breadcrumb ─────────────────────────────────────────────────────── */}
      <div style={{ background: '#fff', borderBottom: '0.5px solid var(--brd)', paddingTop: 80 }}>
        <div className="max-w-screen-xl mx-auto px-8 py-4">
          <Link
            href={backHref}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              fontSize: 11, fontWeight: 500, letterSpacing: '0.08em',
              textTransform: 'uppercase', color: 'var(--mt)',
              transition: 'color 0.15s',
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = 'var(--a)' }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'var(--mt)' }}
          >
            ← {backLabel}
          </Link>
        </div>
      </div>

      {/* ── Hero ───────────────────────────────────────────────────────────── */}
      <div style={{ background: 'var(--dk)', padding: '56px 0' }}>
        <div className="max-w-screen-xl mx-auto px-8">
          <div className="tenant-hero-grid">
            {/* Logo box */}
            <div
              className="tenant-hero-logo"
              style={{
                width: 180, height: 180,
                background: 'rgba(255,255,255,0.03)',
                border: '0.5px solid rgba(255,255,255,0.08)',
                borderRadius: 8,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                padding: 24,
              }}
            >
              <Image
                src={`/sites/${siteId}/logos/${tenant.logo}`}
                alt={tenant.name}
                width={130} height={130}
                className="object-contain"
              />
            </div>

            {/* Info */}
            <div>
              <OpenBadge tenant={tenant} />
              <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--a)', marginBottom: 12 }}>
                {tenant.category}
              </div>
              <h1 style={{ fontSize: 'clamp(32px, 5vw, 52px)', fontWeight: 300, color: '#fff', letterSpacing: '-0.01em', marginBottom: 12 }}>
                {tenant.name}
              </h1>
              <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.5)', fontWeight: 300, maxWidth: 500, lineHeight: 1.75, marginBottom: 28 }}>
                {tenant.description}
              </p>

              {/* ── Primary CTAs ── */}
              {(tenant.whatsapp || tenant.menuUrl || tenant.website) && (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
                  {tenant.whatsapp && (
                    <a
                      href={`https://wa.me/${tenant.whatsapp.replace(/\D/g, '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: 'inline-flex', alignItems: 'center', gap: 8,
                        padding: '11px 20px',
                        background: '#25D366',
                        color: '#fff',
                        fontSize: 12, fontWeight: 600, letterSpacing: '0.06em',
                        borderRadius: 4,
                        transition: 'opacity 0.18s, transform 0.18s',
                        textDecoration: 'none',
                      }}
                      onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.opacity = '0.88'; el.style.transform = 'translateY(-1px)' }}
                      onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.opacity = '1'; el.style.transform = 'translateY(0)' }}
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                      </svg>
                      WhatsApp
                    </a>
                  )}
                  {tenant.menuUrl && (
                    <a
                      href={tenant.menuUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: 'inline-flex', alignItems: 'center', gap: 8,
                        padding: '11px 20px',
                        background: 'rgba(255,255,255,0.08)',
                        border: '0.5px solid rgba(255,255,255,0.15)',
                        color: '#fff',
                        fontSize: 12, fontWeight: 500, letterSpacing: '0.06em',
                        borderRadius: 4,
                        transition: 'background 0.18s, transform 0.18s',
                        textDecoration: 'none',
                      }}
                      onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.background = 'rgba(255,255,255,0.14)'; el.style.transform = 'translateY(-1px)' }}
                      onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.background = 'rgba(255,255,255,0.08)'; el.style.transform = 'translateY(0)' }}
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/>
                      </svg>
                      Ver Menú
                    </a>
                  )}
                  {tenant.website && !tenant.menuUrl && (
                    <a
                      href={tenant.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: 'inline-flex', alignItems: 'center', gap: 8,
                        padding: '11px 20px',
                        background: 'rgba(255,255,255,0.08)',
                        border: '0.5px solid rgba(255,255,255,0.15)',
                        color: '#fff',
                        fontSize: 12, fontWeight: 500, letterSpacing: '0.06em',
                        borderRadius: 4,
                        transition: 'background 0.18s, transform 0.18s',
                        textDecoration: 'none',
                      }}
                      onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.background = 'rgba(255,255,255,0.14)'; el.style.transform = 'translateY(-1px)' }}
                      onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.background = 'rgba(255,255,255,0.08)'; el.style.transform = 'translateY(0)' }}
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/>
                      </svg>
                      Sitio Web
                    </a>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ── Photo banner (if available) ─────────────────────────────────────── */}
      {tenant.photo && (
        <div style={{ background: 'var(--dk)', borderTop: '0.5px solid rgba(255,255,255,0.04)' }}>
          <div className="max-w-screen-xl mx-auto px-8" style={{ paddingBottom: 0 }}>
            <div style={{
              position: 'relative', width: '100%', height: 'clamp(220px, 35vw, 480px)',
              borderRadius: '6px 6px 0 0', overflow: 'hidden',
            }}>
              <Image
                src={`/sites/${siteId}/photos/${tenant.photo}`}
                alt={`${tenant.name} — foto`}
                fill
                className="object-cover"
                style={{ objectPosition: 'center 40%' }}
              />
              <div style={{
                position: 'absolute', inset: 0,
                background: 'linear-gradient(to top, rgba(16,8,8,0.4) 0%, transparent 60%)',
              }} />
            </div>
          </div>
        </div>
      )}

      {/* ── Body ───────────────────────────────────────────────────────────── */}
      <div style={{ background: 'var(--bg)', padding: '48px 0 80px' }}>
        <div className="max-w-screen-xl mx-auto px-8">
          <div className="tenant-body-grid">

            {/* ── Main column: Hours ── */}
            <div>
              {tenant.hours.length > 0 && (
                <div style={{ background: '#fff', border: '0.5px solid var(--brd)', borderRadius: 6, padding: 28 }}>
                  <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--mt)', marginBottom: 18 }}>
                    Horarios
                  </div>
                  {tenant.hours.map((row, i) => (
                    <div
                      key={i}
                      style={{
                        display: 'flex', justifyContent: 'space-between',
                        fontSize: 13, padding: '9px 0',
                        borderBottom: i < tenant.hours.length - 1 ? '0.5px solid var(--brd)' : 'none',
                      }}
                    >
                      <span style={{ color: 'var(--text)', fontWeight: 400 }}>{row.days}</span>
                      <span style={{ color: 'var(--mt)' }}>{row.hours}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* ── Sidebar ── */}
            <div className="flex flex-col gap-4">

              {/* Contact */}
              {(tenant.phone || tenant.local) && (
                <div style={{ background: '#fff', border: '0.5px solid var(--brd)', borderRadius: 6, padding: 20 }}>
                  <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--mt)', marginBottom: 14 }}>
                    Contacto
                  </div>
                  {tenant.phone && (
                    <a
                      href={`tel:${tenant.phone}`}
                      style={{
                        display: 'flex', alignItems: 'center', gap: 10,
                        padding: '8px 0',
                        borderBottom: tenant.local ? '0.5px solid var(--brd)' : 'none',
                        fontSize: 13, color: 'var(--text)', transition: 'color 0.15s',
                      }}
                      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = 'var(--a)' }}
                      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'var(--text)' }}
                    >
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--a)', flexShrink: 0 }}>
                        <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.22 1.19 2 2 0 012.22 0h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 14.92z"/>
                      </svg>
                      {tenant.phone}
                    </a>
                  )}
                  {tenant.local && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 0', fontSize: 13, color: 'var(--text)' }}>
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--a)', flexShrink: 0 }}>
                        <rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/>
                      </svg>
                      Local {tenant.local}
                    </div>
                  )}
                </div>
              )}

              {/* External links */}
              {links.length > 0 && (
                <div style={{ background: '#fff', border: '0.5px solid var(--brd)', borderRadius: 6, padding: 20 }}>
                  <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--mt)', marginBottom: 14 }}>
                    Enlaces
                  </div>
                  {links.map((l, i) => (
                    <LinkRow key={l.label} label={l.label} href={l.href} isLast={i === links.length - 1} />
                  ))}
                </div>
              )}

              {/* Location / Map */}
              <div style={{ background: '#fff', border: '0.5px solid var(--brd)', borderRadius: 6, padding: 20 }}>
                <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--mt)', marginBottom: 14 }}>
                  Ubicación
                </div>
                <address style={{ fontStyle: 'normal', fontSize: 12, color: 'var(--mt)', lineHeight: 1.8, marginBottom: 14 }}>
                  {site.name}<br />
                  {site.address}<br />
                  {site.city}
                </address>
                <a
                  href={mapsHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
                    padding: '9px 14px',
                    background: 'var(--dk)',
                    color: '#fff',
                    fontSize: 11, fontWeight: 500, letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    borderRadius: 4,
                    transition: 'opacity 0.18s',
                    textDecoration: 'none',
                  }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.opacity = '0.8' }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.opacity = '1' }}
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/>
                  </svg>
                  Ver en mapa
                </a>
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* ── Related tenants ─────────────────────────────────────────────────── */}
      {relatedTenants.length > 0 && (
        <div style={{ background: '#fff', borderTop: '0.5px solid var(--brd)', padding: '56px 0' }}>
          <div className="max-w-screen-xl mx-auto px-8">
            <div style={{ marginBottom: 32 }}>
              <div style={{ fontSize: 9, fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--a)', marginBottom: 8 }}>
                También en {SECTION_LABELS[tenant.section] ?? tenant.section}
              </div>
              <h2 style={{ fontSize: 22, fontWeight: 300, color: 'var(--text)', letterSpacing: '-0.01em' }}>
                Más locales
              </h2>
            </div>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
              gap: 16,
            }}>
              {relatedTenants.map(t => (
                <RelatedCard key={t.slug} tenant={t} siteId={siteId} basePath={basePath} />
              ))}
            </div>
            <div style={{ marginTop: 28 }}>
              <Link
                href={`${basePath}/${tenant.section}`}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 6,
                  fontSize: 11, fontWeight: 500, letterSpacing: '0.08em',
                  textTransform: 'uppercase', color: 'var(--a)',
                  transition: 'opacity 0.15s',
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.opacity = '0.7' }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.opacity = '1' }}
              >
                Ver todos en {SECTION_LABELS[tenant.section] ?? tenant.section} →
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
