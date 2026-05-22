'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function AppBadge() {
  const [visible, setVisible] = useState(false)
  const [dismissed, setDismissed] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!dismissed) setVisible(true)
    }, 4200)
    return () => clearTimeout(timer)
  }, [dismissed])

  return (
    <AnimatePresence>
      {visible && !dismissed && (
        <motion.div
          initial={{ opacity: 0, y: 32, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 24, scale: 0.96 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          style={{
            position: 'fixed',
            bottom: 28, right: 28,
            zIndex: 100,
            background: 'rgba(14,6,6,0.97)',
            backdropFilter: 'blur(24px)',
            border: '0.5px solid rgba(255,255,255,0.1)',
            borderRadius: 12,
            padding: '16px 18px',
            width: 260,
            boxShadow: '0 24px 64px rgba(0,0,0,0.5)',
          }}
        >
          {/* Dismiss */}
          <button
            onClick={() => { setVisible(false); setDismissed(true) }}
            style={{
              position: 'absolute', top: 10, right: 12,
              background: 'none', border: 'none', cursor: 'pointer',
              color: 'rgba(255,255,255,0.3)', fontSize: 16, lineHeight: 1,
              transition: 'color 0.2s',
            }}
            onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
            onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.3)')}
            aria-label="Cerrar"
          >
            ×
          </button>

          {/* Icon + label */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
            <div style={{
              width: 40, height: 40, borderRadius: 10,
              background: 'var(--a)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0,
            }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="5" y="2" width="14" height="20" rx="2" ry="2"/><line x1="12" y1="18" x2="12.01" y2="18"/>
              </svg>
            </div>
            <div>
              <div style={{ fontSize: 13, fontWeight: 500, color: '#fff', letterSpacing: '-0.01em' }}>
                App Momentum
              </div>
              <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.38)', marginTop: 1 }}>
                Descargá gratis
              </div>
            </div>
          </div>

          <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.42)', lineHeight: 1.7, marginBottom: 14 }}>
            Parking, promociones y mucho más desde tu bolsillo.
          </p>

          <div style={{ display: 'flex', gap: 8 }}>
            <a href="https://apps.apple.com/es/app/momentum/id1524496370?l=en-GB" target="_blank" rel="noopener noreferrer" style={{
              flex: 1, textAlign: 'center',
              padding: '8px 0',
              background: 'var(--a)',
              borderRadius: 6,
              fontSize: 10, fontWeight: 600,
              color: '#fff',
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              transition: 'background 0.2s',
            }}
              onMouseEnter={e => (e.currentTarget.style.background = 'var(--a-light)')}
              onMouseLeave={e => (e.currentTarget.style.background = 'var(--a)')}
            >
              App Store
            </a>
            <a href="https://play.google.com/store/apps/details?id=com.baum.loyalty.momemtum&pcampaignid=web_share" target="_blank" rel="noopener noreferrer" style={{
              flex: 1, textAlign: 'center',
              padding: '8px 0',
              border: '0.5px solid rgba(255,255,255,0.14)',
              borderRadius: 6,
              fontSize: 10, fontWeight: 500,
              color: 'rgba(255,255,255,0.6)',
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              transition: 'border-color 0.2s, color 0.2s',
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.35)'; e.currentTarget.style.color = '#fff' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.14)'; e.currentTarget.style.color = 'rgba(255,255,255,0.6)' }}
            >
              Google Play
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
