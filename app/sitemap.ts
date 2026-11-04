import type { MetadataRoute } from "next"
import { getSitemapEntries } from "@/lib/sanity-queries"
import { absoluteUrl } from "@/lib/site"

export const dynamic = "force-dynamic"

const staticRoutes: { path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] }[] = [
  { path: "/", priority: 1, changeFrequency: "weekly" },
  { path: "/about", priority: 0.8, changeFrequency: "monthly" },
  { path: "/news", priority: 0.8, changeFrequency: "weekly" },
  { path: "/events", priority: 0.8, changeFrequency: "weekly" },
  { path: "/publications", priority: 0.7, changeFrequency: "monthly" },
  { path: "/resources", priority: 0.6, changeFrequency: "monthly" },
  { path: "/gallery", priority: 0.5, changeFrequency: "monthly" },
  { path: "/donate", priority: 0.6, changeFrequency: "yearly" },
  { path: "/partners", priority: 0.4, changeFrequency: "yearly" },
]

const typePaths: Record<string, string> = {
  news: "/news",
  event: "/events",
  publication: "/publications",
  gallery: "/gallery",
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const entries = await getSitemapEntries()

  return [
    ...staticRoutes.map((r) => ({ url: absoluteUrl(r.path), priority: r.priority, changeFrequency: r.changeFrequency })),
    ...entries
      .filter((e) => !e.noIndex && typePaths[e._type])
      .map((e) => ({
        url: absoluteUrl(`${typePaths[e._type]}/${e.slug}`),
        lastModified: e._updatedAt,
        changeFrequency: "monthly" as const,
        priority: e._type === "news" || e._type === "publication" ? 0.7 : 0.5,
      })),
  ]
}
