import type { Metadata } from 'next'
import Nav from '@/components/layout/Nav'
import Footer from '@/components/layout/Footer'
import AppBadge from '@/components/ui/AppBadge'
import WhatsAppBadge from '@/components/ui/WhatsAppBadge'
import { pinaresSite } from '@/data/sites/pinares'

export const metadata: Metadata = {
  title: { template: '%s — Momentum Pinares', default: 'Momentum Pinares' },
  description: 'Variedad, dinamismo y todo en un solo lugar en Curridabat, San José, Costa Rica.',
  openGraph: {
    siteName: 'Momentum Pinares',
    title: 'Momentum Pinares',
    description: 'Variedad, dinamismo y todo en un solo lugar en Curridabat, San José, Costa Rica.',
    url: 'https://momentumcr.vercel.app/pinares',
    type: 'website',
    locale: 'es_CR',
    images: [{ url: '/sites/pinares/banners/pinares-hero.webp', width: 1440, height: 810, alt: 'Momentum Pinares' }],
  },
  twitter: { card: 'summary_large_image', title: 'Momentum Pinares', description: 'Variedad, dinamismo y todo en un solo lugar en Curridabat, San José.' },
  metadataBase: new URL('https://momentumcr.vercel.app'),
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ShoppingCenter',
  name: 'Momentum Pinares',
  description: 'Gastronomía, comercios, bienestar, Torre Médica y oficinas en Curridabat, San José, Costa Rica.',
  url: 'https://momentumpinares.com',
  telephone: '+506-7064-0874',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Curridabat, frente al Walmart',
    addressLocality: 'Curridabat',
    addressRegion: 'San José',
    addressCountry: 'CR',
  },
  geo: { '@type': 'GeoCoordinates', latitude: 9.9136, longitude: -84.0503 },
  image: 'https://momentumcr.vercel.app/sites/pinares/banners/pinares-hero.webp',
  sameAs: ['https://www.instagram.com/momentumcostarica'],
}

export default function PinaresLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <style>{`
        :root {
          --a: #4F5B3E;
          --a-light: #647550;
          --dk: #0E1009;
          --brd: #E3E6DF;
        }
      `}</style>
      <Nav site={pinaresSite} basePath="/pinares" />
      <main>{children}</main>
      <Footer site={pinaresSite} basePath="/pinares" />
      <AppBadge />
      <WhatsAppBadge phone={pinaresSite.phone} whatsappPhone={pinaresSite.whatsappPhone} />
    </>
  )
}
