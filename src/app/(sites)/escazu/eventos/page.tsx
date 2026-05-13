import type { Metadata } from 'next'
import EventosPage from '@/components/pages/EventosPage'
import { escazuSite } from '@/data/sites/escazu'

export const metadata: Metadata = {
  title: 'Eventos',
  description: 'Eventos y activaciones en Momentum Escazú. Gastronomía, cultura y comunidad en Escazú.',
}

export default function Page() {
  return <EventosPage site={escazuSite} basePath="/escazu" />
}
