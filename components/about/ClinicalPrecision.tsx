'use client'

import React, { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import Image from 'next/image'

const ClinicalPrecision = () => {
  const container = useRef<HTMLElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    if (!container.current) return;
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container.current,
        start: 'top 60%',
      }
    })

    tl.fromTo(
      container.current.querySelector('.bg-reveal'),
      { scaleX: 0 },
      { scaleX: 1, duration: 1.5, ease: 'power4.inOut' }
    )
    .fromTo(
      container.current.querySelectorAll('.content-stagger'),
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, stagger: 0.15, ease: 'power3.out' },
      '-=0.5'
    )

    // Numbers animation
    container.current.querySelectorAll('.stat-number').forEach((stat) => {
      const el = stat as HTMLElement;
      const target = parseInt(el.innerText)
      gsap.fromTo(el, 
        { innerText: 0 },
        { 
          innerText: target, 
          duration: 2, 
          snap: { innerText: 1 },
          scrollTrigger: {
            trigger: stat,
            start: 'top 90%',
          }
        }
      )
    })
  }, { scope: container })

  return (
    <section 
      ref={container}
      className="relative w-full py-32 md:py-56 px-6 md:px-12 bg-surface text-brand-burnt/10 overflow-hidden"
    >
      {/* Dynamic Background */}
      <div className="bg-reveal absolute inset-x-0 inset-y-8 md:inset-y-16 bg-brand-burnt z-0 origin-left" />

      <div className="max-w-7xl mx-auto relative z-10 text-white flex flex-col md:grid md:grid-cols-2 gap-20 items-center">
        
        <div className="space-y-12">
          <div className="space-y-6">
            <span className="content-stagger block font-inter text-[10px] uppercase tracking-[0.5em] font-bold text-brand-terracotta">Molecular Integrity</span>
            <h2 className="content-stagger font-playfair text-5xl md:text-7xl italic leading-tight">
              Clinical <br />by Design.
            </h2>
          </div>
          
          <div className="content-stagger space-y-8 max-w-lg font-inter text-white/70 text-lg leading-relaxed">
            <p>
              While we draw inspiration from nature, our standards are uncompromisingly scientific. Every drop is formulated in our Berlin laboratory using cellular-compatible technologies.
            </p>
            <p>
              We prioritize bioactive stability over generic trends, ensuring that the botanical essences retain their maximum potency from harvest to skin application.
            </p>
          </div>

          <div ref={statsRef} className="content-stagger grid grid-cols-2 gap-12 pt-12 border-t border-white/10">
            <div className="flex flex-col gap-y-2">
              <div className="flex items-baseline gap-x-1">
                <span className="stat-number font-playfair text-5xl md:text-6xl text-brand-terracotta italic">18</span>
                <span className="font-playfair text-2xl text-brand-terracotta italic">mo+</span>
              </div>
              <span className="font-inter text-[8px] uppercase tracking-widest text-white/40 font-bold">Research Period</span>
            </div>
            <div className="flex flex-col gap-y-2">
              <div className="flex items-baseline gap-x-1">
                <span className="stat-number font-playfair text-5xl md:text-6xl text-brand-terracotta italic">100</span>
                <span className="font-playfair text-2xl text-brand-terracotta italic">%</span>
              </div>
              <span className="font-inter text-[8px] uppercase tracking-widest text-white/40 font-bold">Bio-compatible</span>
            </div>
          </div>
        </div>

        <div className="content-stagger relative aspect-square w-full md:max-w-md ml-auto overflow-hidden rounded-3xl">
           <Image
             src="/celune_about_clinical_precision_1776158863773.png"
             alt="Clinical Laboratory"
             fill
             className="object-cover"
           />
           <div className="absolute inset-0 bg-brand-burnt/20 mix-blend-overlay" />
        </div>

      </div>
    </section>
  )
}

export default ClinicalPrecision
