import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { allTenants, getTenant } from '@/data/sites/pinares/all'

const SECTION_LABELS: Record<string, string> = {
  gastronomia: 'Gastronomía',
  comercios: 'Comercios',
}

export async function generateStaticParams() {
  return allTenants.map((t) => ({ slug: t.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const tenant = getTenant(slug)
  if (!tenant) return {}
  return { title: tenant.name, description: tenant.description }
}

export default async function TenantDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const tenant = getTenant(slug)
  if (!tenant) notFound()

  const backHref = `/pinares/${tenant.section}`
  const backLabel = SECTION_LABELS[tenant.section] ?? tenant.section

  return (
    <>
      <style>{`
        .td-back:hover { color: var(--a) !important; }
        .td-btn-primary:hover { background: var(--a-light) !important; }
        .td-btn-outline:hover { color: var(--text) !important; border-color: var(--text) !important; }
        .td-contact-link:hover { color: var(--a) !important; }
      `}</style>

      <div style={{ background: '#fff', borderBottom: '0.5px solid var(--brd)', paddingTop: 80 }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '16px 32px' }}>
          <Link href={backHref} className="td-back" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 11, fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--mt)', transition: 'color 0.2s' }}>
            ← {backLabel}
          </Link>
        </div>
      </div>

      <div style={{ background: 'var(--dk)', padding: '56px 0' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 32px' }}>
          <div className="tenant-hero-grid">
            <div className="tenant-hero-logo" style={{ width: 180, height: 180, background: 'rgba(255,255,255,0.03)', border: '0.5px solid rgba(255,255,255,0.08)', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
              <Image src={`/sites/pinares/logos/${tenant.logo}`} alt={tenant.name} width={140} height={140} style={{ objectFit: 'contain', maxHeight: 120, width: 'auto' }} />
            </div>
            <div>
              <div style={{ fontSize: 10, color: 'var(--a)', letterSpacing: '0.14em', textTransform: 'uppercase', fontWeight: 600, marginBottom: 10 }}>
                {SECTION_LABELS[tenant.section] ?? tenant.section}
              </div>
              <h1 style={{ fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 300, color: '#fff', letterSpacing: '-0.02em', marginBottom: 12 }}>{tenant.name}</h1>
              <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.45)', fontWeight: 300, lineHeight: 1.7, maxWidth: 560 }}>{tenant.tagline}</p>
            </div>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '64px 32px' }}>
      <div className="tenant-body-grid">
        <div>
          <h2 style={{ fontSize: 22, fontWeight: 300, color: 'var(--text)', letterSpacing: '-0.01em', marginBottom: 16 }}>Sobre {tenant.name}</h2>
          <p style={{ fontSize: 15, color: 'var(--mt)', lineHeight: 1.9, fontWeight: 300 }}>{tenant.description}</p>
          {(tenant.menuUrl || tenant.website) && (
            <div style={{ display: 'flex', gap: 12, marginTop: 32 }}>
              {tenant.menuUrl && (
                <a href={tenant.menuUrl} target="_blank" rel="noopener noreferrer" className="td-btn-primary"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '11px 24px', background: 'var(--a)', color: '#fff', fontSize: 10, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', borderRadius: 2, transition: 'background 0.2s' }}
                >Ver Menú ↗</a>
              )}
              {tenant.website && (
                <a href={tenant.website} target="_blank" rel="noopener noreferrer" className="td-btn-outline"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '11px 24px', border: '0.5px solid var(--brd)', color: 'var(--mt)', fontSize: 10, fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase', borderRadius: 2, transition: 'color 0.2s, border-color 0.2s' }}
                >Sitio web ↗</a>
              )}
            </div>
          )}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          {tenant.hours.length > 0 && (
            <div style={{ background: 'var(--bg)', border: '0.5px solid var(--brd)', borderRadius: 6, padding: '24px' }}>
              <div style={{ fontSize: 9, fontWeight: 600, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--a)', marginBottom: 16 }}>Horarios</div>
              {tenant.hours.map((h, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: i < tenant.hours.length - 1 ? '0.5px solid var(--brd)' : 'none' }}>
                  <span style={{ fontSize: 12, color: 'var(--mt)', fontWeight: 300 }}>{h.days}</span>
                  <span style={{ fontSize: 12, color: 'var(--text)', fontWeight: 400 }}>{h.hours}</span>
                </div>
              ))}
            </div>
          )}
          <div style={{ background: 'var(--bg)', border: '0.5px solid var(--brd)', borderRadius: 6, padding: '24px', display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div style={{ fontSize: 9, fontWeight: 600, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--a)', marginBottom: 4 }}>Contacto</div>
            {tenant.phone && <a href={`tel:${tenant.phone}`} className="td-contact-link" style={{ fontSize: 13, color: 'var(--mt)', transition: 'color 0.2s' }}>📞 {tenant.phone}</a>}
            {tenant.whatsapp && <a href={`https://wa.me/${tenant.whatsapp}`} target="_blank" rel="noopener noreferrer" className="td-contact-link" style={{ fontSize: 13, color: 'var(--mt)', transition: 'color 0.2s' }}>💬 WhatsApp</a>}
            {tenant.instagram && <a href={`https://instagram.com/${tenant.instagram}`} target="_blank" rel="noopener noreferrer" className="td-contact-link" style={{ fontSize: 13, color: 'var(--mt)', transition: 'color 0.2s' }}>@{tenant.instagram}</a>}
            {tenant.local && <span style={{ fontSize: 13, color: 'var(--mt)' }}>Local {tenant.local}</span>}
          </div>
        </div>
      </div>
      </div>
    </>
  )
}
