import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Teatro Espressivo — Momentum Pinares',
  description:
    'Teatro Espressivo: 20 años de teatro, cultura y gastronomía en el corazón de Curridabat. Un tesoro cultural en el este de San José.',
  openGraph: {
    title: 'Teatro Espressivo — Momentum Pinares',
    description:
      '20 años de teatro, cultura y gastronomía. Sumergite en la magia de Teatro Espressivo.',
    images: [{ url: 'https://espressivo.cr/media/esp_banner.jpg' }],
  },
}

const BISTRO_HOURS = [
  { days: 'Lunes a Jueves', hours: '10:00 am – 8:00 pm' },
  { days: 'Viernes',        hours: '10:00 am – 11:00 pm' },
  { days: 'Sábados',        hours: '9:00 am – 11:00 pm' },
  { days: 'Domingos',       hours: '9:00 am – 9:00 pm' },
]

const STATS = [
  { num: '20+',  label: 'Años de historia',       sub: 'Desde 2002' },
  { num: '120+', label: 'Producciones originales', sub: 'Teatro costarricense' },
  { num: '13',   label: 'Premios Nacionales',      sub: 'Premio Nacional de Teatro' },
]

const SPECS = [
  { value: '250+',     label: 'Capacidad',           symbol: '◈' },
  { value: '8×6m',     label: 'Escenario',            symbol: '▭' },
  { value: '4K',       label: 'Proyector',            symbol: '◉' },
  { value: 'Sáb & Dom', label: 'Funciones principales', symbol: '◷' },
]

