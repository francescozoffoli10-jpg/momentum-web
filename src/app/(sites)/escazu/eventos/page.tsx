import type { Metadata } from 'next'
import EventosPage from '@/components/pages/EventosPage'
import { escazuSite } from '@/data/sites/escazu'
import { eventos } from '@/data/sites/escazu/eventos'

export const metadata: Metadata = {
  title: 'Eventos',
  description: 'Eventos, activaciones y experiencias en Momentum Escazú. Bienestar, música, arte y comunidad en San José, Costa Rica.',
}

export default function Page() {
  return <EventosPage site={escazuSite} events={eventos} basePath="/escazu" />
}
