'use client'

import { useState, useEffect } from 'react'

// ─── Sample data (replace with Vercel Analytics API when token is available) ──
const DAILY_VIEWS = [
  { date: 'May 1',  views: 312 },
  { date: 'May 2',  views: 289 },
  { date: 'May 3',  views: 401 },
  { date: 'May 4',  views: 376 },
  { date: 'May 5',  views: 512 },
  { date: 'May 6',  views: 498 },
  { date: 'May 7',  views: 445 },
  { date: 'May 8',  views: 383 },
  { date: 'May 9',  views: 354 },
  { date: 'May 10', views: 420 },
  { date: 'May 11', views: 387 },
  { date: 'May 12', views: 461 },
  { date: 'May 13', views: 529 },
  { date: 'May 14', views: 544 },
]

const SITE_VIEWS = [
  { site: 'Lindora',  views: 4823, color: '#8b2828', pct: 60 },
  { site: 'Pinares',  views: 2187, color: '#c0a060', pct: 27 },
  { site: 'Escazú',   views: 1043, color: '#6b6b7a', pct: 13 },
]

const SECTION_VIEWS = [
  { section: 'Gastronomía', views: 3210, pct: 100 },
  { section: 'Servicios',   views: 1842, pct: 57  },
  { section: 'Comercios',   views: 1240, pct: 39  },
  { section: 'Mediplaza',   views:  890, pct: 28  },
  { section: 'Ofiplaza',    views:  524, pct: 16  },
]

const TOP_TENANTS = [
  { name: 'Ají Limón',           site: 'Lindora',  views: 487, section: 'Gastronomía' },
  { name: 'BBQ Chicken',         site: 'Lindora',  views: 412, section: 'Gastronomía' },
  { name: 'Tierra Santa',        site: 'Pinares',  views: 389, section: 'Gastronomía' },
  { name: 'Legatus Barbershop',  site: 'Lindora',  views: 301, section: 'Servicios'   },
  { name: 'Clínica Bíblica',     site: 'Lindora',  views: 278, section: 'Mediplaza'   },
  { name: 'Sport Zone',          site: 'Pinares',  views: 254, section: 'Comercios'   },
  { name: 'La Cevichería',       site: 'Escazú',   views: 231, section: 'Gastronomía' },
  { name: 'Soda Tapia',          site: 'Lindora',  views: 218, section: 'Gastronomía' },
]

const HOURLY = [
  0,  0,  0,  0,  1,  3,  8, 22, 41, 58,
  72, 84, 97, 91, 78, 64, 69, 81, 88, 82,
  67, 48, 28, 10,
]

const STATS = [
  { label: 'Pageviews',    value: '8,053',  delta: '+12%', up: true  },
  { label: 'Visitantes',   value: '3,241',  delta: '+8%',  up: true  },
  { label: 'Sesiones',     value: '4,117',  delta: '+5%',  up: true  },
  { label: 'Prom. sesión', value: '2m 18s', delta: '+0.3s',up: true  },
  { label: 'Tasa rebote',  value: '38.2%',  delta: '-2%',  up: true  },
]

const PASS = 'momentum'

