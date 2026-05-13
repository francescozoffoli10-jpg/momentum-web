import type { Metadata } from 'next'
import EventosPage from '@/components/pages/EventosPage'
import { lindoraSite } from '@/data/sites/lindora'
import { eventos } from '@/data/sites/lindora/eventos'

export const metadata: Metadata = {
  title: 'Eventos — Momentum Lindora',
  description: 'Eventos y activaciones en Momentum Lindora. Gastronomía, cultura, bienestar y comunidad en Santa Ana.',
}

export default function Page() {
  return <EventosPage site={lindoraSite} events={eventos} basePath="/lindora" />
}
