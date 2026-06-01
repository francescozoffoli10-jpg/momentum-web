/**
 * Sanity data fetching via HTTP API — no @sanity/client dependency.
 * Uses cache: 'no-store' so each ISR revalidation cycle always gets
 * fresh Sanity data. Page-level `export const revalidate` controls
 * how frequently ISR runs — the recommended pattern for Next.js 15+.
 */

import type { Tenant, SiteEvent, TeatroShow } from '@/data/types'
import {
  TENANTS_BY_SECTION,
  TENANTS_BY_SITE,
  TENANT_BY_SLUG,
  TENANT_SLUGS_BY_SITE,
  EVENTS_BY_SITE,
  TEATRO_SHOWS_ACTIVE,
} from './queries'

const PROJECT_ID  = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? 'klr3qmou'
const DATASET     = process.env.NEXT_PUBLIC_SANITY_DATASET    ?? 'production'
const API_VERSION = '2024-01-01'

const BASE_URL = `https://${PROJECT_ID}.apicdn.sanity.io/v${API_VERSION}/data/query/${DATASET}`

export async function sanityFetch<T = unknown>(query: string): Promise<T | null> {
  const url = `${BASE_URL}?query=${encodeURIComponent(query)}`

  try {
    const res = await fetch(url, {
      cache: 'no-store',
      headers: { 'Accept': 'application/json' },
    })
    if (!res.ok) {
      console.error(`[sanityFetch] HTTP ${res.status} for query: ${query.slice(0, 80)}`)
      return null
    }
    const json = await res.json() as { result: T }
    return json.result
  } catch (err) {
    console.error('[sanityFetch] fetch error:', err)
    return null
  }
}

// ── Tenant helpers ────────────────────────────────────────────────────────────

/**
 * Sanity is considered "not yet set up" only when the fetch itself fails (returns null).
 * An empty array [] is a valid CMS response — it means the section was intentionally cleared.
 */

/** Fetch tenants for a site + section. Returns null ONLY on fetch error (triggers static fallback). */
export async function fetchTenantsBySection(
  siteId: string,
  section: string
): Promise<Tenant[] | null> {
  return sanityFetch<Tenant[]>(TENANTS_BY_SECTION(siteId, section))
}

/** Fetch all tenants for a site across all sections. */
export async function fetchTenantsBySite(siteId: string): Promise<Tenant[] | null> {
  return sanityFetch<Tenant[]>(TENANTS_BY_SITE(siteId))
}

/** Fetch a single tenant by slug. */
export async function fetchTenantBySlug(siteId: string, slug: string): Promise<Tenant | null> {
  return sanityFetch<Tenant>(TENANT_BY_SLUG(siteId, slug))
}

/** Fetch just the slugs (for generateStaticParams). */
export async function fetchTenantSlugs(siteId: string): Promise<string[]> {
  const result = await sanityFetch<{ slug: string }[]>(TENANT_SLUGS_BY_SITE(siteId))
  return result?.map((r) => r.slug) ?? []
}

// ── Event helpers ─────────────────────────────────────────────────────────────

export async function fetchEventsBySite(siteId: string): Promise<SiteEvent[] | null> {
  return sanityFetch<SiteEvent[]>(EVENTS_BY_SITE(siteId))
}

// ── Teatro helpers ────────────────────────────────────────────────────────────

/** Fetch all active teatro shows ordered by 'order' field. Returns [] if none or on error. */
export async function fetchTeatroShows(): Promise<TeatroShow[]> {
  const result = await sanityFetch<TeatroShow[]>(TEATRO_SHOWS_ACTIVE)
  return result ?? []
}
