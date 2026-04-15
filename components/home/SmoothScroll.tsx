"use client"

import { useEffect, useRef } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { usePathname } from 'next/navigation'

gsap.registerPlugin(ScrollTrigger)

// Debounce helper — prevents firing on every pixel of resize/load
function debounce(fn: () => void, ms: number): () => void {
  let timer: ReturnType<typeof setTimeout>
  return () => {
    clearTimeout(timer)
    timer = setTimeout(fn, ms)
  }
}

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const pathname  = usePathname()
  const lenisRef  = useRef<Lenis | null>(null)
  const rafRef    = useRef<number>(0)
  const roRef     = useRef<ResizeObserver | null>(null)

  // ─── Boot Lenis once ─────────────────────────────────────────────────────
  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.1, smoothWheel: true })
    lenisRef.current = lenis

    // Feed Lenis into GSAP ticker so ScrollTrigger gets accurate positions
    gsap.ticker.add((time) => lenis.raf(time * 1000))
    gsap.ticker.lagSmoothing(0)

    lenis.on('scroll', ScrollTrigger.update)

    // ─── ResizeObserver: refresh ST whenever the body height changes ──────
    // This catches image loads, font loads, hydration reflows, GSAP tweens…
    const refresh = debounce(() => {
      ScrollTrigger.refresh()
    }, 120)

    const ro = new ResizeObserver(refresh)
    ro.observe(document.body)
    roRef.current = ro

    // Also fire once after `window.load` in case some resources were deferred
    const onLoad = () => {
      // Multiple staggered passes — belt-and-braces approach
      refresh()
      setTimeout(() => ScrollTrigger.refresh(), 400)
      setTimeout(() => ScrollTrigger.refresh(), 1000)
    }

    if (document.readyState === 'complete') {
      onLoad()
    } else {
      window.addEventListener('load', onLoad, { once: true })
    }

    return () => {
      gsap.ticker.remove((time) => lenis.raf(time * 1000))
      lenis.destroy()
      ro.disconnect()
      cancelAnimationFrame(rafRef.current)
    }
  }, [])

  // ─── On every route change ────────────────────────────────────────────────
  useEffect(() => {
    const lenis = lenisRef.current
    if (!lenis) return

    // Jump to top instantly
    lenis.scrollTo(0, { immediate: true })

    // Staggered refreshes to handle:
    //  50ms  — basic React hydration
    //  300ms — images starting to paint
    //  800ms — webfonts / lazy images / Suspense boundaries
    // 1800ms — anything really slow (3D, intersection observers, etc.)
    const ids = [50, 300, 800, 1800].map((delay) =>
      setTimeout(() => ScrollTrigger.refresh(), delay)
    )

    return () => ids.forEach(clearTimeout)
  }, [pathname])

  return children
}
