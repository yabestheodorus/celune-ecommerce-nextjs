'use client'

import React, { useState } from 'react'
import ProfileHeader from './ProfileHeader'
import GildedPath from './GildedPath'
import UnlockedEchoes from './UnlockedEchoes'
import RitualTracker from './RitualTracker'
import EditorialArchive from './EditorialArchive'
import AchievementDetailModal from './AchievementDetailModal'
export interface Achievement {
  id: string
  title: string
  description: string
  icon: React.ReactNode
  color: string
}

interface ProfileContentProps {
  user: any
  orders: any[]
}

const ProfileContent = ({ user, orders }: ProfileContentProps) => {
  const [selectedAchievement, setSelectedAchievement] = useState<Achievement | null>(null)

  return (
    <div className="min-h-screen bg-sanctuary-bg pb-32">
      <ProfileHeader user={user} />

      <div className="max-w-360 mx-auto">
        <section className="animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
          <GildedPath points={user.points ?? 0} tier={user.tier ?? 'Satin Muse'} />
        </section>

        <section className="animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-400">
          <UnlockedEchoes onSelectAchievement={setSelectedAchievement} />
        </section>

        <section className="animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-600">
          <RitualTracker />
        </section>

        <section className="animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-800">
          <EditorialArchive orders={orders} />
        </section>
      </div>

      <AchievementDetailModal
        achievement={selectedAchievement}
        onClose={() => setSelectedAchievement(null)}
      />
    </div>
  )
}

export default ProfileContent
