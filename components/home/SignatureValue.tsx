'use client'

import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/all'
import React, { useRef } from 'react'
import { PiStarFourFill } from 'react-icons/pi'

gsap.registerPlugin(ScrollTrigger)

const SignatureValue = () => {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const itemsRef = useRef<(HTMLDivElement | null)[]>([])

  useGSAP(() => {
    // Filter nulls to prevent GSAP errors
    const items = itemsRef.current.filter((el): el is HTMLDivElement => el !== null)

    gsap.to(items, {
      y: 0,
      opacity: 1,
      stagger: 0.2,
      duration: 1,
      ease: "power2.inOut",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 20%",
        end: "bottom 75%",
        toggleActions: "play none none reverse",
      }
    })
  }, { scope: containerRef })

  const values = [
    {
      id: "01",
      title: "Clinical Precision",
      description: "Advanced formulations backed by science, designed for real, visible transformation."
    },
    {
      id: "02",
      title: "Refined Minimalism",
      description: "No unnecessary ingredients. Only what your skin truly needs."
    },
    {
      id: "03",
      title: "Sensory Ritual",
      description: "Lightweight textures, subtle fragrance, and a calming experience in every application."
    }
  ]

  return (
    <section ref={containerRef} className='relative w-full min-h-screen bg-surface-container-low py-32 px-12 flex flex-col items-center justify-center overflow-hidden border-t border-brand-burnt/5'>

      {/* Background Ornament */}
      <div className='absolute top-20 left-1/2 -translate-x-1/2 opacity-[0.03] select-none pointer-events-none'>
        <h2 className='font-playfair text-[20rem] whitespace-nowrap italic'>Signature Values</h2>
      </div>

      <div className='flex flex-col items-center mb-24 z-10'>
        <div className='flex items-center gap-x-4 mb-4'>
          <div className='w-12 h-px bg-brand-terracotta/30'></div>
          <span className='font-inter text-[12px] uppercase tracking-[0.5em] text-brand-terracotta font-bold'>Core Pillars</span>
          <div className='w-12 h-px bg-brand-terracotta/30'></div>
        </div>
        <h2 className='font-playfair text-6xl text-brand-burnt text-center leading-tight'>
          The Célune <span className='italic font-light'>Commitment</span>
        </h2>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-3 gap-12 w-full max-w-7xl z-10'>
        {values.map((item, index) => (
          <div
            key={item.id}
            ref={el => { itemsRef.current[index] = el }}
            className='flex flex-col p-10 bg-white/40 backdrop-blur-md rounded-[2.5rem] border border-white/60 shadow-sm transition-all duration-500 hover:shadow-xl hover:-translate-y-2 translate-y-100 group opacity-0'
          >
            <div className='flex items-center justify-between mb-8'>
              <span className='font-outfit text-5xl font-extralight text-brand-terracotta/30 group-hover:text-brand-terracotta/60 transition-colors duration-500'>
                {item.id}
              </span>
              <PiStarFourFill size={20} className='text-brand-burnt/10 group-hover:text-brand-terracotta/40 transition-all duration-700 group-hover:rotate-180' />
            </div>

            <h3 className='font-playfair text-3xl text-brand-burnt mb-6 leading-tight'>
              {item.title}
            </h3>

            <p className='font-inter text-[15px] leading-relaxed text-brand-burnt/70 font-medium'>
              {item.description}
            </p>

            <div className='mt-10 self-start overflow-hidden'>
              <div className='w-8 h-[2px] bg-brand-terracotta/40 group-hover:w-full transition-all duration-700 ease-in-out'></div>
            </div>
          </div>
        ))}
      </div>

      {/* Structured Lines */}
      <div className='absolute left-12 bottom-12 flex flex-col gap-y-1 opacity-20'>
        <span className='font-inter text-[10px] uppercase tracking-widest font-bold text-brand-burnt'>Values / Foundation</span>
        <span className='font-outfit text-[10px] uppercase tracking-widest font-medium text-brand-burnt'>© Celune 2024</span>
      </div>
    </section>
  )
}

export default SignatureValue
