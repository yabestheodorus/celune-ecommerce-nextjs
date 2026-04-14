"use client"

import { useEffect, useMemo } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { usePathname } from 'next/navigation'

gsap.registerPlugin(ScrollTrigger)

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  // Use useMemo to ensure lenis is only created once
  const lenis = useMemo(() => {
    if (typeof window === 'undefined') return null
    return new Lenis({
      lerp: 0.1,
      smoothWheel: true,
    })
  }, [])

  useEffect(() => {
    if (!lenis) return

    function raf(time: number) {
      lenis?.raf(time)
      ScrollTrigger.update()
      requestAnimationFrame(raf)
    }

    const requestID = requestAnimationFrame(raf)

    lenis.on('scroll', ScrollTrigger.update)

    return () => {
      cancelAnimationFrame(requestID)
      lenis.destroy()
    }
  }, [lenis])

  // Sync route changes
  useEffect(() => {
    if (lenis) {
      lenis.scrollTo(0, { immediate: true })
      // Give the DOM a moment to settle before refreshing
      setTimeout(() => {
        ScrollTrigger.refresh()
      }, 50)
    }
  }, [pathname, lenis])

  return children
}
