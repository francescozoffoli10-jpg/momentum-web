import { defineField, defineType } from 'sanity'

export const teatroConfig = defineType({
  name: 'teatroConfig',
  title: 'Teatro Espressivo — Configuración',
  type: 'document',
  fields: [
    // ── HERO ──────────────────────────────────────────────────────────────
    defineField({
      name: 'heroImage',
      title: 'Hero — Imagen de fondo',
      type: 'image',
      options: { hotspot: true },
      description: 'Imagen principal del hero a pantalla completa',
    }),
    defineField({
      name: 'heroImageUrl',
      title: 'Hero — URL de imagen (alternativa)',
      type: 'url',
      description: 'Si no subís una imagen arriba, usá una URL externa',
    }),
    defineField({
      name: 'heroTagline',
      title: 'Hero — Tagline',
      type: 'string',
      initialValue: 'Nuestra misión es tu deleite.',
    }),

    // ── IDENTIDAD ─────────────────────────────────────────────────────────
    defineField({
      name: 'identityTitle',
      title: 'Identidad — Título',
      type: 'string',
      initialValue: 'Un tesoro cultural en el este de la ciudad.',
    }),
    defineField({
      name: 'identityParagraph1',
      title: 'Identidad — Párrafo 1',
      type: 'text',
      rows: 4,
      initialValue: 'Desde 2002, Teatro Espressivo ha sido el escenario de más de 120 producciones teatrales originales, consolidándose como uno de los espacios culturales más reconocidos de Costa Rica.',
    }),
    defineField({
      name: 'identityParagraph2',
      title: 'Identidad — Párrafo 2',
      type: 'text',
      rows: 4,
      initialValue: 'Ubicado dentro de Momentum Pinares en Curridabat, combina arte de escena, cultura y gastronomía en una experiencia irrepetible.',
    }),
    defineField({
      name: 'identityImage',
      title: 'Identidad — Imagen lateral (retrato)',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'identityImageUrl',
      title: 'Identidad — URL imagen lateral',
      type: 'url',
      initialValue: 'https://espressivo.cr/media/img_obra.jpg',
    }),

    // ── ESTADÍSTICAS ──────────────────────────────────────────────────────
    defineField({
      name: 'stats',
      title: 'Estadísticas (3 columnas)',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          defineField({ name: 'num',   title: 'Número (ej: 20+)',   type: 'string' }),
          defineField({ name: 'label', title: 'Etiqueta',            type: 'string' }),
          defineField({ name: 'sub',   title: 'Subtexto (pequeño)', type: 'string' }),
        ],
        preview: { select: { title: 'num', subtitle: 'label' } },
      }],
    }),

    // ── ESPECIFICACIONES ──────────────────────────────────────────────────
    defineField({
      name: 'specs',
      title: 'Especificaciones del escenario (4 columnas)',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          defineField({ name: 'value',  title: 'Valor (ej: 250+)',  type: 'string' }),
          defineField({ name: 'label',  title: 'Etiqueta',          type: 'string' }),
          defineField({ name: 'symbol', title: 'Símbolo decorativo', type: 'string' }),
        ],
        preview: { select: { title: 'value', subtitle: 'label' } },
      }],
    }),

    // ── BISTRÓ ────────────────────────────────────────────────────────────
    defineField({
      name: 'bistroDescription',
      title: 'Bistró — Descripción',
      type: 'text',
      rows: 4,
      initialValue: 'El Espressivo Bistró es el complemento perfecto para tu experiencia en el teatro. Desayunos, almuerzos y cenas preparados con ingredientes frescos, en un ambiente cálido y culturalmente inspirado.',
    }),
    defineField({
      name: 'bistroImage',
      title: 'Bistró — Imagen',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'bistroImageUrl',
      title: 'Bistró — URL imagen',
      type: 'url',
      initialValue: 'https://espressivo.cr/media/thumbnail.jpg',
    }),
    defineField({
      name: 'bistroHours',
      title: 'Bistró — Horarios',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          defineField({ name: 'days',  title: 'Días',    type: 'string' }),
          defineField({ name: 'hours', title: 'Horario', type: 'string' }),
        ],
        preview: { select: { title: 'days', subtitle: 'hours' } },
      }],
    }),

    // ── CONTACTO ──────────────────────────────────────────────────────────
    defineField({
      name: 'phoneTeatro',
      title: 'Contacto — Teléfono Teatro',
      type: 'string',
      initialValue: '2267-1818',
    }),
    defineField({
      name: 'phoneBistro',
      title: 'Contacto — Teléfono Bistró',
      type: 'string',
      initialValue: '2267-1825',
    }),
    defineField({
      name: 'whatsapp',
      title: 'Contacto — WhatsApp (número completo)',
      type: 'string',
      initialValue: '+506 6360-9158',
    }),
    defineField({
      name: 'instagram',
      title: 'Redes — Instagram Teatro (sin @)',
      type: 'string',
      initialValue: 'espressivocr',
    }),
    defineField({
      name: 'instagramBistro',
      title: 'Redes — Instagram Bistró (sin @)',
      type: 'string',
      initialValue: 'espressivobistrocr',
    }),
    defineField({
      name: 'website',
      title: 'Redes — Sitio web',
      type: 'url',
      initialValue: 'https://espressivo.cr',
    }),
    defineField({
      name: 'boleteria',
      title: 'Boletería — URL',
      type: 'url',
      initialValue: 'https://boleteria.espressivo.cr',
    }),
    defineField({
      name: 'boleteriaHours',
      title: 'Boletería — Horario de atención',
      type: 'string',
      initialValue: 'Dom – Jue 9 am – 6 pm · Vie – Sáb 9 am – 8 pm',
    }),
  ],
  preview: {
    prepare: () => ({ title: 'Teatro Espressivo — Configuración' }),
  },
})
