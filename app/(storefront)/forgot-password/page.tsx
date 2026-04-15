'use client'

import React, { useRef } from 'react'
import Link from 'next/link'
import { ArrowLeft, Mail, Send } from 'lucide-react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

export default function ForgotPasswordPage() {
  const containerRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: 'expo.out' } })

    tl.fromTo('.recovery-title', 
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.5 },
      0.2
    )

    tl.fromTo('.recovery-card',
      { y: 60, opacity: 0, scale: 0.98 },
      { y: 0, opacity: 1, scale: 1, duration: 1.5, backdropFilter: 'blur(32px)' },
      0.4
    )

    tl.fromTo('.form-element',
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, stagger: 0.1 },
      0.8
    )
  }, { scope: containerRef })

  return (
    <div ref={containerRef} className="min-h-screen bg-sanctuary-bg flex items-center justify-center px-6 py-24 relative overflow-hidden">
      {/* Decorative Orbs */}
      <div className="absolute top-[-10%] right-[10%] w-[35vw] h-[35vw] bg-brand-terracotta/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[20%] left-[-5%] w-[25vw] h-[25vw] bg-brand-burnt/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="w-full max-w-lg relative z-10">
        <div className="mb-12 text-center">
          <Link href="/login" className="inline-flex items-center gap-2 group mb-8">
            <ArrowLeft className="w-4 h-4 text-brand-burnt/40 transition-transform group-hover:-translate-x-1" />
            <span className="font-inter text-[10px] uppercase tracking-[0.2em] font-semibold text-brand-burnt/40">
              Back to Login
            </span>
          </Link>
          <h1 className="recovery-title font-playfair text-5xl md:text-6xl text-brand-burnt italic leading-tight">
            Recover <br /> Access
          </h1>
          <p className="recovery-title font-inter text-sm text-brand-burnt/60 mt-4 max-w-xs mx-auto">
            Provide your registered email and we will dispatch a recovery protocol to your inbox.
          </p>
        </div>

        <div className="recovery-card glass-bg border border-brand-burnt/10 rounded-[2.5rem] p-8 md:p-12 shadow-2xl relative overflow-hidden">
          
          <form className="space-y-8">
            <div className="form-element space-y-2">
              <label className="font-inter text-[10px] uppercase tracking-[0.2em] font-semibold text-brand-burnt/40 ml-1">
                Registered Email
              </label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-burnt/30 transition-colors group-focus-within:text-brand-terracotta" />
                <input 
                  type="email" 
                  placeholder="name@monograph.com"
                  className="w-full bg-surface-container-low/50 border-none rounded-2xl py-4 pl-12 pr-4 font-inter text-sm text-brand-burnt placeholder:text-brand-burnt/20 focus:ring-1 focus:ring-brand-terracotta/20 outline-none transition-all"
                />
              </div>
            </div>

            <button className="form-element w-full bg-brand-burnt text-surface py-5 rounded-2xl font-inter text-xs uppercase tracking-[0.3em] font-bold hover:bg-brand-burnt/90 transition-all flex items-center justify-center gap-2 group shadow-lg shadow-brand-burnt/10">
              Send Dispatch
              <Send className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </button>
          </form>

          <div className="form-element mt-12 pt-8 border-t border-brand-burnt/5 text-center">
            <p className="font-inter text-[10px] text-brand-burnt/40 uppercase tracking-widest leading-relaxed">
              If you require immediate assistance, <br />
              contact our <Link href="/contact" className="text-brand-terracotta font-bold hover:underline underline-offset-4 decoration-brand-terracotta/30">Registry Concierge</Link>.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
