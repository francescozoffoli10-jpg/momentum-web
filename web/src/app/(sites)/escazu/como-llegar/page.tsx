import type { Metadata } from 'next'
import ComoLlegarPage from '@/components/pages/ComoLlegarPage'
import { escazuSite } from '@/data/sites/escazu'

export const metadata: Metadata = {
  title: 'Cómo Llegar',
  description: 'Encontrá Momentum Escazú en San José, Costa Rica. Mapa, dirección y contacto.',
}

export default function Page() {
  return <ComoLlegarPage site={escazuSite} />
}
