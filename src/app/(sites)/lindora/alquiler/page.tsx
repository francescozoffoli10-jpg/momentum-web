import type { Metadata } from 'next'
import AlquilerPage from '@/components/pages/AlquilerPage'
import { lindoraSite } from '@/data/sites/lindora'

export const metadata: Metadata = {
  title: 'Alquiler / Venta',
  description: 'Alquiler de locales y consultorios médicos en Momentum Lindora, Santa Ana. Consultorios desde 65m².',
}

export default function Page() {
  return <AlquilerPage site={lindoraSite} />
}
