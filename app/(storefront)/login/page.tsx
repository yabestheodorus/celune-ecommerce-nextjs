'use client'

import React, { Suspense, useRef } from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { authClient } from '@/lib/auth-client'
import { FcGoogle } from 'react-icons/fc'
import { useSearchParams } from 'next/navigation'

// Inner component — must be inside <Suspense> because it calls useSearchParams()
function LoginForm() {
  const containerRef = useRef<HTMLDivElement>(null)
  const searchParams = useSearchParams()
  const redirectTo = searchParams.get('redirect') || '/'

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: 'expo.out' } })

    tl.fromTo('.login-title', 
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.5 },
      0.2
    )

    tl.fromTo('.login-card',
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
      {/* Decorative Orbs for Tonal Depth */}
      <div className="absolute top-[-10%] right-[-10%] w-[40vw] h-[40vw] bg-brand-terracotta/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[30vw] h-[30vw] bg-brand-burnt/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="w-full max-w-xl relative z-10">
        <div className="mb-12 text-center lg:text-left">
          <Link href="/" className="inline-block mb-8 group">
            <span className="font-playfair text-xl tracking-[0.2em] uppercase text-brand-burnt/60 scale-95 origin-left transition-transform group-hover:scale-100">
              Célune
            </span>
          </Link>
          <h1 className="login-title font-playfair text-5xl md:text-7xl text-brand-burnt italic leading-tight">
            Login to <br /> the Archive
          </h1>
        </div>

        <div className="login-card glass-bg border border-brand-burnt/10 rounded-[2.5rem] p-8 md:p-12 shadow-2xl relative overflow-hidden">
          <div className="space-y-8">
            <div className="form-element text-center space-y-4">
              <p className="font-inter text-sm text-brand-burnt/60 leading-relaxed">
                We use secure Google authentication to protect your archive. Access your rituals with a single click.
              </p>
            </div>

            <button 
              type="button"
              onClick={async () => {
                await authClient.signIn.social({
                  provider: "google",
                  callbackURL: redirectTo,
                })
              }}
              className="form-element w-full bg-brand-burnt text-surface py-5 rounded-2xl font-inter text-xs uppercase tracking-[0.3em] font-bold hover:bg-brand-burnt/90 transition-all flex items-center justify-center gap-3 group shadow-xl"
            >
              <FcGoogle className="w-6 h-6 bg-white rounded-full p-0.5" />
              Continue with Google
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>

            <div className="form-element flex items-center gap-4 py-2">
              <div className="flex-1 h-px bg-brand-burnt/10" />
              <span className="font-inter text-[10px] uppercase tracking-widest text-brand-burnt/30">Trusted Access</span>
              <div className="flex-1 h-px bg-brand-burnt/10" />
            </div>
          </div>

          <p className="form-element mt-10 text-center font-inter text-[11px] text-brand-burnt/40 italic">
            By continuing, you agree to our terms of ritual service.
          </p>
        </div>
      </div>
    </div>
  )
}

// Default export wraps in Suspense as required by Next.js when using useSearchParams()
export default function LoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginForm />
    </Suspense>
  )
}
