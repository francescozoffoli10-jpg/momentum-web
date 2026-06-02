import type { Metadata } from 'next'
import Link from 'next/link'
import HeroSection from '@/components/home/HeroSection'
import StatsBar from '@/components/home/StatsBar'
import MarqueeStrip from '@/components/home/MarqueeStrip'
import FeaturedTenants from '@/components/home/FeaturedTenants'
import EditorialSection from '@/components/home/EditorialSection'
import RegionGrid from '@/components/home/RegionGrid'
import { pinaresSite } from '@/data/sites/pinares'
import { gastronomia, regionCards } from '@/data/sites/pinares/gastronomia'
import { fetchTeatroConfig } from '@/sanity/lib/fetch'

export const revalidate = 300

export const metadata: Metadata = {
  title: 'Momentum Pinares',
  description: 'Variedad, dinamismo y todo en un solo lugar en Curridabat, San José.',
}

export default async function PinaresHomePage() {
  const [cfg] = await Promise.all([fetchTeatroConfig()])
  const teatroHeroImage = cfg?.heroImage || 'https://espressivo.cr/media/esp_banner.jpg'
  const featured = gastronomia.filter((t) => t.featured)
  const featuredTenants = featured.length >= 4 ? featured : gastronomia.slice(0, 4)

  return (
    <>
      <HeroSection site={pinaresSite} basePath="/pinares" />
      <MarqueeStrip />
      <StatsBar site={pinaresSite} />
      <FeaturedTenants tenants={featuredTenants} basePath="/pinares" siteId="pinares" />
      <EditorialSection basePath="/pinares" site={pinaresSite} />

      {/* Teatro Espressivo Editorial Highlight */}
      <section style={{ position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'relative', minHeight: 540 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={teatroHeroImage}
            alt=""
            aria-hidden="true"
            style={{
              position: 'absolute', inset: 0, width: '100%', height: '100%',
              objectFit: 'cover', objectPosition: 'center 35%',
              opacity: 0.18,
            }}
          />
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(105deg, rgba(7,13,20,1) 0%, rgba(7,13,20,0.92) 45%, rgba(7,13,20,0.7) 100%)',
          }} />
          <div style={{ position: 'relative', zIndex: 1, maxWidth: 1280, margin: '0 auto', padding: '96px 32px' }}>
            <div className="pinares-teatro-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center' }}>

              {/* Left: text */}
              <div>
                <p style={{
                  fontSize: 10, fontWeight: 600, letterSpacing: '0.22em',
                  textTransform: 'uppercase', color: 'var(--a)', marginBottom: 24,
                  display: 'flex', alignItems: 'center', gap: 12,
                }}>
                  <span style={{ display: 'inline-block', width: 24, height: '0.5px', background: 'var(--a)' }} />
                  Cultura &amp; Entretenimiento
                </p>
                <h2 style={{
                  fontSize: 'clamp(36px, 5.5vw, 72px)', fontWeight: 200,
                  letterSpacing: '-0.04em', lineHeight: 0.95, color: '#fff', marginBottom: 28,
                }}>
                  Teatro<br />
                  <em style={{ fontStyle: 'italic', fontWeight: 200, color: 'rgba(255,255,255,0.58)' }}>Espressivo</em>
                </h2>
                <p style={{
                  fontSize: 16, color: 'rgba(255,255,255,0.4)', fontWeight: 300,
                  lineHeight: 1.85, maxWidth: 400, marginBottom: 44,
                }}>
                  20 años de teatro, cultura y gastronomía en el corazón de Curridabat. Un destino cultural dentro del destino.
                </p>
                <Link
                  href="/pinares/teatro"
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: 10,
                    padding: '12px 28px',
                    border: '0.5px solid rgba(255,255,255,0.18)',
                    color: 'rgba(255,255,255,0.65)',
                    fontSize: 10, fontWeight: 500, letterSpacing: '0.14em',
                    textTransform: 'uppercase', borderRadius: 2, textDecoration: 'none',
                  }}
                >
                  Explorar Teatro
                  <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                    <path d="M2.5 6.5h8M8 3.5l3 3-3 3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </Link>
              </div>

              {/* Right: stats */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 1, background: 'rgba(255,255,255,0.05)' }}>
                {[
                  { num: '20+',  label: 'Años de\nhistoria' },
                  { num: '120+', label: 'Producciones\noriginales' },
                  { num: '13',   label: 'Premios\nNacionales' },
                ].map((stat, i) => (
                  <div key={i} style={{ background: 'rgba(7,13,20,0.85)', padding: '40px 24px', textAlign: 'center' }}>
                    <p style={{ fontSize: 'clamp(32px, 3.5vw, 48px)', fontWeight: 200, letterSpacing: '-0.04em', color: '#fff', marginBottom: 10, lineHeight: 1 }}>
                      {stat.num}
                    </p>
                    <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.32)', fontWeight: 300, lineHeight: 1.5, whiteSpace: 'pre-line' }}>
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>

            </div>
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 768px) {
          .pinares-teatro-grid {
            grid-template-columns: 1fr !important;
            gap: 48px !important;
          }
        }
      `}</style>

      <MarqueeStrip inverted />
      <RegionGrid cards={regionCards} basePath="/pinares" />
    </>
  )
}
