'use client'

import React, { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import Image from 'next/image'

const items = [
  {
    title: "Extraction",
    description: "Slow-press extraction methods to preserve vitamin integrity.",
    image: "/celune_about_heritage_ritual_1776158843234.png", // Corrected path
  },
  {
    title: "Infusion",
    description: "Multi-layered saturation rituals for deep hydration.",
    image: "/celune_about_ritual_application_1776158884498.png",
  },
  {
    title: "Preservation",
    description: "Stable, light-protected packaging for consistent potency.",
    image: "/celune_about_hero_botanical_1776158822292.png", // Reuse hero
  }
]

const RitualGallery = () => {
  const sectionRef = useRef<HTMLElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    if (!scrollRef.current || !sectionRef.current) return;
    const scrollWidth = scrollRef.current.offsetWidth
    const windowWidth = window.innerWidth
    
    gsap.to(scrollRef.current, {
      x: () => -(scrollWidth - windowWidth),
      ease: 'none',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top top',
        end: () => `+=${scrollWidth}`,
        pin: true,
        scrub: 1,
        invalidateOnRefresh: true,
      }
    })
  }, { scope: sectionRef })

  return (
    <section 
      ref={sectionRef}
      className="w-full bg-surface overflow-hidden hidden md:block"
    >
      <div className="h-screen flex flex-col justify-center px-12">
        <div className="mb-16">
          <span className="font-inter text-[8px] uppercase tracking-[0.4em] font-bold text-brand-burnt/40 mb-4 block">The Rituals</span>
          <h2 className="font-playfair text-6xl text-brand-burnt italic">Moments of Intention</h2>
        </div>
        
        <div 
          ref={scrollRef}
          className="flex gap-x-24 w-fit pr-[20vw]"
        >
          {items.map((item, i) => (
            <div key={i} className="flex flex-col gap-y-8 w-[60vw] max-w-3xl shrink-0 group">
              <div className="relative aspect-[16/10] overflow-hidden rounded-2xl md:rounded-3xl">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-1000 group-hover:scale-105"
                />
                {/* Floating Index */}
                <div className="absolute top-8 left-8 w-12 h-12 rounded-full border border-white/20 backdrop-blur-md flex items-center justify-center text-white font-playfair italic">
                  0{i + 1}
                </div>
              </div>
              <div className="flex flex-col gap-y-4 max-w-md">
                <h3 className="font-playfair text-4xl text-brand-burnt italic">{item.title}</h3>
                <p className="font-inter text-brand-burnt/60 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default RitualGallery
