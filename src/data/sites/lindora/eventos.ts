import type { SiteEvent } from '@/data/types'

export const eventos: SiteEvent[] = [
  {
    id: 'feria-gastronomica-jun-2026',
    title: 'Feria Gastronómica',
    subtitle: 'Edición Verano',
    description: 'Una tarde de sabores que reúne a todos los restaurantes de Momentum Lindora en un solo espacio. Degustaciones, música en vivo y el mejor ambiente al aire libre.',
    date: '2026-06-14',
    timeLabel: '12:00 md – 8:00 pm',
    tag: 'Gastronomía',
    ctaLabel: 'Más información',
    ctaUrl: 'https://instagram.com/momentumlindora',
    featured: true,
  },
  {
    id: 'noche-de-vinos-jun-2026',
    title: 'Noche de Vinos',
    subtitle: 'Cata con Sommelier',
    description: 'Una velada especial con cata guiada de vinos nacionales e internacionales. El sommelier de Vinum Store presenta las mejores etiquetas de la temporada. Cupos limitados.',
    date: '2026-06-28',
    timeLabel: '6:00 pm – 9:00 pm',
    tag: 'Experiencia',
    ctaLabel: 'Reservar lugar',
    ctaUrl: 'https://instagram.com/vinumcr',
    featured: false,
  },
]
