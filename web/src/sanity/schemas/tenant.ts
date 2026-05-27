// Sanity schema: Tenant
// Maps 1:1 to src/data/types.ts Tenant interface

const hoursRow = {
  name: 'hoursRow',
  title: 'Horario',
  type: 'object',
  fields: [
    { name: 'days',  title: 'Días',    type: 'string', validation: (R: any) => R.required() },
    { name: 'hours', title: 'Horario', type: 'string', validation: (R: any) => R.required() },
  ],
  preview: { select: { title: 'days', subtitle: 'hours' } },
}

export const tenant = {
  name: 'tenant',
  title: 'Tenant / Local',
  type: 'document',
  groups: [
    { name: 'identity',  title: 'Identidad',  default: true },
    { name: 'contact',   title: 'Contacto'   },
    { name: 'media',     title: 'Media'      },
    { name: 'hours',     title: 'Horarios'   },
  ],
  fields: [
    // ── Identity ──────────────────────────────────────────────────────────────
    {
      name: 'site', title: 'Sede',
      type: 'string',
      group: 'identity',
      options: {
        list: [
          { title: 'Lindora', value: 'lindora' },
          { title: 'Escazú',  value: 'escazu'  },
          { title: 'Pinares', value: 'pinares' },
        ],
      },
      validation: (R: any) => R.required(),
    },
    {
      name: 'slug', title: 'Slug (URL)',
      type: 'slug',
      group: 'identity',
      options: { source: 'name', maxLength: 96 },
      validation: (R: any) => R.required(),
    },
    {
      name: 'name', title: 'Nombre del local',
      type: 'string',
      group: 'identity',
      validation: (R: any) => R.required(),
    },
    {
      name: 'section', title: 'Sección',
      type: 'string',
      group: 'identity',
      options: {
        list: [
          { title: 'Gastronomía',  value: 'gastronomia' },
          { title: 'Comercios',    value: 'comercios'   },
          { title: 'Servicios',    value: 'servicios'   },
          { title: 'Mediplaza',     value: 'mediplaza'    },
          { title: 'Ofiplaza',      value: 'ofiplaza'     },
          { title: 'Oficentro',     value: 'oficentro'    },
          { title: 'Centro Médico', value: 'centro-medico'},
          { title: 'Torre Médica',  value: 'torre-medica' },
        ],
      },
      validation: (R: any) => R.required(),
    },
    {
      name: 'category', title: 'Categoría (ej: Gastronomía · Italiana)',
      type: 'string',
      group: 'identity',
      validation: (R: any) => R.required(),
    },
    {
      name: 'tagline', title: 'Tagline corto',
      type: 'string',
      group: 'identity',
      description: 'Aparece en las tarjetas del directorio.',
    },
    {
      name: 'description', title: 'Descripción',
      type: 'text', rows: 3,
      group: 'identity',
      description: 'Aparece en la página de detalle del local.',
    },
    {
      name: 'featured', title: '¿Destacado en homepage?',
      type: 'boolean',
      group: 'identity',
      initialValue: false,
    },
    {
      name: 'local', title: 'Número de local',
      type: 'string',
      group: 'identity',
    },

    // ── Media ─────────────────────────────────────────────────────────────────
    {
      name: 'logo', title: 'Logo (subir PNG, fondo oscuro)',
      type: 'image',
      group: 'media',
      options: { hotspot: false },
      description: 'Subí el logo del local. Si no se sube, se usa logoUrl.',
    },
    {
      name: 'logoUrl', title: 'Logo URL (ruta alternativa)',
      type: 'string',
      group: 'media',
      description: 'Ruta de imagen si no se usa el campo Logo (ej: /sites/lindora/logos/entrecote.png). Usada automáticamente durante migración.',
      hidden: ({ document }: any) => !!document?.logo,
    },
    {
      name: 'photo', title: 'Foto banner principal (16:9)',
      type: 'image',
      group: 'media',
      options: { hotspot: true },
      description: 'Foto de portada del local. Si no se sube, se usa photoUrl.',
    },
    {
      name: 'photoUrl', title: 'Foto URL (ruta alternativa)',
      type: 'string',
      group: 'media',
      description: 'URL de foto si no se usa el campo Foto. Puede ser ruta local o URL externa.',
      hidden: ({ document }: any) => !!document?.photo,
    },
    {
      name: 'gallery', title: 'Galería adicional',
      type: 'array',
      group: 'media',
      of: [{ type: 'image', options: { hotspot: true } }],
    },

    // ── Hours ─────────────────────────────────────────────────────────────────
    {
      name: 'hours', title: 'Horarios',
      type: 'array',
      group: 'hours',
      of: [{ type: 'hoursRow' }],
    },

    // ── Contact ───────────────────────────────────────────────────────────────
    {
      name: 'phone',     title: 'Teléfono',   type: 'string', group: 'contact',
    },
    {
      name: 'whatsapp',  title: 'WhatsApp (número sin +, ej: 50688881234)',
      type: 'string', group: 'contact',
    },
    {
      name: 'website',   title: 'Sitio web (URL completa)', type: 'url', group: 'contact',
    },
    {
      name: 'menuUrl',   title: 'URL del menú', type: 'url', group: 'contact',
    },
    {
      name: 'instagram', title: 'Instagram (solo el @)', type: 'string', group: 'contact',
    },
    {
      name: 'facebook',  title: 'Facebook (usuario)', type: 'string', group: 'contact',
    },
  ],

  preview: {
    select: {
      title:    'name',
      subtitle: 'site',
      media:    'logo',
    },
    prepare({ title, subtitle, media }: any) {
      return { title, subtitle: `${subtitle}`, media }
    },
  },
}

export const schemas = [hoursRow, tenant]
