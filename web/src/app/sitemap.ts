import type { MetadataRoute } from 'next'
import { allTenants as lindoraTenants } from '@/data/sites/lindora/all'
import { allTenants as escazuTenants } from '@/data/sites/escazu/all'
import { allTenants as pinaresTenants } from '@/data/sites/pinares/all'
import { lindoraSite } from '@/data/sites/lindora'
import { escazuSite } from '@/data/sites/escazu'
import { pinaresSite } from '@/data/sites/pinares'

const BASE = 'https://momentumcr.vercel.app'

const UTILITY_PAGES = ['eventos', 'app', 'como-llegar', 'alquiler', 'contacto'] as const

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE, lastModified: now, changeFrequency: 'weekly', priority: 1 },
    { url: `${BASE}/lindora`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE}/escazu`,  lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE}/pinares`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    // Lindora sections
    ...lindoraSite.sections.map(s => ({
      url: `${BASE}/lindora/${s}`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    })),
    // Escazú sections
    ...escazuSite.sections.map(s => ({
      url: `${BASE}/escazu/${s}`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    })),
    // Pinares sections
    ...pinaresSite.sections.map(s => ({
      url: `${BASE}/pinares/${s}`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    })),
    // Utility pages for each site
    ...(['lindora', 'escazu', 'pinares'] as const).flatMap(site =>
      UTILITY_PAGES
        .map(p => ({
          url: `${BASE}/${site}/${p}`,
          lastModified: now,
          changeFrequency: 'monthly' as const,
          priority: 0.55,
        }))
    ),
  ]

  const tenantRoutes: MetadataRoute.Sitemap = [
    ...lindoraTenants.map(t => ({
      url: `${BASE}/lindora/${t.slug}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    })),
    ...escazuTenants.map(t => ({
      url: `${BASE}/escazu/${t.slug}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    })),
    ...pinaresTenants.map(t => ({
      url: `${BASE}/pinares/${t.slug}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    })),
  ]

  return [...staticRoutes, ...tenantRoutes]
}
