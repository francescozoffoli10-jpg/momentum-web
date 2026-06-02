// ─── GROQ queries for all data shapes ─────────────────────────────────────────

// Shared projection for tenant fields
const TENANT_FIELDS = `
  "slug": slug.current,
  name,
  section,
  category,
  tagline,
  description,
  "logo": coalesce(logo.asset->url, logoUrl),
  "photo": coalesce(photo.asset->url, photoUrl),
  "videoUrl": videoFile.asset->url,
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
`

// All tenants for a given site (all sections)
export const TENANTS_BY_SITE = (siteId: string) => `
  *[_type == "tenant" && site == "${siteId}" && !(_id in path("drafts.**"))] | order(name asc) {
    ${TENANT_FIELDS}
  }
`

// Tenants for a specific site + section
export const TENANTS_BY_SECTION = (siteId: string, section: string) => `
  *[_type == "tenant" && site == "${siteId}" && section == "${section}" && !(_id in path("drafts.**"))] | order(name asc) {
    ${TENANT_FIELDS}
  }
`

// Single tenant by slug + site
export const TENANT_BY_SLUG = (siteId: string, slug: string) => `
  *[_type == "tenant" && site == "${siteId}" && slug.current == "${slug}" && !(_id in path("drafts.**"))][0] {
    ${TENANT_FIELDS}
  }
`

// All tenant slugs for a site (used in generateStaticParams)
export const TENANT_SLUGS_BY_SITE = (siteId: string) => `
  *[_type == "tenant" && site == "${siteId}" && !(_id in path("drafts.**"))] { "slug": slug.current }
`

// Events for a given site
export const EVENTS_BY_SITE = (siteId: string) => `
  *[_type == "siteEvent" && site == "${siteId}" && !(_id in path("drafts.**"))] | order(date asc) {
    "id": id.current,
    title,
    subtitle,
    description,
    date,
    timeLabel,
    "image": coalesce(image.asset->url, imageUrl),
    tag,
    ctaLabel,
    ctaUrl,
    featured,
  }
`

// Active teatro shows ordered by the 'order' field
export const TEATRO_SHOWS_ACTIVE = `
  *[_type == "teatroShow" && isActive == true && !(_id in path("drafts.**"))] | order(order asc) {
    _id,
    title,
    subtitle,
    description,
    genre,
    duration,
    dates,
    "image": coalesce(image.asset->url, imageUrl),
    ticketUrl,
    featured,
  }
`
// Teatro config singleton (documentId: "teatro-config")
export const TEATRO_CONFIG = `
  *[_type == "teatroConfig" && _id == "teatro-config"][0] {
    "heroImage": coalesce(heroImage.asset->url, heroImageUrl),
    heroTagline,
    identityTitle,
    identityParagraph1,
    identityParagraph2,
    "identityImage": coalesce(identityImage.asset->url, identityImageUrl),
    stats,
    specs,
    bistroDescription,
    "bistroImage": coalesce(bistroImage.asset->url, bistroImageUrl),
    "videoUrl": videoFile.asset->url,
    bistroHours,
    phoneTeatro,
    phoneBistro,
    whatsapp,
    instagram,
    instagramBistro,
    website,
    boleteria,
    boleteriaHours,
  }
`
