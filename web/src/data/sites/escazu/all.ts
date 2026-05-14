import { gastronomia, regionCards } from './gastronomia'
import { servicios } from './servicios'
import { centroMedico } from './centro-medico'
import { oficentro } from './oficentro'
import type { Tenant, DirectorySection } from '@/data/types'

export { regionCards }

export const allTenants: Tenant[] = [
  ...gastronomia,
  ...servicios,
  ...centroMedico,
  ...oficentro,
]

export const tenantsBySection: Partial<Record<DirectorySection, Tenant[]>> = {
  gastronomia,
  servicios,
  'centro-medico': centroMedico,
  oficentro,
}

export function getTenant(slug: string): Tenant | undefined {
  return allTenants.find((t) => t.slug === slug)
}

export function getTenantsBySection(section: DirectorySection): Tenant[] {
  return tenantsBySection[section] ?? []
}
