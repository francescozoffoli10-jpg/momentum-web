import type { Metadata } from 'next'
import ContactoPage from '@/components/pages/ContactoPage'
import { lindoraSite } from '@/data/sites/lindora'

export const metadata: Metadata = {
  title: 'Contacto',
  description: 'Contactá a Momentum Lindora. Teléfono, correo y redes sociales.',
}

export default function Page() {
  return <ContactoPage site={lindoraSite} />
}
