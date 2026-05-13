import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { allTenants, getTenant } from '@/data/sites/lindora/all'

const SECTION_LABELS: Record<string, string> = {
  gastronomia: 'Gastronomía',
  comercios: 'Comercios',
  servicios: 'Servicios',
  ofiplaza: 'Ofiplaza',
  mediplaza: 'Mediplaza',
}

export async function generateStaticParams() {
  return allTenants.map((t) => ({ slug: t.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const tenant = getTenant(slug)
  if (!tenant) return {}
  return {
    title: tenant.name,
    description: tenant.description,
  }
}

export default async function TenantDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const tenant = getTenant(slug)
  if (!tenant) notFound()

  const backHref = `/lindora/${tenant.section}`
  const backLabel = SECTION_LABELS[tenant.section]

  return (
    <>
      {/* Back link */}
      <div style={{ background: '#fff', borderBottom: '0.5px solid var(--brd)', paddingTop: 80 }}>
        <div className="max-w-screen-xl mx-auto px-8 py-4">
          <Link
            href={backHref}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              fontSize: 11,
              fontWeight: 500,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: 'var(--mt)',
            }}
            className="hover:text-[var(--a)] transition-colors"
          >
            ← {backLabel}
          </Link>
        </div>
      </div>

      {/* Hero */}
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
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: 24,
              }}
            >
              <Image
                src={`/sites/lindora/logos/${tenant.logo}`}
                alt={tenant.name}
                width={130}
                height={130}
                className="object-contain"
              />
            </div>

            {/* Info */}
            <div>
              <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--a)', marginBottom: 12 }}>
                {tenant.category}
              </div>
              <h1 style={{ fontSize: 'clamp(32px, 5vw, 52px)', fontWeight: 300, color: '#fff', letterSpacing: '-0.01em', marginBottom: 12 }}>
                {tenant.name}
              </h1>
              <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.5)', fontWeight: 300, maxWidth: 500, lineHeight: 1.75 }}>
                {tenant.description}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Body */}
      <div style={{ background: 'var(--bg)', padding: '48px 0 80px' }}>
        <div className="max-w-screen-xl mx-auto px-8">
          <div className="tenant-body-grid">

            {/* Hours */}
            <div>
              <div
                style={{
                  background: '#fff',
                  border: '0.5px solid var(--brd)',
                  borderRadius: 6,
                  padding: 28,
                }}
              >
                <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--mt)', marginBottom: 18 }}>
                  Horarios
                </div>
                {tenant.hours.map((row, i) => (
                  <div
                    key={i}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      fontSize: 13,
                      padding: '9px 0',
                      borderBottom: i < tenant.hours.length - 1 ? '0.5px solid var(--brd)' : 'none',
                    }}
                  >
                    <span style={{ color: 'var(--text)', fontWeight: 400 }}>{row.days}</span>
                    <span style={{ color: 'var(--mt)' }}>{row.hours}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Sidebar */}
            <div className="flex flex-col gap-4">

              {/* Contact */}
              {(tenant.phone || tenant.local) && (
                <div style={{ background: '#fff', border: '0.5px solid var(--brd)', borderRadius: 6, padding: 20 }}>
                  <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--mt)', marginBottom: 14 }}>
                    Contacto
                  </div>
                  {tenant.phone && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 0', borderBottom: tenant.local ? '0.5px solid var(--brd)' : 'none', fontSize: 13, color: 'var(--text)' }}>
                      <span style={{ color: 'var(--a)' }}>✆</span> {tenant.phone}
                    </div>
                  )}
                  {tenant.local && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 0', fontSize: 13, color: 'var(--text)' }}>
                      <span style={{ color: 'var(--a)' }}>◎</span> Local {tenant.local}
                    </div>
                  )}
                </div>
              )}

              {/* Links */}
              {(tenant.website || tenant.instagram || tenant.facebook || tenant.whatsapp) && (
                <div style={{ background: '#fff', border: '0.5px solid var(--brd)', borderRadius: 6, padding: 20 }}>
                  <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--mt)', marginBottom: 14 }}>
                    Enlaces
                  </div>
                  {tenant.website && (
                    <a href={tenant.website} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '9px 0', borderBottom: '0.5px solid var(--brd)', fontSize: 13, color: 'var(--text)' }}>
                      <span>Sitio Web</span><span style={{ color: 'var(--a)', fontSize: 11 }}>↗</span>
                    </a>
                  )}
                  {tenant.instagram && (
                    <a href={`https://instagram.com/${tenant.instagram}`} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '9px 0', borderBottom: '0.5px solid var(--brd)', fontSize: 13, color: 'var(--text)' }}>
                      <span>Instagram</span><span style={{ color: 'var(--a)', fontSize: 11 }}>↗</span>
                    </a>
                  )}
                  {tenant.facebook && (
                    <a href={`https://facebook.com/${tenant.facebook}`} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '9px 0', borderBottom: tenant.whatsapp ? '0.5px solid var(--brd)' : 'none', fontSize: 13, color: 'var(--text)' }}>
                      <span>Facebook</span><span style={{ color: 'var(--a)', fontSize: 11 }}>↗</span>
                    </a>
                  )}
                  {tenant.whatsapp && (
                    <a href={`https://wa.me/${tenant.whatsapp}`} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '9px 0', fontSize: 13, color: 'var(--text)' }}>
                      <span>WhatsApp</span><span style={{ color: 'var(--a)', fontSize: 11 }}>↗</span>
                    </a>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
