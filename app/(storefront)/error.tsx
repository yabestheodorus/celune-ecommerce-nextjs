'use client'

import React, { useEffect } from 'react'
import { PiArrowRight, PiWarningCircleLight } from 'react-icons/pi'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <div className="min-h-[80vh] bg-surface flex flex-col items-center justify-center px-6 relative overflow-hidden">
      <div className="flex flex-col items-center text-center z-10 max-w-2xl">
        <PiWarningCircleLight size={48} className="text-brand-terracotta mb-6 opacity-80" />
        <h1 className="font-playfair text-4xl md:text-5xl text-brand-burnt italic mb-4">An Interruption Occurred</h1>
        <p className="font-inter text-brand-burnt/60 mb-12 max-w-sm mx-auto leading-relaxed">
          We encountered a disruption while preparing your experience. Please attempt to refresh or try again.
        </p>

        <button
          onClick={() => reset()}
          className="group flex items-center gap-x-4 border border-brand-burnt px-8 py-4 font-inter text-xs uppercase tracking-[0.2em] font-medium text-brand-burnt hover:bg-brand-burnt hover:text-white transition-all duration-500 cursor-pointer active:scale-95"
        >
          <span>Try Again</span>
          <PiArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
        </button>
      </div>
    </div>
  )
}
