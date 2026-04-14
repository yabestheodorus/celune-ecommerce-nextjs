'use client'

import React, { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import Image from 'next/image'

const AboutHero = () => {
  const container = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    if (!titleRef.current || !imageRef.current || !container.current) return;
    const tl = gsap.timeline({ defaults: { ease: 'power4.out' } })

    tl.fromTo(
      imageRef.current,
      { scale: 1.2, opacity: 0 },
      { scale: 1, opacity: 1, duration: 2.5 }
    )
      .fromTo(
        titleRef.current.querySelectorAll('.word'),
        { y: 100, opacity: 0, rotateX: -45 },
        { y: 0, opacity: 1, rotateX: 0, duration: 1.5, stagger: 0.1, delay: -1.5 }
      )
      .fromTo(
        container.current.querySelector('.subline'),
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1, delay: -0.5 }
      )

    // Parallax on Scroll
    gsap.to(imageRef.current, {
      yPercent: 20,
      ease: 'none',
      scrollTrigger: {
        trigger: container.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
    })
  }, { scope: container })

  const title = "The Alchemy of Care"

  return (
    <section
      ref={container}
      className="relative w-full h-screen overflow-hidden flex items-center justify-center bg-surface"
    >
      {/* Background Image with Overlay */}
      <div
        ref={imageRef}
        className="absolute inset-0 z-0"
      >
        <Image
          src="/celune_about_hero_botanical_1776158822292.png"
          alt="Botanical Alchemy"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-brand-burnt/20 via-transparent to-surface" />
      </div>

      {/* Content Area */}
      <div className="relative z-10 text-center px-6">
        <span className="subline block font-inter text-[10px] uppercase tracking-[0.5em] text-brand-burnt/60 mb-8 font-bold">
          Established in Berlin — 2024
        </span>
        <h1
          ref={titleRef}
          className="font-playfair text-6xl md:text-8xl lg:text-9xl text-brand-burnt italic leading-[0.9]"
        >
          {title.split(' ').map((word, i) => (
            <span key={i} className="inline-block overflow-hidden mr-4 lg:mr-8 pb-4">
              <span className="word inline-block">{word}</span>
            </span>
          ))}
        </h1>
        <div className="subline max-w-lg mx-auto mt-12">
          <p className="font-spectral text-lg md:text-xl text-brand-burnt/80 italic leading-relaxed">
            Where clinical precision meets the ancestral wisdom of botanical ritual. A monograph of skin health and sensory luxury.
          </p>
        </div>
      </div>

      {/* Aesthetic Scroll Indicator */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-10 subline">
        <div className="flex flex-col items-center gap-y-4">
          <span className="font-inter text-[8px] uppercase tracking-widest text-brand-burnt/40 font-bold">Scroll to Explore</span>
          <div className="w-px h-16 bg-gradient-to-b from-brand-burnt/40 to-transparent" />
        </div>
      </div>
    </section>
  )
}

export default AboutHero
