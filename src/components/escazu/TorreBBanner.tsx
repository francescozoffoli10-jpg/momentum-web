import Link from 'next/link'

/**
 * Availability banner for the new Torre B at the Escazú Centro Médico.
 * Tasteful accent strip — noticeable but not invasive. Counts are props
 * so they're easy to update as units sell.
 */
export default function TorreBBanner({
  available = 4,
  total = 16,
  href = '/escazu/contacto',
}: {
  available?: number
  total?: number
  href?: string
}) {
  return (
    <section style={{ background: 'var(--a)', color: '#fff' }}>
      <div
        className="torreb-inner"
        style={{
          maxWidth: 1280,
          margin: '0 auto',
          padding: '22px 32px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 24,
          flexWrap: 'wrap',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          {/* Availability badge: 4 / 16 */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              minWidth: 68,
              padding: '9px 14px',
              border: '1px solid rgba(255,255,255,0.35)',
              borderRadius: 4,
              lineHeight: 1,
              flexShrink: 0,
            }}
          >
            <span style={{ fontSize: 26, fontWeight: 300, letterSpacing: '-0.02em' }}>
              {available}
              <span style={{ opacity: 0.55, fontSize: 17 }}>/{total}</span>
            </span>
            <span style={{ fontSize: 8, letterSpacing: '0.14em', textTransform: 'uppercase', opacity: 0.8, marginTop: 5 }}>
              Disponibles
            </span>
          </div>

          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 5 }}>
              <span style={{ display: 'inline-block', width: 6, height: 6, borderRadius: '50%', background: '#fff' }} />
              <span style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.16em', textTransform: 'uppercase', opacity: 0.9 }}>
                Nueva Torre · Torre B
              </span>
            </div>
            <div style={{ fontSize: 'clamp(16px, 2vw, 21px)', fontWeight: 400, letterSpacing: '-0.01em' }}>
              Quedan {available} consultorios médicos disponibles
            </div>
            <div style={{ fontSize: 12.5, fontWeight: 300, opacity: 0.85, marginTop: 3 }}>
              Espacios en la nueva torre del Centro Médico Momentum Escazú.
            </div>
          </div>
        </div>

        <Link
          href={href}
          className="torreb-cta"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 9,
            padding: '13px 26px',
            background: '#fff',
            color: 'var(--a)',
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            borderRadius: 2,
            textDecoration: 'none',
            whiteSpace: 'nowrap',
            flexShrink: 0,
          }}
        >
          Consultá disponibilidad
          <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
            <path d="M2 6.5h9M7.5 2.5l4 4-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Link>
      </div>

      <style>{`
        .torreb-cta { transition: opacity .18s, transform .18s; }
        .torreb-cta:hover { opacity: .9; transform: translateY(-1px); }
        @media (max-width: 720px) {
          .torreb-inner { flex-direction: column; align-items: flex-start; gap: 18px; }
        }
      `}</style>
    </section>
  )
}
