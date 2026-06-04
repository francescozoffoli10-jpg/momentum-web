import type { Metadata } from 'next'
import Link from 'next/link'
import HeroSection from '@/components/home/HeroSection'
import StatsBar from '@/components/home/StatsBar'
import MarqueeStrip from '@/components/home/MarqueeStrip'
import FeaturedTenants from '@/components/home/FeaturedTenants'
import EditorialSection from '@/components/home/EditorialSection'
import RegionGrid from '@/components/home/RegionGrid'
import { escazuSite } from '@/data/sites/escazu'
import { allTenants } from '@/data/sites/escazu/all'
import { regionCards } from '@/data/sites/escazu/gastronomia'
import { fetchFeaturedTenants } from '@/sanity/lib/fetch'

export const revalidate = 300

export const metadata: Metadata = {
  title: 'Momentum Escazú',
  description: 'Calma, bienestar y experiencia premium en Escazú, San José.',
}

const SPECIALTIES = [
  'Clínica Auditiva', 'Dermatología', 'Estética Médica', 'Farmacia',
  'Kinética Dento Facial', 'Laboratorio Clínico', 'Medicina Anti-Aging',
  'Reumatología', 'Salud Integral', 'Salud Masculina',
]

export default async function EscazuHomePage() {
  // Try CMS featured tenants first, fall back to static data
  const cmsFeats = await fetchFeaturedTenants('escazu')
  const staticFeatured = allTenants.filter((t) => t.featured).slice(0, 4)
  const cmsOrStatic = cmsFeats.length > 0 ? cmsFeats.slice(0, 4) : staticFeatured
  const featuredTenants = cmsOrStatic.length >= 4 ? cmsOrStatic : allTenants.slice(0, 4)

  return (
    <>
      <HeroSection site={escazuSite} basePath="/escazu" />
      <MarqueeStrip />
      <StatsBar site={escazuSite} />
      <FeaturedTenants
        tenants={featuredTenants}
        basePath="/escazu"
        siteId="escazu"
        sectionLabel="Lo Mejor de Escazú"
        title="Experiencias que destacan"
        viewAllHref="/escazu/servicios"
        viewAllLabel="Ver directorio"
      />

      {/* Centro Médico Callout */}
      <section style={{ background: '#fff', padding: '88px 0', borderTop: '0.5px solid var(--brd)' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 32px' }}>
          <div className="escazu-medico-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 72, alignItems: 'center' }}>

            {/* Left: text + CTAs */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
                <div style={{ width: 24, height: '0.5px', background: 'var(--a)' }} />
                <span style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--a)' }}>
                  Centro Médico
                </span>
              </div>
              <h2 style={{ fontSize: 'clamp(28px, 3.5vw, 44px)', fontWeight: 300, color: 'var(--text)', letterSpacing: '-0.025em', lineHeight: 1.1, marginBottom: 18 }}>
                Encontrá tu<br />especialista médico.
              </h2>
              <p style={{ fontSize: 15, color: 'var(--mt)', fontWeight: 300, lineHeight: 1.8, marginBottom: 36 }}>
                Más de 11 especialistas en múltiples disciplinas médicas. Consultá perfiles, horarios y agendá tu cita en línea a través de nuestra plataforma de salud.
              </p>
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                <a
                  href="https://directorio.momentumescazu.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: 8,
                    padding: '12px 24px',
                    background: 'var(--a)',
                    color: '#fff',
                    fontSize: 11, fontWeight: 600, letterSpacing: '0.1em',
                    textTransform: 'uppercase', borderRadius: 2, textDecoration: 'none',
                  }}
                >
                  Buscá tu doctor
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M1 6h10M7 2l4 4-4 4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </a>
                <Link
                  href="/escazu/centro-medico"
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: 8,
                    padding: '12px 24px',
                    border: '0.5px solid var(--brd)',
                    color: 'var(--text)',
                    fontSize: 11, fontWeight: 500, letterSpacing: '0.1em',
                    textTransform: 'uppercase', borderRadius: 2, textDecoration: 'none',
                  }}
                >
                  Ver directorio
                </Link>
              </div>
            </div>

            {/* Right: specialty pills */}
            <div>
              <div style={{ fontSize: 11, fontWeight: 500, color: 'var(--mt)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 20 }}>
                Especialidades disponibles
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {SPECIALTIES.map(s => (
                  <span key={s} style={{
                    padding: '8px 14px',
                    background: 'var(--bg)',
                    border: '0.5px solid var(--brd)',
                    borderRadius: 2,
                    fontSize: 12, fontWeight: 400, color: 'var(--text)',
                    letterSpacing: '0.01em',
                  }}>
                    {s}
                  </span>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 768px) {
          .escazu-medico-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
        }
      `}</style>

      <EditorialSection basePath="/escazu" site={escazuSite} />
      <MarqueeStrip inverted />
      <RegionGrid
        cards={regionCards}
        basePath="/escazu"
        gridTitle="Explorá el directorio"
        sectionLabel="Ver todos los servicios"
        sectionHref="/escazu/servicios"
      />
    </>
  )
}
