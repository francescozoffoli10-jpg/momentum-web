'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

const STORAGE_KEY = 'momentum-cookie-consent'

// Dispatched so analytics (or anything else) can react to a consent change
// within the same page load, without requiring a refresh.
function emitConsent(value: 'accepted' | 'rejected') {
  try {
    localStorage.setItem(STORAGE_KEY, value)
    window.dispatchEvent(new CustomEvent('momentum-consent', { detail: value }))
  } catch {
    /* localStorage unavailable — fail silently */
  }
}

export default function CookieBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored !== 'accepted' && stored !== 'rejected') setVisible(true)
    } catch {
      setVisible(true)
    }
  }, [])

  if (!visible) return null

  function accept() {
    emitConsent('accepted')
    setVisible(false)
  }

  function reject() {
    emitConsent('rejected')
    setVisible(false)
  }

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Aviso de cookies"
      style={{
        position: 'fixed',
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 2000,
        display: 'flex',
        justifyContent: 'center',
        padding: '16px',
        pointerEvents: 'none',
      }}
    >
      <div
        style={{
          pointerEvents: 'auto',
          width: '100%',
          maxWidth: 980,
          background: 'rgba(7,13,20,0.96)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          border: '0.5px solid rgba(255,255,255,0.1)',
          borderRadius: 6,
          boxShadow: '0 8px 40px rgba(0,0,0,0.35)',
          padding: '20px 24px',
          display: 'flex',
          alignItems: 'center',
          gap: 24,
          flexWrap: 'wrap',
        }}
      >
        <p style={{ flex: '1 1 360px', margin: 0, fontSize: 13, lineHeight: 1.6, color: 'rgba(255,255,255,0.7)', fontWeight: 300, letterSpacing: '0.01em' }}>
          Usamos cookies para mejorar tu experiencia y entender cómo se utiliza el sitio.{' '}
          <Link
            href="/cookies"
            style={{ color: 'rgba(255,255,255,0.92)', textDecoration: 'underline', textUnderlineOffset: 2 }}
          >
            Más información
          </Link>
          .
        </p>

        <div style={{ display: 'flex', gap: 10, flexShrink: 0 }}>
          <button
            type="button"
            onClick={reject}
            style={{
              cursor: 'pointer',
              background: 'transparent',
              border: '0.5px solid rgba(255,255,255,0.22)',
              color: 'rgba(255,255,255,0.7)',
              fontSize: 12,
              fontWeight: 500,
              letterSpacing: '0.04em',
              padding: '11px 22px',
              borderRadius: 3,
              transition: 'border-color 0.2s, color 0.2s',
            }}
            onMouseEnter={function (e) { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.45)'; e.currentTarget.style.color = '#fff' }}
            onMouseLeave={function (e) { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.22)'; e.currentTarget.style.color = 'rgba(255,255,255,0.7)' }}
          >
            Rechazar
          </button>
          <button
            type="button"
            onClick={accept}
            style={{
              cursor: 'pointer',
              background: '#fff',
              border: '0.5px solid #fff',
              color: '#070D14',
              fontSize: 12,
              fontWeight: 600,
              letterSpacing: '0.04em',
              padding: '11px 26px',
              borderRadius: 3,
              transition: 'opacity 0.2s',
            }}
            onMouseEnter={function (e) { e.currentTarget.style.opacity = '0.85' }}
            onMouseLeave={function (e) { e.currentTarget.style.opacity = '1' }}
          >
            Aceptar
          </button>
        </div>
      </div>
    </div>
  )
}
