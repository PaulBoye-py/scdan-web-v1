'use client'

import { useId, useState } from "react"
import { Button } from "@/components/ui/button"
import subscribeToNewsletter from "@/lib/newsletter"
import { cn } from "@/lib/utils"

export default function NewsletterForm({ tone = "light" }: { tone?: "light" | "dark" }) {
  const id = useId()
  const [firstName, setFirstName] = useState("")
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')

    const result = await subscribeToNewsletter(firstName.trim(), email.trim())

    if (result.success) {
      setStatus('success')
      setMessage("You're subscribed. We'll be in touch.")
      setFirstName("")
      setEmail("")
    } else {
      setStatus('error')
      setMessage(result.error ?? "Something went wrong. Please try again.")
    }
  }

  const dark = tone === "dark"
  const inputClass = cn(
    "h-11 w-full rounded-md border px-3 text-[0.9375rem] outline-none transition-colors focus-visible:outline-2 focus-visible:outline-offset-1",
    dark
      ? "border-white/20 bg-white/5 text-white placeholder:text-white/40 focus-visible:outline-sky"
      : "border-line bg-paper text-ink placeholder:text-muted/70 focus-visible:outline-brand",
  )

  if (status === 'success') {
    return <p role="status" className={cn("font-semibold", dark ? "text-white" : "text-ink")}>{message}</p>
  }

  return (
    <form onSubmit={handleSubmit} className="flex w-full flex-col gap-3">
      <label htmlFor={`${id}-name`} className="sr-only">First name</label>
      <input
        id={`${id}-name`}
        type="text"
        autoComplete="given-name"
        placeholder="First name"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        required
        className={inputClass}
      />
      <label htmlFor={`${id}-email`} className="sr-only">Email address</label>
      <input
        id={`${id}-email`}
        type="email"
        autoComplete="email"
        placeholder="Email address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className={inputClass}
      />
      <Button type="submit" disabled={status === 'loading'} variant={dark ? "light" : "default"} className="h-11">
        {status === 'loading' ? "Subscribing…" : "Subscribe"}
      </Button>
      {status === 'error' && (
        <p role="alert" className={cn("text-sm", dark ? "text-red-300" : "text-destructive")}>{message}</p>
      )}
    </form>
  )
}
