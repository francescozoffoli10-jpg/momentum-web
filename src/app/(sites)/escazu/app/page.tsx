import type { Metadata } from 'next'
import AppPage from '@/components/pages/AppPage'
import { escazuSite } from '@/data/sites/escazu'

export const metadata: Metadata = {
  title: 'App Momentum',
  description: 'Descargá la App Momentum. Acceso QR al parqueo, ofertas exclusivas, horarios y más para Momentum Escazú.',
}

export default function Page() {
  return <AppPage site={escazuSite} basePath="/escazu" />
}
