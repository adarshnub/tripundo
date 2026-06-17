'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, BadgeCheck, CalendarDays, CheckCircle2, Loader2, MapPin, PlayCircle, Users } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import ChatThread from '@/components/app/ChatThread'
import { createTripPlanMessage, getBootstrap, joinTripPlan, startTripPlan } from '@/lib/tripundo-api'

export default function TripPlanPage({ tripId }) {
  const [data, setData] = useState(null)
  const [trip, setTrip] = useState(null)
  const [notice, setNotice] = useState('')

  useEffect(() => {
    getBootstrap().then((bootstrap) => {
      const localPlans = typeof window !== 'undefined' ? JSON.parse(window.localStorage.getItem('tripundo-demo-plans') || '[]') : []
      const selected = bootstrap.trips.find((item) => item.id === tripId) || localPlans.find((item) => item.id === tripId) || bootstrap.trips[0]
      setData(bootstrap)
      setTrip(selected)
    })
  }, [tripId])

  const community = useMemo(() => data?.communities?.find((item) => item.id === trip?.communityId), [data, trip])
  const members = useMemo(() => {
    if (!data || !trip) return []
    return (trip.planMembers || []).map((id) => data.profiles.find((profile) => profile.id === id)).filter(Boolean)
  }, [data, trip])

  if (!data || !trip) return <div className="flex min-h-[60vh] items-center justify-center"><Loader2 className="h-5 w-5 animate-spin text-emerald-300" /></div>

  async function send(body) {
    await createTripPlanMessage({ trip_id: trip.id, profile_id: data.currentUser.id, body })
    setTrip((current) => ({
      ...current,
      chatMessages: [...(current.chatMessages || []), { id: `msg-${Date.now()}`, authorId: data.currentUser.id, body, createdAt: new Date().toISOString() }],
    }))
  }

  async function mark(status) {
    await joinTripPlan({ trip_id: trip.id, profile_id: data.currentUser.id, confirmed_for_trip: status === 'confirmed' })
    setTrip((current) => ({
      ...current,
      planMembers: Array.from(new Set([...(current.planMembers || []), data.currentUser.id])),
      confirmedParticipants:
        status === 'confirmed'
          ? Array.from(new Set([...(current.confirmedParticipants || []), data.currentUser.id]))
          : current.confirmedParticipants || [],
    }))
    setNotice(status === 'confirmed' ? 'Marked as confirmed.' : 'Marked as interested.')
  }

  async function start() {
    await startTripPlan(trip.id, { finalized_profile_ids: trip.confirmedParticipants || [] })
    setTrip((current) => ({ ...current, status: 'started', lifecycleMoment: 'Trip started', planStatus: 'Trip started' }))
    setNotice('Trip started from confirmed travelers.')
  }

  return (
    <div className="space-y-5 text-white">
      <Link href={community ? `/communities/${community.id}` : '/communities'} className="inline-flex items-center gap-2 text-sm text-white/55 hover:text-white">
        <ArrowLeft className="h-4 w-4" />
        Back to {community?.name || 'community'}
      </Link>

      <section className="grid gap-4 lg:grid-cols-[1fr_360px]">
        <Card className="border-white/10 bg-white/[0.04] p-5 text-white">
          <div className="flex flex-wrap gap-2">
            <Badge className="bg-emerald-300/15 text-emerald-100 hover:bg-emerald-300/15">{trip.status}</Badge>
            <Badge variant="outline" className="border-white/15 text-white/60">{trip.budget}</Badge>
          </div>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight">{trip.title}</h1>
          <div className="mt-3 grid gap-2 text-sm text-white/58 sm:grid-cols-3">
            <span className="inline-flex items-center gap-2"><MapPin className="h-4 w-4 text-emerald-300" />{trip.route}</span>
            <span className="inline-flex items-center gap-2"><CalendarDays className="h-4 w-4 text-emerald-300" />{trip.startDate}</span>
            <span className="inline-flex items-center gap-2"><Users className="h-4 w-4 text-emerald-300" />{members.length} planning</span>
          </div>
          <div className="mt-6 rounded-2xl border border-white/10 bg-black/20 p-4">
            <svg viewBox="0 0 320 80" className="h-24 w-full">
              <path d="M20 58 C 92 12, 210 12, 300 58" stroke="#f5ca76" strokeWidth="4" strokeDasharray="10 8" fill="none" />
              <circle cx="20" cy="58" r="8" fill="#34d399" />
              <circle cx="300" cy="58" r="8" fill="#f5ca76" />
            </svg>
            <div className="flex justify-between text-sm text-white/65">
              <span>{trip.route?.split(' -> ')[0]}</span>
              <span>{trip.destination}</span>
            </div>
          </div>
        </Card>

        <Card className="border-white/10 bg-white/[0.04] p-5 text-white">
          <h2 className="text-xl font-semibold">Travelers</h2>
          <div className="mt-4 space-y-2">
            {members.map((profile) => {
              const confirmed = trip.confirmedParticipants?.includes(profile.id)
              return (
                <div key={profile.id} className="flex items-center justify-between rounded-2xl border border-white/10 bg-black/20 p-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[hsl(var(--sand))] text-xs font-bold text-emerald-950">{profile.initials}</div>
                    <div>
                      <div className="flex items-center gap-1.5 text-sm font-semibold">{profile.name}{profile.linkedInStatus === 'verified' ? <BadgeCheck className="h-3.5 w-3.5 text-[#8ccaff]" /> : null}</div>
                      <div className="text-xs text-white/42">{confirmed ? 'Confirmed' : 'Interested'}</div>
                    </div>
                  </div>
                  {confirmed ? <CheckCircle2 className="h-4 w-4 text-emerald-300" /> : null}
                </div>
              )
            })}
          </div>
          <div className="mt-4 grid gap-2">
            <Button onClick={() => mark('interested')} variant="ghost" className="rounded-full border border-white/10 bg-white/[0.04] text-white hover:bg-white/10">I'm interested</Button>
            <Button onClick={() => mark('confirmed')} className="rounded-full bg-[hsl(var(--sunlight))] text-emerald-950 hover:bg-[hsl(var(--sand))]">Confirm me</Button>
            <Button onClick={start} variant="ghost" className="rounded-full border border-white/10 bg-white/[0.04] text-white hover:bg-white/10"><PlayCircle className="h-4 w-4" /> Start Trip</Button>
          </div>
          {notice ? <div className="mt-3 rounded-xl border border-white/10 bg-black/25 px-3 py-2 text-xs text-white/70">{notice}</div> : null}
        </Card>
      </section>

      <ChatThread messages={trip.chatMessages || []} profiles={data.profiles} currentUser={data.currentUser} onSend={send} placeholder="Discuss dates, route, pickup, stay..." />
    </div>
  )
}
