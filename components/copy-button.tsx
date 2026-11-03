'use client'

import { Check, Copy } from "lucide-react"
import { useState } from "react"

export default function CopyButton({ value, label }: { value: string; label: string }) {
  const [copied, setCopied] = useState(false)

  return (
    <button
      type="button"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(value)
          setCopied(true)
          setTimeout(() => setCopied(false), 2000)
        } catch {
          // Clipboard blocked; the number stays visible and selectable
        }
      }}
      className="inline-flex h-9 items-center gap-2 rounded-md border border-line px-3 text-sm font-semibold text-ink hover:bg-mist"
    >
      {copied ? <Check className="size-4 text-brand" /> : <Copy className="size-4" />}
      <span aria-live="polite">{copied ? "Copied" : `Copy ${label}`}</span>
    </button>
  )
}
