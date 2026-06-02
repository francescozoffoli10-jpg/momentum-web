import type { Metadata } from 'next'
import { fetchTeatroShows, fetchTeatroConfig } from '@/sanity/lib/fetch'
import type { TeatroShow, TeatroShowDate, TeatroStat, TeatroSpec, HoursRow } from '@/data/types'

export const revalidate = 300

export const metadata: Metadata = {
  title: 'Teatro Espressivo — Momentum Pinares',
  description: 'Teatro Espressivo: 20 años de teatro, cultura y gastronomía en el corazón de Curridabat.',
  openGraph: {
    title: 'Teatro Espressivo — Momentum Pinares',
    description: '20 años de teatro, cultura y gastronomía. Sumergite en la magia de Teatro Espressivo.',
    images: [{ url: 'https://images.unsplash.com/photo-1460723237483-7a6dc9d0b212?w=1200&q=80' }],
  },
}

// ── Defaults (used as fallbacks when CMS has no value yet) ────────────────────

const DEFAULT_HERO_IMAGE = 'https://images.unsplash.com/photo-1460723237483-7a6dc9d0b212?w=1920&q=80'
const DEFAULT_HERO_TAGLINE = 'Nuestra misión es tu deleite.'
const DEFAULT_IDENTITY_TITLE = 'Un tesoro cultural en el este de la ciudad.'
const DEFAULT_IDENTITY_P1 = 'Desde 2002, Teatro Espressivo ha sido el escenario de más de 120 producciones teatrales originales, consolidándose como uno de los espacios culturales más reconocidos de Costa Rica.'
const DEFAULT_IDENTITY_P2 = 'Ubicado dentro de Momentum Pinares en Curridabat, combina arte de escena, cultura y gastronomía en una experiencia irrepetible.'
const DEFAULT_IDENTITY_IMAGE = 'https://espressivo.cr/media/img_obra.jpg'

const DEFAULT_STATS: TeatroStat[] = [
  { num: '20+',  label: 'Años de historia',        sub: 'Desde 2002' },
  { num: '120+', label: 'Producciones originales',  sub: 'Teatro costarricense' },
  { num: '13',   label: 'Premios Nacionales',       sub: 'Premio Nacional de Teatro' },
]

const DEFAULT_SPECS: TeatroSpec[] = [
  { value: '250+',      label: 'Capacidad',             symbol: '◈' },
  { value: '8×6m',      label: 'Escenario',              symbol: '▭' },
  { value: '4K',        label: 'Proyector',              symbol: '◉' },
  { value: 'Sáb & Dom', label: 'Funciones principales',  symbol: '◷' },
]

const DEFAULT_BISTRO_DESC = 'El Espressivo Bistró es el complemento perfecto para tu experiencia en el teatro. Desayunos, almuerzos y cenas preparados con ingredientes frescos, en un ambiente cálido y culturalmente inspirado.'
const DEFAULT_BISTRO_IMAGE = 'https://espressivo.cr/media/thumbnail.jpg'

const DEFAULT_BISTRO_HOURS: HoursRow[] = [
  { days: 'Lunes a Jueves', hours: '10:00 am – 8:00 pm' },
  { days: 'Viernes',        hours: '10:00 am – 11:00 pm' },
  { days: 'Sábados',        hours: '9:00 am – 11:00 pm' },
  { days: 'Domingos',       hours: '9:00 am – 9:00 pm' },
]

// ── Helpers ───────────────────────────────────────────────────────────────────

function getUpcomingDates(dates: TeatroShowDate[], limit = 3): TeatroShowDate[] {
  const today = new Date().toISOString().split('T')[0]
  return dates.filter((d) => d.date >= today).slice(0, limit)
}

function formatDate(isoDate: string): string {
  return new Date(isoDate + 'T12:00:00').toLocaleDateString('es-CR', {
    weekday: 'short', day: 'numeric', month: 'short',
  })
}

// ── Show card ─────────────────────────────────────────────────────────────────

