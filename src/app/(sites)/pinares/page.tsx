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
import { fetchTeatroConfig, fetchFeaturedTenants } from '@/sanity/lib/fetch'

export const revalidate = 300

export const metadata: Metadata = {
  title: 'Momentum Pinares',
  description: 'Variedad, dinamismo y todo en un solo lugar en Curridabat, San José.',
}

const HYATT_AMENITIES = ['Piscina al aire libre', 'Gimnasio 24h', 'Desayuno incluido', 'Restaurante Provincia', 'WiFi gratis', 'Pet-friendly']

export default async function PinaresHomePage() {
  const [cfg, cmsFeats] = await Promise.all([fetchTeatroConfig(), fetchFeaturedTenants('pinares')])
  const rawHero = cfg?.heroImage || 'https://espressivo.cr/media/esp_banner.jpg'
  const teatroHeroImage = rawHero.includes('cdn.sanity.io')
    ? rawHero + '?w=1920&q=80&auto=format'
    : rawHero
  const cmsOrStatic = cmsFeats.length > 0 ? cmsFeats : gastronomia.filter((t) => t.featured)
  const featuredTenants = cmsOrStatic.length >= 4 ? cmsOrStatic.slice(0, 4) : gastronomia.slice(0, 4)

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
              <div>
                <p style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--a)', marginBottom: 24, display: 'flex', alignItems: 'center', gap: 12 }}>
                  <span style={{ display: 'inline-block', width: 24, height: '0.5px', background: 'var(--a)' }} />
                  Cultura &amp; Entretenimiento
                </p>
                <h2 style={{ fontSize: 'clamp(36px, 5.5vw, 72px)', fontWeight: 200, letterSpacing: '-0.04em', lineHeight: 0.95, color: '#fff', marginBottom: 28 }}>
                  Teatro<br />
                  <em style={{ fontStyle: 'italic', fontWeight: 200, color: 'rgba(255,255,255,0.58)' }}>Espressivo</em>
                </h2>
                <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.4)', fontWeight: 300, lineHeight: 1.85, maxWidth: 400, marginBottom: 44 }}>
                  20 años de teatro, cultura y gastronomía en el corazón de Curridabat. Un destino cultural dentro del destino.
                </p>
                <Link href="/pinares/teatro" style={{ display: 'inline-flex', alignItems: 'center', gap: 10, padding: '12px 28px', border: '0.5px solid rgba(255,255,255,0.18)', color: 'rgba(255,255,255,0.65)', fontSize: 10, fontWeight: 500, letterSpacing: '0.14em', textTransform: 'uppercase', borderRadius: 2, textDecoration: 'none' }}>
                  Explorar Teatro
                  <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                    <path d="M2.5 6.5h8M8 3.5l3 3-3 3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </Link>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 1, background: 'rgba(255,255,255,0.05)' }}>
                {[
                  { num: '20+',  label: 'Años de\nhistoria' },
                  { num: '120+', label: 'Producciones\noriginales' },
                  { num: '13',   label: 'Premios\nNacionales' },
                ].map((stat, i) => (
                  <div key={i} style={{ background: 'rgba(7,13,20,0.85)', padding: '40px 24px', textAlign: 'center' }}>
                    <p style={{ fontSize: 'clamp(32px, 3.5vw, 48px)', fontWeight: 200, letterSpacing: '-0.04em', color: '#fff', marginBottom: 10, lineHeight: 1 }}>{stat.num}</p>
                    <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.32)', fontWeight: 300, lineHeight: 1.5, whiteSpace: 'pre-line' }}>{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Hyatt Place Hotel Section */}
      <section style={{ background: '#fff', padding: '96px 0', borderTop: '0.5px solid var(--brd)' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 32px' }}>
          <div className="pinares-hyatt-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 72, alignItems: 'center' }}>

            {/* Left: content */}
            <div>
              {/* Hyatt logo */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/sites/pinares/logos/hyatt-place.png"
                alt="Hyatt Place"
                style={{ height: 36, width: 'auto', marginBottom: 24, opacity: 0.85 }}
              />
              <h2 style={{ fontSize: 'clamp(28px, 3.5vw, 44px)', fontWeight: 300, color: 'var(--text)', letterSpacing: '-0.025em', lineHeight: 1.08, marginBottom: 20 }}>
                Hospedáte en el<br />corazón de Pinares.
              </h2>
              <p style={{ fontSize: 15, color: 'var(--mt)', fontWeight: 300, lineHeight: 1.8, marginBottom: 32 }}>
                Hyatt Place San José/Pinares se encuentra a pasos del ecosistema Momentum. Piscina, gimnasio 24h, desayuno incluido y el Restaurante Provincia — gastronomía costarricense contemporánea dentro del hotel.
              </p>

              {/* Amenity pills */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 36 }}>
                {HYATT_AMENITIES.map(a => (
                  <span key={a} style={{ padding: '7px 14px', background: 'var(--bg)', border: '0.5px solid var(--brd)', borderRadius: 2, fontSize: 12, color: 'var(--text)', fontWeight: 400 }}>
                    {a}
                  </span>
                ))}
              </div>

              {/* CTAs */}
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
                <a
                  href="https://www.hyatt.com/hyatt-place/es-ES/sjozp-hyatt-place-san-jose-pinares"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '12px 24px', background: 'var(--a)', color: '#fff', fontSize: 11, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', borderRadius: 2, textDecoration: 'none' }}
                >
                  Reservar ahora
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M1 6h10M7 2l4 4-4 4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </a>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="var(--a)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.63 3.42 2 2 0 0 1 3.6 1.24h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 8.83a16 16 0 0 0 6.06 6.06l.97-.97a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 21.73 16"/>
                  </svg>
                  <a href="tel:+50625187700" style={{ fontSize: 13, color: 'var(--mt)', fontWeight: 300, textDecoration: 'none' }}>+506 2518-7700</a>
                </div>
              </div>
            </div>

            {/* Right: image */}
            <div style={{ position: 'relative', borderRadius: 4, overflow: 'hidden', aspectRatio: '4/3' }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/sites/pinares/photos/hyatt-place.webp"
                alt="Hyatt Place San José Pinares"
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />
              {/* Rating badge */}
              <div style={{ position: 'absolute', bottom: 16, left: 16, background: 'rgba(0,0,0,0.72)', backdropFilter: 'blur(8px)', borderRadius: 4, padding: '10px 16px', display: 'flex', alignItems: 'center', gap: 8 }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="#F59E0B" stroke="none">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
                <span style={{ fontSize: 13, fontWeight: 500, color: '#fff' }}>4.5</span>
                <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)', fontWeight: 300 }}>669 opiniones</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 768px) {
          .pinares-teatro-grid { grid-template-columns: 1fr !important; gap: 48px !important; }
          .pinares-hyatt-grid  { grid-template-columns: 1fr !important; gap: 40px !important; }
        }
      `}</style>

      <MarqueeStrip inverted />
      <RegionGrid cards={regionCards} basePath="/pinares" />
    </>
  )
}
