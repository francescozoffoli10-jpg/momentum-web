import type { SiteEvent } from '@/data/types'

export const eventos: SiteEvent[] = [
  {
    id: 'mercado-artesanal-jun-2026',
    title: 'Mercado Artesanal',
    subtitle: 'Edición Junio',
    description: 'Emprendedores locales, diseño independiente y productos únicos de Costa Rica. Encuentra moda, accesorios, arte y gastronomía artesanal en el corazón de Momentum Pinares.',
    date: '2026-06-20',
    timeLabel: '10:00 am – 7:00 pm',
    tag: 'Comunidad',
    ctaLabel: 'Más información',
    ctaUrl: 'https://instagram.com/momentumpinares',
    featured: true,
  },
  {
    id: 'concierto-acustico-jul-2026',
    title: 'Concierto Acústico',
    subtitle: 'Música en Vivo',
    description: 'Talento costarricense en vivo en el espacio central de Momentum Pinares. Una noche de música, gastronomía y comunidad bajo las estrellas.',
    date: '2026-07-12',
    timeLabel: '5:00 pm – 9:00 pm',
    tag: 'Música & Arte',
    ctaLabel: 'Seguir novedades',
    ctaUrl: 'https://instagram.com/momentumpinares',
    featured: false,
  },
]
