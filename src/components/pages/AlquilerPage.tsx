'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import type { SiteConfig } from '@/data/types'

interface RentalBlock {
  type: string
  detail: string
  phone: string
  email?: string
}

const RENTAL_DATA: Record<string, { headline: string; blocks: RentalBlock[] }> = {
  lindora: {
    headline: 'Alquiler de locales y consultorios',
    blocks: [
      {
        type: 'Consultorios médicos',
        detail: 'Consultorios disponibles desde los 65 m²',
        phone: '+506 8835-8342',
        email: 'alquileres@momentumlindora.com',
      },
    ],
  },
  escazu: {
    headline: 'Alquiler de oficinas y locales',
    blocks: [
      {
        type: 'Oficinas y locales',
        detail: 'Oficinas disponibles desde los 40 m²',
        phone: '+506 2289 0000',
        email: 'info@momentumescazu.com',
      },
    ],
  },
  pinares: {
    headline: 'Alquiler de oficinas y locales comerciales',
    blocks: [
      {
        type: 'Oficinas',
        detail: 'Oficinas desde los 147 m² · Curridabat, contiguo al CC Momentum Pinares',
        phone: '+506 7064-0874',
        email: 'kguerrero@d506.cr',
      },
      {
        type: 'Locales comerciales',
        detail: 'Locales comerciales · Curridabat, frente al Walmart',
        phone: '+506 7064-0874',
        email: 'kguerrero@d506.cr',
      },
    ],
  },
}

const FORMSPREE_ID = process.env.NEXT_PUBLIC_FORMSPREE_ID ?? ''

const TIPO_ESPACIO = [
  'Consultorio médico',
  'Oficina',
  'Local comercial',
  'Otro',
]

const AREA_OPTIONS = [
  'Menos de 50 m²',
  '50 – 100 m²',
  '100 – 200 m²',
  'Más de 200 m²',
  'Por definir',
]

