import type { Metadata } from 'next'
import EventosPage from '@/components/pages/EventosPage'
import { pinaresSite } from '@/data/sites/pinares'

export const metadata: Metadata = {
  title: 'Eventos',
  description: 'Eventos y activaciones en Momentum Pinares. Gastronomía, cultura y comunidad en Curridabat.',
}

export default function Page() {
  return <EventosPage site={pinaresSite} basePath="/pinares" />
}
