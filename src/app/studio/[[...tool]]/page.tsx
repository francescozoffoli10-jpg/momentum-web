// @ts-nocheck
/**
 * Sanity Studio — embedded at /studio
 *
 * Access: http://localhost:3000/studio  (dev)
 *         https://your-domain.com/studio (prod — protect with Vercel auth or middleware)
 */

import { NextStudio } from 'next-sanity/studio'
import config from '@/sanity/config'

export { metadata, viewport } from 'next-sanity/studio'

export default function StudioPage() {
  return <NextStudio config={config} />
}
