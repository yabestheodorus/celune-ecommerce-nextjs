import React from 'react'
import AboutHero from '@/components/about/AboutHero'
import PhilosophySection from '@/components/about/PhilosophySection'
import ClinicalPrecision from '@/components/about/ClinicalPrecision'
import RitualGallery from '@/components/about/RitualGallery'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Our Alchemy | Célune',
  description: 'Discover the science of ritual. Célune bridges the gap between clinical efficacy and botanical wisdom.',
}

export default function AboutPage() {
  return (
    <div className="relative w-full bg-surface">
      {/* 1. Hero Section */}
      <AboutHero />

      {/* 2. Philosophy Section */}
      <PhilosophySection />

      {/* 3. Ritual Gallery (Desktop Horizontal) */}
      <RitualGallery />

      {/* 4. Clinical Precision (Dark Section) */}
      <ClinicalPrecision />

      {/* 5. Final Brand Statement */}
      <section className="w-full py-48 px-6 bg-surface text-center">
        <div className="max-w-4xl mx-auto space-y-12">
          <span className="font-inter text-[10px] uppercase tracking-[0.5em] font-bold text-brand-burnt/40 mb-4 block">Our Commitment</span>
          <h2 className="font-playfair text-5xl md:text-7xl lg:text-8xl text-brand-burnt italic leading-tight">
            Curated with <br /> 
            Soul, <br />
            Formulated with <br /> 
            Reason.
          </h2>
          <div className="w-px h-24 bg-brand-burnt/10 mx-auto mt-12" />
        </div>
      </section>

    </div>
  )
}
