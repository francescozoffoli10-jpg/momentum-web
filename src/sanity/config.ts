// @ts-nocheck
import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './schemas'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? 'REPLACE_ME'
const dataset   = process.env.NEXT_PUBLIC_SANITY_DATASET   ?? 'production'

export default defineConfig({
  name:    'momentum-studio',
  title:   'Momentum CMS',
  basePath: '/studio',

  projectId,
  dataset,

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Momentum')
          .items([
            S.listItem().title('🍽 Lindora — Tenants')
              .child(
                S.documentList()
                  .title('Tenants Lindora')
                  .filter('_type == "tenant" && site == "lindora"')
              ),
            S.listItem().title('🌿 Pinares — Tenants')
              .child(
                S.documentList()
                  .title('Tenants Pinares')
                  .filter('_type == "tenant" && site == "pinares"')
              ),
            S.listItem().title('🏙 Escazú — Tenants')
              .child(
                S.documentList()
                  .title('Tenants Escazú')
                  .filter('_type == "tenant" && site == "escazu"')
              ),
            S.divider(),
            S.listItem().title('📅 Eventos — Lindora')
              .child(
                S.documentList()
                  .title('Eventos Lindora')
                  .filter('_type == "siteEvent" && site == "lindora"')
              ),
            S.listItem().title('📅 Eventos — Escazú')
              .child(
                S.documentList()
                  .title('Eventos Escazú')
                  .filter('_type == "siteEvent" && site == "escazu"')
              ),
            S.listItem().title('📅 Eventos — Pinares')
              .child(
                S.documentList()
                  .title('Eventos Pinares')
                  .filter('_type == "siteEvent" && site == "pinares"')
              ),
          ]),
    }),
    visionTool(),
  ],

  schema: { types: schemaTypes },
})
