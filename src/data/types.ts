// ─── Core Types ───────────────────────────────────────────────────────────────

export type SiteId = 'lindora' | 'escazu' | 'pinares'

export type DirectorySection =
  | 'gastronomia'
  | 'comercios'
  | 'servicios'
  | 'ofiplaza'
  | 'mediplaza'
  | 'oficentro'
  | 'torre-medica'
  | 'centro-medico'

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
  logo: string
  accentColor: string
  sections: DirectorySection[]
  hasEvents?: boolean
}

// ─── Site Event ───────────────────────────────────────────────────────────────

export interface SiteEvent {
  id: string
  title: string
  date: string
  time?: string
  location?: string
  description: string
  image?: string
  tags?: string[]
  link?: string
}

// ─── Tenant ───────────────────────────────────────────────────────────────────

export interface TenantHours {
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
  hours?: TenantHours[]
  phone?: string
  whatsapp?: string
  website?: string
  instagram?: string
  menu?: string
  featured?: boolean
  tags?: string[]
}

