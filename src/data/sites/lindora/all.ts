import { gastronomia, regionCards } from './gastronomia'
import { comercios } from './comercios'
import { servicios } from './servicios'
import { ofiplaza } from './ofiplaza'
import { mediplaza } from './mediplaza'
import type { Tenant, DirectorySection } from '@/data/types'

export { regionCards }

export const allTenants: Tenant[] = [
  ...gastronomia,
  ...comercios,
  ...servicios,
  ...ofiplaza,
  ...mediplaza,
]

export const tenantsBySection: Partial<Record<DirectorySection, Tenant[]>> = {
  gastronomia,
  comercios,
  servicios,
  ofiplaza,
  mediplaza,
}

export function getTenant(slug: string): Tenant | undefined {
  return allTenants.find((t) => t.slug === slug)
}

export function getTenantsBySection(section: DirectorySection): Tenant[] {
  return tenantsBySection[section] ?? []
}
