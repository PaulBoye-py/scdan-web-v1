'use client'

import { useState } from 'react'
import Image from 'next/image'
import { X } from 'lucide-react'
import { PortableText } from '@portabletext/react'

interface Member {
  _id: string
  name: string
  position?: string
  specialty?: string
  image?: any
  bio?: any[]
  imageUrl: string
}

export default function MemberCard({ member }: { member: Member }) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="group w-full text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-xl"
      >
        <div className="bg-white border border-slate-200 rounded-xl overflow-hidden transition-all duration-300 hover:border-primary/40 hover:shadow-lg flex flex-col">
          <div className="relative aspect-square overflow-hidden">
            <Image
              src={member.imageUrl}
              alt={member.name}
              fill
              className="object-cover grayscale transition-all duration-500 group-hover:grayscale-0 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 transition-all duration-300" />
          </div>
          <div className="p-4 border-t border-slate-100 h-28 overflow-hidden">
            <h4 className="font-semibold text-slate-900 text-sm leading-snug line-clamp-2">{member.name}</h4>
            {member.position ? (
              <p className="text-xs text-primary font-medium mt-1">{member.position}</p>
            ) : (
              <span className="inline-block mt-1.5 text-xs font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">Member</span>
            )}
          </div>
        </div>
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        >
          <div
            className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setOpen(false)}
              className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-slate-100 hover:bg-slate-200 transition"
            >
              <X className="w-4 h-4 text-slate-600" />
            </button>

            {/* Header */}
            <div className="flex flex-col items-center pt-10 pb-6 px-6 border-b border-slate-100">
              <div className="relative w-32 h-32 rounded-full overflow-hidden ring-4 ring-primary/20 mb-4">
                <Image
                  src={member.imageUrl}
                  alt={member.name}
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-xl font-bold text-slate-900 text-center">{member.name}</h3>
              {member.position && (
                <p className="text-sm text-primary font-semibold mt-1">{member.position}</p>
              )}
            </div>

            {/* Body */}
            <div className="p-6 space-y-6">
              {member.bio && member.bio.length > 0 && (
                <div>
                  <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-3">Biography</h4>
                  <div className="prose prose-sm prose-slate max-w-none">
                    <PortableText value={member.bio} />
                  </div>
                </div>
              )}

              {member.specialty && (
                <div>
                  <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-3">Area of Interest</h4>
                  <div className="flex flex-wrap gap-2">
                    {member.specialty.split(',').map((s: string) => s.trim()).filter(Boolean).map((s: string) => (
                      <span key={s} className="inline-block bg-primary/10 text-primary text-sm font-medium px-3 py-1 rounded-full">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {!member.bio?.length && !member.specialty && (
                <p className="text-slate-400 text-sm italic text-center">No additional information available.</p>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
