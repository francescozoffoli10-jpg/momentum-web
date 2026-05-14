import type { Metadata } from 'next'
import ContactoPage from '@/components/pages/ContactoPage'
import { escazuSite } from '@/data/sites/escazu'

export const metadata: Metadata = {
  title: 'Contacto',
  description: 'Contactá a Momentum Escazú. Teléfono, correo y redes sociales.',
}

export default function Page() {
  return <ContactoPage site={escazuSite} />
}
