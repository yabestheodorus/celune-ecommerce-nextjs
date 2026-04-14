'use client'

import React, { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import Image from 'next/image'

const PhilosophySection = () => {
  const container = useRef<HTMLElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    if (!container.current || !imageRef.current || !textRef.current) return;
    gsap.fromTo(
      imageRef.current,
      { clipPath: 'inset(100% 0% 0% 0%)', y: 50 },
      {
        clipPath: 'inset(0% 0% 0% 0%)',
        y: 0,
        duration: 1.5,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: imageRef.current,
          start: 'top 80%',
        }
      }
    )

    gsap.fromTo(
      textRef.current.children,
      { opacity: 0, x: -30 },
      {
        opacity: 1,
        x: 0,
        duration: 1,
        stagger: 0.2,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: textRef.current,
          start: 'top 75%',
        }
      }
    )
  }, { scope: container })

  return (
    <section
      ref={container}
      className="w-full py-32 md:py-48 px-6 md:px-12 bg-surface overflow-hidden"
    >
      <div className="max-w-7xl mx-auto flex flex-col md:grid md:grid-cols-12 gap-16 md:gap-8 items-center">

        {/* Left Side: Overlapping Image */}
        <div className="md:col-span-7 relative order-2 md:order-1">
          <div
            ref={imageRef}
            className="relative aspect-[4/5] md:aspect-[16/10] overflow-hidden rounded-2xl md:rounded-3xl shadow-2xl shadow-brand-burnt/5"
          >
            <Image
              src="/celune_about_heritage_ritual_1776158843234.png"
              alt="Botanical Essence"
              fill
              className="object-cover"
            />
          </div>

          {/* Accent Badge */}
          <div className="absolute -bottom-10 -right-10 md:-right-20 w-32 h-32 md:w-48 md:h-48 rounded-full border border-brand-burnt/10 flex items-center justify-center p-8 text-center bg-glass-bg backdrop-blur-xl z-10 hidden md:flex">
            <span className="font-playfair italic text-xs text-brand-burnt/60 leading-snug">
              Curated by The Curator
            </span>
          </div>
        </div>

        {/* Right Side: Editorial Text */}
        <div
          ref={textRef}
          className="md:col-span-5 flex flex-col gap-y-8 order-1 md:order-2 md:pl-16"
        >
          <span className="font-inter text-[8px] uppercase tracking-[0.4em] font-bold text-brand-terracotta">The Philosophy</span>
          <h2 className="font-playfair text-5xl md:text-6xl text-brand-burnt italic leading-tight">
            Silence Between <br /> the Notes.
          </h2>
          <div className="space-y-6 font-inter text-brand-burnt/70 text-lg leading-relaxed">
            <p>
              Célune was born from the realization that modern skincare had become too clinical, losing the tactile soul of the apothecary ritual.
            </p>
            <p>
              We believe in "Intentional Quietude." Every formula is a monograph of biological precision, designed to be experienced with the same reverence as a rare vintage or a fine piece of art.
            </p>
            <p className="font-spectral italic text-xl text-brand-burnt">
              "We don't just formulate for the skin; we curate for the human experience."
            </p>
          </div>
        </div>

      </div>
    </section>
  )
}

export default PhilosophySection
