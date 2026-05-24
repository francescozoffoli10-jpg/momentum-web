import type { Metadata } from 'next'
import EventosPage from '@/components/pages/EventosPage'
import { pinaresSite } from '@/data/sites/pinares'
import { eventos as staticEventos } from '@/data/sites/pinares/eventos'
import { fetchEventsBySite } from '@/sanity/lib/fetch'
import type { SiteEvent } from '@/data/types'

export const metadata: Metadata = {
  title: 'Eventos',
  description: 'Eventos y activaciones en Momentum Pinares. Gastronomía, cultura y comunidad en Curridabat.',
}

// Revalidate every hour so new Sanity events appear without a redeploy
export const revalidate = 3600

export default async function Page() {
  // Try Sanity first; fall back to static data if CMS is unreachable
  const sanityEvents = await fetchEventsBySite('pinares')
  const events: SiteEvent[] = (sanityEvents as SiteEvent[] | null) ?? staticEventos

  return <EventosPage site={pinaresSite} events={events} basePath="/pinares" />
}
