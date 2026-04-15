'use client'

import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'

const TIERS = [
  { name: 'Satin Muse',        min: 0,    max: 499  },
  { name: 'Velvet Empress',    min: 500,  max: 999  },
  { name: 'Gilded Oracle',     min: 1000, max: 1999 },
  { name: 'Radiant Sovereign', min: 2000, max: Infinity },
]

interface GildedPathProps {
  points: number
  tier: string
}

// Deterministic number formatter — avoids locale mismatch between server and client
function formatNum(n: number) {
  return String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

const GildedPath = ({ points, tier }: GildedPathProps) => {
  const lineRef  = useRef<HTMLDivElement>(null)
  const glowRef  = useRef<HTMLDivElement>(null)
  const countRef = useRef<HTMLSpanElement>(null)

  const tierIndex  = Math.max(0, TIERS.findIndex(t => t.name === tier))
  const current    = TIERS[tierIndex]
  const next       = TIERS[tierIndex + 1]
  const progressPct = next
    ? Math.min(100, ((points - current.min) / (current.max - current.min + 1)) * 100)
    : 100
  const pointsToNext = next ? next.min - points : 0

  useEffect(() => {
    if (!lineRef.current || !glowRef.current || !countRef.current) return
    const tl = gsap.timeline({ delay: 0.4 })
    tl.to(lineRef.current, { width: `${progressPct}%`, duration: 2.2, ease: 'power4.inOut' })
    tl.to(glowRef.current, { left: `${progressPct}%`, duration: 2.2, ease: 'power4.inOut' }, '<')

    // Animate the points counter
    const target = { val: 0 }
    tl.to(target, {
      val: points,
      duration: 1.8,
      ease: 'power2.out',
      onUpdate: () => {
        if (countRef.current) countRef.current.textContent = formatNum(Math.round(target.val))
      },
    }, '<0.2')

    // Perpetual glow pulse
    gsap.to(glowRef.current, {
      scale: 1.8,
      opacity: 0.5,
      duration: 1.4,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      delay: 2.8,
    })
  }, [progressPct, points])

  return (
    <div className="relative py-20 px-6 md:px-24 overflow-hidden">

      {/* Atmospheric background gradient */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-0 top-0 w-[60vw] h-full opacity-[0.04]"
          style={{ background: 'radial-gradient(ellipse at 20% 50%, #BD663B, transparent 70%)' }} />
      </div>

      <div className="relative max-w-screen-xl mx-auto">

        {/* Section label */}
        <div className="flex items-center gap-5 mb-20">
          <span className="font-inter text-[9px] uppercase tracking-[0.5em] text-brand-terracotta font-bold whitespace-nowrap">
            The Gilded Path
          </span>
          <div className="flex-1 h-px" style={{
            background: 'linear-gradient(to right, rgba(189,102,59,0.2), transparent)'
          }} />
        </div>

        {/* Essence counter — centrepiece */}
        <div className="flex flex-col md:flex-row md:items-end gap-12 md:gap-24 mb-24">
          <div>
            <div className="flex items-baseline gap-3 leading-none">
              <span
                ref={countRef}
                className="font-playfair italic text-brand-burnt"
                style={{ fontSize: 'clamp(5rem, 14vw, 11rem)', lineHeight: 1 }}
              >
                0
              </span>
              <span className="font-inter text-[10px] uppercase tracking-[0.4em] text-brand-terracotta font-bold self-end pb-4">
                Essence
              </span>
            </div>
            <p className="mt-4 font-inter text-[9px] uppercase tracking-[0.4em] text-brand-burnt/30 font-bold">
              Célune Essence Points
            </p>
          </div>

          {/* Tier badges */}
          <div className="flex flex-col gap-1 pb-2">
            <span className="font-inter text-[8px] uppercase tracking-[0.4em] text-brand-burnt/25 font-bold mb-1">Current tier</span>
            <span className="font-playfair italic text-3xl text-brand-burnt">{current.name}</span>
            {next && (
              <span className="font-inter text-[10px] uppercase tracking-widest text-brand-terracotta mt-2">
                → {next.name}
              </span>
            )}
          </div>
        </div>

        {/* Progress track */}
        <div className="relative h-[1px] w-full bg-brand-terracotta/10">
          {/* Fill */}
          <div
            ref={lineRef}
            className="absolute top-0 left-0 h-full"
            style={{
              width: 0,
              background: 'linear-gradient(to right, rgba(189,102,59,0.3), #BD663B)',
            }}
          />
          {/* Glow dot */}
          <div
            ref={glowRef}
            className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full"
            style={{
              left: 0,
              background: '#BD663B',
              boxShadow: '0 0 0 6px rgba(189,102,59,0.15), 0 0 20px rgba(189,102,59,0.5)',
            }}
          />
        </div>

        {/* Tier milestone markers */}
        <div className="flex justify-between mt-4">
          {TIERS.filter((_, i) => i < 4).map((t) => (
            <span
              key={t.name}
              className="font-inter text-[8px] text-brand-burnt/20 uppercase tracking-wider"
            >
              {t.min === 0 ? '0' : `${formatNum(t.min)}`}
            </span>
          ))}
        </div>

        {/* Motivational whisper */}
        {next && (
          <p className="mt-14 font-playfair italic text-brand-burnt/25 text-base">
            "{formatNum(pointsToNext)} Essence separates you from the {next.name}."
          </p>
        )}

      </div>
    </div>
  )
}

export default GildedPath
