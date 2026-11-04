import { createClient, type SanityClient } from '@sanity/client'
import { createImageUrlBuilder } from '@sanity/image-url'

type SanityImageSource = any

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'dev-placeholder'
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01'

// Pages render on each request (Amplify does not reliably refresh ISR pages), so read through the
// Sanity CDN: it is fast and picks up a publish within seconds.
export const client: SanityClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
})

const builder = createImageUrlBuilder(client)

export function urlFor(source: SanityImageSource) {
  return builder.image(source)
}

// Asset refs look like "image-<id>-1600x900-jpg"
export function imageDimensions(source: SanityImageSource, fallback = { width: 1600, height: 900 }) {
  const ref: string | undefined = source?.asset?._ref ?? source?.asset?._id
  const match = ref?.match(/-(\d+)x(\d+)-/)
  return match ? { width: Number(match[1]), height: Number(match[2]) } : fallback
}

export function imageAlt(source: SanityImageSource, fallback: string) {
  return (source?.alt as string | undefined)?.trim() || fallback
}
