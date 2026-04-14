import React from 'react'
import Image from 'next/image'
import { PiStarFourFill } from 'react-icons/pi'
import HeroCanvas from './HeroCanvas'


const Hero = () => {
  return (
    <section className='relative h-[100dvh] pt-46 px-12 w-full'>

      <div className='absolute top-0 left-0 w-full h-screen z-0'>
        <HeroCanvas />
      </div>

      <h1 className="font-lora text-[7rem] font-[100] tracking-tight leading-none">
        Care with <span className="italic text-brand-burnt/80">Intention</span>,
        <span className="relative "><PiStarFourFill size={65} className='absolute top-6 right-0 text-brand-burnt/40 rotate-30' /> glow </span> with <span className="italic text-brand-burnt/80">Confidence</span>
      </h1>


      {/* Decorative Vertical Text */}
      <div className='absolute right-12 top-1/2 -translate-y-1/2 flex flex-col items-center gap-y-8 [writing-mode:vertical-rl] z-10'>
        <div className='w-[2px] h-24 bg-brand-burnt/10'></div>
        <span className='font-inter text-[12px] uppercase tracking-[0.5em] text-brand-burnt/40 font-medium'>
          EST 2024 — THE ART OF BOTANICAL SKINCARE
        </span>
        <div className='w-[2px] h-24 bg-brand-burnt/10'></div>
      </div>

      {/* Editorial Text Block */}
      <div className='absolute bottom-24 right-24 w-80 z-20'>
        <p className='font-spectral text-[1.3rem] italic text-brand-burnt/60 leading-[1.7] text-right'>
          "Nature's precision meets clinical excellence. Every drop is a ceremony of <span className='text-brand-terracotta/80'>radiance</span> and intent."
        </p>
        <div className='mt-4 flex flex-col items-end gap-y-1 opacity-50'>
          <span className='font-inter text-[12px] uppercase tracking-[0.3em] font-semibold'>Philosophy</span>
          <span className='font-playfair text-xl italic text-brand-burnt'>The Glow Ceremony</span>
        </div>
      </div>

      {/* Floating Benefit Highlights */}
      <div className='absolute top-1/2 right-48 flex flex-col gap-y-12 items-end z-20 pointer-events-none -translate-y-1/2'>
        <div className='flex items-center gap-x-4 group'>
          <div className='flex flex-col items-end'>
            <span className='font-inter text-[12px] uppercase tracking-widest text-brand-burnt/30'>Protocol No.</span>
            <span className='font-outfit text-4xl font-extralight text-brand-burnt/10'>01</span>
          </div>
          <div className='w-12 h-px bg-brand-burnt/10'></div>
          <span className='font-lora text-[12px] uppercase tracking-[0.2em] text-brand-burnt/80'>Clean Botanical</span>
        </div>

        <div className='flex items-center gap-x-4 group'>
          <div className='flex flex-col items-end'>
            <span className='font-inter text-[12px] uppercase tracking-widest text-brand-burnt/30'>Protocol No.</span>
            <span className='font-outfit text-4xl font-extralight text-brand-burnt/10'>02</span>
          </div>
          <div className='w-12 h-px bg-brand-burnt/10'></div>
          <span className='font-lora text-[12px] uppercase tracking-[0.2em] text-brand-burnt/80'>Pure Hydration</span>
        </div>
      </div>

      {/* Product Detail Glass Card */}
      <div className='absolute top-[48%] left-12  p-6 rounded-3xl bg-glass-bg backdrop-blur-xl border border-white/30 shadow-2xl z-30 group transition-all duration-500 hover:translate-y-[-5px] hover:bg-white/40'>
        <div className='flex flex-col gap-y-5'>
          <div className='flex justify-between items-center'>
            <span className='font-inter text-[10px] uppercase tracking-[0.25em] text-brand-burnt/60 font-bold'>
              Ritual Essentials
            </span>
            <div className='px-2 py-0.5 rounded-full border border-border-soft text-[8px] uppercase tracking-widest text-brand-terracotta font-bold'>
              New
            </div>
          </div>

          <div className='flex flex-col gap-y-1'>
            <h3 className='font-playfair text-2xl text-brand-burnt italic leading-tight'>The Radiance <br /> Complex</h3>
            <span className='font-outfit text-[11px] font-semibold text-brand-terracotta tracking-widest uppercase'>Aura Glow — 50ml</span>
          </div>

          <p className='font-inter max-w-sm text-[12px] leading-relaxed text-brand-burnt/80 font-medium'>
            A revolutionary botanical blend designed to restore natural luminosity and refine texture with surgical precision.
          </p>

          <div className='pt-2 flex items-center gap-x-4 cursor-pointer group/btn'>
            <div className='w-8 h-8 rounded-full border border-brand-burnt/10 flex items-center justify-center group-hover/btn:bg-brand-burnt group-hover/btn:text-white transition-all duration-300'>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14m-7-7 7 7-7 7" /></svg>
            </div>
            <span className='font-inter text-[10px] uppercase tracking-[0.2em] font-bold text-brand-burnt'>View Science</span>
          </div>
        </div>
      </div>

      {/* Social Proof Section */}
      <div className='absolute bottom-32 left-12 flex items-center gap-x-6'>
        <div className='flex items-center -space-x-5'>
          <div className='relative w-14 h-14 rounded-full border-[3px] border-surface-container-low overflow-hidden shadow-lg z-30 transition-transform hover:scale-110 duration-300'>
            <Image src="/images/avatars/avatar1.png" alt="Client 1" fill className='object-cover' sizes="56px" />
          </div>
          <div className='relative w-14 h-14 rounded-full border-[3px] border-surface-container-low overflow-hidden shadow-lg z-20 transition-transform hover:scale-110 duration-300'>
            <Image src="/images/avatars/avatar2.png" alt="Client 2" fill className='object-cover' sizes="56px" />
          </div>
          <div className='relative w-14 h-14 rounded-full border-[3px] border-surface-container-low overflow-hidden shadow-lg z-10 transition-transform hover:scale-110 duration-300'>
            <Image src="/images/avatars/avatar3.png" alt="Client 3" fill className='object-cover' sizes="56px" />
          </div>
        </div>

        <div className='flex flex-col'>
          <span className='font-outfit text-xl font-bold text-brand-burnt leading-tight tracking-tight'>50K+ Satisfied</span>
          <span className='font-inter text-xs font-semibold text-brand-burnt/60 uppercase tracking-widest'>Active Customers</span>
        </div>
      </div>
    </section>
  )
}

export default Hero
