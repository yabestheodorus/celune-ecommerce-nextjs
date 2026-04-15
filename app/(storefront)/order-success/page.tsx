import React from 'react'
import Link from 'next/link'
import { PiCheckCircleLight, PiArrowRightLight } from 'react-icons/pi'

export default function OrderSuccessPage() {
  return (
    <div className="min-h-screen bg-[#faf9f6] flex items-center justify-center px-6">
      <div className="max-w-xl w-full text-center py-20 bg-white/40 backdrop-blur-3xl rounded-[3rem] p-12 border border-white/40 shadow-2xl shadow-brand-burnt/5 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-brand-terracotta/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-brand-burnt/5 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl"></div>

        <div className="relative z-10">
          <div className="flex justify-center mb-8">
            <div className="w-24 h-24 rounded-full bg-brand-burnt/5 flex items-center justify-center">
              <PiCheckCircleLight size={48} className="text-brand-terracotta" />
            </div>
          </div>
          
          <h1 className="font-playfair text-4xl md:text-6xl text-brand-burnt italic mb-6 leading-tight">
            Order <span className="not-italic font-light opacity-30">&</span> Gratitude
          </h1>
          
          <div className="w-12 h-px bg-brand-burnt/10 mx-auto mb-8"></div>
          
          <p className="font-inter text-sm text-brand-burnt/60 leading-relaxed mb-12 px-4 max-w-md mx-auto">
            Your synthesis is complete. A monograph of your selection and a tracking protocol will arrive in your digital mailbox shortly.
          </p>

          <div className="flex flex-col gap-4">
            <Link 
              href="/orders" 
              className="group inline-flex items-center justify-center gap-3 px-12 py-5 bg-brand-burnt text-white rounded-full font-inter text-[11px] uppercase tracking-[0.4em] font-medium hover:bg-brand-terracotta transition-all duration-500 hover:scale-[1.02] active:scale-95"
            >
              <span>View My Orders</span>
              <PiArrowRightLight className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link 
              href="/collections" 
              className="group inline-flex items-center justify-center gap-3 px-12 py-5 bg-transparent text-brand-burnt/50 rounded-full font-inter text-[11px] uppercase tracking-[0.4em] font-medium hover:text-brand-burnt transition-all duration-500"
            >
              <span>Continue Discovery</span>
              <PiArrowRightLight className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
