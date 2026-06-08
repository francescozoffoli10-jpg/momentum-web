'use client'

import Link from 'next/link'
import Image from 'next/image'

export default function TorreMedicaFooter() {
  const ACCENT = '#1B5E8A'

  return (
    <footer style={{ background: '#070D14', borderTop: '0.5px solid rgba(255,255,255,0.07)', paddingTop: 72, paddingBottom: 40 }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 32px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 48, marginBottom: 56 }}>

          {/* Brand column */}
          <div>
            <Image
              src="/sites/pinares/logos/torre-medica.png"
              alt="Torre Médica Momentum"
              width={150}
              height={48}
              className="object-contain"
              style={{ height: 36, width: 'auto', marginBottom: 20 }}
            />
            <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.45)', lineHeight: 1.7, margin: 0 }}>
              Su mejor opción de salud en el este.<br />
              Centro Comercial Momentum Pinares,<br />
              Curridabat, San José, Costa Rica.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 style={{ fontSize: 10, fontWeight: 600, color: 'rgba(255,255,255,0.35)', letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 20, marginTop: 0 }}>
              Navegación
            </h4>
            {[
              { label: 'Inicio', href: '/torre-medica' },
              { label: 'Directorio Médico', href: '/torre-medica/directorio' },
              { label: 'Especialidades', href: '/torre-medica#especialidades' },
              { label: 'Servicios Médicos', href: '/torre-medica/servicios' },
              { label: 'Alquileres', href: '/torre-medica/alquileres' },
              { label: 'Contacto', href: '/torre-medica/contacto' },
            ].map((link) => (
              <div key={link.href} style={{ marginBottom: 10 }}>
                <Link
                  href={link.href}
                  style={{ fontSize: 13, color: 'rgba(255,255,255,0.55)', textDecoration: 'none', transition: 'color 0.2s' }}
                  onMouseEnter={e => e.currentTarget.style.color = '#fff'}
                  onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.55)'}
                >
                  {link.label}
                </Link>
              </div>
            ))}
          </div>

          {/* Contact */}
          <div>
            <h4 style={{ fontSize: 10, fontWeight: 600, color: 'rgba(255,255,255,0.35)', letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 20, marginTop: 0 }}>
              Contacto
            </h4>
            <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.55)', lineHeight: 1.9 }}>
              <div>
                <a href="tel:+50647020577" style={{ color: 'rgba(255,255,255,0.55)', textDecoration: 'none' }}>
                  Call Center: 4702-0577
                </a>
              </div>
              <div style={{ marginTop: 8 }}>
                <span style={{ color: 'rgba(255,255,255,0.35)', fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                  Horario
                </span>
              </div>
              <div>Lunes – Viernes: 8am – 8pm</div>
              <div>Sábados: 8am – 4pm</div>
              <div>Domingos: Cerrado</div>
            </div>
          </div>

          {/* Huli directory CTA */}
          <div>
            <h4 style={{ fontSize: 10, fontWeight: 600, color: 'rgba(255,255,255,0.35)', letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 20, marginTop: 0 }}>
              Directorio
            </h4>
            <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.45)', lineHeight: 1.7, marginBottom: 16, marginTop: 0 }}>
              Encuentre y agende cita con su médico especialista en línea.
            </p>
            <a
              href="https://directorio.torremedicamomentum.com"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                background: ACCENT, color: '#fff',
                fontSize: 12, fontWeight: 600, letterSpacing: '0.05em',
                padding: '10px 18px', borderRadius: 4,
                textDecoration: 'none', transition: 'opacity 0.2s',
              }}
              onMouseEnter={e => e.currentTarget.style.opacity = '0.85'}
              onMouseLeave={e => e.currentTarget.style.opacity = '1'}
            >
              Ver Directorio
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M2.5 9.5l7-7M5 2.5h4.5V7" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
          </div>
        </div>

        {/* Legal links */}
        <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap', marginBottom: 20 }}>
          {[
            { label: 'Política de Privacidad', href: '/privacidad' },
            { label: 'Términos y Condiciones', href: '/terminos' },
            { label: 'Política de Cookies', href: '/cookies' },
          ].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', textDecoration: 'none', letterSpacing: '0.02em', transition: 'color 0.2s' }}
              onMouseEnter={e => e.currentTarget.style.color = 'rgba(255,255,255,0.65)'}
              onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.3)'}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Bottom bar */}
        <div style={{ borderTop: '0.5px solid rgba(255,255,255,0.07)', paddingTop: 24, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
          <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.25)', margin: 0 }}>
            © {new Date().getFullYear()} Torre Médica Momentum · Todos los derechos reservados
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <a
              href="https://www.facebook.com/TorreMedicaMomentum"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: 'rgba(255,255,255,0.3)', textDecoration: 'none', fontSize: 12, transition: 'color 0.2s' }}
              onMouseEnter={e => e.currentTarget.style.color = '#fff'}
              onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.3)'}
            >
              Facebook
            </a>
            <Link
              href="/pinares"
              style={{ color: 'rgba(255,255,255,0.3)', textDecoration: 'none', fontSize: 12, transition: 'color 0.2s' }}
              onMouseEnter={e => e.currentTarget.style.color = '#fff'}
              onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.3)'}
            >
              Momentum Pinares →
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
