'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { X } from 'lucide-react'

interface Achievement {
  id: string
  title: string
  description: string
  icon: React.ReactNode
  color: string
}

interface AchievementDetailModalProps {
  achievement: Achievement | null
  onClose: () => void
}

const AchievementDetailModal = ({ achievement, onClose }: AchievementDetailModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (achievement && modalRef.current && overlayRef.current) {
      const tl = gsap.timeline()
      tl.fromTo(overlayRef.current, 
        { opacity: 0 },
        { opacity: 1, duration: 0.4, ease: 'power2.out' }
      )
      tl.fromTo(modalRef.current,
        { scale: 0.9, opacity: 0, y: 20 },
        { scale: 1, opacity: 1, y: 0, duration: 0.6, ease: 'back.out(1.7)' },
        '-=0.2'
      )
    }
  }, [achievement])

  if (!achievement) return null

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-6">
      <div 
        ref={overlayRef}
        className="absolute inset-0 bg-brand-burnt/40 backdrop-blur-xl"
        onClick={onClose}
      />
      
      <div 
        ref={modalRef}
        className="relative w-full max-w-lg bg-surface rounded-[3rem] overflow-hidden shadow-2xl border border-brand-burnt/10"
      >
        <button 
          onClick={onClose}
          className="absolute top-8 right-8 w-10 h-10 rounded-full bg-brand-burnt/5 flex items-center justify-center text-brand-burnt/40 hover:text-brand-burnt transition-colors"
        >
          <X size={20} />
        </button>

        <div className="p-12 flex flex-col items-center text-center">
          <div className={`w-32 h-32 rounded-full ${achievement.color} flex items-center justify-center mb-10 shadow-2xl`}>
            <span className="[&>svg]:w-16 [&>svg]:h-16">{achievement.icon}</span>
          </div>

          <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-brand-terracotta mb-4">Achievement Unlocked</span>
          <h2 className="text-4xl md:text-5xl font-playfair italic text-text-primary mb-6">
            {achievement.title}
          </h2>
          
          <div className="w-12 h-[1px] bg-brand-burnt/10 mb-8" />
          
          <p className="text-base font-manrope text-text-secondary leading-relaxed italic opacity-80 max-w-sm">
            "{achievement.description}"
          </p>

          <p className="mt-8 text-sm font-manrope text-brand-burnt/60 leading-relaxed text-left border-l-2 border-brand-terracotta/20 pl-6">
            Your commitment to the sanctuary has bloomed into this recognition. This echo serves as a testament to your journey through the rituals of Célune.
          </p>

          <button 
            onClick={onClose}
            className="mt-12 bg-brand-terracotta text-white px-10 py-4 rounded-full text-[11px] font-bold uppercase tracking-widest hover:bg-brand-burnt transition-all duration-500 hover:scale-105 shadow-xl"
          >
            Preserve Echo
          </button>
        </div>
        
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-brand-terracotta to-transparent opacity-20" />
      </div>
    </div>
  )
}

export default AchievementDetailModal
