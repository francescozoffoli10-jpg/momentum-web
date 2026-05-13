import type { Tenant, RegionCard } from '@/data/types'

export const gastronomia: Tenant[] = [
  {
    slug: 'entrecote',
    name: 'Entrecote',
    section: 'gastronomia',
    category: 'Gastronomía · Restaurante',
    tagline: 'Restaurante de autor',
    description: 'Restaurante de autor en Momentum Escazú. Cocina de mercado con ingredientes frescos y una carta que combina técnica y sabor en un ambiente sofisticado y acogedor.',
    logo: 'entrecote.png',
    hours: [
      { days: 'Martes a Jueves', hours: '12:00 md – 10:30 pm' },
      { days: 'Viernes y Sábados', hours: '12:00 md – 11:00 pm' },
      { days: 'Domingos', hours: '12:00 md – 10:00 pm' },
    ],
    phone: '4052-3101',
    instagram: 'entrecotecr',
    whatsapp: '50671248795',
    featured: true,
  },
  {
    slug: 'paladixo',
    name: 'Paladixo',
    section: 'gastronomia',
    category: 'Gastronomía · Restaurante',
    tagline: 'Restaurante y café',
    description: 'Restaurante y café en Momentum Escazú con un ambiente tranquilo y una carta variada para disfrutar desde el desayuno hasta la hora del almuerzo.',
    logo: 'paladixo.png',
    hours: [{ days: 'Lunes a Sábado', hours: '7:00 am – 7:00 pm' }],
    phone: '7205-5358',
    instagram: 'paladixo',
    featured: false,
  },
]

export const regionCards: RegionCard[] = [
  {
    id: 'restaurante-autor',
    flag: 'Cocina de Autor',
    title: 'Entrecote',
    restaurants: ['entrecote'],
    color: '#1A1010',
  },
  {
    id: 'cafe-restaurante',
    flag: 'Café & Restaurante',
    title: 'Paladixo',
    restaurants: ['paladixo'],
    color: '#101A10',
  },
]
