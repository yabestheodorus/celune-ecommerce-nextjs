'use client'

import React, { useState, useRef, useEffect } from 'react'
import { createPortal } from 'react-dom'
import Image from 'next/image'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { PiX, PiCaretLeft, PiCaretRight } from 'react-icons/pi'
import { type Product } from '@/lib/queries'


const ProductGallery = ({ product }: { product: Product }) => {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isLightboxOpen, setIsLightboxOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)


  const images = product.images


  useEffect(() => {
    setMounted(true)
  }, [])

  useGSAP(() => {
    gsap.fromTo('.main-image',
      { opacity: 0.8, scale: 0.98 },
      { opacity: 1, scale: 1, duration: 0.8, ease: 'power3.out' }
    )
  }, { scope: containerRef, dependencies: [activeIndex] })

  // Lock scroll when lightbox is open
  useEffect(() => {
    if (isLightboxOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => { document.body.style.overflow = 'unset' }
  }, [isLightboxOpen])

  const nextSlide = (e: React.MouseEvent) => {
    e.stopPropagation()
    setActiveIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))
  }

  const prevSlide = (e: React.MouseEvent) => {
    e.stopPropagation()
    setActiveIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
  }

  return (
    <>
      <div ref={containerRef} className="flex flex-col md:flex-row gap-6 w-full">
        {/* Thumbnails */}
        <div className="flex md:flex-col gap-4 order-2 md:order-1 overflow-x-auto no-scrollbar py-2 md:py-0">
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIndex(idx)}
              className={`relative flex-shrink-0 w-20 h-24 md:w-24 md:h-32 overflow-hidden border cursor-pointer transition-all duration-300 group ${activeIndex === idx ? 'border-brand-burnt/60 opacity-100' : 'border-transparent opacity-50 hover:opacity-100'
                }`}
            >
              <Image
                src={img}
                alt={`Thumbnail ${idx}`}
                fill

                className="object-cover transition-transform duration-500 group-hover:scale-110" sizes="100px" />
            </button>
          ))}
        </div>

        {/* Main Image View */}
        <div
          className="relative aspect-[3/4] md:aspect-[4/5] flex-1 bg-surface-container-low border border-brand-burnt/5 overflow-hidden order-1 md:order-2 group cursor-pointer"
          onClick={() => setIsLightboxOpen(true)}
        >
          <div className="absolute top-4 left-4 z-10">
            <span className="font-inter text-[10px] uppercase tracking-widest text-brand-burnt font-bold bg-white/40 backdrop-blur-md px-3 py-1 pointer-events-none">
              Monograph Edition
            </span>
          </div>
          <Image
            src={images[activeIndex]}
            alt="Product Main"
            fill
            priority
            sizes="(max-width: 768px) 50vw, 25vw"
            className="main-image object-cover transition-transform duration-1000 group-hover:scale-110"
          />
        </div>
      </div>

      {/* Lightbox Overlay via Portal */}
      {mounted && isLightboxOpen && createPortal(
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 backdrop-blur-md" onClick={() => setIsLightboxOpen(false)}>

          {/* Close Button */}
          <button
            className="absolute top-8 right-8 z-[10005] text-white/50 hover:text-white transition-colors duration-300"
            onClick={(e) => { e.stopPropagation(); setIsLightboxOpen(false); }}
          >
            <PiX size={32} />
          </button>

          {/* Navigation Controls */}
          <button
            className="absolute left-4 md:left-12 top-1/2 -translate-y-1/2 z-[10005] w-14 h-14 flex items-center justify-center rounded-full bg-white/5 border border-white/10 text-white/50 hover:text-white hover:bg-white/10 hover:scale-105 active:scale-95 transition-all duration-300"
            onClick={prevSlide}
          >
            <PiCaretLeft size={24} />
          </button>

          <button
            className="absolute right-4 md:right-12 top-1/2 -translate-y-1/2 z-[10005] w-14 h-14 flex items-center justify-center rounded-full bg-white/5 border border-white/10 text-white/50 hover:text-white hover:bg-white/10 hover:scale-105 active:scale-95 transition-all duration-300"
            onClick={nextSlide}
          >
            <PiCaretRight size={24} />
          </button>

          {/* Large Image Container */}
          <div className="relative w-full max-w-4xl h-[70vh] md:h-[85vh] px-4 md:px-0" onClick={(e) => e.stopPropagation()}>
            <Image
              src={images[activeIndex]}
              alt="Lightbox View"
              fill
              className="object-contain"
              sizes="100vw"
              priority
            />
          </div>

          {/* Lightbox Thumbnails */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-x-4 z-[10005]" onClick={(e) => e.stopPropagation()}>
            {images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActiveIndex(idx)}
                className={`relative w-12 h-16 border transition-all duration-300 ${activeIndex === idx ? 'border-white opacity-100' : 'border-transparent opacity-30 hover:opacity-100'}`}
              >
                <Image src={img} alt={`LB Thumb ${idx}`} fill className="object-cover" sizes="50px" />
              </button>
            ))}
          </div>

        </div>,
        document.body
      )}
    </>
  )
}

export default ProductGallery
