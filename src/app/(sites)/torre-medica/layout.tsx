import type { Metadata } from 'next'
import TorreMedicaNav from '@/components/torre-medica/TorreMedicaNav'
import TorreMedicaFooter from '@/components/torre-medica/TorreMedicaFooter'

export const metadata: Metadata = {
  title: { template: '%s — Torre Médica Momentum', default: 'Torre Médica Momentum' },
  description: 'Directorio de médicos especialistas en Momentum Pinares, Curridabat. Su mejor opción de salud en el este de San José.',
  openGraph: {
    siteName: 'Torre Médica Momentum',
    title: 'Torre Médica Momentum',
    description: 'Directorio de médicos especialistas en Momentum Pinares, Curridabat.',
    url: 'https://torremedicamomentum.com',
    type: 'website',
    locale: 'es_CR',
    images: [{ url: '/sites/pinares/banners/pinares-hero.webp', width: 1440, height: 810, alt: 'Torre Médica Momentum' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Torre Médica Momentum',
    description: 'Directorio de médicos especialistas en Curridabat, San José.',
  },
  metadataBase: new URL('https://torremedicamomentum.com'),
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'MedicalOrganization',
  name: 'Torre Médica Momentum',
  description: '47 especialidades médicas bajo un mismo techo en Momentum Pinares, Curridabat, San José.',
  url: 'https://torremedicamomentum.com',
  telephone: '+506-4702-0577',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Curridabat, contiguo al CC Momentum Pinares',
    addressLocality: 'Curridabat',
    addressRegion: 'San José',
    addressCountry: 'CR',
  },
  geo: { '@type': 'GeoCoordinates', latitude: 9.9136, longitude: -84.0503 },
  image: 'https://momentumcr.vercel.app/sites/pinares/banners/pinares-hero.webp',
  medicalSpecialty: [
    'Neurocirugía', 'Fisioterapia', 'Radiología', 'Nutrición', 'Laboratorio Clínico',
  ],
  sameAs: ['https://www.instagram.com/momentumcostarica'],
}

export default function TorreMedicaLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <TorreMedicaNav />
      <main>{children}</main>
      <TorreMedicaFooter />
      <style>{`
        @media (max-width: 768px) {
          .tm-inner { padding-left: 20px !important; padding-right: 20px !important; }
          .tm-contact-grid { gap: 32px !important; }
        }
      `}</style>
    </>
  )
}
