import type { Tenant } from '@/data/types'

export const mediplaza: Tenant[] = [
  {
    slug: 'torre-medica',
    name: 'Torre Médica Pinares',
    section: 'mediplaza',
    category: 'Mediplaza · Torre Médica',
    tagline: 'Especialistas médicos en Momentum Pinares',
    description: 'La Torre Médica de Momentum Pinares concentra consultorios de especialistas en un entorno premium y accesible. Medicina de alto nivel en el corazón de Curridabat.',
    logo: 'torre-medica.png',
    photo: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&h=500&fit=crop&auto=format&q=80',
    hours: [{ days: 'Lunes a Viernes', hours: '7:00 am – 6:00 pm' }],
    featured: true,
  },
]
