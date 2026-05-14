import type { Metadata } from 'next'
import ComoLlegarPage from '@/components/pages/ComoLlegarPage'
import { lindoraSite } from '@/data/sites/lindora'

export const metadata: Metadata = {
  title: 'Cómo Llegar',
  description: 'Encontrá Momentum Lindora en Santa Ana, frente al Automercado de Lindora. Mapa, dirección y contacto.',
}

export default function Page() {
  return <ComoLlegarPage site={lindoraSite} />
}
