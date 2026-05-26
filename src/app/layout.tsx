import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/next'
import GoogleAnalytics from '@/components/analytics/GoogleAnalytics'
import '@/styles/globals.css'

export const metadata: Metadata = {
  title: { template: '%s | Momentum Costa Rica', default: 'Momentum Costa Rica' },
  description: 'Momentum es un ecosistema de gastronomía, bienestar, comercio y vida premium en Costa Rica. Tres destinos: Lindora, Escazú y Pinares.',
  metadataBase: new URL('https://momentumcr.vercel.app'),
  openGraph: {
    siteName: 'Momentum Costa Rica',
    title: 'Momentum Costa Rica',
    description: 'Gastronomía, bienestar, comercio y vida premium en Costa Rica.',
    url: 'https://momentumcr.vercel.app',
    type: 'website',
    locale: 'es_CR',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Momentum Costa Rica',
    description: 'Gastronomía, bienestar, comercio y vida premium en Costa Rica.',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>
        {children}
        <Analytics />
        <GoogleAnalytics />
      </body>
    </html>
  )
}
