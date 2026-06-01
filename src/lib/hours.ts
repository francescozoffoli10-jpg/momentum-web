import type { Tenant } from '@/data/types'

// Costa Rica is UTC-6, no DST
function getNowCR(): { day: number; mins: number } {
  const now = new Date(Date.now() - 6 * 60 * 60 * 1000)
  return {
    day: now.getUTCDay(),  // 0=Sun … 6=Sat
    mins: now.getUTCHours() * 60 + now.getUTCMinutes(),
  }
}

function stripAccents(s: string): string {
  return s.normalize('NFD').replace(/[̀-ͯ]/g, '')
}

/** Map a single day name/abbreviation to 0–6 (0=Sun, 1=Mon…6=Sat) */
function parseDayToken(token: string): number | null {
  const s = stripAccents(token.toLowerCase().trim()).replace(/s$/, '') // strip plural
  if (s.startsWith('lun') || s === 'l')  return 1
  if (s.startsWith('mar'))               return 2
  if (s.startsWith('mie') || s === 'x') return 3
  if (s.startsWith('jue') || s === 'j') return 4
  if (s.startsWith('vie') || s === 'v') return 5
  if (s.startsWith('sab') || s === 's') return 6
  if (s.startsWith('dom') || s === 'd') return 0
  return null
}

/**
 * Parse a `days` string like "Lunes a Viernes", "Jueves a Sábado",
 * "Viernes y Sábados", "Domingos", "Laboratorio L–V", etc.
 * Returns array of JS day numbers (0=Sun, 1=Mon … 6=Sat), or null if unparseable.
 */
function parseDays(raw: string): number[] | null {
  // Strip known service-label prefixes: "Laboratorio", "Dental", etc.
  let s = stripAccents(raw.toLowerCase().trim())
  s = s.replace(/^(laboratorio|dental|clinica|consultorio|servicio|salon)\s+/i, '').trim()

  // Range pattern: "X a Y", "X – Y", "X - Y", "X–Y"
  // Use word-boundary around standalone "a" to avoid splitting inside day names
  const rangeMatch = s.match(/^(.+?)\s*(?:\ba\b|[–—-])\s*(.+)$/)
  if (rangeMatch) {
    const from = parseDayToken(rangeMatch[1].trim())
    const to   = parseDayToken(rangeMatch[2].trim())
    if (from !== null && to !== null) {
      const days: number[] = []
      let d = from
      for (let i = 0; i < 8; i++) {
        days.push(d)
        if (d === to) break
        d = (d + 1) % 7
      }
      // Verify we actually reached the target (safety against infinite range)
      if (days[days.length - 1] === to) return days
    }
  }

  // "X y Y" — two specific days
  const andMatch = s.match(/^(.+?)\s+y\s+(.+)$/)
  if (andMatch) {
    const d1 = parseDayToken(andMatch[1].trim())
    const d2 = parseDayToken(andMatch[2].trim())
    if (d1 !== null && d2 !== null) return [d1, d2]
  }

  // Single day
  const single = parseDayToken(s)
  if (single !== null) return [single]

  return null
}

const parseTime = (t: string): number => {
  const lower = t.toLowerCase().trim()
  const pm = /p\.?m\b/.test(lower)
  const am = /a\.?m\b/.test(lower)
  // Remove unit words and spaces, convert colon to dot for splitting
  const clean = lower.replace(/[a-z\.]/g, '').replace(/\s/g, '').replace(':', '.')
  const parts = clean.split('.')
  let h = parseInt(parts[0] ?? '0', 10)
  const m = parseInt(parts[1] ?? '0', 10)
  if (pm && h !== 12) h += 12
  if (am && h === 12) h = 0
  return h * 60 + (isNaN(m) ? 0 : m)
}

export function isOpenNow(tenant: Tenant): boolean | null {
  if (!tenant.hours?.length) return null

  const { day, mins: currentMins } = getNowCR()

  for (const row of tenant.hours) {
    const matchedDays = parseDays(row.days)
    if (!matchedDays || !matchedDays.includes(day)) continue

    const hoursStr = row.hours.toLowerCase().trim()
    if (/24\s*hora|abierto/.test(hoursStr)) return true

    // Split on em-dash or en-dash (not on letter 'a' to avoid splitting "am")
    const timeParts = hoursStr.split(/\s*[–—]\s*/)
    if (timeParts.length < 2) continue

    try {
      const open  = parseTime(timeParts[0])
      const close = parseTime(timeParts[timeParts.length - 1])
      if (isNaN(open) || isNaN(close)) continue
      if (open < close) {
        if (currentMins >= open && currentMins < close) return true
      } else {
        // Overnight span (e.g. 10pm–2am)
        if (currentMins >= open || currentMins < close) return true
      }
    } catch {
      // ignore parse errors
    }
  }
  return false
}
