import { defineField, defineType } from 'sanity'

export const teatroShow = defineType({
  name: 'teatroShow',
  title: 'Teatro — Funciones',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Título de la obra',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtítulo',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Sinopsis',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'genre',
      title: 'Género',
      type: 'string',
      options: {
        list: [
          { title: 'Drama',    value: 'Drama' },
          { title: 'Comedia',  value: 'Comedia' },
          { title: 'Musical',  value: 'Musical' },
          { title: 'Infantil', value: 'Infantil' },
          { title: 'Thriller', value: 'Thriller' },
          { title: 'Danza',    value: 'Danza' },
          { title: 'Dramedy',  value: 'Dramedy' },
        ],
      },
    }),
    defineField({
      name: 'duration',
      title: 'Duración (ej: 1h 45min)',
      type: 'string',
    }),
    defineField({
      name: 'dates',
      title: 'Funciones — fechas y horas',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'date', title: 'Fecha', type: 'date' }),
            defineField({ name: 'time', title: 'Hora (ej: 8:00 pm)', type: 'string' }),
          ],
          preview: {
            select: { date: 'date', time: 'time' },
            prepare: ({ date, time }: { date?: string; time?: string }) => ({
              title: `${date ?? '—'} · ${time ?? '—'}`,
            }),
          },
        },
      ],
    }),
    defineField({
      name: 'image',
      title: 'Afiche / Imagen',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'imageUrl',
      title: 'URL de imagen (alternativa)',
      type: 'url',
    }),
    defineField({
      name: 'ticketUrl',
      title: 'Enlace de boletería',
      type: 'url',
      initialValue: 'https://boleteria.espressivo.cr',
    }),
    defineField({
      name: 'isActive',
      title: '¿Activa en cartelera?',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'featured',
      title: '¿Destacada?',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'order',
      title: 'Orden de aparición (menor = primero)',
      type: 'number',
      initialValue: 0,
    }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'genre', media: 'image' },
  },
  orderings: [
    { name: 'orderAsc', title: 'Por orden', by: [{ field: 'order', direction: 'asc' }] },
  ],
})
