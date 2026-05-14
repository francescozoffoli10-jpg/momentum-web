import type { Metadata } from 'next'
import EventosPage from '@/components/pages/EventosPage'
import { lindoraSite } from '@/data/sites/lindora'
import { eventos as staticEventos } from '@/data/sites/lindora/eventos'
import { fetchEventsBySite } from '@/sanity/lib/fetch'
import type { SiteEvent } from '@/data/types'

export const metadata: Metadata = {
  title: 'Eventos — Momentum Lindora',
  description: 'Eventos y activaciones en Momentum Lindora. Gastronomía, cultura, bienestar y comunidad en Santa Ana.',
}

// Revalidate every hour so new Sanity events appear without a redeploy
export const revalidate = 3600

export default async function Page() {
  // Try Sanity first; fall back to static data if CMS is unreachable
  const sanityEvents = await fetchEventsBySite('lindora')
  const events: SiteEvent[] = (sanityEvents as SiteEvent[] | null) ?? staticEventos

  return <EventosPage site={lindoraSite} events={events} basePath="/lindora" />
}
