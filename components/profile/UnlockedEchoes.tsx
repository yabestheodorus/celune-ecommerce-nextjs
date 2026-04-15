'use client'

import React from 'react'
import { Award, Bird, Feather, Moon, Sparkles, Sun } from 'lucide-react'
import { Achievement } from './ProfileContent'

const ACHIEVEMENTS: Achievement[] = [
  {
    id: 'first_light',
    title: 'First Light',
    description: 'One of our earliest sanctuary members.',
    icon: <Sun className="w-6 h-6" />,
    color: 'bg-amber-100 text-amber-600',
  },
  {
    id: 'sustainable_soul',
    title: 'Sustainable Soul',
    description: 'Committed to eco-conscious rituals.',
    icon: <Bird className="w-6 h-6" />,
    color: 'bg-emerald-100 text-emerald-600',
  },
  {
    id: 'lunar_ritualist',
    title: 'Lunar Ritualist',
    description: 'Perfected the evening skincare sequence.',
    icon: <Moon className="w-6 h-6" />,
    color: 'bg-indigo-100 text-indigo-600',
  },
  {
    id: 'radiant_glow',
    title: 'Radiant Glow',
    description: 'Achieved ultimate skin luminosity.',
    icon: <Sparkles className="w-6 h-6" />,
    color: 'bg-rose-100 text-rose-600',
  },
  {
    id: 'essence_master',
    title: 'Essence Master',
    description: 'Accumulated over 1,000 Essence points.',
    icon: <Award className="w-6 h-6" />,
    color: 'bg-purple-100 text-purple-600',
  },
]

const UnlockedEchoes = ({
  onSelectAchievement,
}: {
  onSelectAchievement: (achievement: Achievement) => void
}) => {
  return (
    <div className="py-20 px-6 md:px-24 border-t border-brand-burnt/5 overflow-hidden">
      {/* Section label */}
      <div className="flex items-center gap-5 mb-16">
        <span className="font-inter text-[9px] uppercase tracking-[0.5em] text-brand-terracotta font-bold whitespace-nowrap">
          Unlocked Echoes
        </span>
        <div
          className="flex-1 h-px"
          style={{ background: 'linear-gradient(to right, rgba(189,102,59,0.2), transparent)' }}
        />
      </div>

      {/* Horizontal scroll rail */}
      <div className="flex gap-5 overflow-x-auto pb-6 no-scrollbar -mx-6 px-6 md:-mx-24 md:px-24">
        {ACHIEVEMENTS.map((achievement, i) => (
          <button
            key={achievement.id}
            onClick={() => onSelectAchievement(achievement)}
            className="flex-shrink-0 relative group text-left cursor-pointer focus:outline-none"
            style={{ width: 'clamp(220px, 22vw, 300px)' }}
          >
            {/* Card surface */}
            <div
              className="relative h-full rounded-3xl overflow-hidden transition-all duration-700 group-hover:-translate-y-3 group-hover:shadow-[0_30px_60px_rgba(124,45,18,0.12)]"
              style={{ background: 'linear-gradient(160deg, #FFFFFF 0%, #fdf5f0 100%)' }}
            >
              {/* Subtle tonal top strip */}
              <div
                className="h-1 w-full opacity-70 transition-opacity duration-500 group-hover:opacity-100"
                style={{
                  background: `linear-gradient(90deg, transparent, rgba(189,102,59,0.4), transparent)`,
                }}
              />

              <div className="p-8 pb-10 flex flex-col gap-7">
                {/* Index */}
                <span className="font-inter text-[9px] uppercase tracking-[0.4em] text-brand-burnt/20 font-bold">
                  {String(i + 1).padStart(2, '0')}
                </span>

                {/* Icon medallion */}
                <div
                  className={`w-14 h-14 rounded-2xl ${achievement.color} flex items-center justify-center transition-transform duration-500 group-hover:scale-110 group-hover:rotate-2`}
                >
                  {achievement.icon}
                </div>

                {/* Copy */}
                <div>
                  <h3 className="font-playfair italic text-brand-burnt text-xl leading-tight mb-2">
                    {achievement.title}
                  </h3>
                  <p className="font-inter text-[12px] leading-relaxed text-brand-burnt/50">
                    {achievement.description}
                  </p>
                </div>

                {/* CTA */}
                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-500 -mb-1 translate-y-2 group-hover:translate-y-0">
                  <span className="font-inter text-[9px] uppercase tracking-[0.3em] font-bold text-brand-terracotta">
                    Read Echo
                  </span>
                  <div className="w-8 h-[1px] bg-brand-terracotta/40 transition-all duration-500 group-hover:w-14" />
                </div>
              </div>
            </div>
          </button>
        ))}

        {/* Locked whisper card */}
        <div
          className="flex-shrink-0 rounded-3xl border border-dashed border-brand-burnt/10 flex flex-col items-center justify-center p-8 opacity-30 grayscale"
          style={{ width: 'clamp(220px, 22vw, 300px)', minHeight: 280 }}
        >
          <Feather className="w-7 h-7 text-brand-burnt mb-5" strokeWidth={1} />
          <span className="font-inter text-[9px] uppercase tracking-[0.3em] text-brand-burnt text-center leading-relaxed">
            A whispered<br/>echo awaits…
          </span>
        </div>
      </div>
    </div>
  )
}

export default UnlockedEchoes
