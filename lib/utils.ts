import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const dateFormats = {
  long: { day: "numeric", month: "long", year: "numeric" },
  short: { day: "numeric", month: "short", year: "numeric" },
} as const

export function formatDate(date: string | undefined | null, style: keyof typeof dateFormats = "long") {
  if (!date) return ""
  return new Date(date).toLocaleDateString("en-GB", { ...dateFormats[style], timeZone: "Africa/Lagos" })
}

export function formatDateRange(start: string, end?: string | null) {
  if (!end || formatDate(start) === formatDate(end)) return formatDate(start)
  return `${formatDate(start)} – ${formatDate(end)}`
}

export function titleCase(value?: string | null) {
  if (!value) return ""
  return value.replace(/[_-]/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())
}

// Names in Sanity include post-nominals ("Dr X, BDS, FWACS"); keep just the name for compact layouts.
export function shortName(name: string) {
  return name.split(",")[0].replace(/\s+(BDS|MPH|PHD|FMCDS|FWACS)\b.*$/i, "").trim()
}

export const publicationLabels: Record<string, string> = {
  research: "Research paper",
  guidelines: "Clinical guideline",
  article: "Article",
  case_study: "Case study",
  editorial: "Editorial",
  policy: "Policy brief",
}
