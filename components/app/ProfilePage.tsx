'use client'

import { useEffect, useState } from 'react'
import { BadgeCheck, Briefcase, CheckCircle2, Loader2, MapPin, Shield } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { getBootstrap } from '@/lib/tripundo-api'

export default function ProfilePage() {
  const [data, setData] = useState(null)

  useEffect(() => {
    getBootstrap().then(setData)
  }, [])

  if (!data) return <div className="flex min-h-[60vh] items-center justify-center"><Loader2 className="h-5 w-5 animate-spin text-emerald-300" /></div>

  const profile = data.currentUser

  return (
    <div className="grid gap-5 text-white lg:grid-cols-[380px_1fr]">
      <Card className="border-white/10 bg-white/[0.04] p-6 text-white">
        <div className="flex items-center gap-4">
          <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-[hsl(var(--sand))] text-2xl font-bold text-emerald-950">{profile.initials}</div>
          <div>
            <div className="flex items-center gap-2 text-2xl font-semibold">{profile.name}<BadgeCheck className="h-5 w-5 text-emerald-300" /></div>
            <div className="mt-1 text-white/55">{profile.role}</div>
          </div>
        </div>
        <div className="mt-7">
          <div className="text-xs uppercase tracking-widest text-white/45">Trust score</div>
          <div className="mt-2 text-6xl font-semibold text-[hsl(var(--sunlight))]">{profile.trustScore}</div>
          <Progress value={profile.trustScore} className="mt-4 bg-white/10" />
        </div>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        {[
          ['Professional', Briefcase, [profile.company, profile.industry, profile.persona, profile.linkedInStatus]],
          ['Travel', MapPin, [`${profile.tripsCompleted} trips completed`, ...profile.interests]],
          ['Capability', Shield, profile.capabilities],
          ['Badges', CheckCircle2, profile.badges],
        ].map(([title, Icon, items]) => (
          <Card key={title} className="border-white/10 bg-white/[0.04] p-5 text-white">
            <div className="flex items-center gap-2 text-lg font-semibold"><Icon className="h-5 w-5 text-emerald-300" /> {title}</div>
            <div className="mt-4 space-y-2">
              {items.map((item) => (
                <div key={item} className="rounded-xl bg-black/20 px-3 py-2 text-sm text-white/65">{item}</div>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
