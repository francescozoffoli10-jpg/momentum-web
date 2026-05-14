import type { Metadata } from 'next'
import AlquilerPage from '@/components/pages/AlquilerPage'
import { pinaresSite } from '@/data/sites/pinares'

export const metadata: Metadata = {
  title: 'Alquiler / Venta',
  description: 'Alquiler de oficinas y locales comerciales en Momentum Pinares, Curridabat. Oficinas desde 147m².',
}

export default function Page() {
  return <AlquilerPage site={pinaresSite} />
}
