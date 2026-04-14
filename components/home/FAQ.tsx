'use client'

import React, { useState, useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { PiPlus, PiMinus } from 'react-icons/pi'

gsap.registerPlugin(ScrollTrigger)

interface FAQItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
}

const FAQItem = ({ question, answer, isOpen, onClick }: FAQItemProps) => {
  const contentRef = useRef<HTMLDivElement | null>(null)

  return (
    <div className="border-b border-brand-burnt/10 py-6">
      <button
        onClick={onClick}
        className="w-full flex justify-between items-center text-left group cursor-pointer"
      >
        <h3 className={`font-playfair text-2xl md:text-3xl transition-colors duration-500 ${isOpen ? 'text-brand-terracotta italic' : 'text-brand-burnt'}`}>
          {question}
        </h3>
        <div className={`text-brand-burnt transition-transform duration-500 ${isOpen ? 'rotate-180' : ''}`}>
          {isOpen ? <PiMinus size={24} /> : <PiPlus size={24} />}
        </div>
      </button>

      <div
        ref={contentRef}
        className={`overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.76, 0, 0.24, 1)] ${isOpen ? 'max-h-[300px] mt-6 opacity-100' : 'max-h-0 opacity-0'}`}
      >
        <p className="font-inter text-brand-burnt/60 text-lg leading-relaxed max-w-3xl">
          {answer}
        </p>
      </div>
    </div>
  )
}

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(0)
  const containerRef = useRef(null)

  const faqs = [
    {
      question: "What is the Célune skincare ritual?",
      answer: "The Célune ritual is a contemplative experience designed to restore both skin and spirit. We recommend a three-step approach: Cleanse with intention, Mist to hydrate, and Seal with our botanical elixirs. Each step is an opportunity to pause and reconnect with the self."
    },
    {
      question: "Are your ingredients ethically sourced?",
      answer: "Transparency is at our core. We partner exclusively with regenerative farms across the Mediterranean and Southeast Asia. Every botanical is harvested at its peak potency, ensuring the highest efficacy while honoring the earth's natural cycles."
    },
    {
      question: "Is Célune suitable for sensitive skin?",
      answer: "Yes. Our formulations are bio-compatible, meaning they mirror the skin's natural lipid structure. We avoid synthetic fragrances and harsh preservation systems, focusing instead on cold-pressed oils and fermented botanicals that soothe inflammation."
    },
    {
      question: "What defines the Monograph series?",
      answer: "The Monograph series represents our limited-run botanical studies. These are seasonal releases that focus on a single, extraordinary ingredient—like wild-harvested rockrose or aged sandalwood—available only until the harvest is exhausted."
    }
  ]

  useGSAP(() => {
    gsap.from(".faq-title", {
      y: 50,
      opacity: 0,
      duration: 1.2,
      ease: "power4.out",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 80%",
      }
    })

    gsap.from(".faq-item", {
      y: 30,
      opacity: 0,
      stagger: 0.1,
      duration: 1,
      delay: 0.2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 70%",
      }
    })
  }, { scope: containerRef })

  return (
    <section ref={containerRef} className="py-32 px-12 bg-surface-container-low w-full overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row gap-x-20 gap-y-12">

          {/* Left Side: Editorial Context */}
          <div className="md:w-1/3 flex flex-col gap-y-6">
            <span className="font-inter text-[10px] uppercase tracking-[0.5em] text-brand-burnt/40 font-bold">Inquiry</span>
            <h2 className="faq-title font-playfair text-6xl md:text-7xl text-brand-burnt italic leading-tight">
              Common <br /> Rituals
            </h2>
            <p className="font-inter text-brand-burnt/60 text-sm leading-relaxed max-w-xs mt-6">
              Our concierge is dedicated to guiding your skincare journey. If your inquiry remains unanswered, we invite you to reach out for a private consultation.
            </p>
          </div>

          {/* Right Side: FAQ List */}
          <div className="md:w-2/3">
            <div className="flex flex-col">
              {faqs.map((faq: { question: string; answer: string }, index: number) => (
                <div key={index} className="faq-item">
                  <FAQItem
                    question={faq.question}
                    answer={faq.answer}
                    isOpen={openIndex === index}
                    onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
                  />
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

export default FAQ
