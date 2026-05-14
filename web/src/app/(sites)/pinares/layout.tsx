import type { Metadata } from 'next'
import Nav from '@/components/layout/Nav'
import Footer from '@/components/layout/Footer'
import AppBadge from '@/components/ui/AppBadge'
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

export default function PinaresLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
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
    </>
  )
}