// ─── Password gate ────────────────────────────────────────────────────────────
function PasswordGate({ onUnlock }: { onUnlock: () => void }) {
  const [val, setVal]   = useState('')
  const [err, setErr]   = useState(false)

  const attempt = () => {
    if (val.toLowerCase() === PASS) {
      if (typeof window !== 'undefined') sessionStorage.setItem('mx-admin', '1')
      onUnlock()
    } else {
      setErr(true)
      setVal('')
      setTimeout(() => setErr(false), 1600)
    }
  }

  return (
    <div style={{
      minHeight: '100vh', display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      background: '#0d0a0a',
    }}>
      <div style={{
        width: '100%', maxWidth: 360,
        padding: '48px 40px',
        background: '#181010',
        border: '0.5px solid rgba(255,255,255,0.08)',
        borderRadius: 8,
        textAlign: 'center',
      }}>
        {/* Logotype */}
        <div style={{ marginBottom: 32 }}>
          <div style={{
            fontSize: 11, fontWeight: 600, letterSpacing: '0.3em',
            textTransform: 'uppercase', color: '#8b2828', marginBottom: 6,
          }}>
            MOMENTUM
          </div>
          <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.1em' }}>
            Analytics — Acceso restringido
          </div>
        </div>

        {/* Lock icon */}
        <div style={{ marginBottom: 28, display: 'flex', justifyContent: 'center' }}>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
            <path d="M7 11V7a5 5 0 0110 0v4"/>
          </svg>
        </div>

        <input
          type="password"
          value={val}
          onChange={e => setVal(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && attempt()}
          placeholder="Contraseña"
          autoFocus
          style={{
            width: '100%',
            padding: '12px 16px',
            background: err ? 'rgba(239,68,68,0.08)' : 'rgba(255,255,255,0.04)',
            border: `0.5px solid ${err ? 'rgba(239,68,68,0.4)' : 'rgba(255,255,255,0.12)'}`,
            borderRadius: 4,
            color: '#fff',
            fontSize: 14, letterSpacing: '0.04em',
            outline: 'none',
            marginBottom: 12,
            boxSizing: 'border-box',
            transition: 'border-color 0.2s, background 0.2s',
          }}
        />

        {err && (
          <div style={{ fontSize: 11, color: '#ef4444', marginBottom: 10, letterSpacing: '0.05em' }}>
            Contraseña incorrecta
          </div>
        )}

        <button
          onClick={attempt}
          style={{
            width: '100%',
            padding: '12px',
            background: '#8b2828',
            color: '#fff',
            fontSize: 11, fontWeight: 600, letterSpacing: '0.12em',
            textTransform: 'uppercase',
            border: 'none', borderRadius: 4,
            cursor: 'pointer',
            transition: 'opacity 0.18s',
          }}
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.opacity = '0.85' }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.opacity = '1' }}
        >
          Ingresar
        </button>
      </div>
    </div>
  )
}

// ─── Bar chart (daily pageviews) ──────────────────────────────────────────────
function DailyBarChart({ data }: { data: typeof DAILY_VIEWS }) {
  const max  = Math.max(...data.map(d => d.views))
  const W    = 680
  const H    = 160
  const barW = Math.floor(W / data.length) - 4

  return (
    <svg viewBox={`0 0 ${W} ${H + 24}`} style={{ width: '100%', overflow: 'visible' }}>
      {data.map((d, i) => {
        const barH = Math.round((d.views / max) * H)
        const x    = i * (W / data.length)
        const y    = H - barH
        return (
          <g key={d.date}>
            <rect
              x={x + 2} y={y} width={barW} height={barH}
              rx={2}
              fill="#8b2828" opacity={0.75 + (i / data.length) * 0.25}
            />
            {/* Value on hover via title */}
            <title>{d.date}: {d.views.toLocaleString()} views</title>
            {/* Date label — show every 3rd */}
            {i % 3 === 0 && (
              <text
                x={x + barW / 2 + 2} y={H + 18}
                textAnchor="middle"
                fontSize={9} fill="rgba(255,255,255,0.3)"
                fontFamily="sans-serif"
              >
                {d.date.split(' ')[1]}
              </text>
            )}
          </g>
        )
      })}
    </svg>
  )
}

// ─── Hourly chart ─────────────────────────────────────────────────────────────
function HourlyChart({ data }: { data: number[] }) {
  const max = Math.max(...data)
  const W   = 680
  const H   = 80

  return (
    <svg viewBox={`0 0 ${W} ${H + 20}`} style={{ width: '100%', overflow: 'visible' }}>
      {data.map((v, i) => {
        const barH = Math.round((v / max) * H)
        const barW = Math.floor(W / 24) - 3
        const x    = i * (W / 24)
        const y    = H - barH
        const isDay = i >= 7 && i <= 21
        return (
          <g key={i}>
            <rect
              x={x + 1} y={y} width={barW} height={barH}
              rx={1}
              fill={isDay ? '#8b2828' : '#444'}
              opacity={0.7}
            />
            {(i === 0 || i === 6 || i === 12 || i === 18 || i === 23) && (
              <text x={x + barW / 2} y={H + 14} textAnchor="middle" fontSize={8} fill="rgba(255,255,255,0.3)" fontFamily="sans-serif">
                {i === 0 ? '12am' : i === 6 ? '6am' : i === 12 ? '12pm' : i === 18 ? '6pm' : '11pm'}
              </text>
            )}
          </g>
        )
      })}
    </svg>
  )
}

