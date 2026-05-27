'use client'

import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import type { Tenant, SiteConfig } from '@/data/types'
import { isOpenNow } from '@/lib/hours'

/** Resolves logo/photo to a full URL — handles Sanity CDN, absolute paths, and legacy filenames */
function resolveMediaUrl(value: string | null | undefined, siteId: string, type: 'logos' | 'photos'): string {
  if (!value) return ''
  if (value.startsWith('http') || value.startsWith('/')) return value
  return `/sites/${siteId}/${type}/${value}`
}

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

// ── Share button ──────────────────────────────────────────────────────────────
function ShareButton() {
  const [toast, setToast] = useState<'copied' | 'shared' | null>(null)

  const handleShare = async () => {
    const url  = typeof window !== 'undefined' ? window.location.href : ''
    const title = document.title

    if (navigator.share) {
      try {
        await navigator.share({ title, url })
        setToast('shared')
      } catch { /* user cancelled */ }
    } else {
      try {
        await navigator.clipboard.writeText(url)
        setToast('copied')
      } catch { /* clipboard blocked */ }
    }
  }

  useEffect(() => {
    if (toast) {
      const t = setTimeout(() => setToast(null), 2200)
      return () => clearTimeout(t)
    }
  }, [toast])

  return (
    <div style={{ position: 'relative' }}>
      <button
        onClick={handleShare}
        style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          padding: '11px 18px',
          background: 'rgba(255,255,255,0.06)',
          border: '0.5px solid rgba(255,255,255,0.15)',
          color: 'rgba(255,255,255,0.75)',
          fontSize: 12, fontWeight: 500, letterSpacing: '0.06em',
          borderRadius: 4,
          cursor: 'pointer',
          transition: 'background 0.18s, transform 0.18s',
        }}
        onMouseEnter={e => { const el = e.currentTarget; el.style.background = 'rgba(255,255,255,0.12)'; el.style.transform = 'translateY(-1px)' }}
        onMouseLeave={e => { const el = e.currentTarget; el.style.background = 'rgba(255,255,255,0.06)'; el.style.transform = 'translateY(0)' }}
      >
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/>
          <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
        </svg>
        Compartir
      </button>

      {/* Toast */}
      {toast && (
        <div style={{
          position: 'absolute', top: 'calc(100% + 8px)', left: '50%',
          transform: 'translateX(-50%)',
          background: 'rgba(255,255,255,0.1)',
          backdropFilter: 'blur(12px)',
          border: '0.5px solid rgba(255,255,255,0.15)',
          borderRadius: 4,
          padding: '6px 12px',
          fontSize: 10, fontWeight: 600, letterSpacing: '0.08em',
          color: '#fff',
          whiteSpace: 'nowrap',
          pointerEvents: 'none',
          zIndex: 10,
        }}>
          {toast === 'copied' ? '¡Enlace copiado!' : '¡Compartido!'}
        </div>
      )}
    </div>
  )
}

