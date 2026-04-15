'use client'

import React, { useState } from 'react'
import Image from 'next/image'

const RITUAL_STEPS = [
  {
    id: 'cleansing',
    title: 'The Purity Mist',
    subtitle: 'Morning Invocation',
    image: '/celune_about_heritage_ritual_1776158843234.png',
    note: 'Begin with stillness. Mist the face from a distance of 20 cm.',
  },
  {
    id: 'essence',
    title: 'Terra Essence Infusion',
    subtitle: 'Morning & Evening',
    image: '/celune_about_ritual_application_1776158884498.png',
    note: 'Press three drops between palms, then cup the face for 10 seconds.',
  },
  {
    id: 'hydration',
    title: 'Velvet Hydration Seal',
    subtitle: 'Evening Closure',
    image: '/celune_about_clinical_precision_1776158863773.png',
    note: 'The final note of the ritual. Seal in warmth gently.',
  },
]

const RitualTracker = () => {
  const [completed, setCompleted] = useState<string[]>([])
  const [hovered, setHovered]    = useState<string | null>(null)

  const toggle = (id: string) =>
    setCompleted(prev =>
      prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
    )

  const progress = completed.length / RITUAL_STEPS.length

  return (
    <div className="relative py-20 px-6 md:px-24 border-t border-brand-burnt/5 overflow-hidden">

      {/* Warm glow background */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute right-0 top-0 w-[50vw] h-full opacity-[0.035]"
          style={{ background: 'radial-gradient(ellipse at 80% 30%, #BD663B, transparent 65%)' }}
        />
      </div>

      <div className="relative max-w-screen-xl mx-auto">
        {/* Section label */}
        <div className="flex items-center gap-5 mb-20">
          <span className="font-inter text-[9px] uppercase tracking-[0.5em] text-brand-terracotta font-bold whitespace-nowrap">
            Daily Intentions
          </span>
          <div className="flex-1 h-px" style={{
            background: 'linear-gradient(to right, rgba(189,102,59,0.2), transparent)'
          }} />
          <span className="font-inter text-[9px] text-brand-burnt/25 uppercase tracking-[0.3em] whitespace-nowrap shrink-0">
            {completed.length}/{RITUAL_STEPS.length} sanctified
          </span>
        </div>

        {/* Steps */}
        <div>
          {RITUAL_STEPS.map((step, i) => {
            const done = completed.includes(step.id)
            const isHovered = hovered === step.id

            return (
              <button
                key={step.id}
                onClick={() => toggle(step.id)}
                onMouseEnter={() => setHovered(step.id)}
                onMouseLeave={() => setHovered(null)}
                className="w-full group text-left border-b border-brand-burnt/5 last:border-b-0 focus:outline-none"
              >
                <div className={`flex items-center gap-6 md:gap-12 py-10 transition-all duration-700`}>

                  {/* Index */}
                  <span
                    className="font-inter text-[10px] tracking-widest shrink-0 transition-colors duration-500 w-6 text-right"
                    style={{ color: done ? 'rgba(189,102,59,0.35)' : 'rgba(124,45,18,0.15)' }}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>

                  {/* Title block */}
                  <div className="flex-1 min-w-0">
                    <span
                      className="font-inter text-[8px] uppercase tracking-[0.4em] font-bold block mb-2 transition-colors duration-500"
                      style={{ color: done ? 'rgba(189,102,59,0.4)' : 'rgba(124,45,18,0.2)' }}
                    >
                      {step.subtitle}
                    </span>
                    <h3
                      className="font-playfair italic transition-all duration-500"
                      style={{
                        fontSize: 'clamp(1.5rem, 3.5vw, 2.75rem)',
                        lineHeight: 1.1,
                        color: done ? 'rgba(189,102,59,0.35)' : '#7C2D12',
                        textDecoration: done ? 'line-through' : 'none',
                        textDecorationColor: 'rgba(189,102,59,0.3)',
                      }}
                    >
                      {step.title}
                    </h3>

                    {/* Ritual note — reveals on hover */}
                    <p
                      className="font-inter text-[12px] leading-relaxed text-brand-burnt/35 mt-3 transition-all duration-500 overflow-hidden"
                      style={{
                        maxHeight: isHovered && !done ? 60 : 0,
                        opacity: isHovered && !done ? 1 : 0,
                      }}
                    >
                      {step.note}
                    </p>
                  </div>

                  {/* Image */}
                  <div
                    className="relative shrink-0 rounded-2xl overflow-hidden transition-all duration-700"
                    style={{
                      width: 'clamp(80px, 10vw, 140px)',
                      height: 'clamp(56px, 7vw, 90px)',
                      opacity: done ? 0.15 : isHovered ? 0.95 : 0.45,
                      filter: done ? 'grayscale(1)' : isHovered ? 'grayscale(0)' : 'grayscale(0.6)',
                      transform: isHovered && !done ? 'scale(1.04)' : 'scale(1)',
                    }}
                  >
                    <Image src={step.image} alt={step.title} fill className="object-cover" />
                  </div>

                  {/* Completion indicator */}
                  <div
                    className="shrink-0 w-5 h-5 rounded-full border transition-all duration-500 flex items-center justify-center"
                    style={{
                      borderColor: done ? '#BD663B' : 'rgba(124,45,18,0.15)',
                      background: done ? '#BD663B' : 'transparent',
                    }}
                  >
                    {done && (
                      <svg width="10" height="7" viewBox="0 0 10 7" fill="none">
                        <path d="M1 3.5L3.5 6L9 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    )}
                  </div>
                </div>
              </button>
            )
          })}
        </div>

        {/* Progress whisper */}
        <div className="mt-14 flex items-center gap-8">
          <div className="flex-1 h-px bg-brand-burnt/5 relative overflow-hidden">
            <div
              className="absolute top-0 left-0 h-full transition-all duration-1000 ease-out"
              style={{
                width: `${progress * 100}%`,
                background: 'linear-gradient(to right, rgba(189,102,59,0.3), #BD663B)',
              }}
            />
          </div>
          <span className="font-playfair italic text-brand-burnt/25 text-sm shrink-0">
            {Math.round(progress * 100)}%
          </span>
        </div>
      </div>
    </div>
  )
}

export default RitualTracker
