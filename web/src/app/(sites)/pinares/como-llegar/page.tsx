import type { Metadata } from 'next'
import ComoLlegarPage from '@/components/pages/ComoLlegarPage'
import { pinaresSite } from '@/data/sites/pinares'

export const metadata: Metadata = {
  title: 'Cómo Llegar',
  description: 'Encontrá Momentum Pinares en Curridabat, frente al Walmart. Mapa, dirección y contacto.',
}

export default function Page() {
  return <ComoLlegarPage site={pinaresSite} />
}
