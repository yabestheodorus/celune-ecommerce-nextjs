'use client'

import React, { useRef, useEffect, useState } from 'react'
import Image from 'next/image'
import ProductCard from '@/components/product/ProductCard'

import gsap from 'gsap'
import { PiStarFourFill } from 'react-icons/pi'
import { useGSAP } from '@gsap/react'
import { type Product } from '@/lib/queries'

interface PromoFlashProps {
  products: Product[]
}

const PromoFlash = ({ products }: PromoFlashProps) => {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const tickerRef = useRef<HTMLDivElement | null>(null)

  // Mock Countdown State
  const [timeLeft, setTimeLeft] = useState({
    hours: 12,
    minutes: 45,
    seconds: 20
  })

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 }
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 }
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 }
        return prev
      })
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const [activeSlide, setActiveSlide] = useState(0)

  const bannerSlides = [
    {
      id: 1,
      tag: "Seasonal Edit",
      title: "Autumnal Radiance",
      image: "/images/banner1.jpeg",
      desc: "Limited Edition Monograph Series"
    },
    {
      id: 2,
      tag: "Seasonal Edit",
      title: "Autumnal Radiance",
      image: "/images/banner2.jpeg",
      desc: "Limited Edition Monograph Series"
    },
    {
      id: 3,
      tag: "Private Partnership",
      title: "Exclusive 20% Off",
      image: "/images/banner3.jpeg",

      desc: "With BCA Credit Card Payment"
    },
    {
      id: 4,
      tag: "Grand Opening",
      title: "Célune Boutique",
      image: "/images/banner4.jpeg",

      desc: "Our Second Home Now Open"
    }
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide(prev => (prev + 1) % bannerSlides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  // Ticker animation
  useGSAP(() => {
    gsap.to(tickerRef.current, {
      xPercent: -50,
      repeat: -1,
      duration: 20,
      ease: "none"
    })
  }, { scope: containerRef })


  const flashSaleItems = products.slice(0, 5)

  return (
    <section ref={containerRef} className='relative min-h-dvh w-full  overflow-hidden flex flex-col'>

      {/* 1. Promotional Banner (Ticker) */}
      <div className='w-full bg-brand-burnt py-2 border-b border-white/10 uppercase overflow-hidden whitespace-nowrap z-50'>
        <div ref={tickerRef} className='flex gap-x-20 w-fit px-4'>
          {[1, 2, 3, 4].map((i: number) => (
            <span key={i} className='font-inter text-[10px] tracking-[0.4em] font-bold text-[#E7D9BE] flex items-center gap-x-4'>
              Private Collection Access: Use Code "CELUNE-ELITE" for 20% Off <PiStarFourFill size={10} /> Limited Quantities Available <PiStarFourFill size={10} />
            </span>
          ))}
        </div>
      </div>

      {/* 2. Visual Ads Carousel — horizontal slide track */}
      <div className='w-full h-[40vh] md:h-[50vh] relative overflow-hidden group'>

        {/* Sliding track */}
        <div
          className='flex h-full transition-transform duration-700 ease-in-out'
          style={{
            transform: `translateX(-${activeSlide * (100 / bannerSlides.length)}%)`,
            width: `${bannerSlides.length * 100}%`,
          }}
        >
          {bannerSlides.map((slide: { id: number; tag: string; title: string; image: string; desc: string }) => (
            <div
              key={slide.id}
              className='relative flex-shrink-0 h-full overflow-hidden'
              style={{ width: `${100 / bannerSlides.length}%` }}
            >
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                priority
                className='object-cover transition-all duration-1000'
                sizes="100vw"
              />
            </div>
          ))}
        </div>

        {/* Carousel Indicators */}
        <div className='absolute bottom-8 left-12 flex gap-x-4 z-20'>
          {bannerSlides.map((_: any, idx: number) => (
            <button
              key={idx}
              onClick={() => setActiveSlide(idx)}
              className={`h-px transition-all duration-500 ${idx === activeSlide ? 'w-16 bg-[#E7D9BE]' : 'w-6 bg-white/20 hover:bg-white/40'}`}
            />
          ))}
        </div>
      </div>

      {/* 3. Flash Sale Body */}
      <div className='flex-1 flex flex-col items-start justify-center mt-12 px-12 relative py-4'>

        {/* Decorative Background Blob */}
        <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] opacity-10 pointer-events-none'>
          <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <path fill="#FAF9F6" d="M38.8,-46.2C49.9,-36.4,58.4,-23.4,61.9,-8.9C65.4,5.6,63.9,21.6,56.1,34.8C48.2,48.1,34,58.7,19.3,62.1C4.6,65.5,-10.5,61.7,-24.1,54.4C-37.7,47.1,-49.8,36.3,-57.4,22.8C-65,9.4,-68,-6.8,-63.3,-20.9C-58.7,-35.1,-46.4,-47.2,-33.1,-56C-19.8,-64.8,-5.5,-70.2,7.2,-68.8C19.9,-67.4,30.3,-59.2,38.8,-46.2Z" transform="translate(100 100)" />
          </svg>
        </div>
        {/* 3.1 Flash Sale Header - Justified Between */}
        <div className='w-full flex flex-col md:flex-row justify-between items-end mb-8 gap-y-6'>
          <div className='flex flex-col items-start gap-y-1'>
            <span className='font-inter text-[9px] uppercase tracking-[0.4em] text-brand-burnt/40 font-bold'>Limited Release No. 04</span>
            <h2 className='font-playfair text-4xl md:text-5xl text-brand-burnt italic'>The Monograph Sale</h2>
          </div>

          {/* Countdown Timer */}
          <div className='flex gap-x-6'>
            {[
              { label: 'Hrs', value: timeLeft.hours },
              { label: 'Min', value: timeLeft.minutes },
              { label: 'Sec', value: timeLeft.seconds }
            ].map((t: { label: string; value: number }, idx: number) => (
              <div key={idx} className='flex flex-col items-center'>
                <span className='font-playfair text-4xl md:text-5xl text-brand-terracotta font-extralight tabular-nums'>
                  {String(t.value).padStart(2, '0')}
                </span>
                <span className='font-inter text-[8px] uppercase tracking-[0.2em] text-brand-burnt/40 font-bold mt-1'>{t.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 3.2 Product Grid - Fixed 5-Column Grid */}
        <div className='grid grid-cols-2 lg:grid-cols-4 gap-4 w-full z-10'>
          {flashSaleItems.map((item: Product, idx: number) => (
            <ProductCard key={idx} item={item} />
          ))}
        </div>

      </div>

      {/* Floating Scroll Guide */}
      <div className='absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-y-4 opacity-30'>
        <span className='font-inter text-[9px] uppercase tracking-[0.4em] font-bold text-brand-burnt'>Scroll to Editorial</span>
        <div className='w-px h-12 bg-black/10 relative overflow-hidden'>
          <div className='absolute top-0 left-0 w-full h-1/2 bg-brand-terracotta animate-scroll-dash'></div>
        </div>
      </div>
    </section>
  )
}

export default PromoFlash
