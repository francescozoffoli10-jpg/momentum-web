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
    photo: '/sites/escazu/photos/entrecote.webp',
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
    photo: '/sites/escazu/photos/paladixo.webp',
    hours: [{ days: 'Lunes a Sábado', hours: '7:00 am – 7:00 pm' }],
    phone: '7205-5358',
    instagram: 'paladixo',
    featured: false,
  },
  {
]

export const regionCards: RegionCard[] = [
  // Gastronomy
  {
    id: 'restaurante-autor',
    flag: 'Cocina de Autor',
    title: 'Entrecote',
    restaurants: ['entrecote'],
    href: '/escazu/gastronomia',
    color: '#1A1010',
    image: '/sites/escazu/categories/cocina-autor-v2.webp',
  },
  {
    id: 'cafe-restaurante',
    flag: 'Café & Restaurante',
    title: 'Paladixo',
    restaurants: ['paladixo'],
    href: '/escazu/gastronomia',
    color: '#101A10',
    image: '/sites/escazu/categories/cafe-restaurante-v2.webp',
  },
  // Wellness
  {
    id: 'pilates-fitness',
    flag: 'Pilates & Fitness',
    title: 'Contrology · Gyrotonic',
    restaurants: ['contrology-pilates', 'gyrotronic'],
    href: '/escazu/servicios',
    color: '#0A1018',
    image: '/sites/escazu/categories/pilates-fitness-v2.webp',
  },
  {
    id: 'estetica-spa',
    flag: 'Estética & Spa',
    title: 'Ambrosía · Estética Nadira',
    restaurants: ['ambrosia-estetica', 'estetica-nadira'],
    href: '/escazu/servicios',
    color: '#120A18',
    image: '/sites/escazu/categories/estetica-spa-v2.webp',
  },
  // Medical
  {
    id: 'medicina-preventiva',
    flag: 'Medicina Preventiva',
    title: 'GoodMed · Age Metrics',
    restaurants: ['goodmed-escazu', 'age-metrics-medical'],
    href: '/escazu/centro-medico',
    color: '#0A1A12',
    image: '/sites/escazu/categories/medicina-preventiva-v2.webp',
  },
  {
    id: 'especialistas',
    flag: 'Especialistas',
    title: 'Dermatología · Oncología · Reumatología',
    restaurants: ['skin-care-physicians', 'centro-oncologico', 'caira-reumatologia'],
    href: '/escazu/centro-medico',
    color: '#0A1218',
    image: '/sites/escazu/categories/especialistas-v2.webp',
  },
]
