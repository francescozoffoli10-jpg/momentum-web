// ─── Core Types ───────────────────────────────────────────────────────────────

export type SiteId = 'lindora' | 'escazu' | 'pinares'

export type DirectorySection =
  | 'gastronomia'
  | 'comercios'
  | 'servicios'
  | 'ofiplaza'
  | 'mediplaza'
  | 'oficentro'
  | 'centro-medico'
  | 'torre-medica'
  | 'teatro'

export interface SiteConfig {
  id: SiteId
  name: string
  subtitle: string
  address: string
  city: string
  phone: string
  whatsappPhone?: string    // dedicated WhatsApp number (if different from phone)
  email: string
  instagram: string
  facebook: string
  heroImage: string
  logo: string             // path to site logo PNG (white version for dark backgrounds)
  accentColor: string
  sections: DirectorySection[]
  hasEvents?: boolean      // show Eventos tab in nav (default: true)
}

// ─── Site Event ───────────────────────────────────────────────────────────────

export interface SiteEvent {
  id: string
  title: string
  subtitle?: string
  description: string
  date: string             // ISO date string e.g. "2026-06-14"
  timeLabel?: string       // e.g. "6:00 pm – 9:00 pm"
  image?: string           // filename in /public/sites/[siteId]/events/ or full path
  tag?: string             // e.g. "Gastronomía", "Bienestar", "Música"
  ctaLabel?: string
  ctaUrl?: string
  featured?: boolean
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
  videoUrl?: string       // Sanity CDN URL for short MP4 loop (hero section)
  gallery?: string[]      // additional filenames in /public/sites/[siteId]/photos/ for lightbox
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
  flag: string            // cuisine label e.g. "Italiana" or "Pilates & Fitness"
  title: string           // display title e.g. "La Fabbrica"
  restaurants: string[]   // tenant slugs (used for count)
  href?: string           // override link; defaults to {basePath}/gastronomia
  image?: string          // optional background image
  color?: string          // fallback gradient color
}