// ─── Main dashboard ───────────────────────────────────────────────────────────
function Dashboard() {
  const topTenantMax = TOP_TENANTS[0].views

  return (
    <div style={{ minHeight: '100vh', background: '#0d0a0a', fontFamily: 'system-ui, sans-serif' }}>

      {/* Header */}
      <div style={{
        borderBottom: '0.5px solid rgba(255,255,255,0.07)',
        padding: '0 40px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        height: 56,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.28em', color: '#8b2828' }}>MOMENTUM</div>
          <div style={{ width: '0.5px', height: 16, background: 'rgba(255,255,255,0.12)' }} />
          <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', letterSpacing: '0.06em' }}>Analytics</div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            display: 'flex', alignItems: 'center', gap: 5,
            padding: '4px 10px',
            background: 'rgba(34,197,94,0.1)',
            border: '0.5px solid rgba(34,197,94,0.25)',
            borderRadius: 100,
            fontSize: 9, fontWeight: 600, letterSpacing: '0.1em',
            color: '#22c55e',
          }}>
            <div style={{ width: 4, height: 4, borderRadius: '50%', background: '#22c55e' }} />
            TRACKING ACTIVO
          </div>
          <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.25)', letterSpacing: '0.06em' }}>
            Mayo 2026 · Datos de muestra
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '40px' }}>

        {/* Page title */}
        <div style={{ marginBottom: 36 }}>
          <div style={{ fontSize: 9, fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#8b2828', marginBottom: 8 }}>
            Dashboard
          </div>
          <h1 style={{ fontSize: 28, fontWeight: 300, color: '#fff', letterSpacing: '-0.01em', margin: 0 }}>
            Resumen de tráfico
          </h1>
        </div>

        {/* ── KPI row ── */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
          gap: 12,
          marginBottom: 32,
        }}>
          {STATS.map(s => (
            <div key={s.label} style={{
              background: '#181010',
              border: '0.5px solid rgba(255,255,255,0.07)',
              borderRadius: 6,
              padding: '20px 22px',
            }}>
              <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 8 }}>
                {s.label}
              </div>
              <div style={{ fontSize: 26, fontWeight: 300, color: '#fff', letterSpacing: '-0.02em', marginBottom: 6 }}>
                {s.value}
              </div>
              <div style={{
                fontSize: 10, fontWeight: 600,
                color: s.up ? '#22c55e' : '#ef4444',
                letterSpacing: '0.06em',
              }}>
                {s.up ? '▲' : '▼'} {s.delta} vs mes anterior
              </div>
            </div>
          ))}
        </div>

        {/* ── Daily traffic chart ── */}
        <div style={{
          background: '#181010',
          border: '0.5px solid rgba(255,255,255,0.07)',
          borderRadius: 6,
          padding: '28px 28px 20px',
          marginBottom: 20,
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 24 }}>
            <div>
              <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 4 }}>
                Pageviews diarios
              </div>
              <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.7)', fontWeight: 300 }}>
                Últimos 14 días
              </div>
            </div>
            <div style={{ fontSize: 22, fontWeight: 300, color: '#fff' }}>
              {DAILY_VIEWS.reduce((a, b) => a + b.views, 0).toLocaleString()}
              <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', marginLeft: 6 }}>total</span>
            </div>
          </div>
          <DailyBarChart data={DAILY_VIEWS} />
        </div>

        {/* ── Two columns: sites + sections ── */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 20 }}>

          {/* Traffic by site */}
          <div style={{
            background: '#181010',
            border: '0.5px solid rgba(255,255,255,0.07)',
            borderRadius: 6,
            padding: '24px 24px',
          }}>
            <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 20 }}>
              Tráfico por sede
            </div>
            {SITE_VIEWS.map(s => (
              <div key={s.site} style={{ marginBottom: 16 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                  <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.7)' }}>{s.site}</span>
                  <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)' }}>{s.views.toLocaleString()}</span>
                </div>
                <div style={{ height: 6, background: 'rgba(255,255,255,0.06)', borderRadius: 3, overflow: 'hidden' }}>
                  <div style={{
                    height: '100%', width: `${s.pct}%`,
                    background: s.color,
                    borderRadius: 3,
                    transition: 'width 0.8s ease',
                  }} />
                </div>
                <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.25)', marginTop: 3, letterSpacing: '0.06em' }}>
                  {s.pct}% del total
                </div>
              </div>
            ))}
          </div>

          {/* Traffic by section */}
          <div style={{
            background: '#181010',
            border: '0.5px solid rgba(255,255,255,0.07)',
            borderRadius: 6,
            padding: '24px 24px',
          }}>
            <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 20 }}>
              Secciones más visitadas
            </div>
            {SECTION_VIEWS.map(s => (
              <div key={s.section} style={{ marginBottom: 16 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                  <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.7)' }}>{s.section}</span>
                  <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)' }}>{s.views.toLocaleString()}</span>
                </div>
                <div style={{ height: 6, background: 'rgba(255,255,255,0.06)', borderRadius: 3, overflow: 'hidden' }}>
                  <div style={{
                    height: '100%', width: `${s.pct}%`,
                    background: 'rgba(139,40,40,0.85)',
                    borderRadius: 3,
                  }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Hourly heatmap ── */}
        <div style={{
          background: '#181010',
          border: '0.5px solid rgba(255,255,255,0.07)',
          borderRadius: 6,
          padding: '24px 28px 16px',
          marginBottom: 20,
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 20 }}>
            <div>
              <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 4 }}>
                Tráfico por hora
              </div>
              <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', fontWeight: 300 }}>
                Pico: 1:00 pm – 2:00 pm y 6:00 pm – 8:00 pm
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, fontSize: 10, color: 'rgba(255,255,255,0.3)' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                <span style={{ display: 'inline-block', width: 10, height: 10, borderRadius: 2, background: '#8b2828', opacity: 0.7 }} />
                Horario diurno
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                <span style={{ display: 'inline-block', width: 10, height: 10, borderRadius: 2, background: '#444', opacity: 0.7 }} />
                Nocturno
              </span>
            </div>
          </div>
          <HourlyChart data={HOURLY} />
        </div>

        {/* ── Top tenants table ── */}
        <div style={{
          background: '#181010',
          border: '0.5px solid rgba(255,255,255,0.07)',
          borderRadius: 6,
          padding: '24px 24px',
          marginBottom: 32,
        }}>
          <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 20 }}>
            Locales más visitados
          </div>
          <div>
            {TOP_TENANTS.map((t, i) => (
              <div key={t.name} style={{
                display: 'grid',
                gridTemplateColumns: '28px 1fr 90px 100px',
                gap: 12,
                alignItems: 'center',
                padding: '10px 0',
                borderBottom: i < TOP_TENANTS.length - 1 ? '0.5px solid rgba(255,255,255,0.05)' : 'none',
              }}>
                <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.2)', fontWeight: 500, textAlign: 'right' }}>
                  {i + 1}
                </span>
                <div>
                  <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.8)', marginBottom: 2 }}>{t.name}</div>
                  <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.06em' }}>{t.site} · {t.section}</div>
                </div>
                {/* Mini bar */}
                <div style={{ height: 4, background: 'rgba(255,255,255,0.06)', borderRadius: 2, overflow: 'hidden' }}>
                  <div style={{
                    height: '100%',
                    width: `${Math.round((t.views / topTenantMax) * 100)}%`,
                    background: '#8b2828', opacity: 0.8,
                    borderRadius: 2,
                  }} />
                </div>
                <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', textAlign: 'right', letterSpacing: '-0.01em' }}>
                  {t.views.toLocaleString()} <span style={{ fontSize: 9, color: 'rgba(255,255,255,0.2)' }}>vistas</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Notice */}
        <div style={{
          borderTop: '0.5px solid rgba(255,255,255,0.06)',
          paddingTop: 20,
          display: 'flex', alignItems: 'flex-start', gap: 10,
        }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: 1 }}>
            <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
          </svg>
          <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.25)', lineHeight: 1.7, margin: 0 }}>
            Los datos mostrados son de muestra para propósitos de diseño. El tracking de Vercel Analytics ya está activo
            en producción. Para conectar datos reales, configure{' '}
            <code style={{ fontSize: 10, background: 'rgba(255,255,255,0.07)', padding: '1px 5px', borderRadius: 3 }}>VERCEL_ACCESS_TOKEN</code>
            {' '}en las variables de entorno y reemplace las constantes en{' '}
            <code style={{ fontSize: 10, background: 'rgba(255,255,255,0.07)', padding: '1px 5px', borderRadius: 3 }}>src/app/admin/analytics/page.tsx</code>.
          </p>
        </div>
      </div>
    </div>
  )
}

// ─── Entry point ──────────────────────────────────────────────────────────────
export default function AdminAnalyticsPage() {
  const [unlocked, setUnlocked] = useState(false)

  useEffect(() => {
    if (typeof window !== 'undefined' && sessionStorage.getItem('mx-admin') === '1') {
      setUnlocked(true)
    }
  }, [])

  if (!unlocked) return <PasswordGate onUnlock={() => setUnlocked(true)} />
  return <Dashboard />
}
