import type { Tenant } from '@/data/types'

// Costa Rica is UTC-6, no DST
export function isOpenNow(tenant: Tenant): boolean | null {
  if (!tenant.hours?.length) return null

  const now = new Date(Date.now() - 6 * 60 * 60 * 1000) // rough UTC-6
  const day = now.getUTCDay()   // 0=Sun … 6=Sat
  const currentMins = now.getUTCHours() * 60 + now.getUTCMinutes()

  const DAYS: Record<string, number[]> = {
    lun: [1], mar: [2], 'mié': [3], mie: [3], jue: [4], vie: [5], 'sáb': [6], sab: [6], dom: [0],
    'lun – vie': [1,2,3,4,5], 'lun – sáb': [1,2,3,4,5,6], 'lun – dom': [0,1,2,3,4,5,6],
    'lun - vie': [1,2,3,4,5], 'lun - sáb': [1,2,3,4,5,6], 'lun - dom': [0,1,2,3,4,5,6],
  }

  const parseTime = (t: string): number => {
    const lower = t.toLowerCase().replace(/\s/g, '')
    const pm = lower.includes('p.m.') || lower.includes('pm')
    const am = lower.includes('a.m.') || lower.includes('am')
    const clean = lower.replace(/a\.m\.|p\.m\.|am|pm/g, '').replace(':', '.')
    const parts = clean.split('.')
    let h = parseInt(parts[0] ?? '0', 10)
    const m = parseInt(parts[1] ?? '0', 10)
    if (pm && h !== 12) h += 12
    if (am && h === 12) h = 0
    return h * 60 + m
  }

  for (const row of tenant.hours) {
    const dayKey = row.days.toLowerCase().trim()
    const matchedDays = DAYS[dayKey] ?? null
    if (!matchedDays) continue
    if (!matchedDays.includes(day)) continue

    const hoursStr = row.hours.toLowerCase()
    if (hoursStr.includes('24 hora') || hoursStr.includes('abierto')) return true

    const rangeParts = hoursStr.split(/–|-|a/)
    if (rangeParts.length < 2) continue

    try {
      const open = parseTime(rangeParts[0])
      const close = parseTime(rangeParts[rangeParts.length - 1])
      if (open < close) {
        if (currentMins >= open && currentMins < close) return true
      } else {
        if (currentMins >= open || currentMins < close) return true
      }
    } catch {
      // ignore parse errors
    }
  }
  return false
}
