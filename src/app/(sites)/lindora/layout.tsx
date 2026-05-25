import type { Metadata } from 'next'
import Nav from '@/components/layout/Nav'
import Footer from '@/components/layout/Footer'
import AppBadge from '@/components/ui/AppBadge'
import WhatsAppBadge from '@/components/ui/WhatsAppBadge'
import { lindoraSite } from '@/data/sites/lindora'

export const metadata: Metadata = {
  title: { template: '%s — Momentum Lindora', default: 'Momentum Lindora' },
  description: 'Gastronomía, comercios, servicios médicos y oficinas premium en Lindora, Santa Ana, Costa Rica.',
  openGraph: {
    siteName: 'Momentum Lindora',
    title: 'Momentum Lindora',
    description: 'Gastronomía, comercios, servicios médicos y oficinas premium en Lindora, Santa Ana, Costa Rica.',
    url: 'https://momentumcr.vercel.app/lindora',
    type: 'website',
    locale: 'es_CR',
    images: [{ url: '/sites/lindora/banners/lindora-hero.webp', width: 1440, height: 810, alt: 'Momentum Lindora' }],
  },
  twitter: { card: 'summary_large_image', title: 'Momentum Lindora', description: 'Gastronomía, comercios, servicios médicos y oficinas premium en Lindora, Santa Ana.' },
  metadataBase: new URL('https://momentumcr.vercel.app'),
}

export default function LindoraLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Nav site={lindoraSite} basePath="/lindora" />
      <main>{children}</main>
      <Footer site={lindoraSite} basePath="/lindora" />
      <AppBadge />
      <WhatsAppBadge phone={lindoraSite.phone} whatsappPhone={lindoraSite.whatsappPhone} />
    </>
  )
}
