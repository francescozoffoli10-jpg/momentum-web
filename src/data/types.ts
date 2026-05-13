// ─── Core Types ───────────────────────────────────────────────────────────────

export type SiteId = 'lindora' | 'escazu' | 'pinares'

export type DirectorySection =
  | 'gastronomia'
  | 'comercios'
  | 'servicios'
  | 'ofiplaza'
  | 'mediplaza'
  | 'oficentro'

export interface SiteConfig {
  id: SiteId
  name: string
  subtitle: string
  address: string
  city: string
  phone: string
  email: string
  instagram: string
  facebook: string
  heroImage: string
  logo: string             // path to site logo PNG (white version for dark backgrounds)
  accentColor: string
  sections: DirectorySection[]
}

// ─── Tenant ───────────────────────────────────────────────────────────────────

export interface HoursRow {
  days: string
  hours: string
}

export interface Tenant {
  slug: string
  name: string
  section: DirectorySection
  category: string        // e.g. "Gastronomía · Italiana"
  tagline: string         // short descriptor shown in hero
  description: string     // longer description for detail page
  logo: string            // filename in /public/sites/[siteId]/logos/
  photo?: string          // filename in /public/sites/[siteId]/photos/ — 800×440px landscape
  hours: HoursRow[]
  phone?: string
  local?: string
  website?: string
  facebook?: string
  instagram?: string
  whatsapp?: string
  menuUrl?: string
  featured?: boolean      // show in homepage highlights
}

// ─── Region Card (homepage gastronomy grid) ───────────────────────────────────

export interface RegionCard {
  id: string
  flag: string            // cuisine label e.g. "Italiana"
  title: string           // display title e.g. "La Fabbrica"
  restaurants: string[]   // tenant slugs
  image?: string          // optional background image
  color?: string          // fallback gradient color
}
