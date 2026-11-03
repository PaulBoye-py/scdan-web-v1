import { PortableText, type PortableTextComponents } from '@portabletext/react'
import Image from 'next/image'
import { imageDimensions, urlFor } from '@/lib/sanity'

// Article headings are demoted by one level: the page title is the only h1.
const components: PortableTextComponents = {
  block: {
    h1: ({ children }) => <h2 className="mt-12 mb-4 text-3xl leading-tight text-ink">{children}</h2>,
    h2: ({ children }) => <h2 className="mt-12 mb-4 text-3xl leading-tight text-ink">{children}</h2>,
    h3: ({ children }) => <h3 className="mt-10 mb-3 text-2xl leading-snug text-ink">{children}</h3>,
    h4: ({ children }) => <h4 className="mt-8 mb-2 text-lg font-semibold text-ink">{children}</h4>,
    normal: ({ children }) => <p className="mb-6 text-[1.1875rem] leading-[1.75] text-ink/90">{children}</p>,
    blockquote: ({ children }) => (
      <blockquote className="my-10 border-l-2 border-brand pl-6 font-serif text-2xl leading-snug text-ink">
        {children}
      </blockquote>
    ),
  },
  marks: {
    strong: ({ children }) => <strong className="font-semibold text-ink">{children}</strong>,
    em: ({ children }) => <em className="italic">{children}</em>,
    underline: ({ children }) => <span className="underline">{children}</span>,
    'strike-through': ({ children }) => <s>{children}</s>,
    link: ({ value, children }) => {
      const href: string = value?.href ?? ''
      const external = /^https?:\/\//.test(href) && !href.startsWith('https://scdan.org')
      return (
        <a
          href={href}
          {...(external && { target: '_blank', rel: 'noopener noreferrer' })}
          className="font-semibold text-brand underline decoration-brand/30 underline-offset-4 hover:decoration-brand"
        >
          {children}
        </a>
      )
    },
  },
  types: {
    image: ({ value }) => {
      if (!value?.asset) return null
      const alt = value.alt || value.caption || ''
      const { width, height } = imageDimensions(value)
      return (
        <figure className="my-10">
          <Image
            src={urlFor(value).width(1400).fit('max').auto('format').url()}
            alt={alt}
            width={width}
            height={height}
            sizes="(min-width: 768px) 720px, 100vw"
            className="h-auto w-full rounded-lg"
          />
          {value.caption && <figcaption className="mt-3 text-sm text-muted">{value.caption}</figcaption>}
        </figure>
      )
    },
  },
  list: {
    bullet: ({ children }) => <ul className="mb-6 list-disc space-y-2 pl-6 text-[1.1875rem] leading-[1.7] text-ink/90 marker:text-brand">{children}</ul>,
    number: ({ children }) => <ol className="mb-6 list-decimal space-y-2 pl-6 text-[1.1875rem] leading-[1.7] text-ink/90 marker:text-muted">{children}</ol>,
  },
  listItem: {
    bullet: ({ children }) => <li className="pl-1">{children}</li>,
    number: ({ children }) => <li className="pl-1">{children}</li>,
  },
}

export default function PortableTextRenderer({ value }: { value: any[] }) {
  return <PortableText value={value} components={components} />
}
