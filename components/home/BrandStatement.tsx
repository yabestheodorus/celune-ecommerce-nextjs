'use client'

import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger, SplitText } from 'gsap/all'
import React, { useRef } from 'react'
import Image from 'next/image'


gsap.registerPlugin(ScrollTrigger, SplitText)

const BrandStatement = () => {

  const textRef = useRef<HTMLParagraphElement | null>(null)

  useGSAP(() => {
    if (!textRef.current) return;

    let splitText: SplitText;
    let isUnmounted = false;

    const initSplit = () => {
      if (isUnmounted || !textRef.current) return;

      splitText = new SplitText(textRef.current, {
        type: "words",
        wordsClass: "word",
        mask: "words",
      });

      gsap.to(splitText.words, {
        color: "#7C2D12",
        stagger: 0.1,
        scrollTrigger: {
          trigger: textRef.current,
          start: "top 75%",
          end: "top 20%",
          scrub: 1,
        },
      });

      ScrollTrigger.refresh();
    };

    // Use document.fonts.ready and a small GSAP delay to ensure stable layout synchronization
    if (document.fonts) {
      document.fonts.ready.then(() => {
        if (!isUnmounted) {
          gsap.delayedCall(0.5, initSplit);
        }
      });
    } else {
      gsap.delayedCall(0.5, initSplit);
    }

    return () => {
      isUnmounted = true;
      if (splitText) splitText.revert();
    };
  }, { scope: textRef, dependencies: [] });

  return (
    <section className='relative w-full h-screen bg-surface-container-low overflow-hidden'>
      {/* Editorial Grid Accents */}
      <div className='absolute left-1/4 top-0 w-px h-full bg-brand-burnt/5'></div>
      <div className='absolute right-1/4 top-0 w-px h-full bg-brand-burnt/5'></div>
      <div className='absolute top-1/4 left-0 w-full h-px bg-brand-burnt/5'></div>

      {/* Technical Corner Badge */}
      <div className='absolute top-12 left-12 flex flex-col gap-y-1 opacity-40 z-10'>
        <span className='font-inter text-[10px] uppercase tracking-[0.4em] font-bold text-brand-burnt'>Statement No. 01</span>
        <span className='font-outfit text-[10px] uppercase tracking-[0.2em] font-medium text-brand-burnt'>Brand Core / Philosophy</span>
      </div>

      <div className='absolute w-[70%] flex flex-col top-56 left-1/2 -translate-x-1/2 z-20'>
        <h1 className='text-brand-burnt/60 text-[11px] font-inter uppercase tracking-[0.5em] pb-3 mb-8 border-b border-brand-burnt/10 w-fit self-center'>
          The Celune Philosophy
        </h1>

        <p ref={textRef} className='font-playfair text-[4.2rem] text-terracotta-50/10 leading-[1.1] text-center'>
          At Celune, skincare is not excess — it is intention.
          Every formula is created to work in harmony with your skin, delivering visible results through refined simplicity.
        </p>
      </div>

      {/* Floating Portrait Signature */}
      <div className='absolute bottom-12 right-1/5 translate-x-1/2 flex flex-col items-center gap-y-2 z-10 opacity-60'>
        <div className='w-px h-12 bg-brand-burnt/20 mb-2'></div>
        <span className='font-playfair text-lg italic text-brand-burnt'>The Muse</span>
        <span className='font-inter text-[9px] uppercase tracking-[0.2em] font-bold text-brand-burnt/40'>Porto, Portugal</span>
      </div>

      <svg className='absolute bottom-0 left-1/2 -translate-x-2/5 translate-y-1/3 w-400 h-400 opacity-60' viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        <path fill="#EBC4AF" d="M30,-25.4C39.3,-20.6,47.7,-10.3,48.7,1C49.8,12.3,43.4,24.6,34,38.5C24.6,52.4,12.3,67.9,-3.2,71.1C-18.8,74.4,-37.6,65.4,-47.2,51.5C-56.8,37.6,-57.3,18.8,-55.4,1.9C-53.5,-15,-49.3,-30,-39.7,-34.9C-30,-39.7,-15,-34.3,-2.4,-32C10.3,-29.6,20.6,-30.3,30,-25.4Z" transform="translate(100 100)" />
      </svg>

      <Image src='/images/person1.png' alt='Muse Portrait' width={1000} height={1000} className='absolute bottom-0 left-1/2 -translate-x-1/2 w-[850px] z-10 object-contain' />
    </section>
  )
}

export default BrandStatement
