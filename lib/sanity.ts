import { createClient, type SanityClient } from '@sanity/client'
import { createImageUrlBuilder } from '@sanity/image-url'

type SanityImageSource = any

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'dev-placeholder'
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01'

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

export function urlForOpenGraphImage(image: SanityImageSource) {
  return urlFor(image).width(1200).height(630).fit('crop').url()
}
