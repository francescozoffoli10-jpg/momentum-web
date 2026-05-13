import type { Metadata } from 'next'
import AppPage from '@/components/pages/AppPage'
import { pinaresSite } from '@/data/sites/pinares'

export const metadata: Metadata = {
  title: 'App Momentum',
  description: 'Descargá la App Momentum. Acceso QR al parqueo, ofertas exclusivas, horarios y más para Momentum Pinares.',
}

export default function Page() {
  return <AppPage site={pinaresSite} basePath="/pinares" />
}
