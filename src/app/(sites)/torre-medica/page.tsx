import type { Metadata } from 'next'
import TorreMedicaHomeContent from '@/components/torre-medica/TorreMedicaHomeContent'

export const metadata: Metadata = {
  title: { absolute: 'Torre Médica Momentum' },
  description: 'Su mejor opción de salud en el este de San José. 47 especialidades médicas bajo un mismo techo en Momentum Pinares, Curridabat.',
}

export default function TorreMedicaHomePage() {
  return <TorreMedicaHomeContent />
}
