import type { Metadata } from 'next'
import AppPage from '@/components/pages/AppPage'
import { lindoraSite } from '@/data/sites/lindora'

export const metadata: Metadata = {
  title: 'App Momentum',
  description: 'Descargá la App Momentum. Acceso QR al parqueo, ofertas exclusivas, horarios y más para Momentum Lindora.',
}

export default function Page() {
  return <AppPage site={lindoraSite} basePath="/lindora" />
}