function LeaseInquiryForm({ site }: { site: SiteConfig }) {
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')
  const [focused, setFocused] = useState<string | null>(null)
  const [fields, setFields] = useState({
    nombre: '', correo: '', telefono: '',
    tipo: '', area: '', mensaje: '',
  })

  const set = (k: keyof typeof fields) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setFields(f => ({ ...f, [k]: e.target.value }))

  const inputStyle = (key: string): React.CSSProperties => ({
    width: '100%',
    background: focused === key ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.03)',
    border: `0.5px solid ${focused === key ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.08)'}`,
    borderRadius: 4,
    padding: '13px 16px',
    color: '#fff',
    fontSize: 14,
    fontWeight: 300,
    fontFamily: 'inherit',
    outline: 'none',
    transition: 'border-color 0.2s, background 0.2s',
    boxSizing: 'border-box' as const,
  })

  const labelStyle: React.CSSProperties = {
    display: 'block',
    fontSize: 9,
    fontWeight: 600,
    letterSpacing: '0.18em',
    textTransform: 'uppercase',
    color: 'rgba(255,255,255,0.3)',
    marginBottom: 8,
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!FORMSPREE_ID) {
      const body = Object.entries(fields).map(([k, v]) => `${k}: ${v}`).join('\n')
      window.open(`mailto:mercadeo@momentum.co.cr?subject=Consulta de Alquiler desde ${site.name}&body=${encodeURIComponent(body)}`)
      setStatus('success')
      return
    }
    setStatus('sending')
    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          ...fields,
          _subject: `Consulta de Alquiler — ${site.name} — ${fields.tipo || 'Espacio'}`,
          momentum: site.name,
          fecha: new Date().toLocaleDateString('es-CR', { day: '2-digit', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
        }),
      })
      if (res.ok) {
        setStatus('success')
        setFields({ nombre: '', correo: '', telefono: '', tipo: '', area: '', mensaje: '' })
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div style={{
        padding: '56px 40px',
        background: 'rgba(255,255,255,0.02)',
        border: '0.5px solid rgba(255,255,255,0.08)',
        borderRadius: 8,
        textAlign: 'center',
        maxWidth: 540,
      }}>
        <div style={{
          width: 48, height: 48, borderRadius: '50%',
          background: site.accentColor + '22',
          border: '0.5px solid ' + site.accentColor + '55',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          margin: '0 auto 24px',
        }}>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M4 10l4.5 4.5L16 7" stroke={site.accentColor} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <h3 style={{ fontSize: 20, fontWeight: 300, color: '#fff', letterSpacing: '-0.01em', marginBottom: 10 }}>
          Consulta enviada
        </h3>
        <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.38)', fontWeight: 300, lineHeight: 1.65, marginBottom: 28 }}>
          Recibimos tu solicitud. El equipo de {site.name} se pondrá en contacto con vos a la brevedad.
        </p>
        <button
          onClick={() => setStatus('idle')}
          style={{
            background: 'none', border: '0.5px solid rgba(255,255,255,0.12)', borderRadius: 100,
            color: 'rgba(255,255,255,0.45)', fontSize: 10, fontWeight: 500,
            letterSpacing: '0.12em', textTransform: 'uppercase',
            padding: '8px 20px', cursor: 'pointer', fontFamily: 'inherit',
            transition: 'border-color 0.2s, color 0.2s',
          }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.28)'; e.currentTarget.style.color = '#fff' }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)'; e.currentTarget.style.color = 'rgba(255,255,255,0.45)' }}
        >
          Enviar otra consulta
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 640 }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }} className="lease-form-grid">

        {/* Nombre */}
        <div style={{ gridColumn: '1 / -1' }}>
          <label style={labelStyle}>Nombre completo *</label>
          <input type="text" required value={fields.nombre} onChange={set('nombre')}
            placeholder="Ej. María Rodríguez"
            onFocus={() => setFocused('nombre')} onBlur={() => setFocused(null)}
            style={inputStyle('nombre')} />
        </div>

        {/* Correo */}
        <div>
          <label style={labelStyle}>Correo electrónico *</label>
          <input type="email" required value={fields.correo} onChange={set('correo')}
            placeholder="correo@ejemplo.com"
            onFocus={() => setFocused('correo')} onBlur={() => setFocused(null)}
            style={inputStyle('correo')} />
        </div>

        {/* Teléfono */}
        <div>
          <label style={labelStyle}>Teléfono móvil *</label>
          <input type="tel" required value={fields.telefono} onChange={set('telefono')}
            placeholder="+506 8888-0000"
            onFocus={() => setFocused('telefono')} onBlur={() => setFocused(null)}
            style={inputStyle('telefono')} />
        </div>

        {/* Tipo de espacio */}
        <div>
          <label style={labelStyle}>Tipo de espacio *</label>
          <select required value={fields.tipo} onChange={set('tipo')}
            onFocus={() => setFocused('tipo')} onBlur={() => setFocused(null)}
            style={{ ...inputStyle('tipo'), appearance: 'none' as const }}>
            <option value="" style={{ background: '#0E0609', color: 'rgba(255,255,255,0.4)' }}>Seleccioná una opción</option>
            {TIPO_ESPACIO.map(o => (
              <option key={o} value={o} style={{ background: '#0E0609', color: '#fff' }}>{o}</option>
            ))}
          </select>
        </div>

        {/* Área */}
        <div>
          <label style={labelStyle}>Área aproximada</label>
          <select value={fields.area} onChange={set('area')}
            onFocus={() => setFocused('area')} onBlur={() => setFocused(null)}
            style={{ ...inputStyle('area'), appearance: 'none' as const }}>
            <option value="" style={{ background: '#0E0609', color: 'rgba(255,255,255,0.4)' }}>Seleccioná una opción</option>
            {AREA_OPTIONS.map(o => (
              <option key={o} value={o} style={{ background: '#0E0609', color: '#fff' }}>{o}</option>
            ))}
          </select>
        </div>

        {/* Mensaje */}
        <div style={{ gridColumn: '1 / -1' }}>
          <label style={labelStyle}>Mensaje <span style={{ opacity: 0.45, textTransform: 'none', letterSpacing: 0, fontSize: 10, fontWeight: 300 }}>(opcional)</span></label>
          <textarea value={fields.mensaje} onChange={set('mensaje')}
            placeholder="Contanos más sobre lo que buscás: ubicación preferida, fecha de ingreso, necesidades específicas…"
            rows={4}
            onFocus={() => setFocused('mensaje')} onBlur={() => setFocused(null)}
            style={{ ...inputStyle('mensaje'), resize: 'vertical', minHeight: 110 }} />
        </div>
      </div>

      {status === 'error' && (
        <p style={{ fontSize: 12, color: '#e05c5c', marginTop: 12, fontWeight: 300 }}>
          Hubo un error al enviar. Por favor intentá de nuevo o escribinos a mercadeo@momentum.co.cr
        </p>
      )}

      <div style={{ marginTop: 24, display: 'flex', alignItems: 'center', gap: 20, flexWrap: 'wrap' }}>
        <button
          type="submit"
          disabled={status === 'sending'}
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 10,
            background: site.accentColor,
            color: '#fff', border: 'none',
            padding: '13px 32px',
            fontSize: 11, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase',
            borderRadius: 4, cursor: status === 'sending' ? 'not-allowed' : 'pointer',
            fontFamily: 'inherit',
            opacity: status === 'sending' ? 0.7 : 1,
            transition: 'opacity 0.2s, transform 0.2s',
          }}
          onMouseEnter={e => { if (status !== 'sending') e.currentTarget.style.transform = 'translateY(-1px)' }}
          onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)' }}
        >
          {status === 'sending' ? 'Enviando…' : 'Enviar solicitud'}
          {status !== 'sending' && (
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M1 6h10M6.5 1.5L11 6l-4.5 4.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          )}
        </button>
        <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.2)', fontWeight: 300 }}>
          Tu información es confidencial y no se comparte con terceros.
        </span>
      </div>

      <style>{`
        @media (max-width: 600px) {
          .lease-form-grid { grid-template-columns: 1fr !important; }
          .lease-form-grid > div { grid-column: 1 / -1 !important; }
        }
      `}</style>
    </form>
  )
}

