import type { Metadata } from 'next'
import EventosPage from '@/components/pages/EventosPage'
import { escazuSite } from '@/data/sites/escazu'
import { eventos as staticEventos } from '@/data/sites/escazu/eventos'
import { fetchEventsBySite } from '@/sanity/lib/fetch'
import type { SiteEvent } from '@/data/types'

export const metadata: Metadata = {
  title: 'Eventos',
  description: 'Eventos, activaciones y experiencias en Momentum Escazú. Bienestar, música, arte y comunidad en San José, Costa Rica.',
}

// Revalidate every hour so new Sanity events appear without a redeploy
export const revalidate = 3600

export default async function Page() {
  // Try Sanity first; fall back to static data if CMS is unreachable
  const sanityEvents = await fetchEventsBySite('escazu')
  const events: SiteEvent[] = (sanityEvents as SiteEvent[] | null) ?? staticEventos

  return <EventosPage site={escazuSite} events={events} basePath="/escazu" />
}
