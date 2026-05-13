// ─── GROQ queries for all data shapes ─────────────────────────────────────────

// All tenants for a given site
export const TENANTS_BY_SITE = (siteId: string) => `
  *[_type == "tenant" && site == "${siteId}"] | order(name asc) {
    slug,
    name,
    section,
    category,
    tagline,
    description,
    "logo": logo.asset->url,
    "photo": photo.asset->url,
    "gallery": gallery[].asset->url,
    hours,
    phone,
    local,
    website,
    facebook,
    instagram,
    whatsapp,
    menuUrl,
    featured,
  }
`

// Single tenant by slug + site
export const TENANT_BY_SLUG = (siteId: string, slug: string) => `
  *[_type == "tenant" && site == "${siteId}" && slug == "${slug}"][0] {
    slug,
    name,
    section,
    category,
    tagline,
    description,
    "logo": logo.asset->url,
    "photo": photo.asset->url,
    "gallery": gallery[].asset->url,
    hours,
    phone,
    local,
    website,
    facebook,
    instagram,
    whatsapp,
    menuUrl,
    featured,
  }
`

// Events for a given site
export const EVENTS_BY_SITE = (siteId: string) => `
  *[_type == "siteEvent" && site == "${siteId}"] | order(date asc) {
    id,
    title,
    subtitle,
    description,
    date,
    timeLabel,
    "image": image.asset->url,
    tag,
    ctaLabel,
    ctaUrl,
    featured,
  }
`
