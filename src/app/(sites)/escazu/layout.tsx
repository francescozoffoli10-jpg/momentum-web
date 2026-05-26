import type { Metadata } from 'next'
import Nav from '@/components/layout/Nav'
import Footer from '@/components/layout/Footer'
import AppBadge from '@/components/ui/AppBadge'
import WhatsAppBadge from '@/components/ui/WhatsAppBadge'
import { escazuSite } from '@/data/sites/escazu'

export const metadata: Metadata = {
  title: { template: '%s — Momentum Escazú', default: 'Momentum Escazú' },
  description: 'Calma, bienestar y experiencia premium en Escazú, San José, Costa Rica.',
  openGraph: {
    siteName: 'Momentum Escazú',
    title: 'Momentum Escazú',
    description: 'Calma, bienestar y experiencia premium en Escazú, San José, Costa Rica.',
    url: 'https://momentumcr.vercel.app/escazu',
    type: 'website',
    locale: 'es_CR',
    images: [{ url: '/sites/escazu/banners/escazu-hero.webp', width: 1440, height: 810, alt: 'Momentum Escazú' }],
  },
  twitter: { card: 'summary_large_image', title: 'Momentum Escazú', description: 'Calma, bienestar y experiencia premium en Escazú, San José.' },
  metadataBase: new URL('https://momentumcr.vercel.app'),
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ShoppingCenter',
  name: 'Momentum Escazú',
  description: 'Calma, bienestar y experiencia premium en Escazú, San José, Costa Rica.',
  url: 'https://momentumescazu.com',
  telephone: '+506-2289-0000',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Escazú',
    addressLocality: 'Escazú',
    addressRegion: 'San José',
    addressCountry: 'CR',
  },
  geo: { '@type': 'GeoCoordinates', latitude: 9.9278, longitude: -84.1366 },
  image: 'https://momentumcr.vercel.app/sites/escazu/banners/escazu-hero.webp',
  sameAs: ['https://www.instagram.com/momentumcostarica', 'https://www.facebook.com/momentumescazu'],
}

export default function EscazuLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <style>{`
        :root {
          --a: #56717A;
          --a-light: #6B8A94;
          --dk: #0E1416;
          --brd: #E4E8E9;
        }
      `}</style>
      <Nav site={escazuSite} basePath="/escazu" />
      <main>{children}</main>
      <Footer site={escazuSite} basePath="/escazu" />
      <AppBadge />
      <WhatsAppBadge phone={escazuSite.phone} whatsappPhone={escazuSite.whatsappPhone} />
    </>
  )
}
