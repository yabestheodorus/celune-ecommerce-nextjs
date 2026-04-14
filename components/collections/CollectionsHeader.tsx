'use client'

import React, { useRef } from 'react'
import Image from 'next/image'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

export default function CollectionsHeader({ formulationCount }: { formulationCount: number }) {
  const containerRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    // Cinematic entrance animation timeline
    const tl = gsap.timeline({ defaults: { ease: "expo.out" } })

    // Ken Burns background image scale & fade
    tl.fromTo('.header-bg-image',
      { scale: 1.1, opacity: 0 },
      { scale: 1, opacity: 0.6, duration: 4, ease: "power2.out" },
      0
    )

    // Abstract Ambient Lights fade in
    tl.to('.ambient-glow',
      { opacity: 1, duration: 4, ease: "power2.out" },
      0
    )

    // Vertical edge text drops in
    tl.fromTo('.edge-branding',
      { y: -60, opacity: 0 },
      { y: 0, opacity: 0.7, duration: 2 },
      0.5
    )

    // Main Header Word Reveals (Emerging from hidden overflow boxes)
    tl.fromTo('.title-word',
      { y: '160%', opacity: 0, rotateZ: 5 },
      { y: '0%', opacity: 1, rotateZ: 0, duration: 2, stagger: 0.15 },
      0.2
    )

    // Description and Details slide up
    tl.fromTo('.technical-details',
      { x: 40, opacity: 0 },
      { x: 0, opacity: 1, duration: 2, stagger: 0.15 },
      1.0
    )

  }, { scope: containerRef })

  return (
    <div ref={containerRef} className="pt-36 pb-12 px-6 md:px-16 w-full min-h-[45vh] relative overflow-hidden flex flex-col justify-end">

      {/* Immersive Image Background */}
      <div className="absolute inset-0 z-0 bg-surface">
        <Image
          src="/images/collection_ambassador.png"
          alt="Célune Brand Ambassador"
          fill
          priority
          className="header-bg-image object-cover object-center mix-blend-multiply opacity-0"
        />
        {/* Gradient overlays to guarantee text legibility against complex images */}
        <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/60 to-surface/20" />
        <div className="absolute inset-0 bg-gradient-to-b from-surface/80 via-transparent to-transparent" />
      </div>

      {/* Abstract Cinematic Lighting overlaid on Image */}
      <div className="ambient-glow absolute top-[-20%] right-[-10%] w-[60vw] h-[600px] bg-brand-terracotta/10 blur-[120px] rounded-full z-0 pointer-events-none mix-blend-multiply opacity-0" />
      <div className="ambient-glow absolute bottom-0 left-0 w-1/3 h-[300px] bg-brand-burnt/5 blur-[100px] rounded-full z-0 pointer-events-none opacity-0" />

      <div className="w-full max-w-[1440px] mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end">

        {/* Column 1: Vertical Indexing (Edge Branding) */}
        <div className="hidden lg:flex col-span-1 flex-col justify-between h-full border-l border-brand-burnt/10 pl-4 py-4">
          <span className="edge-branding font-inter text-[9px] uppercase tracking-[0.4em] text-brand-burnt" style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>
            Catalogue — 01
          </span>
          <div className="edge-branding w-px h-24 bg-brand-burnt/20 mt-8" />
        </div>

        {/* Column 2: Massive Asymmetric Typography */}
        <div className="col-span-1 lg:col-span-7 flex flex-col items-start relative">
          <span className="technical-details font-inter text-[10px] uppercase tracking-[0.2em] font-medium text-brand-terracotta mb-8 flex items-center gap-x-3">
            <span className="w-12 h-px bg-brand-terracotta/40"></span>
            The Archives
          </span>
          <h1 className="font-playfair text-6xl md:text-[8.5rem] leading-[0.85] text-brand-burnt tracking-tighter flex flex-col relative z-20 ">
            {/* Using hidden spans to act as clipping masks for the slide-up animation */}
            <span className="overflow-hidden pb-4 mb-[-1rem] pr-12">
              <span className="title-word inline-block drop-shadow-sm origin-bottom-left">The</span>
            </span>
            {/* Expanded padding and negative margins act as a larger clipping mask to prevent cutting off the absolute micro-label */}
            <span className="overflow-hidden w-full pt-12 pr-24 pb-6 -mt-12 -mr-24 lg:ml-24">
              <span className="title-word inline-block italic font-light text-brand-terracotta drop-shadow-sm relative origin-bottom-left">
                Monograph
                {/* Decorative Micro-Label attached to title */}
                <span className="absolute -top-6 -right-16 md:-right-6 font-inter text-[8px] uppercase tracking-widest font-medium text-brand-burnt/80 not-italic w-24">
                  (Curated Formulations)
                </span>
              </span>
            </span>
          </h1>
        </div>

        {/* Column 3: Grounded Technical Description */}
        <div className="col-span-1 lg:col-span-4 flex flex-col justify-end lg:pb-6">
          <p className="technical-details font-outfit text-sm md:text-base text-brand-burnt/70 leading-relaxed font-light mb-8 max-w-sm">
            A curated taxonomy of formulations engineered to elevate your daily ritual. Discover the true intersection of clinical efficacy and luxurious sensory texture.
          </p>
          <div className="flex gap-x-12 border-t border-brand-burnt/10 pt-6">
            <div className="technical-details flex flex-col gap-y-1">
              <span className="font-inter text-[9px] uppercase tracking-[0.2em] text-brand-burnt/40">Status</span>
              <span className="font-outfit text-sm text-brand-burnt">Active Array</span>
            </div>
            <div className="technical-details flex flex-col gap-y-1">
              <span className="font-inter text-[9px] uppercase tracking-[0.2em] text-brand-burnt/40">Index</span>
              {/* Live technical data fetch */}
              <span className="font-outfit text-sm text-brand-terracotta font-medium">{formulationCount} Formulations</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
