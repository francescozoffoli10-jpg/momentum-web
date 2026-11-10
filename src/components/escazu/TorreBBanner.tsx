/**
 * Availability banner for the new Torre B at the Escazú Centro Médico.
 * Tasteful accent strip — noticeable but not invasive. Counts are props
 * so they're easy to update as units sell. The CTA calls the CME sales
 * line (a regular line, NOT WhatsApp) and shows the contact email.
 */
export default function TorreBBanner({
  available = 4,
  total = 16,
  phone = '+506 8835 8342',
  email = 'sguillen@d506.cr',
}: {
  available?: number
  total?: number
  phone?: string
  email?: string
}) {
  const telHref = `tel:${phone.replace(/[^\d+]/g, '')}`

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

        {/* Contact: call the CME sales line + email */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 9 }} className="torreb-cta-col">
          <a
            href={telHref}
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
            <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
              <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1C10.29 21 3 13.71 3 4.5 3 3.95 3.45 3.5 4 3.5h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
            </svg>
            Llamá al {phone.replace(/^\+506\s*/, '')}
          </a>
          <a
            href={`mailto:${email}`}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              color: '#fff',
              opacity: 0.9,
              fontSize: 12,
              fontWeight: 300,
              letterSpacing: '0.02em',
              textDecoration: 'none',
            }}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
              <rect x="3" y="5" width="18" height="14" rx="2" />
              <path d="M3 7l9 6 9-6" />
            </svg>
            {email}
          </a>
        </div>
      </div>

      <style>{`
        .torreb-cta { transition: opacity .18s, transform .18s; }
        .torreb-cta:hover { opacity: .9; transform: translateY(-1px); }
        @media (max-width: 720px) {
          .torreb-inner { flex-direction: column; align-items: flex-start; gap: 18px; }
          .torreb-cta-col { align-items: flex-start; width: 100%; }
        }
      `}</style>
    </section>
  )
}