function ShowCard({ show }: { show: TeatroShow }) {
  const upcoming = show.dates ? getUpcomingDates(show.dates) : []
  const href = show.ticketUrl || 'https://boleteria.espressivo.cr'

  return (
    <div style={{ background: '#070D14', display: 'flex', flexDirection: 'column' }}>
      <div style={{ position: 'relative', aspectRatio: '16/9', overflow: 'hidden', background: '#0c1520' }}>
        {show.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={show.image} alt={show.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        ) : (
          <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none" opacity={0.1}>
              <rect x="4" y="10" width="40" height="28" rx="2" stroke="white" strokeWidth="2"/>
              <path d="M16 38V30l8-6 8 6v8" stroke="white" strokeWidth="2" strokeLinecap="round"/>
              <circle cx="24" cy="20" r="4" stroke="white" strokeWidth="2"/>
            </svg>
          </div>
        )}
        {show.genre && (
          <div style={{ position: 'absolute', top: 14, left: 14, padding: '4px 10px', background: 'rgba(7,13,20,0.88)', border: '0.5px solid rgba(255,255,255,0.15)', borderRadius: 2, fontSize: 9, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--a)' }}>
            {show.genre}
          </div>
        )}
        {show.featured && (
          <div style={{ position: 'absolute', top: 14, right: 14, padding: '4px 10px', background: 'var(--a)', borderRadius: 2, fontSize: 9, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#fff' }}>
            Destacada
          </div>
        )}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(7,13,20,0.5) 0%, transparent 55%)' }} />
      </div>

      <div style={{ padding: '28px 32px 36px', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <h3 style={{ fontSize: 'clamp(20px, 2vw, 26px)', fontWeight: 300, color: '#fff', letterSpacing: '-0.02em', marginBottom: show.subtitle ? 8 : 16, lineHeight: 1.15 }}>
          {show.title}
        </h3>
        {show.subtitle && <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.32)', fontWeight: 300, marginBottom: 16 }}>{show.subtitle}</p>}
        {show.duration && <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.22)', letterSpacing: '0.1em', marginBottom: 16, textTransform: 'uppercase' }}>{show.duration}</p>}
        {show.description && (
          <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.38)', fontWeight: 300, lineHeight: 1.75, marginBottom: 28, flex: 1 }}>
            {show.description.length > 150 ? show.description.slice(0, 150) + '…' : show.description}
          </p>
        )}
        {upcoming.length > 0 && (
          <div style={{ marginBottom: 28 }}>
            <p style={{ fontSize: 9, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.18)', marginBottom: 12 }}>Próximas funciones</p>
            {upcoming.map((d, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '9px 0', borderBottom: '0.5px solid rgba(255,255,255,0.05)' }}>
                <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.45)', fontWeight: 300 }}>{formatDate(d.date)}</span>
                <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.62)', fontWeight: 400 }}>{d.time}</span>
              </div>
            ))}
          </div>
        )}
        <a href={href} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '11px 22px', background: 'var(--a)', color: '#fff', fontSize: 10, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', borderRadius: 2, textDecoration: 'none', width: 'fit-content', marginTop: 'auto' }}>
          Comprar entradas
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 6h8M7 3l3 3-3 3" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </a>
      </div>
    </div>
  )
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default async function TeatroPage() {
  const [shows, cfg] = await Promise.all([fetchTeatroShows(), fetchTeatroConfig()])

  // Resolve each value: CMS first, hardcoded fallback second
  const heroImage      = cfg?.heroImage      || DEFAULT_HERO_IMAGE
  const heroTagline    = cfg?.heroTagline    || DEFAULT_HERO_TAGLINE
  const identityTitle  = cfg?.identityTitle  || DEFAULT_IDENTITY_TITLE
  const identityP1     = cfg?.identityParagraph1 || DEFAULT_IDENTITY_P1
  const identityP2     = cfg?.identityParagraph2 || DEFAULT_IDENTITY_P2
  const identityImage  = cfg?.identityImage  || DEFAULT_IDENTITY_IMAGE
  const stats          = cfg?.stats?.length  ? cfg.stats  : DEFAULT_STATS
  const specs          = cfg?.specs?.length  ? cfg.specs  : DEFAULT_SPECS
  const bistroDesc     = cfg?.bistroDescription || DEFAULT_BISTRO_DESC
  const bistroImage    = cfg?.bistroImage    || DEFAULT_BISTRO_IMAGE
  const bistroHours    = cfg?.bistroHours?.length ? cfg.bistroHours : DEFAULT_BISTRO_HOURS
  const phoneTeatro    = cfg?.phoneTeatro    || '2267-1818'
  const phoneBistro    = cfg?.phoneBistro    || '2267-1825'
  const whatsapp       = cfg?.whatsapp       || '+506 6360-9158'
  const instagram      = cfg?.instagram      || 'espressivocr'
  const instagramBistro = cfg?.instagramBistro || 'espressivobistrocr'
  const website        = cfg?.website        || 'https://espressivo.cr'
  const boleteria      = cfg?.boleteria      || 'https://boleteria.espressivo.cr'
  const boleteriaHours = cfg?.boleteriaHours || 'Dom – Jue 9 am – 6 pm · Vie – Sáb 9 am – 8 pm'
  const videoUrl       = cfg?.videoUrl       || null

  const whatsappHref = `https://wa.me/${whatsapp.replace(/[^\d]/g, '')}`

  return (
    <>
      <main style={{ background: '#070D14', color: '#fff', fontFamily: 'system-ui, -apple-system, sans-serif' }}>

        {/* ── HERO ── */}
        <section style={{ position: 'relative', height: '100vh', minHeight: 640, display: 'flex', alignItems: 'flex-end', overflow: 'hidden' }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={heroImage} alt="Teatro Espressivo" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 40%' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(7,13,20,1) 0%, rgba(7,13,20,0.65) 45%, rgba(7,13,20,0.3) 100%)' }} />
          <div style={{ position: 'relative', zIndex: 1, maxWidth: 1280, margin: '0 auto', padding: '0 32px 96px', width: '100%' }}>
            <p style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.24em', textTransform: 'uppercase', color: 'var(--a)', marginBottom: 24, display: 'flex', alignItems: 'center', gap: 12 }}>
              <span style={{ display: 'inline-block', width: 28, height: '0.5px', background: 'var(--a)' }} />
              Cultura &amp; Entretenimiento · Momentum Pinares
            </p>
            <h1 style={{ fontSize: 'clamp(56px, 10vw, 120px)', fontWeight: 200, letterSpacing: '-0.04em', lineHeight: 0.92, marginBottom: 32, maxWidth: 700 }}>
              Teatro<br />
              <em style={{ fontStyle: 'italic', fontWeight: 200, color: 'rgba(255,255,255,0.65)' }}>Espressivo</em>
            </h1>
            <p style={{ fontSize: 18, color: 'rgba(255,255,255,0.45)', fontWeight: 300, maxWidth: 380, lineHeight: 1.7 }}>
              {heroTagline}
            </p>
          </div>
        </section>

        {/* ── IDENTITY ── */}
        <section style={{ padding: '120px 32px' }}>
          <div className="teatro-two-col" style={{ maxWidth: 1280, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 96, alignItems: 'center' }}>
            <div>
              <p style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--a)', marginBottom: 32 }}>20+ Años de Historia</p>
              <h2 style={{ fontSize: 'clamp(28px, 3.5vw, 50px)', fontWeight: 300, letterSpacing: '-0.03em', lineHeight: 1.2, marginBottom: 32, color: '#fff' }}>
                {identityTitle}
              </h2>
              <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.42)', fontWeight: 300, lineHeight: 1.9, marginBottom: 20 }}>{identityP1}</p>
              <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.42)', fontWeight: 300, lineHeight: 1.9, marginBottom: 48 }}>{identityP2}</p>
              <a href={boleteria} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: 10, padding: '13px 28px', background: 'var(--a)', color: '#fff', fontSize: 10, fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', borderRadius: 2, textDecoration: 'none' }}>
                Ver Programación
                <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><path d="M2.5 6.5h8M8 3.5l3 3-3 3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </a>
            </div>
            {/* Right column: video reel when available, identity photo as fallback */}
            <div style={{ position: 'relative', paddingTop: '150%', borderRadius: 4, overflow: 'hidden', background: 'rgba(255,255,255,0.04)' }}>
              {videoUrl ? (
                <>
                  {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
                  <video
                    src={videoUrl}
                    autoPlay
                    muted
                    loop
                    playsInline
                    style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  {/* Subtle Showreel label at bottom */}
                  <div style={{ position: 'absolute', bottom: 20, left: 0, right: 0, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 10, zIndex: 2 }}>
                    <div style={{ width: 20, height: '0.5px', background: 'rgba(255,255,255,0.2)' }} />
                    <span style={{ fontSize: 9, fontWeight: 600, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.25)' }}>Showreel</span>
                    <div style={{ width: 20, height: '0.5px', background: 'rgba(255,255,255,0.2)' }} />
                  </div>
                </>
              ) : (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img src={identityImage} alt="Producción de Teatro Espressivo" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
              )}
            </div>
          </div>
        </section>

        {/* ── STATS ── */}
        <section style={{ borderTop: '0.5px solid rgba(255,255,255,0.06)', borderBottom: '0.5px solid rgba(255,255,255,0.06)' }}>
          <div className="teatro-stats-row" style={{ maxWidth: 1280, margin: '0 auto', padding: '0 32px', display: 'grid', gridTemplateColumns: `repeat(${stats.length}, 1fr)` }}>
            {stats.map((stat, i) => (
              <div key={i} style={{ padding: '56px 40px', textAlign: 'center', borderRight: i < stats.length - 1 ? '0.5px solid rgba(255,255,255,0.06)' : 'none' }}>
                <p style={{ fontSize: 'clamp(40px, 5vw, 64px)', fontWeight: 200, letterSpacing: '-0.04em', color: '#fff', marginBottom: 8, lineHeight: 1 }}>{stat.num}</p>
                <p style={{ fontSize: 13, fontWeight: 400, color: 'rgba(255,255,255,0.45)', marginBottom: 6 }}>{stat.label}</p>
                <p style={{ fontSize: 10, fontWeight: 300, color: 'var(--a)', letterSpacing: '0.14em', textTransform: 'uppercase' }}>{stat.sub}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── CARTELERA ── */}
        <section style={{ padding: '120px 32px' }}>
          <div style={{ maxWidth: 1280, margin: '0 auto' }}>
            <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 64, flexWrap: 'wrap', gap: 24 }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
                  <div style={{ width: 28, height: '0.5px', background: 'var(--a)' }} />
                  <span style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--a)' }}>Cartelera Actual</span>
                </div>
                <h2 style={{ fontSize: 'clamp(26px, 3vw, 44px)', fontWeight: 300, letterSpacing: '-0.03em', color: '#fff', lineHeight: 1.1 }}>En escena ahora.</h2>
              </div>
              <a href={boleteria} target="_blank" rel="noopener noreferrer" style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', textDecoration: 'none', letterSpacing: '0.08em', textTransform: 'uppercase', display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                Ver toda la programación
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M2 8L8 2M8 2H4M8 2v4" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </a>
            </div>
            {shows.length === 0 ? (
              <div style={{ border: '0.5px solid rgba(255,255,255,0.07)', padding: '80px 40px', textAlign: 'center', borderRadius: 2 }}>
                <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.18)', letterSpacing: '0.04em', marginBottom: 16 }}>Nuevas funciones próximamente.</p>
                <a href={`https://instagram.com/${instagram}`} target="_blank" rel="noopener noreferrer" style={{ fontSize: 11, color: 'var(--a)', textDecoration: 'none', letterSpacing: '0.1em' }}>
                  Seguinos en @{instagram}
                </a>
              </div>
            ) : (
              <div className="teatro-shows-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: 1, background: 'rgba(255,255,255,0.06)' }}>
                {shows.map((show) => <ShowCard key={show._id} show={show} />)}
              </div>
            )}
          </div>
        </section>

        {/* ── EL ESCENARIO ── */}
        <section style={{ padding: '120px 32px', background: 'rgba(255,255,255,0.01)' }}>
          <div style={{ maxWidth: 1280, margin: '0 auto' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 52 }}>
              <div style={{ width: 28, height: '0.5px', background: 'var(--a)' }} />
              <span style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--a)' }}>El Escenario</span>
            </div>
            <h2 style={{ fontSize: 'clamp(26px, 3vw, 44px)', fontWeight: 300, letterSpacing: '-0.03em', color: '#fff', marginBottom: 64, maxWidth: 520 }}>Un espacio diseñado para la magia.</h2>
            <div className="teatro-specs-grid" style={{ display: 'grid', gridTemplateColumns: `repeat(${Math.min(specs.length, 4)}, 1fr)`, gap: 1, background: 'rgba(255,255,255,0.05)' }}>
              {specs.map((item, i) => (
                <div key={i} style={{ background: '#070D14', padding: '48px 32px', textAlign: 'center' }}>
                  <p style={{ fontSize: 14, color: 'var(--a)', marginBottom: 20, letterSpacing: '0.06em', opacity: 0.7 }}>{item.symbol}</p>
                  <p style={{ fontSize: 'clamp(26px, 2.8vw, 38px)', fontWeight: 200, color: '#fff', letterSpacing: '-0.03em', marginBottom: 10 }}>{item.value}</p>
                  <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.32)', fontWeight: 300, letterSpacing: '0.04em' }}>{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── ESPRESSIVO BISTRÓ ── */}
        <section style={{ padding: '120px 32px' }}>
          <div className="teatro-bistro-col" style={{ maxWidth: 1280, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 96, alignItems: 'center' }}>
            <div style={{ position: 'relative', aspectRatio: '4/3', borderRadius: 4, overflow: 'hidden', background: 'rgba(255,255,255,0.04)' }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={bistroImage} alt="Espressivo Bistró" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div>
              <p style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--a)', marginBottom: 24 }}>Espressivo Bistró</p>
              <h2 style={{ fontSize: 'clamp(26px, 3vw, 44px)', fontWeight: 300, letterSpacing: '-0.03em', lineHeight: 1.2, marginBottom: 28, color: '#fff' }}>
                Buen comer, arte<br />y espressión.
              </h2>
              <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.42)', fontWeight: 300, lineHeight: 1.9, marginBottom: 40 }}>{bistroDesc}</p>
              <div style={{ marginBottom: 32 }}>
                <p style={{ fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.2)', marginBottom: 16 }}>Horario del Bistró</p>
                {bistroHours.map((item, i) => (
                  <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', borderBottom: '0.5px solid rgba(255,255,255,0.05)' }}>
                    <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.45)', fontWeight: 300 }}>{item.days}</span>
                    <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)', fontWeight: 400 }}>{item.hours}</span>
                  </div>
                ))}
              </div>
              <a href={`https://instagram.com/${instagramBistro}`} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: 12, color: 'rgba(255,255,255,0.35)', fontWeight: 300, letterSpacing: '0.04em', textDecoration: 'none' }}>
                @{instagramBistro}
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M2 8L8 2M8 2H4M8 2v4" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </a>
            </div>
          </div>
        </section>

        {/* ── TICKETS CTA ── */}
        <section style={{ background: 'rgba(79,91,62,0.07)', borderTop: '0.5px solid rgba(79,91,62,0.18)', borderBottom: '0.5px solid rgba(79,91,62,0.18)', padding: '96px 32px' }}>
          <div className="teatro-cta-col" style={{ maxWidth: 1280, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center' }}>
            <div>
              <h2 style={{ fontSize: 'clamp(30px, 4vw, 54px)', fontWeight: 300, letterSpacing: '-0.03em', color: '#fff', marginBottom: 20, lineHeight: 1.1 }}>
                Sumergite en<br />la magia del teatro.
              </h2>
              <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.38)', fontWeight: 300, lineHeight: 1.8, maxWidth: 380 }}>
                Consultá la cartelera actual y reservá tus entradas en línea. Funciones los fines de semana y temporadas especiales.
              </p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16, alignItems: 'flex-start' }}>
              <a href={boleteria} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: 10, padding: '16px 36px', background: 'var(--a)', color: '#fff', fontSize: 11, fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', borderRadius: 2, textDecoration: 'none' }}>
                Comprá tus entradas
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3 7h8M8 4l3 3-3 3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </a>
              <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.22)', fontWeight: 300, letterSpacing: '0.04em' }}>
                Boletería: {boleteriaHours}
              </p>
            </div>
          </div>
        </section>

        {/* ── CONTACTO ── */}
        <section style={{ padding: '96px 32px' }}>
          <div style={{ maxWidth: 1280, margin: '0 auto' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 56 }}>
              <div style={{ width: 28, height: '0.5px', background: 'var(--a)' }} />
              <span style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--a)' }}>Contacto</span>
            </div>
            <div className="teatro-contact-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 48, marginBottom: 48 }}>
              <div>
                <p style={{ fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.2)', marginBottom: 16 }}>Teatro</p>
                <a href={`tel:+506${phoneTeatro.replace(/[-\s]/g, '')}`} style={{ fontSize: 16, color: 'rgba(255,255,255,0.55)', fontWeight: 300, textDecoration: 'none', display: 'block' }}>{phoneTeatro}</a>
              </div>
              <div>
                <p style={{ fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.2)', marginBottom: 16 }}>Bistró</p>
                <a href={`tel:+506${phoneBistro.replace(/[-\s]/g, '')}`} style={{ fontSize: 16, color: 'rgba(255,255,255,0.55)', fontWeight: 300, textDecoration: 'none', display: 'block' }}>{phoneBistro}</a>
              </div>
              <div>
                <p style={{ fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.2)', marginBottom: 16 }}>WhatsApp</p>
                <a href={whatsappHref} target="_blank" rel="noopener noreferrer" style={{ fontSize: 16, color: 'rgba(255,255,255,0.55)', fontWeight: 300, textDecoration: 'none', display: 'block' }}>{whatsapp}</a>
              </div>
            </div>
            <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
              <a href={`https://instagram.com/${instagram}`} target="_blank" rel="noopener noreferrer" style={{ fontSize: 12, color: 'rgba(255,255,255,0.3)', textDecoration: 'none', letterSpacing: '0.04em' }}>@{instagram}</a>
              <span style={{ color: 'rgba(255,255,255,0.12)' }}>·</span>
              <a href={`https://instagram.com/${instagramBistro}`} target="_blank" rel="noopener noreferrer" style={{ fontSize: 12, color: 'rgba(255,255,255,0.3)', textDecoration: 'none', letterSpacing: '0.04em' }}>@{instagramBistro}</a>
              <span style={{ color: 'rgba(255,255,255,0.12)' }}>·</span>
              <a href={website} target="_blank" rel="noopener noreferrer" style={{ fontSize: 12, color: 'rgba(255,255,255,0.3)', textDecoration: 'none', letterSpacing: '0.04em' }}>{website.replace('https://', '')}</a>
            </div>
          </div>
        </section>

      </main>

      <style>{`
        @media (max-width: 768px) {
          .teatro-two-col, .teatro-bistro-col, .teatro-cta-col { grid-template-columns: 1fr !important; gap: 48px !important; }
          .teatro-stats-row { grid-template-columns: 1fr !important; }
          .teatro-stats-row > div { border-right: none !important; border-bottom: 0.5px solid rgba(255,255,255,0.06); }
          .teatro-specs-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .teatro-contact-grid { grid-template-columns: 1fr !important; }
          .teatro-shows-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  )
}
