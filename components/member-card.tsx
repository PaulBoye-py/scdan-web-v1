'use client'

import { PortableText } from '@portabletext/react'
import { X } from 'lucide-react'
import Image from 'next/image'
import { useEffect, useId, useRef, useState } from 'react'

interface Member {
  _id: string
  name: string
  displayName: string
  position?: string
  specialty?: string
  bio?: any[]
  imageUrl?: string
}

export default function MemberCard({ member }: { member: Member }) {
  const [open, setOpen] = useState(false)
  const dialogRef = useRef<HTMLDialogElement>(null)
  const titleId = useId()
  const hasDetails = Boolean(member.bio?.length || member.specialty)

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    if (open && !dialog.open) dialog.showModal()
    if (!open && dialog.open) dialog.close()
  }, [open])

  const photo = (
    <div className="relative aspect-[4/5] overflow-hidden rounded-md bg-mist">
      {member.imageUrl && (
        <Image
          src={member.imageUrl}
          alt=""
          fill
          sizes="(min-width: 1024px) 270px, (min-width: 640px) 33vw, 50vw"
          className="object-cover grayscale transition-[filter,transform] duration-500 group-hover:scale-[1.03] group-hover:grayscale-0 group-focus-visible:grayscale-0"
        />
      )}
      {/* Brand-blue tint that fades in with the colour */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-brand/45 via-brand/20 to-sky/10 opacity-0 mix-blend-multiply transition-opacity duration-500 group-hover:opacity-100 group-focus-visible:opacity-100"
      />
    </div>
  )

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        disabled={!hasDetails}
        className="group flex w-full flex-col gap-3 text-left disabled:cursor-default"
        aria-haspopup={hasDetails ? 'dialog' : undefined}
      >
        {photo}
        <span>
          {member.position && <span className="eyebrow block text-brand">{member.position}</span>}
          <span className="mt-1 block font-serif text-lg font-semibold leading-snug text-ink group-enabled:group-hover:text-brand">
            {member.displayName}
          </span>
          {hasDetails && <span className="mt-1 block text-sm text-muted">Read profile</span>}
        </span>
      </button>

      <dialog
        ref={dialogRef}
        aria-labelledby={titleId}
        onClose={() => setOpen(false)}
        onClick={(e) => e.target === e.currentTarget && setOpen(false)}
        className="m-auto w-[min(36rem,calc(100vw-2rem))] max-h-[85vh] rounded-lg bg-paper p-0 text-ink shadow-2xl backdrop:bg-ink/60 backdrop:backdrop-blur-sm"
      >
        <div className="relative p-7 md:p-9">
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="absolute top-4 right-4 flex size-9 items-center justify-center rounded-full text-muted hover:bg-mist hover:text-ink"
            aria-label="Close profile"
          >
            <X className="size-5" />
          </button>
          <div className="flex items-center gap-5 pr-8">
            {member.imageUrl && (
              <div className="relative size-20 shrink-0 overflow-hidden rounded-full bg-mist">
                <Image src={member.imageUrl} alt="" fill sizes="80px" className="object-cover" />
              </div>
            )}
            <div>
              {member.position && <p className="eyebrow text-brand">{member.position}</p>}
              <h3 id={titleId} className="mt-1 text-xl leading-snug">{member.name.trim()}</h3>
            </div>
          </div>

          {member.specialty && (
            <div className="mt-7">
              <p className="eyebrow text-muted">Areas of interest</p>
              <ul className="mt-3 flex flex-wrap gap-2">
                {member.specialty.split(',').map((s) => s.trim()).filter(Boolean).map((s) => (
                  <li key={s} className="rounded-full bg-mist px-3 py-1 text-sm font-semibold text-ink">{s}</li>
                ))}
              </ul>
            </div>
          )}

          {member.bio && member.bio.length > 0 && (
            <div className="prose prose-slate mt-7 max-w-none text-[1.0625rem] leading-relaxed">
              <PortableText value={member.bio} />
            </div>
          )}
        </div>
      </dialog>
    </>
  )
}
