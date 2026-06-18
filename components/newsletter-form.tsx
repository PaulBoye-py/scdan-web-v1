'use client'

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import subscribeToNewsletter from "@/lib/newsletter"

export default function NewsletterForm() {
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
      setMessage("You're subscribed! We'll keep you updated.")
      setFirstName("")
      setEmail("")
    } else {
      setStatus('error')
      setMessage(result.error ?? "Something went wrong. Please try again.")
    }
  }

  if (status === 'success') {
    return (
      <p className="text-white font-medium text-center py-2">{message}</p>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 w-full">
      <Input
        type="text"
        placeholder="First name"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        required
        className="bg-white text-slate-900 placeholder-slate-400 w-full"
      />
      <Input
        type="email"
        placeholder="Email address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="bg-white text-slate-900 placeholder-slate-400 w-full"
      />
      <Button
        type="submit"
        disabled={status === 'loading'}
        className="bg-primary hover:bg-primary/90 text-white w-full"
      >
        {status === 'loading' ? "Subscribing..." : "Subscribe"}
      </Button>
      {status === 'error' && (
        <p className="text-red-300 text-sm">{message}</p>
      )}
    </form>
  )
}
