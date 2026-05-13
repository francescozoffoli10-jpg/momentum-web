import type { Metadata } from 'next'
import Nav from '@/components/layout/Nav'
import Footer from '@/components/layout/Footer'
import AppBadge from '@/components/ui/AppBadge'
import { escazuSite } from '@/data/sites/escazu'

export const metadata: Metadata = {
  title: { template: '%s — Momentum Escazú', default: 'Momentum Escazú' },
  description: 'Calma, bienestar y experiencia premium en Escazú, San José, Costa Rica.',
  openGraph: {
    siteName: 'Momentum Escazú',
    title: 'Momentum Escazú',
    description: 'Calma, bienestar y experiencia premium en Escazú, San José, Costa Rica.',
    url: 'https://momentum-preview-coral.vercel.app/escazu',
    type: 'website',
    locale: 'es_CR',
    images: [{ url: '/sites/escazu/banners/escazu-hero.png', width: 1440, height: 810, alt: 'Momentum Escazú' }],
  },
  twitter: { card: 'summary_large_image', title: 'Momentum Escazú', description: 'Calma, bienestar y experiencia premium en Escazú, San José.' },
  metadataBase: new URL('https://momentum-preview-coral.vercel.app'),
}

export default function EscazuLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
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
    </>
  )
}
