'use client'

import React from 'react'
import Image from 'next/image'

interface ProfileHeaderProps {
  user: {
    name: string
    email: string
    image?: string | null
    tier: string
    points: number
    createdAt: Date
    orders: { id: string }[]
  }
}

const ProfileHeader = ({ user }: ProfileHeaderProps) => {
  const memberYear = user.createdAt instanceof Date
    ? user.createdAt.getFullYear()
    : new Date(user.createdAt).getFullYear()

  // Derive first name for large headline
  const firstName = user.name.split(' ')[0] ?? user.name
  const lastName  = user.name.split(' ').slice(1).join(' ')

  return (
    <div className="relative w-full overflow-hidden" style={{ background: '#faf9f6' }}>

      {/* ─── Full-bleed editorial background layer ── */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Warm terracotta fog, top-left */}
        <div
          className="absolute -top-32 -left-32 w-[70vw] h-[70vw] rounded-full opacity-[0.06]"
          style={{ background: 'radial-gradient(circle, #BD663B, transparent 65%)' }}
        />
        {/* Fine grain texture (CSS noise) */}
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            backgroundRepeat: 'repeat',
            backgroundSize: '200px',
          }}
        />
      </div>

      {/* ─── Top rule ─────────────────────────────────────── */}
      <div
        className="h-px w-full"
        style={{ background: 'linear-gradient(to right, transparent, rgba(189,102,59,0.35), transparent)' }}
      />

      <div className="relative max-w-screen-xl mx-auto px-6 md:px-24 pt-16 pb-0">

        {/* Eyebrow row */}
        <div className="flex items-center justify-between mb-14">
          <span className="font-inter text-[9px] uppercase tracking-[0.5em] text-brand-terracotta font-bold">
            Identity Seal
          </span>
          <span className="font-inter text-[9px] uppercase tracking-[0.35em] text-brand-burnt/25">
            Est. {memberYear}
          </span>
        </div>

        {/* ─── Giant editorial name ─────────────────────── */}
        <div className="relative">
          <h1
            className="font-playfair italic text-brand-burnt leading-[0.84] tracking-tight"
            style={{ fontSize: 'clamp(5rem, 13vw, 10.5rem)' }}
          >
            {firstName}
            {lastName && (
              <>
                <br />
                <span className="text-brand-terracotta/60">{lastName}</span>
              </>
            )}
          </h1>

          {/* Avatar — overlaps name bottom-right, desktop only */}
          {user.image && (
            <div className="absolute right-0 bottom-2 hidden md:block">
              <div
                className="relative w-28 h-28 rounded-full overflow-hidden"
                style={{ boxShadow: '0 0 0 1px rgba(189,102,59,0.12), 0 0 0 8px rgba(189,102,59,0.04)' }}
              >
                <Image src={user.image} alt={user.name} fill className="object-cover" />
              </div>
            </div>
          )}
        </div>

        {/* ─── Thin rule ───────────────────────────────────── */}
        <div
          className="mt-10 h-px"
          style={{ background: 'linear-gradient(to right, rgba(189,102,59,0.2), transparent 60%)' }}
        />

        {/* ─── Meta strip ──────────────────────────────────── */}
        <div className="py-9 flex flex-wrap items-start justify-between gap-10">
          {/* Identity */}
          <div className="flex flex-col gap-1.5">
            <span className="font-inter text-[9px] uppercase tracking-[0.4em] text-brand-burnt/25">
              {user.email}
            </span>
            <span className="font-inter text-[9px] uppercase tracking-[0.4em] text-brand-burnt/15">
              Member since {memberYear}
            </span>
          </div>

          {/* Stat cluster — no boxes, just large editorial numbers */}
          <div className="flex items-start gap-10 md:gap-16 flex-wrap">
            <div className="flex flex-col">
              <span
                className="font-playfair italic text-brand-burnt leading-none"
                style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}
              >
                {user.points ?? 0}
              </span>
              <span className="font-inter text-[8px] uppercase tracking-[0.3em] text-brand-burnt/25 font-bold mt-2">
                Essence Points
              </span>
            </div>

            <div className="w-px h-10 bg-brand-burnt/8 self-center" />

            <div className="flex flex-col">
              <span
                className="font-playfair italic text-brand-burnt leading-none"
                style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}
              >
                {user.orders.length}
              </span>
              <span className="font-inter text-[8px] uppercase tracking-[0.3em] text-brand-burnt/25 font-bold mt-2">
                Ritual Orders
              </span>
            </div>

            <div className="w-px h-10 bg-brand-burnt/8 self-center" />

            <div className="flex flex-col justify-center">
              <span className="font-playfair italic text-brand-terracotta leading-none text-xl">
                {user.tier}
              </span>
              <span className="font-inter text-[8px] uppercase tracking-[0.3em] text-brand-burnt/25 font-bold mt-2">
                Current Tier
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ─── Bottom image band ───────────────────────────── */}
      <div
        className="relative w-full h-24 md:h-32 overflow-hidden mt-2"
        style={{ background: 'linear-gradient(to right, #faf9f6, #fdf5f0, #faf9f6)' }}
      >
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `url('/celune_about_hero_botanical_1776158822292.png')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center 60%',
            maskImage: 'linear-gradient(to bottom, transparent, rgba(0,0,0,0.4), transparent)',
            WebkitMaskImage: 'linear-gradient(to bottom, transparent, rgba(0,0,0,0.4), transparent)',
          }}
        />
      </div>

    </div>
  )
}

export default ProfileHeader
