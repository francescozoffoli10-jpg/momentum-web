// Sanity schema: SiteEvent
// Maps 1:1 to src/data/types.ts SiteEvent interface

export const siteEvent = {
  name: 'siteEvent',
  title: 'Evento',
  type: 'document',
  fields: [
    {
      name: 'site', title: 'Sede',
      type: 'string',
      options: { list: ['lindora', 'pinares'] },
      validation: (R: any) => R.required(),
    },
    {
      name: 'id', title: 'ID único (slug)',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (R: any) => R.required(),
    },
    {
      name: 'title', title: 'Título del evento',
      type: 'string',
      validation: (R: any) => R.required(),
    },
    {
      name: 'subtitle', title: 'Subtítulo',
      type: 'string',
    },
    {
      name: 'description', title: 'Descripción',
      type: 'text', rows: 3,
      validation: (R: any) => R.required(),
    },
    {
      name: 'date', title: 'Fecha (YYYY-MM-DD)',
      type: 'date',
      validation: (R: any) => R.required(),
    },
    {
      name: 'timeLabel', title: 'Horario (ej: 6:00 pm – 9:00 pm)',
      type: 'string',
    },
    {
      name: 'image', title: 'Imagen del evento',
      type: 'image',
      options: { hotspot: true },
    },
    {
      name: 'tag', title: 'Categoría (ej: Gastronomía, Bienestar)',
      type: 'string',
    },
    {
      name: 'ctaLabel', title: 'Texto del botón CTA',
      type: 'string',
    },
    {
      name: 'ctaUrl', title: 'URL del CTA',
      type: 'url',
    },
    {
      name: 'featured', title: '¿Evento destacado (banner grande)?',
      type: 'boolean',
      initialValue: false,
    },
  ],

  preview: {
    select: {
      title:    'title',
      subtitle: 'date',
      media:    'image',
    },
    prepare({ title, subtitle, media }: any) {
      return { title, subtitle: subtitle ?? 'Sin fecha', media }
    },
  },
}
