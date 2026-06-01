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
  whatsappPhone?: string
  email: string
  instagram: string
  facebook: string
  heroImage: string
  logo: string
  accentColor: string
  sections: DirectorySection[]
  hasEvents?: boolean
}

// ─── Site Event ───────────────────────────────────────────────────────────────

export interface SiteEvent {
  id: string
  title: string
  subtitle?: string
  description: string
  date: string
  timeLabel?: string
  image?: string
  tag?: string
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
  category: string
  tagline: string
  description: string
  logo: string
  photo?: string
  videoUrl?: string
  gallery?: string[]
  hours: HoursRow[]
  phone?: string
  local?: string
  website?: string
  facebook?: string
  instagram?: string
  whatsapp?: string
  menuUrl?: string
  featured?: boolean
}

// ─── Region Card ──────────────────────────────────────────────────────────────

export interface RegionCard {
  id: string
  flag: string
  title: string
  restaurants: string[]
  href?: string
  image?: string
  color?: string
}

// ─── Teatro Show ──────────────────────────────────────────────────────────────

export interface TeatroShowDate {
  date: string
  time: string
}

export interface TeatroShow {
  _id: string
  title: string
  subtitle?: string
  description?: string
  genre?: string
  duration?: string
  dates?: TeatroShowDate[]
  image?: string
  ticketUrl?: string
  featured?: boolean
}

// ─── Teatro Config (singleton) ────────────────────────────────────────────────

export interface TeatroStat {
  num: string
  label: string
  sub: string
}

export interface TeatroSpec {
  value: string
  label: string
  symbol: string
}

export interface TeatroConfig {
  heroImage?: string
  heroTagline?: string
  identityTitle?: string
  identityParagraph1?: string
  identityParagraph2?: string
  identityImage?: string
  stats?: TeatroStat[]
  specs?: TeatroSpec[]
  bistroDescription?: string
  bistroImage?: string
  bistroHours?: HoursRow[]
  phoneTeatro?: string
  phoneBistro?: string
  whatsapp?: string
  instagram?: string
  instagramBistro?: string
  website?: string
  boleteria?: string
  boleteriaHours?: string
}
