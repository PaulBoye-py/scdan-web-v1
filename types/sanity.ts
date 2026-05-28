import { PortableTextBlock } from 'sanity'

type SanityImageObject = any

export interface NewsArticle {
  _id: string
  title: string
  slug: { current: string }
  excerpt: string
  content: PortableTextBlock[]
  publishedAt: string
  category: 'updates' | 'announcements' | 'research' | 'community' | 'professional'
  featuredImage: SanityImageObject
  featured: boolean
  author?: TeamMember
  tags: string[]
}

export interface Event {
  _id: string
  title: string
  slug: { current: string }
  description: PortableTextBlock[]
  startDate: string
  endDate?: string
  time: string
  location: string
  eventType: 'conference' | 'workshop' | 'outreach' | 'training' | 'seminar'
  capacity?: number
  registeredCount?: number
  price: string
  image: SanityImageObject
  featured: boolean
  registrationLink?: string
}

export interface TeamMember {
  _id: string
  name: string
  position: string
  role: 'leadership' | 'member' | 'advisory'
  bio: PortableTextBlock[]
  image: SanityImageObject
  email?: string
  phone?: string
  specialty?: string
  socialLinks?: Array<{
    platform: 'linkedin' | 'twitter' | 'facebook'
    url: string
  }>
  order: number
}

export interface Gallery {
  _id: string
  title: string
  slug: { current: string }
  description: string
  date: string
  images: Array<{
    image: SanityImageObject
    caption?: string
  }>
  featured: boolean
  eventReference?: {
    title: string
    slug: { current: string }
  }
}

export interface Resource {
  _id: string
  title: string
  slug: { current: string }
  description: string
  category: 'guideline' | 'research' | 'publication' | 'educational' | 'policy'
  file?: {
    asset: {
      url: string
      originalFilename: string
    }
  }
  externalLink?: string
  publishedAt: string
  author?: TeamMember
  downloadCount: number
}

export interface Partner {
  _id: string
  name: string
  slug: { current: string }
  logo: SanityImageObject
  description: string
  website?: string
  partnerType: 'sponsor' | 'partner' | 'affiliate'
  featured: boolean
  order: number
}

export interface Testimonial {
  _id: string
  patientName: string
  content: string
  date: string
  image?: SanityImageObject
  featured: boolean
  approved: boolean
}

export interface Publication {
  _id: string
  title: string
  slug: { current: string }
  description: string
  content: PortableTextBlock[]
  publishedAt: string
  category: 'research' | 'guidelines' | 'article' | 'case_study' | 'editorial' | 'policy'
  image: SanityImageObject
  file?: {
    asset: {
      url: string
      originalFilename: string
    }
  }
  externalUrl?: string
  featured: boolean
  author?: TeamMember
  keywords: string[]
}
