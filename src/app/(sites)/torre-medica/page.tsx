'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { specialties, specialtyCategories } from '@/data/sites/torre-medica/specialties'
import { medicalServices } from '@/data/sites/torre-medica/services'

const ACCENT = '#1B5E8A'
const ACCENT_LIGHT = '#2272AE'

// ── Hero ──────────────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section style={{
      position: 'relative', minHeight: '100vh',
      display: 'flex', alignItems: 'center',
      background: '#070D14', overflow: 'hidden',
    }}>
      {/* Background image with overlay */}
      <div style={{ position: 'absolute', inset: 0 }}>
        <Image
          src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=1600&h=900&fit=crop&auto=format&q=80"
          alt="Torre Médica Momentum"
          fill
          className="object-cover"
          style={{ opacity: 0.18 }}
          priority
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(7,13,20,0.95) 40%, rgba(27,94,138,0.2) 100%)' }} />
      </div>

      {/* Geometric accent line */}
      <div style={{
        position: 'absolute', top: 0, left: 0, bottom: 0, width: 3,
        background: `linear-gradient(to bottom, transparent, ${ACCENT}, transparent)`,
      }} />

      <div style={{ position: 'relative', maxWidth: 1280, margin: '0 auto', padding: '120px 32px 80px' }}>
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 24 }}
        >
          <div style={{ width: 24, height: '1px', background: ACCENT }} />
          <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.16em', textTransform: 'uppercase', color: ACCENT_LIGHT }}>
            Curridabat · San José
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.1 }}
          style={{
            fontSize: 'clamp(36px, 6vw, 76px)', fontWeight: 200,
            color: '#fff', letterSpacing: '-0.03em', lineHeight: 1.05,
            margin: '0 0 16px', maxWidth: 700,
          }}
        >
          Torre Médica<br />
          <span style={{ fontWeight: 600, color: '#fff' }}>Momentum</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25 }}
          style={{
            fontSize: 'clamp(16px, 2vw, 20px)', color: 'rgba(255,255,255,0.6)',
            fontWeight: 300, lineHeight: 1.5, margin: '0 0 48px', maxWidth: 480,
          }}
        >
          Su mejor opción de salud en el este.<br />
          47 especialidades médicas bajo un mismo techo.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}
        >
          <a
            href="https://directorio.torremedicamomentum.com"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 10,
              background: ACCENT, color: '#fff',
              fontSize: 13, fontWeight: 600, letterSpacing: '0.06em',
              padding: '14px 28px', borderRadius: 4,
              textDecoration: 'none', transition: 'opacity 0.2s',
            }}
            onMouseEnter={e => e.currentTarget.style.opacity = '0.85'}
            onMouseLeave={e => e.currentTarget.style.opacity = '1'}
          >
            Ver Directorio Médico
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M3 7h8M8 4l3 3-3 3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
          <a
            href="tel:+50647020577"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 10,
              background: 'rgba(255,255,255,0.08)', color: '#fff',
              border: '0.5px solid rgba(255,255,255,0.2)',
              fontSize: 13, fontWeight: 500, letterSpacing: '0.06em',
              padding: '14px 28px', borderRadius: 4,
              textDecoration: 'none', transition: 'background 0.2s',
            }}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.14)'}
            onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.08)'}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.44a2 2 0 0 1 1.99-2.18h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.91a16 16 0 0 0 6.18 6.18l1.76-1.76a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
            </svg>
            4702-0577
          </a>
        </motion.div>

        {/* Stats strip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          style={{
            display: 'flex', gap: 48, marginTop: 80,
            borderTop: '0.5px solid rgba(255,255,255,0.1)', paddingTop: 32,
            flexWrap: 'wrap',
          }}
        >
          {[
            { value: '47', label: 'Especialidades Médicas' },
            { value: '7', label: 'Servicios Institucionales' },
            { value: 'L–V', label: '8am – 8pm' },
            { value: 'Sáb', label: '8am – 4pm' },
          ].map((stat) => (
            <div key={stat.label}>
              <div style={{ fontSize: 28, fontWeight: 600, color: '#fff', letterSpacing: '-0.02em' }}>{stat.value}</div>
              <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', letterSpacing: '0.08em', textTransform: 'uppercase', marginTop: 4 }}>{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

// ── Specialties ───────────────────────────────────────────────────────────────
function SpecialtiesSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const grouped = specialtyCategories.map((cat) => ({
    category: cat,
    items: specialties.filter((s) => s.category === cat),
  }))

  return (
    <section id="especialidades" style={{ background: '#fff', padding: '100px 0' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 32px' }}>
        <div ref={ref} style={{ marginBottom: 64 }}>
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}
          >
            <div style={{ width: 20, height: '0.5px', background: ACCENT }} />
            <span style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: ACCENT }}>
              Especialidades Médicas
            </span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.1 }}
            style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 300, color: '#0A1018', letterSpacing: '-0.02em', lineHeight: 1.1, margin: 0, maxWidth: 560 }}
          >
            47 especialidades médicas a su disposición
          </motion.h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 32 }}>
          {grouped.map((group, gi) => (
            <motion.div
              key={group.category}
              initial={{ opacity: 0, y: 32 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: gi * 0.06 }}
            >
              <div style={{
                fontSize: 9, fontWeight: 600, letterSpacing: '0.16em', textTransform: 'uppercase',
                color: ACCENT, marginBottom: 16, paddingBottom: 10,
                borderBottom: `1.5px solid ${ACCENT}22`,
              }}>
                {group.category}
              </div>
              <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
                {group.items.map((spec) => (
                  <li
                    key={spec.name}
                    style={{
                      fontSize: 13.5, color: '#2A3540', padding: '7px 0',
                      borderBottom: '0.5px solid #F0F3F5',
                      display: 'flex', alignItems: 'center', gap: 10,
                    }}
                  >
                    <div style={{ width: 4, height: 4, borderRadius: '50%', background: ACCENT, flexShrink: 0, opacity: 0.6 }} />
                    {spec.name}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Directory CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          style={{
            marginTop: 64, textAlign: 'center',
            padding: 48, background: '#F4F8FB', borderRadius: 8,
            border: '0.5px solid #DDE8F0',
          }}
        >
          <div style={{ fontSize: 11, fontWeight: 600, color: ACCENT, letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 16 }}>
            Directorio Médico
          </div>
          <h3 style={{ fontSize: 'clamp(22px, 3vw, 32px)', fontWeight: 300, color: '#0A1018', letterSpacing: '-0.02em', margin: '0 0 12px' }}>
            Encuentre al especialista que necesita
          </h3>
          <p style={{ fontSize: 14, color: '#5A6B78', marginBottom: 28, maxWidth: 420, margin: '0 auto 28px' }}>
            Consulte nuestro directorio completo de médicos, agende su cita en línea y acceda a los perfiles de cada especialista.
          </p>
          <a
            href="https://directorio.torremedicamomentum.com"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 10,
              background: ACCENT, color: '#fff',
              fontSize: 13, fontWeight: 600, letterSpacing: '0.06em',
              padding: '13px 28px', borderRadius: 4,
              textDecoration: 'none', transition: 'opacity 0.2s',
            }}
            onMouseEnter={e => e.currentTarget.style.opacity = '0.85'}
            onMouseLeave={e => e.currentTarget.style.opacity = '1'}
          >
            Consultar Directorio Médico
            <svg width="13" height="13" viewBox="0 0 12 12" fill="none">
              <path d="M2.5 9.5l7-7M5 2.5h4.5V7" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  )
}

// ── Services ──────────────────────────────────────────────────────────────────
function ServicesSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section style={{ background: '#070D14', padding: '100px 0' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 32px' }}>
        <div ref={ref} style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 56, flexWrap: 'wrap', gap: 16 }}>
          <div>
            <motion.div
              initial={{ opacity: 0, x: -16 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
              style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}
            >
              <div style={{ width: 20, height: '0.5px', background: ACCENT }} />
              <span style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: ACCENT_LIGHT }}>
                Servicios Médicos
              </span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.65, delay: 0.1 }}
              style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 300, color: '#fff', letterSpacing: '-0.02em', lineHeight: 1.1, margin: 0 }}
            >
              Servicios institucionales
            </motion.h2>
          </div>
          <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.3 }}>
            <Link
              href="/torre-medica/servicios"
              style={{ fontSize: 11, color: 'rgba(255,255,255,0.45)', letterSpacing: '0.1em', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: 6, textDecoration: 'none', transition: 'color 0.2s' }}
              onMouseEnter={e => e.currentTarget.style.color = '#fff'}
              onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.45)'}
            >
              Ver todos
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3 7h8M8 4l3 3-3 3" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </Link>
          </motion.div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: 20 }}>
          {medicalServices.map((service, i) => (
            <motion.div
              key={service.slug}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.65, delay: i * 0.08 }}
            >
              <a
                href={service.huliUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'block', background: 'rgba(255,255,255,0.04)',
                  border: '0.5px solid rgba(255,255,255,0.09)',
                  borderRadius: 6, overflow: 'hidden',
                  textDecoration: 'none', transition: 'border-color 0.3s, background 0.3s',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = `${ACCENT}66`
                  e.currentTarget.style.background = 'rgba(27,94,138,0.1)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.09)'
                  e.currentTarget.style.background = 'rgba(255,255,255,0.04)'
                }}
              >
                {/* Image */}
                <div style={{ height: 180, position: 'relative', overflow: 'hidden' }}>
                  <Image
                    src={service.photo!}
                    alt={service.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover"
                    style={{ opacity: 0.6 }}
                  />
                  <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(to bottom, transparent 30%, rgba(7,13,20,0.85) 100%)` }} />
                  <div style={{
                    position: 'absolute', bottom: 12, left: 14,
                    fontSize: 9, fontWeight: 600, color: ACCENT_LIGHT,
                    letterSpacing: '0.14em', textTransform: 'uppercase',
                  }}>
                    {service.category}
                  </div>
                </div>

                {/* Content */}
                <div style={{ padding: '20px 22px 24px' }}>
                  <h3 style={{ fontSize: 16, fontWeight: 500, color: '#fff', margin: '0 0 6px', letterSpacing: '-0.01em' }}>
                    {service.name}
                  </h3>
                  <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', lineHeight: 1.6, margin: '0 0 16px' }}>
                    {service.tagline}
                  </p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, color: ACCENT_LIGHT, letterSpacing: '0.08em', textTransform: 'uppercase', fontWeight: 600 }}>
                    Agendar cita
                    <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
                      <path d="M2.5 9.5l7-7M5 2.5h4.5V7" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── Contact strip ─────────────────────────────────────────────────────────────
function ContactStrip() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section style={{ background: ACCENT, padding: '72px 0' }}>
      <div ref={ref} style={{ maxWidth: 1280, margin: '0 auto', padding: '0 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 32 }}>
        <motion.div initial={{ opacity: 0, x: -20 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.6 }}>
          <div style={{ fontSize: 11, fontWeight: 600, color: 'rgba(255,255,255,0.65)', letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 8 }}>
            Ubicación
          </div>
          <h3 style={{ fontSize: 22, fontWeight: 300, color: '#fff', margin: '0 0 4px', letterSpacing: '-0.01em' }}>
            C.C. Momentum Pinares, Curridabat
          </h3>
          <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)', margin: 0 }}>
            San José, Costa Rica · L–V: 8am–8pm · Sáb: 8am–4pm
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15 }}
          style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}
        >
          <a
            href="tel:+50647020577"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 9,
              background: 'rgba(255,255,255,0.15)', color: '#fff',
              border: '0.5px solid rgba(255,255,255,0.3)',
              fontSize: 13, fontWeight: 600, letterSpacing: '0.05em',
              padding: '12px 24px', borderRadius: 4,
              textDecoration: 'none', transition: 'background 0.2s',
            }}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.25)'}
            onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.15)'}
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.44a2 2 0 0 1 1.99-2.18h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.91a16 16 0 0 0 6.18 6.18l1.76-1.76a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
            </svg>
            4702-0577
          </a>
          <Link
            href="/torre-medica/contacto"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 9,
              background: '#fff', color: ACCENT,
              fontSize: 13, fontWeight: 600, letterSpacing: '0.05em',
              padding: '12px 24px', borderRadius: 4,
              textDecoration: 'none', transition: 'opacity 0.2s',
            }}
            onMouseEnter={e => e.currentTarget.style.opacity = '0.88'}
            onMouseLeave={e => e.currentTarget.style.opacity = '1'}
          >
            Contáctenos
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function TorreMedicaHomePage() {
  return (
    <>
      <Hero />
      <SpecialtiesSection />
      <ServicesSection />
      <ContactStrip />
    </>
  )
}