export default function TeatroPage() {
  return (
    <>
      <main style={{ background: '#070D14', color: '#fff', fontFamily: 'system-ui, -apple-system, sans-serif' }}>

        {/* ── HERO ── */}
        <section style={{ position: 'relative', height: '100vh', minHeight: 640, display: 'flex', alignItems: 'flex-end', overflow: 'hidden' }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://espressivo.cr/media/esp_banner.jpg"
            alt="Teatro Espressivo"
            style={{
              position: 'absolute', inset: 0,
              width: '100%', height: '100%',
              objectFit: 'cover', objectPosition: 'center 30%',
            }}
          />
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(to top, rgba(7,13,20,1) 0%, rgba(7,13,20,0.6) 45%, rgba(7,13,20,0.25) 100%)',
          }} />
          <div style={{ position: 'relative', zIndex: 1, maxWidth: 1280, margin: '0 auto', padding: '0 32px 96px', width: '100%' }}>
            <p style={{
              fontSize: 10, fontWeight: 600, letterSpacing: '0.24em',
              textTransform: 'uppercase', color: 'var(--a)', marginBottom: 24,
              display: 'flex', alignItems: 'center', gap: 12,
            }}>
              <span style={{ display: 'inline-block', width: 28, height: '0.5px', background: 'var(--a)', verticalAlign: 'middle' }} />
              Cultura &amp; Entretenimiento · Momentum Pinares
            </p>
            <h1 style={{
              fontSize: 'clamp(56px, 10vw, 120px)', fontWeight: 200,
              letterSpacing: '-0.04em', lineHeight: 0.92,
              marginBottom: 32, maxWidth: 700,
            }}>
              Teatro<br />
              <em style={{ fontStyle: 'italic', fontWeight: 200, color: 'rgba(255,255,255,0.65)' }}>Espressivo</em>
            </h1>
            <p style={{ fontSize: 18, color: 'rgba(255,255,255,0.45)', fontWeight: 300, maxWidth: 380, lineHeight: 1.7, letterSpacing: '0.01em' }}>
              Nuestra misión es tu deleite.
            </p>
          </div>
        </section>

        {/* ── IDENTITY ── */}
        <section style={{ padding: '120px 32px' }}>
          <div className="teatro-two-col" style={{ maxWidth: 1280, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 96, alignItems: 'center' }}>
            <div>
              <p style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--a)', marginBottom: 32 }}>
                20+ Años de Historia
              </p>
              <h2 style={{ fontSize: 'clamp(28px, 3.5vw, 50px)', fontWeight: 300, letterSpacing: '-0.03em', lineHeight: 1.2, marginBottom: 32, color: '#fff' }}>
                Un tesoro cultural en el este de la ciudad.
              </h2>
              <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.42)', fontWeight: 300, lineHeight: 1.9, marginBottom: 20 }}>
                Desde 2002, Teatro Espressivo ha sido el escenario de más de 120 producciones teatrales originales, consolidándose como uno de los espacios culturales más reconocidos de Costa Rica.
              </p>
              <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.42)', fontWeight: 300, lineHeight: 1.9, marginBottom: 48 }}>
                Ubicado dentro de Momentum Pinares en Curridabat, combina arte de escena, cultura y gastronomía en una experiencia irrepetible.
              </p>
              <a
                href="https://boleteria.espressivo.cr"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 10,
                  padding: '13px 28px', background: 'var(--a)', color: '#fff',
                  fontSize: 10, fontWeight: 600, letterSpacing: '0.14em',
                  textTransform: 'uppercase', borderRadius: 2, textDecoration: 'none',
                }}
              >
                Ver Programación
                <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                  <path d="M2.5 6.5h8M8 3.5l3 3-3 3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
            </div>
            <div style={{ position: 'relative', aspectRatio: '4/5', borderRadius: 4, overflow: 'hidden', background: 'rgba(255,255,255,0.04)' }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://espressivo.cr/media/img_obra.jpg"
                alt="Producción de Teatro Espressivo"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
          </div>
        </section>

        {/* ── STATS ── */}
        <section style={{ borderTop: '0.5px solid rgba(255,255,255,0.06)', borderBottom: '0.5px solid rgba(255,255,255,0.06)' }}>
          <div className="teatro-stats-row" style={{ maxWidth: 1280, margin: '0 auto', padding: '0 32px', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)' }}>
            {STATS.map((stat, i) => (
              <div key={i} style={{
                padding: '56px 40px', textAlign: 'center',
                borderRight: i < 2 ? '0.5px solid rgba(255,255,255,0.06)' : 'none',
              }}>
                <p style={{ fontSize: 'clamp(40px, 5vw, 64px)', fontWeight: 200, letterSpacing: '-0.04em', color: '#fff', marginBottom: 8, lineHeight: 1 }}>
                  {stat.num}
                </p>
                <p style={{ fontSize: 13, fontWeight: 400, color: 'rgba(255,255,255,0.45)', marginBottom: 6, letterSpacing: '0.01em' }}>
                  {stat.label}
                </p>
                <p style={{ fontSize: 10, fontWeight: 300, color: 'var(--a)', letterSpacing: '0.14em', textTransform: 'uppercase' }}>
                  {stat.sub}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ── EL ESCENARIO ── */}
        <section style={{ padding: '120px 32px', background: 'rgba(255,255,255,0.01)' }}>
          <div style={{ maxWidth: 1280, margin: '0 auto' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 52 }}>
              <div style={{ width: 28, height: '0.5px', background: 'var(--a)' }} />
              <span style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--a)' }}>El Escenario</span>
            </div>
            <h2 style={{ fontSize: 'clamp(26px, 3vw, 44px)', fontWeight: 300, letterSpacing: '-0.03em', color: '#fff', marginBottom: 64, maxWidth: 520 }}>
              Un espacio diseñado para la magia.
            </h2>
            <div className="teatro-specs-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 1, background: 'rgba(255,255,255,0.05)' }}>
              {SPECS.map((item, i) => (
                <div key={i} style={{ background: '#070D14', padding: '48px 32px', textAlign: 'center' }}>
                  <p style={{ fontSize: 14, color: 'var(--a)', marginBottom: 20, letterSpacing: '0.06em', opacity: 0.7 }}>{item.symbol}</p>
                  <p style={{ fontSize: 'clamp(26px, 2.8vw, 38px)', fontWeight: 200, color: '#fff', letterSpacing: '-0.03em', marginBottom: 10 }}>
                    {item.value}
                  </p>
                  <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.32)', fontWeight: 300, letterSpacing: '0.04em' }}>
                    {item.label}
                  </p>
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
              <img
                src="https://espressivo.cr/media/thumbnail.jpg"
                alt="Espressivo Bistró"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
            <div>
              <p style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--a)', marginBottom: 24 }}>
                Espressivo Bistró
              </p>
              <h2 style={{ fontSize: 'clamp(26px, 3vw, 44px)', fontWeight: 300, letterSpacing: '-0.03em', lineHeight: 1.2, marginBottom: 28, color: '#fff' }}>
                Buen comer, arte<br />y espressión.
              </h2>
              <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.42)', fontWeight: 300, lineHeight: 1.9, marginBottom: 40 }}>
                El Espressivo Bistró es el complemento perfecto para tu experiencia en el teatro. Desayunos, almuerzos y cenas preparados con ingredientes frescos, en un ambiente cálido y culturalmente inspirado.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 0, marginBottom: 32 }}>
                <p style={{ fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.2)', marginBottom: 16 }}>
                  Horario del Bistró
                </p>
                {BISTRO_HOURS.map((item, i) => (
                  <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', borderBottom: '0.5px solid rgba(255,255,255,0.05)' }}>
                    <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.45)', fontWeight: 300 }}>{item.days}</span>
                    <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)', fontWeight: 400 }}>{item.hours}</span>
                  </div>
                ))}
              </div>
              <a
                href="https://instagram.com/espressivobistrocr"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                  fontSize: 12, color: 'rgba(255,255,255,0.35)', fontWeight: 300,
                  letterSpacing: '0.04em', textDecoration: 'none',
                }}
              >
                @espressivobistrocr
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                  <path d="M2 8L8 2M8 2H4M8 2v4" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
            </div>
          </div>
        </section>

        {/* ── TICKETS CTA ── */}
        <section style={{
          background: 'rgba(79,91,62,0.07)',
          borderTop: '0.5px solid rgba(79,91,62,0.18)',
          borderBottom: '0.5px solid rgba(79,91,62,0.18)',
          padding: '96px 32px',
        }}>
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
              <a
                href="https://boleteria.espressivo.cr"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 10,
                  padding: '16px 36px', background: 'var(--a)', color: '#fff',
                  fontSize: 11, fontWeight: 600, letterSpacing: '0.14em',
                  textTransform: 'uppercase', borderRadius: 2, textDecoration: 'none',
                }}
              >
                Comprá tus entradas
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M3 7h8M8 4l3 3-3 3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
              <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.22)', fontWeight: 300, letterSpacing: '0.04em' }}>
                Boletería: Dom – Jue 9 am – 6 pm · Vie – Sáb 9 am – 8 pm
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
                <a href="tel:+50622671818" style={{ fontSize: 16, color: 'rgba(255,255,255,0.55)', fontWeight: 300, textDecoration: 'none', display: 'block' }}>
                  2267-1818
                </a>
              </div>
              <div>
                <p style={{ fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.2)', marginBottom: 16 }}>Bistró</p>
                <a href="tel:+50622671825" style={{ fontSize: 16, color: 'rgba(255,255,255,0.55)', fontWeight: 300, textDecoration: 'none', display: 'block' }}>
                  2267-1825
                </a>
              </div>
              <div>
                <p style={{ fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.2)', marginBottom: 16 }}>WhatsApp</p>
                <a href="https://wa.me/50663609158" target="_blank" rel="noopener noreferrer"
                  style={{ fontSize: 16, color: 'rgba(255,255,255,0.55)', fontWeight: 300, textDecoration: 'none', display: 'block' }}>
                  +506 6360-9158
                </a>
              </div>
            </div>
            <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
              <a href="https://instagram.com/espressivocr" target="_blank" rel="noopener noreferrer"
                style={{ fontSize: 12, color: 'rgba(255,255,255,0.3)', textDecoration: 'none', letterSpacing: '0.04em' }}>
                @espressivocr
              </a>
              <span style={{ color: 'rgba(255,255,255,0.12)' }}>·</span>
              <a href="https://instagram.com/espressivobistrocr" target="_blank" rel="noopener noreferrer"
                style={{ fontSize: 12, color: 'rgba(255,255,255,0.3)', textDecoration: 'none', letterSpacing: '0.04em' }}>
                @espressivobistrocr
              </a>
              <span style={{ color: 'rgba(255,255,255,0.12)' }}>·</span>
              <a href="https://espressivo.cr" target="_blank" rel="noopener noreferrer"
                style={{ fontSize: 12, color: 'rgba(255,255,255,0.3)', textDecoration: 'none', letterSpacing: '0.04em' }}>
                espressivo.cr
              </a>
            </div>
          </div>
        </section>

      </main>

      <style>{`
        @media (max-width: 768px) {
          .teatro-two-col,
          .teatro-bistro-col,
          .teatro-cta-col {
            grid-template-columns: 1fr !important;
            gap: 48px !important;
          }
          .teatro-stats-row {
            grid-template-columns: 1fr !important;
          }
          .teatro-stats-row > div {
            border-right: none !important;
            border-bottom: 0.5px solid rgba(255,255,255,0.06);
          }
          .teatro-specs-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
          .teatro-contact-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </>
  )
}
