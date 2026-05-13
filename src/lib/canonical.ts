/**
 * canonical.ts
 *
 * Returns the canonical base URL for each site.
 *
 * Priority:
 *   1. Environment variable  (set in Vercel project settings per environment)
 *   2. Hardcoded production default
 *
 * In Vercel:
 *   Add these under Settings → Environment Variables → Production:
 *     NEXT_PUBLIC_LINDORA_URL  = https://momentumlindora.com
 *     NEXT_PUBLIC_ESCAZU_URL   = https://momentumescazu.com
 *     NEXT_PUBLIC_PINARES_URL  = https://momentumpinares.com
 *
 *   For Preview (optional):
 *     NEXT_PUBLIC_LINDORA_URL  = https://momentum-preview-coral.vercel.app/lindora
 *     NEXT_PUBLIC_ESCAZU_URL   = https://momentum-preview-coral.vercel.app/escazu
 *     NEXT_PUBLIC_PINARES_URL  = https://momentum-preview-coral.vercel.app/pinares
 *
 * DNS change is the only thing that activates production domains.
 * Nothing here touches or breaks the current Squarespace sites.
 */

export const CANONICAL: Record<'lindora' | 'escazu' | 'pinares', string> = {
  lindora: process.env.NEXT_PUBLIC_LINDORA_URL ?? 'https://momentumlindora.com',
  escazu:  process.env.NEXT_PUBLIC_ESCAZU_URL  ?? 'https://momentumescazu.com',
  pinares: process.env.NEXT_PUBLIC_PINARES_URL ?? 'https://momentumpinares.com',
}
