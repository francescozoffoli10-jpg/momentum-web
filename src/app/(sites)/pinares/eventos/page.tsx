import type { Metadata } from 'next'
import EventosPage from '@/components/pages/EventosPage'
import { pinaresSite } from '@/data/sites/pinares'
import { eventos } from '@/data/sites/pinares/eventos'

export const metadata: Metadata = {
  title: 'Eventos — Momentum Pinares',
  description: 'Eventos y activaciones en Momentum Pinares. Gastronomía, cultura y comunidad en Curridabat.',
}

export default function Page() {
  return <EventosPage site={pinaresSite} events={eventos} basePath="/pinares" />
}
