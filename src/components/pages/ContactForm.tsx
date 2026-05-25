'use client'

import { useState } from 'react'
import type { SiteConfig } from '@/data/types'

const FORMSPREE_ID = process.env.NEXT_PUBLIC_FORMSPREE_ID ?? ''

const TIPO_OPTIONS = [
  'Información general',
  'Arrendamiento / alquiler',
  'Evento o activación',
  'Consulta médica',
  'App Momentum',
  'Reclamo o sugerencia',
  'Otro',
]

const MOMENTUM_OPTIONS = [
  'Momentum Lindora',
  'Momentum Escazú',
  'Momentum Pinares',
  'General (todos los destinos)',
]

interface ContactFormProps {
  site: SiteConfig
  defaultMomentum?: string
}

export default function ContactForm({ site, defaultMomentum }: ContactFormProps) {
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')
  const [fields, setFields] = useState({
    nombre: '',
    correo: '',
    telefono: '',
    momentum: defaultMomentum ?? site.name,
    comercio: '',
    tipo: '',
    mensaje: '',
  })

  const inputStyle = (focused: boolean): React.CSSProperties => ({
    width: '100%',
    background: focused ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.03)',
    border: `0.5px solid ${focused ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.08)'}`,
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

  const [focused, setFocused] = useState<string | null>(null)

  const set = (k: keyof typeof fields) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setFields(f => ({ ...f, [k]: e.target.value }))

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!FORMSPREE_ID) {
      // Fallback: open mailto if no Formspree configured
      const body = Object.entries(fields).map(([k, v]) => `${k}: ${v}`).join('\n')
      window.open(`mailto:mercadeo@momentum.co.cr?subject=Consulta desde ${site.name}&body=${encodeURIComponent(body)}`)
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
          _subject: `Consulta desde ${site.name} — ${fields.tipo || 'General'}`,
          fecha: new Date().toLocaleDateString('es-CR', { day: '2-digit', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
        }),
      })
      if (res.ok) {
        setStatus('success')
        setFields({ nombre: '', correo: '', telefono: '', momentum: defaultMomentum ?? site.name, comercio: '', tipo: '', mensaje: '' })
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
          Mensaje enviado
        </h3>
        <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.38)', fontWeight: 300, lineHeight: 1.65, marginBottom: 28 }}>
          Recibimos tu consulta. El equipo de {site.name} se pondrá en contacto con vos a la brevedad.
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
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }} className="form-grid">

        {/* Nombre */}
        <div style={{ gridColumn: '1 / -1' }}>
          <label style={labelStyle}>Nombre completo *</label>
          <input
            type="text" required value={fields.nombre} onChange={set('nombre')}
            placeholder="Ej. María Rodríguez"
            onFocus={() => setFocused('nombre')} onBlur={() => setFocused(null)}
            style={inputStyle(focused === 'nombre')}
          />
        </div>

        {/* Correo */}
        <div>
          <label style={labelStyle}>Correo electrónico *</label>
          <input
            type="email" required value={fields.correo} onChange={set('correo')}
            placeholder="correo@ejemplo.com"
            onFocus={() => setFocused('correo')} onBlur={() => setFocused(null)}
            style={inputStyle(focused === 'correo')}
          />
        </div>

        {/* Teléfono */}
        <div>
          <label style={labelStyle}>Teléfono móvil *</label>
          <input
            type="tel" required value={fields.telefono} onChange={set('telefono')}
            placeholder="+506 8888-0000"
            onFocus={() => setFocused('telefono')} onBlur={() => setFocused(null)}
            style={inputStyle(focused === 'telefono')}
          />
        </div>

        {/* Momentum */}
        <div>
          <label style={labelStyle}>Momentum *</label>
          <select
            required value={fields.momentum} onChange={set('momentum')}
            onFocus={() => setFocused('momentum')} onBlur={() => setFocused(null)}
            style={{ ...inputStyle(focused === 'momentum'), appearance: 'none' as const }}
          >
            {MOMENTUM_OPTIONS.map(o => (
              <option key={o} value={o} style={{ background: '#0E0609', color: '#fff' }}>{o}</option>
            ))}
          </select>
        </div>

        {/* Tipo de consulta */}
        <div>
          <label style={labelStyle}>Tipo de consulta *</label>
          <select
            required value={fields.tipo} onChange={set('tipo')}
            onFocus={() => setFocused('tipo')} onBlur={() => setFocused(null)}
            style={{ ...inputStyle(focused === 'tipo'), appearance: 'none' as const }}
          >
            <option value="" style={{ background: '#0E0609', color: 'rgba(255,255,255,0.4)' }}>Seleccioná una opción</option>
            {TIPO_OPTIONS.map(o => (
              <option key={o} value={o} style={{ background: '#0E0609', color: '#fff' }}>{o}</option>
            ))}
          </select>
        </div>

        {/* Comercio */}
        <div style={{ gridColumn: '1 / -1' }}>
          <label style={labelStyle}>Comercio relacionado <span style={{ opacity: 0.45, textTransform: 'none', letterSpacing: 0, fontSize: 10, fontWeight: 300 }}>(opcional)</span></label>
          <input
            type="text" value={fields.comercio} onChange={set('comercio')}
            placeholder="Ej. La Fabbrica, Matsuri, GoodMed…"
            onFocus={() => setFocused('comercio')} onBlur={() => setFocused(null)}
            style={inputStyle(focused === 'comercio')}
          />
        </div>

        {/* Mensaje */}
        <div style={{ gridColumn: '1 / -1' }}>
          <label style={labelStyle}>Mensaje *</label>
          <textarea
            required value={fields.mensaje} onChange={set('mensaje')}
            placeholder="Describí tu consulta con el mayor detalle posible…"
            rows={5}
            onFocus={() => setFocused('mensaje')} onBlur={() => setFocused(null)}
            style={{ ...inputStyle(focused === 'mensaje'), resize: 'vertical', minHeight: 120 }}
          />
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
            color: '#fff',
            border: 'none',
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
          {status === 'sending' ? 'Enviando…' : 'Enviar consulta'}
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
          .form-grid { grid-template-columns: 1fr !important; }
          .form-grid > div { grid-column: 1 / -1 !important; }
        }
      `}</style>
    </form>
  )
}