export default function AlquilerPage({ site }: { site: SiteConfig }) {
  const data = RENTAL_DATA[site.id]

  return (
    <div style={{ background: 'var(--dk)', minHeight: '100vh', paddingTop: 120 }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 32px 80px' }} className="alquiler-outer">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{ marginBottom: 64 }}
        >
          <div style={{
            fontSize: 9, fontWeight: 600, letterSpacing: '0.22em',
            textTransform: 'uppercase', color: site.accentColor, marginBottom: 16,
          }}>
            Alquiler / Venta
          </div>
          <h1 style={{
            fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 300,
            color: '#fff', letterSpacing: '-0.02em', lineHeight: 1.1, marginBottom: 16,
          }}>
            {data.headline}
          </h1>
          <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.38)', fontWeight: 300, maxWidth: 520 }}>
            Ser parte del ecosistema Momentum es ser parte de una comunidad premium en crecimiento. Contáctanos para más información sobre disponibilidad.
          </p>
        </motion.div>

        {/* Rental blocks */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(320px, 100%), 1fr))', gap: 24, marginBottom: 64 }} className="alquiler-grid">
          {data.blocks.map((block, i) => (
            <motion.div
              key={block.type}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              style={{
                padding: '36px',
                background: 'rgba(255,255,255,0.03)',
                border: '0.5px solid rgba(255,255,255,0.08)',
                borderRadius: 6,
              }}
            >
              <div style={{
                width: 32, height: 2, background: site.accentColor,
                marginBottom: 24, borderRadius: 1,
              }} />
              <div style={{
                fontSize: 9, fontWeight: 600, letterSpacing: '0.18em',
                textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: 10,
              }}>
                {block.type}
              </div>
              <p style={{
                fontSize: 14, color: 'rgba(255,255,255,0.7)',
                fontWeight: 300, lineHeight: 1.65, marginBottom: 28,
              }}>
                {block.detail}
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                <a
                  href={'tel:' + block.phone}
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: 10,
                    fontSize: 13, color: '#fff', fontWeight: 400,
                    textDecoration: 'none', transition: 'opacity 0.2s',
                  }}
                  onMouseEnter={e => e.currentTarget.style.opacity = '0.7'}
                  onMouseLeave={e => e.currentTarget.style.opacity = '1'}
                >
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.5 }}>
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.48 2 2 0 0 1 3.59 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.45a16 16 0 0 0 6.29 6.29l1.41-.89a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
                  </svg>
                  {block.phone}
                </a>
                {block.email && (
                  <a
                    href={'mailto:' + block.email}
                    style={{
                      display: 'inline-flex', alignItems: 'center', gap: 10,
                      fontSize: 12, color: 'rgba(255,255,255,0.45)', fontWeight: 300,
                      textDecoration: 'none', transition: 'color 0.2s',
                    }}
                    onMouseEnter={e => e.currentTarget.style.color = 'rgba(255,255,255,0.8)'}
                    onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.45)'}
                  >
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.5 }}>
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
                    </svg>
                    {block.email}
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Inquiry form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          style={{ marginBottom: 64 }}
        >
          <div style={{
            fontSize: 9, fontWeight: 600, letterSpacing: '0.22em',
            textTransform: 'uppercase', color: site.accentColor, marginBottom: 12,
          }}>
            Solicitá información
          </div>
          <h2 style={{
            fontSize: 'clamp(20px, 3vw, 32px)', fontWeight: 300,
            color: '#fff', letterSpacing: '-0.02em', lineHeight: 1.1, marginBottom: 10,
          }}>
            ¿Buscás un espacio en Momentum?
          </h2>
          <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.32)', fontWeight: 300, maxWidth: 440, lineHeight: 1.7, marginBottom: 36 }}>
            Completá el formulario y nuestro equipo de arrendamiento se pondrá en contacto con vos a la brevedad.
          </p>
          <LeaseInquiryForm site={site} />
        </motion.div>

        <style>{`
          @media (max-width: 640px) {
            .alquiler-outer {
              padding-left: 20px !important;
              padding-right: 20px !important;
            }
          }
        `}</style>

        {/* Bottom note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          style={{
            padding: '32px 0',
            borderTop: '0.5px solid rgba(255,255,255,0.06)',
          }}
        >
          <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.25)', fontWeight: 300, lineHeight: 1.8, maxWidth: 600 }}>
            Momentum ofrece locales, consultorios y oficinas en un ecosistema comercial premium. Nuestros espacios están diseñados para marcas y profesionales que buscan imagen, comunidad y visibilidad de alto nivel.
          </p>
        </motion.div>
      </div>
    </div>
  )
}
