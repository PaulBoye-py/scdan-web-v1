import { PortableText, type PortableTextReactComponents } from '@portabletext/react'
import { PortableTextBlock } from 'sanity'
import Image from 'next/image'
import { urlFor } from '@/lib/sanity'

export interface PortableTextProps {
  value: PortableTextBlock[]
}

const components: Partial<PortableTextReactComponents> = {
  types: {
    image: ({ value }) => {
      if (!value?.asset?._ref) {
        return null
      }

      return (
        <div className="my-6">
          <div className="relative aspect-video overflow-hidden rounded-lg">
            <Image
              src={urlFor(value).url()}
              alt={value.alt || 'Article image'}
              fill
              className="object-cover"
            />
          </div>
          {value.caption && (
            <p className="mt-2 text-sm text-gray-600 text-center italic">{value.caption}</p>
          )}
        </div>
      )
    },
  },
  block: {
    h1: ({ children }) => <h1 className="text-4xl font-bold mt-8 mb-4 text-gray-900">{children}</h1>,
    h2: ({ children }) => <h2 className="text-3xl font-bold mt-7 mb-3 text-gray-900">{children}</h2>,
    h3: ({ children }) => <h3 className="text-2xl font-bold mt-6 mb-3 text-gray-900">{children}</h3>,
    normal: ({ children }) => <p className="text-lg text-gray-700 mb-4 leading-relaxed">{children}</p>,
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-primary pl-4 my-6 italic text-gray-700 bg-gray-50 py-4 pr-4 rounded">
        {children}
      </blockquote>
    ),
  },
  marks: {
    strong: ({ children }) => <strong className="font-semibold text-gray-900">{children}</strong>,
    em: ({ children }) => <em className="italic">{children}</em>,
    underline: ({ children }) => <u className="underline">{children}</u>,
    'strike-through': ({ children }) => <s className="line-through">{children}</s>,
    link: ({ value, children }) => {
      const target = (value?.href || '').startsWith('http') ? '_blank' : '_self'
      return (
        <a
          href={value?.href}
          target={target}
          rel={target === '_blank' ? 'noopener noreferrer' : ''}
          className="text-primary hover:underline font-medium"
        >
          {children}
        </a>
      )
    },
  },
  list: {
    bullet: ({ children }) => <ul className="list-disc list-inside space-y-2 my-4 ml-4">{children}</ul>,
    number: ({ children }) => <ol className="list-decimal list-inside space-y-2 my-4 ml-4">{children}</ol>,
  },
  listItem: {
    bullet: ({ children }) => <li className="text-gray-700">{children}</li>,
    number: ({ children }) => <li className="text-gray-700">{children}</li>,
  },
}

export default function PortableTextComponent({ value }: PortableTextProps) {
  return (
    <div className="prose prose-lg max-w-none">
      <PortableText value={value} components={components} />
    </div>
  )
}
