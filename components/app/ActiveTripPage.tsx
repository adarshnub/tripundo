'use client'

import { useEffect, useMemo, useState } from 'react'
import { Camera, CheckCircle2, IndianRupee, Loader2, Users } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import Timeline from '@/components/app/Timeline'
import { getBootstrap } from '@/lib/tripundo-api'

export default function ActiveTripPage({ tripId }) {
  const [data, setData] = useState(null)

  useEffect(() => {
    getBootstrap().then(setData)
  }, [])

  const trip = useMemo(() => data?.trips?.find((item) => item.id === tripId) || data?.trips?.[0], [data, tripId])
  const community = useMemo(() => data?.communities?.find((item) => item.id === trip?.communityId), [data, trip])
  const travelers = useMemo(() => (trip?.confirmedParticipants || []).map((id) => data?.profiles?.find((profile) => profile.id === id)).filter(Boolean), [data, trip])

  if (!data || !trip) return <div className="flex min-h-[60vh] items-center justify-center"><Loader2 className="h-5 w-5 animate-spin text-emerald-300" /></div>

  return (
    <div className="space-y-5 text-white">
      <section className="relative -mx-4 -mt-6 min-h-[360px] overflow-hidden sm:-mx-6 lg:-mx-8">
        <img src={community?.cover_image_path || community?.image} alt="" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 hero-scrim" />
        <div className="relative mx-auto flex min-h-[360px] max-w-7xl flex-col justify-end px-4 pb-7 sm:px-6 lg:px-8">
          <Badge className="w-fit bg-[hsl(var(--sunlight))] text-emerald-950 hover:bg-[hsl(var(--sunlight))]">Active Trip</Badge>
          <h1 className="mt-4 text-5xl font-semibold tracking-tight">{trip.title}</h1>
          <p className="mt-2 text-white/70">{trip.route} · {trip.startDate} to {trip.endDate}</p>
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-[1fr_380px]">
        <Card className="border-white/10 bg-white/[0.04] p-5 text-white">
          <h2 className="mb-5 text-2xl font-semibold">Trip timeline</h2>
          <Timeline events={trip.timeline || []} />
        </Card>
        <div className="space-y-4">
          <Card className="border-white/10 bg-white/[0.04] p-5 text-white">
            <div className="flex items-center gap-2 text-lg font-semibold"><Users className="h-5 w-5 text-emerald-300" /> Confirmed travelers</div>
            <div className="mt-4 grid gap-2">
              {travelers.map((profile) => (
                <div key={profile.id} className="flex items-center gap-3 rounded-xl bg-black/20 p-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[hsl(var(--sand))] text-xs font-bold text-emerald-950">{profile.initials}</div>
                  <div>
                    <div className="text-sm font-semibold">{profile.name}</div>
                    <div className="text-xs text-white/42">{profile.company}</div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
          <Card className="border-white/10 bg-white/[0.04] p-5 text-white">
            <h3 className="text-lg font-semibold">Checklist</h3>
            <div className="mt-3 space-y-2">
              {(trip.checklist || []).map((item, index) => (
                <label key={item} className="flex items-center gap-2 rounded-xl bg-black/20 px-3 py-2 text-sm text-white/65">
                  <input type="checkbox" defaultChecked={index < 2} />
                  {item}
                </label>
              ))}
            </div>
          </Card>
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        <Card className="border-white/10 bg-white/[0.04] p-5 text-white">
          <div className="flex items-center gap-2 text-lg font-semibold"><IndianRupee className="h-5 w-5 text-emerald-300" /> Expenses</div>
          <div className="mt-4 space-y-2">
            {(trip.expenses || []).map((expense) => (
              <div key={`${expense.category}-${expense.amount}`} className="flex items-center justify-between rounded-xl bg-black/20 px-3 py-2 text-sm">
                <span>{expense.category}</span>
                <span className="text-white/60">₹{expense.amount} · {expense.paidBy}</span>
              </div>
            ))}
          </div>
        </Card>
        <Card className="border-white/10 bg-white/[0.04] p-5 text-white">
          <div className="flex items-center gap-2 text-lg font-semibold"><Camera className="h-5 w-5 text-emerald-300" /> Share card</div>
          <p className="mt-2 text-sm text-white/55">Generate an Instagram-ready card from this trip status.</p>
          <Button className="mt-4 rounded-full bg-[hsl(var(--sunlight))] text-emerald-950 hover:bg-[hsl(var(--sand))]">
            <CheckCircle2 className="h-4 w-4" />
            Generate trip card
          </Button>
        </Card>
      </section>
    </div>
  )
}
