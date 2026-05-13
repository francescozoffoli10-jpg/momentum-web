import type { Metadata } from 'next'
import EventosPage from '@/components/pages/EventosPage'
import { lindoraSite } from '@/data/sites/lindora'

export const metadata: Metadata = {
  title: 'Eventos',
  description: 'Eventos y activaciones en Momentum Lindora. Gastronomía, cultura y comunidad en Lindora, Santa Ana.',
}

export default function Page() {
  return <EventosPage site={lindoraSite} basePath="/lindora" />
}