// ── Photo gallery + lightbox ──────────────────────────────────────────────────
function PhotoGallery({
  mainPhoto, gallery = [], siteId, tenantName,
}: {
  mainPhoto: string
  gallery?: string[]
  siteId: string
  tenantName: string
}) {
  // All photos = main first, then extras
  const allPhotos = [mainPhoto, ...gallery]
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  const close  = useCallback(() => setLightboxIndex(null), [])
  const goNext = useCallback(() => setLightboxIndex(i => i !== null ? (i + 1) % allPhotos.length : null), [allPhotos.length])
  const goPrev = useCallback(() => setLightboxIndex(i => i !== null ? (i - 1 + allPhotos.length) % allPhotos.length : null), [allPhotos.length])

  useEffect(() => {
    if (lightboxIndex === null) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape')      close()
      if (e.key === 'ArrowRight')  goNext()
      if (e.key === 'ArrowLeft')   goPrev()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [lightboxIndex, close, goNext, goPrev])

  // Lock scroll when lightbox open
  useEffect(() => {
    document.body.style.overflow = lightboxIndex !== null ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [lightboxIndex])

  const hasGallery = gallery.length > 0

  return (
    <>
      {/* ── Main banner ── */}
      <div style={{ background: 'var(--dk)', borderTop: '0.5px solid rgba(255,255,255,0.04)' }}>
        <div className="max-w-screen-xl mx-auto px-8" style={{ paddingBottom: hasGallery ? 0 : 0 }}>
          <div
            style={{
              position: 'relative', width: '100%',
              height: 'clamp(220px, 35vw, 480px)',
              borderRadius: hasGallery ? '6px 6px 0 0' : '6px 6px 0 0',
              overflow: 'hidden',
              cursor: 'zoom-in',
            }}
            onClick={() => setLightboxIndex(0)}
          >
            <Image
              src={resolveMediaUrl(mainPhoto, siteId, 'photos')}
              alt={`${tenantName} — foto`}
              fill
              style={{ objectFit: 'cover', objectPosition: 'center 40%' }}
            />
            <div style={{
              position: 'absolute', inset: 0,
              background: 'linear-gradient(to top, rgba(16,8,8,0.4) 0%, transparent 60%)',
            }} />
            {/* "Ver fotos" hint */}
            <div style={{
              position: 'absolute', bottom: 14, right: 16,
              display: 'flex', alignItems: 'center', gap: 5,
              background: 'rgba(0,0,0,0.52)', backdropFilter: 'blur(8px)',
              borderRadius: 4, padding: '6px 12px',
              fontSize: 10, fontWeight: 600, letterSpacing: '0.1em',
              textTransform: 'uppercase', color: '#fff',
            }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/>
                <polyline points="21 15 16 10 5 21"/>
              </svg>
              {hasGallery ? `${allPhotos.length} fotos` : 'Ver foto'}
            </div>
          </div>

          {/* ── Thumbnail strip ── */}
          {hasGallery && (
            <div style={{
              display: 'flex', gap: 4, padding: '4px 0 0',
              overflowX: 'auto',
              scrollbarWidth: 'none',
            }}>
              {allPhotos.map((photo, i) => (
                <button
                  key={photo}
                  onClick={() => setLightboxIndex(i)}
                  style={{
                    flexShrink: 0,
                    width: 72, height: 52,
                    position: 'relative',
                    border: 'none',
                    padding: 0,
                    cursor: 'pointer',
                    opacity: 1,
                    overflow: 'hidden',
                    borderRadius: i === 0 ? '0 0 0 6px' : i === allPhotos.length - 1 ? '0 0 6px 0' : 0,
                    outline: 'none',
                  }}
                >
                  <Image
                    src={resolveMediaUrl(photo, siteId, 'photos')}
                    alt={`${tenantName} foto ${i + 1}`}
                    fill
                    style={{ objectFit: 'cover' }}
                  />
                  <div style={{
                    position: 'absolute', inset: 0,
                    background: 'rgba(0,0,0,0.25)',
                    transition: 'background 0.2s',
                  }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(0,0,0,0)' }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(0,0,0,0.25)' }}
                  />
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ── Lightbox ── */}
      {lightboxIndex !== null && (
        <div
          onClick={close}
          style={{
            position: 'fixed', inset: 0, zIndex: 9999,
            background: 'rgba(0,0,0,0.95)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
        >
          {/* Close */}
          <button
            onClick={close}
            style={{
              position: 'absolute', top: 20, right: 20,
              background: 'rgba(255,255,255,0.1)',
              border: '0.5px solid rgba(255,255,255,0.15)',
              borderRadius: 4,
              width: 40, height: 40,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#fff', cursor: 'pointer',
              zIndex: 1,
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>

          {/* Counter */}
          {allPhotos.length > 1 && (
            <div style={{
              position: 'absolute', top: 24, left: '50%', transform: 'translateX(-50%)',
              fontSize: 11, color: 'rgba(255,255,255,0.5)', letterSpacing: '0.1em',
            }}>
              {lightboxIndex + 1} / {allPhotos.length}
            </div>
          )}

          {/* Image */}
          <div
            onClick={e => e.stopPropagation()}
            style={{
              position: 'relative',
              width: 'min(900px, 90vw)',
              height: 'min(600px, 80vh)',
              borderRadius: 4,
              overflow: 'hidden',
            }}
          >
            <Image
              src={resolveMediaUrl(allPhotos[lightboxIndex], siteId, 'photos')}
              alt={`${tenantName} foto ${lightboxIndex + 1}`}
              fill
              className="object-contain"
              sizes="90vw"
              priority
            />
          </div>

          {/* Prev / Next */}
          {allPhotos.length > 1 && (
            <>
              <button
                onClick={e => { e.stopPropagation(); goPrev() }}
                style={{
                  position: 'absolute', left: 20, top: '50%', transform: 'translateY(-50%)',
                  background: 'rgba(255,255,255,0.1)',
                  border: '0.5px solid rgba(255,255,255,0.15)',
                  borderRadius: 4,
                  width: 44, height: 44,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: '#fff', cursor: 'pointer',
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="15 18 9 12 15 6"/>
                </svg>
              </button>
              <button
                onClick={e => { e.stopPropagation(); goNext() }}
                style={{
                  position: 'absolute', right: 20, top: '50%', transform: 'translateY(-50%)',
                  background: 'rgba(255,255,255,0.1)',
                  border: '0.5px solid rgba(255,255,255,0.15)',
                  borderRadius: 4,
                  width: 44, height: 44,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: '#fff', cursor: 'pointer',
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6"/>
                </svg>
              </button>

              {/* Dot nav */}
              <div style={{
                position: 'absolute', bottom: 24, left: '50%', transform: 'translateX(-50%)',
                display: 'flex', gap: 6,
              }}>
                {allPhotos.map((_, i) => (
                  <button
                    key={i}
                    onClick={e => { e.stopPropagation(); setLightboxIndex(i) }}
                    style={{
                      width: i === lightboxIndex ? 20 : 6,
                      height: 6,
                      borderRadius: 3,
                      background: i === lightboxIndex ? '#fff' : 'rgba(255,255,255,0.3)',
                      border: 'none',
                      cursor: 'pointer',
                      padding: 0,
                      transition: 'width 0.25s, background 0.25s',
                    }}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      )}
    </>
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
  const logoSrc = resolveMediaUrl(tenant.logo, siteId, 'logos')
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
        height: 110, display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: 16, background: '#0a0a0a', borderBottom: '0.5px solid rgba(255,255,255,0.06)',
      }}>
        {logoSrc ? (
          <Image
            src={logoSrc}
            alt={tenant.name}
            width={140} height={70}
            className="object-contain"
            style={{ maxHeight: 64, width: 'auto', maxWidth: '85%' }}
          />
        ) : (
          <div style={{
            width: 140, height: 64,
            background: 'rgba(255,255,255,0.05)',
            borderRadius: 2,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.2)', letterSpacing: '0.05em' }}>
              {tenant.name.slice(0, 2).toUpperCase()}
            </span>
          </div>
        )}
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

  // Map: prefer coords if available, fall back to name + address query
  const mapQuery  = encodeURIComponent(`${tenant.name}, ${site.address}, ${site.city}, Costa Rica`)
  const mapsHref  = `https://maps.google.com/?q=${mapQuery}`

  const heroLogoSrc = resolveMediaUrl(tenant.logo, siteId, 'logos')

  return (
    <>
      {/* ── Breadcrumb ─────────────────────────────────────────────────────── */}
      <div style={{ background: 'var(--dk)', borderBottom: '0.5px solid rgba(255,255,255,0.06)', paddingTop: 80 }}>
        <div className="max-w-screen-xl mx-auto px-8 py-4">
          <Link
            href={backHref}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              fontSize: 11, fontWeight: 500, letterSpacing: '0.08em',
              textTransform: 'uppercase', color: 'rgba(255,255,255,0.38)',
              transition: 'color 0.15s',
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = '#fff' }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.38)' }}
          >
            ← {backLabel}
          </Link>
        </div>
      </div>

      {/* ── Hero ───────────────────────────────────────────────────────────── */}
      <div style={{ background: 'var(--dk)', padding: '56px 0' }}>
        <div className="max-w-screen-xl mx-auto px-8">
          <div className={`tenant-hero-grid${tenant.videoUrl ? ' has-video' : ''}`}>
            {/* Logo box */}
            <div
              className="tenant-hero-logo"
              style={{
                width: 220, height: 220,
                background: '#0a0a0a',
                border: '0.5px solid rgba(255,255,255,0.08)',
                borderRadius: 8,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                padding: 16,
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              {/* Mobile-only: video plays behind the logo */}
              {tenant.videoUrl && (
                <video
                  className="tenant-hero-video-bg"
                  autoPlay muted loop playsInline
                  style={{
                    position: 'absolute', inset: 0,
                    width: '100%', height: '100%',
                    objectFit: 'cover',
                    zIndex: 0,
                  }}
                >
                  <source src={tenant.videoUrl} type="video/mp4" />
                </video>
              )}
              {/* Dark overlay so logo stays legible over video */}
              {tenant.videoUrl && (
                <div
                  className="tenant-hero-video-bg"
                  style={{
                    position: 'absolute', inset: 0,
                    background: 'rgba(0,0,0,0.45)',
                    zIndex: 1,
                  }}
                />
              )}
              {heroLogoSrc ? (
                <Image
                  src={heroLogoSrc}
                  alt={tenant.name}
                  width={180} height={180}
                  className="object-contain"
                  style={{ maxWidth: '100%', maxHeight: 180, width: 'auto', position: 'relative', zIndex: 2 }}
                />
              ) : (
                <div style={{
                  width: 160, height: 80,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  position: 'relative', zIndex: 2,
                }}>
                  <span style={{ fontSize: 28, fontWeight: 200, color: 'rgba(255,255,255,0.25)', letterSpacing: '0.05em' }}>
                    {tenant.name.slice(0, 3).toUpperCase()}
                  </span>
                </div>
              )}
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
                {/* Share button — always visible */}
                <ShareButton />
              </div>
            </div>

            {/* Desktop video column — 3rd grid cell, hidden on mobile */}
            {tenant.videoUrl && (
              <div className="tenant-hero-video-col">
                <video autoPlay muted loop playsInline>
                  <source src={tenant.videoUrl} type="video/mp4" />
                </video>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── Photo gallery (if photo available) ─────────────────────────────── */}
      {tenant.photo && (
        <PhotoGallery
          mainPhoto={tenant.photo}
          gallery={tenant.gallery}
          siteId={siteId}
          tenantName={tenant.name}
        />
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
