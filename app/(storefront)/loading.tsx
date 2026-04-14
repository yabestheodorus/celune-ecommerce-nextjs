import React from 'react'
import { PiStarFourFill } from 'react-icons/pi'

export default function Loading() {
  return (
    <div className="min-h-[80vh] w-full flex flex-col items-center justify-center bg-surface">
      <div className="relative flex items-center justify-center w-32 h-32">
        {/* Outer spinning ring */}
        <div className="absolute inset-0 rounded-full border-t-2 border-brand-terracotta/30 animate-[spin_3s_linear_infinite]"></div>
        {/* Inner spinning ring (reverse) */}
        <div className="absolute inset-2 rounded-full border-r-2 border-brand-burnt/10 animate-[spin_4s_linear_infinite_reverse]"></div>
        {/* Inner pulsing star */}
        <PiStarFourFill size={20} className="text-brand-terracotta animate-pulse" />
      </div>
      <span className="mt-8 font-inter text-[10px] uppercase tracking-[0.4em] font-medium text-brand-burnt/50 animate-pulse">
        Curating Experience
      </span>
    </div>
  )
}
