import type { Tenant } from '@/data/types'

export const servicios: Tenant[] = [
  {
    slug: 'surgical-center',
    name: 'Surgical Center',
    section: 'servicios',
    category: 'Servicios · Centro Quirúrgico',
    tagline: 'Excelencia quirúrgica en Pinares',
    description: 'Centro quirúrgico especializado en cirugías ambulatorias y procedimientos de alta complejidad. Infraestructura de primer nivel y un equipo médico comprometido con tu recuperación.',
    logo: 'surgical-center.png',
    photo: '/sites/pinares/photos/surgical-center.webp',
    hours: [{ days: 'Lunes a Viernes', hours: '7:00 am – 5:00 pm' }],
    featured: false,
  },
  {
    slug: 'larisa-paez',
    name: 'Larisa Páez Wellness Center',
    section: 'servicios',
    category: 'Servicios · Bienestar & Nutrición',
    tagline: 'Wellness Center',
    description: 'Centro de bienestar integral dirigido por Larisa Páez. Nutrición, hábitos saludables y programas personalizados de wellness para mejorar tu calidad de vida desde adentro hacia afuera.',
    logo: 'larisa-paez.png',
    photo: '/sites/pinares/photos/larisa-paez.webp',
    hours: [{ days: 'Lunes a Viernes', hours: '8:00 am – 5:00 pm' }],
    instagram: 'larisapaezwellness',
    featured: false,
  },
]
