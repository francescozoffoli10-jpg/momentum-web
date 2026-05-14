import type { Metadata } from 'next'
import AlquilerPage from '@/components/pages/AlquilerPage'
import { escazuSite } from '@/data/sites/escazu'

export const metadata: Metadata = {
  title: 'Alquiler / Venta',
  description: 'Alquiler de oficinas y locales en Momentum Escazú. Oficinas desde 40m².',
}

export default function Page() {
  return <AlquilerPage site={escazuSite} />
}
