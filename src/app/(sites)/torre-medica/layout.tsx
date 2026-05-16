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
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Torre Médica Momentum',
    description: 'Directorio de médicos especialistas en Curridabat, San José.',
  },
  metadataBase: new URL('https://torremedicamomentum.com'),
}

export default function TorreMedicaLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
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
