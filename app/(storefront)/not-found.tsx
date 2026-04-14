import Link from 'next/link'
import React from 'react'
import { PiArrowRight } from 'react-icons/pi'

export default function NotFound() {
  return (
    <div className="min-h-[80vh] bg-surface flex flex-col items-center justify-center px-6 relative overflow-hidden">
      {/* Decorative Brand SVG background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl opacity-[0.03] pointer-events-none text-brand-burnt">
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <path fill="currentColor" d="M38.8,-46.2C49.9,-36.4,58.4,-23.4,61.9,-8.9C65.4,5.6,63.9,21.6,56.1,34.8C48.2,48.1,34,58.7,19.3,62.1C4.6,65.5,-10.5,61.7,-24.1,54.4C-37.7,47.1,-49.8,36.3,-57.4,22.8C-65,9.4,-68,-6.8,-63.3,-20.9C-58.7,-35.1,-46.4,-47.2,-33.1,-56C-19.8,-64.8,-5.5,-70.2,7.2,-68.8C19.9,-67.4,30.3,-59.2,38.8,-46.2Z" transform="translate(100 100)" />
        </svg>
      </div>

      <div className="flex flex-col items-center text-center z-10 max-w-2xl">
        <span className="font-outfit text-brand-terracotta text-xl mb-4 font-light tracking-widest">404</span>
        <h1 className="font-playfair text-5xl md:text-7xl text-brand-burnt italic mb-6">Page Not Found</h1>
        <p className="font-inter text-brand-burnt/60 mb-12 max-w-md mx-auto leading-relaxed">
          The editorial piece or product you are looking for has been moved or no longer exists in our archives.
        </p>

        <Link href="/" className="group flex items-center gap-x-4 border-b border-brand-burnt pb-2 font-inter text-xs uppercase tracking-[0.2em] font-medium text-brand-burnt hover:text-brand-terracotta hover:border-brand-terracotta transition-colors duration-300">
          <span>Return Home</span>
          <PiArrowRight size={16} className="group-hover:translate-x-2 transition-transform duration-300" />
        </Link>
      </div>
    </div>
  )
}
