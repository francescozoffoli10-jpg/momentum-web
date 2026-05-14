import type { Metadata } from 'next'
import ContactoPage from '@/components/pages/ContactoPage'
import { pinaresSite } from '@/data/sites/pinares'

export const metadata: Metadata = {
  title: 'Contacto',
  description: 'Contactá a Momentum Pinares. Teléfono, correo y redes sociales.',
}

export default function Page() {
  return <ContactoPage site={pinaresSite} />
}
