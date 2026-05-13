import Link from 'next/link'
import Image from 'next/image'

export default function NotFound() {
  return (
    <main style={{
      background: '#080808',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      padding: '0 24px',
    }}>

      {/* Subtle background glow */}
      <div style={{
        position: 'fixed', inset: 0, pointerEvents: 'none',
        background: 'radial-gradient(ellipse 60% 40% at 50% 50%, rgba(147,45,43,0.06) 0%, transparent 70%)',
      }} />

      <div style={{ position: 'relative', zIndex: 1 }}>

        {/* Logo */}
        <Link href="/">
          <Image
            src="/brand/momentum-white.png"
            alt="Momentum"
            width={480}
            height={120}
            style={{ width: 'clamp(120px, 16vw, 200px)', height: 'auto', opacity: 0.5, marginBottom: 64 }}
          />
        </Link>

        {/* 404 numeral */}
        <div style={{
          fontSize: 'clamp(80px, 18vw, 160px)',
          fontWeight: 300,
          color: 'rgba(255,255,255,0.04)',
          letterSpacing: '-0.04em',
          lineHeight: 1,
          marginBottom: 4,
          fontFamily: "'DM Sans', system-ui, sans-serif",
          userSelect: 'none',
        }}>
          404
        </div>

        {/* Divider */}
        <div style={{
          width: 32, height: '0.5px',
          background: 'rgba(147,45,43,0.6)',
          margin: '0 auto 32px',
        }} />

        {/* Message */}
        <h1 style={{
          fontSize: 'clamp(18px, 2.5vw, 24px)',
          fontWeight: 300,
          color: 'rgba(255,255,255,0.7)',
          letterSpacing: '-0.01em',
          marginBottom: 14,
          fontFamily: "'DM Sans', system-ui, sans-serif",
        }}>
          Esta página no existe
        </h1>
        <p style={{
          fontSize: 14,
          color: 'rgba(255,255,255,0.25)',
          fontWeight: 300,
          lineHeight: 1.8,
          maxWidth: 360,
          margin: '0 auto 48px',
          fontFamily: "'DM Sans', system-ui, sans-serif",
        }}>
          El contenido que buscás puede haber cambiado de ubicación.<br />
          Explorá nuestros destinos desde el inicio.
        </p>

        {/* CTAs */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, justifyContent: 'center' }}>
          <Link href="/" style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            padding: '12px 28px',
            background: 'rgba(147,45,43,0.85)',
            color: '#fff',
            fontSize: 10, fontWeight: 600,
            letterSpacing: '0.13em', textTransform: 'uppercase',
            borderRadius: 2,
            fontFamily: "'DM Sans', system-ui, sans-serif",
          }}>
            Inicio
          </Link>
          <Link href="/lindora" style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            padding: '12px 28px',
            border: '0.5px solid rgba(255,255,255,0.12)',
            color: 'rgba(255,255,255,0.45)',
            fontSize: 10, fontWeight: 400,
            letterSpacing: '0.13em', textTransform: 'uppercase',
            borderRadius: 2,
            fontFamily: "'DM Sans', system-ui, sans-serif",
          }}>
            Lindora
          </Link>
          <Link href="/escazu" style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            padding: '12px 28px',
            border: '0.5px solid rgba(255,255,255,0.12)',
            color: 'rgba(255,255,255,0.45)',
            fontSize: 10, fontWeight: 400,
            letterSpacing: '0.13em', textTransform: 'uppercase',
            borderRadius: 2,
            fontFamily: "'DM Sans', system-ui, sans-serif",
          }}>
            Escazú
          </Link>
          <Link href="/pinares" style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            padding: '12px 28px',
            border: '0.5px solid rgba(255,255,255,0.12)',
            color: 'rgba(255,255,255,0.45)',
            fontSize: 10, fontWeight: 400,
            letterSpacing: '0.13em', textTransform: 'uppercase',
            borderRadius: 2,
            fontFamily: "'DM Sans', system-ui, sans-serif",
          }}>
            Pinares
          </Link>
        </div>

        {/* Destination dots */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginTop: 56 }}>
          {[['#932D2B','Lindora'],['#56717A','Escazú'],['#4F5B3E','Pinares']].map(([color, name]) => (
            <div key={name} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <div style={{ width: 4, height: 4, borderRadius: '50%', background: color, opacity: 0.6 }} />
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}
