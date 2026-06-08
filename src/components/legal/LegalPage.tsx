import Link from 'next/link'
import Image from 'next/image'

interface LegalPageProps {
  title: string
  updated: string
  intro?: string
  children: React.ReactNode
}

const LEGAL_LINKS = [
  { label: 'Política de Privacidad', href: '/privacidad' },
  { label: 'Términos y Condiciones', href: '/terminos' },
  { label: 'Política de Cookies', href: '/cookies' },
]

export default function LegalPage({ title, updated, intro, children }: LegalPageProps) {
  return (
    <div style={{ background: '#FBFAF8', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <style
        dangerouslySetInnerHTML={{
          __html: `
            .legal-prose { color: #2A2D31; font-size: 15px; line-height: 1.85; font-weight: 300; }
            .legal-prose h2 { font-size: 13px; font-weight: 600; letter-spacing: 0.14em; text-transform: uppercase; color: #070D14; margin: 56px 0 16px; }
            .legal-prose h2:first-child { margin-top: 0; }
            .legal-prose h3 { font-size: 16px; font-weight: 500; color: #070D14; margin: 32px 0 10px; letter-spacing: 0.01em; }
            .legal-prose p { margin: 0 0 18px; }
            .legal-prose ul { margin: 0 0 18px; padding-left: 20px; }
            .legal-prose li { margin-bottom: 9px; }
            .legal-prose a { color: #070D14; text-decoration: underline; text-underline-offset: 2px; }
            .legal-prose strong { font-weight: 500; color: #070D14; }
          `,
        }}
      />

      {/* Top bar */}
      <header style={{ background: '#070D14', borderBottom: '0.5px solid rgba(255,255,255,0.06)' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '20px 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Link href="/" style={{ display: 'inline-flex' }}>
            <Image
              src="/brand/momentum-white.png"
              alt="Momentum Costa Rica"
              width={420}
              height={120}
              style={{ height: 28, width: 'auto', opacity: 0.9 }}
            />
          </Link>
          <Link
            href="/"
            style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', textDecoration: 'none', letterSpacing: '0.04em' }}
          >
            ← Volver al inicio
          </Link>
        </div>
      </header>

      {/* Hero */}
      <div style={{ borderBottom: '0.5px solid rgba(0,0,0,0.07)' }}>
        <div style={{ maxWidth: 760, margin: '0 auto', padding: '72px 32px 40px' }}>
          <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#9A8C6E', marginBottom: 18 }}>
            Momentum Costa Rica
          </div>
          <h1 style={{ fontSize: 38, fontWeight: 300, letterSpacing: '-0.01em', color: '#070D14', margin: 0, lineHeight: 1.15 }}>
            {title}
          </h1>
          <p style={{ fontSize: 12, color: 'rgba(0,0,0,0.4)', marginTop: 20, letterSpacing: '0.03em' }}>
            Última actualización: {updated}
          </p>
          {intro && (
            <p style={{ fontSize: 16, fontWeight: 300, color: '#41454A', lineHeight: 1.7, marginTop: 24, marginBottom: 0 }}>
              {intro}
            </p>
          )}
        </div>
      </div>

      {/* Body */}
      <main style={{ flex: 1 }}>
        <div className="legal-prose" style={{ maxWidth: 760, margin: '0 auto', padding: '48px 32px 80px' }}>
          {children}
        </div>
      </main>

      {/* Footer */}
      <footer style={{ background: '#070D14', padding: '48px 32px' }}>
        <div style={{ maxWidth: 760, margin: '0 auto', display: 'flex', flexWrap: 'wrap', gap: 24, justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', gap: 22, flexWrap: 'wrap' }}>
            {LEGAL_LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', textDecoration: 'none', letterSpacing: '0.02em' }}
              >
                {l.label}
              </Link>
            ))}
          </div>
          <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.22)', letterSpacing: '0.04em' }}>
            © {new Date().getFullYear()} Momentum Costa Rica
          </span>
        </div>
      </footer>
    </div>
  )
}
