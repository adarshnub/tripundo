'use client'

import Link from 'next/link'
import { useEffect, useMemo, useState } from 'react'
import {
  ArrowLeft,
  BadgeCheck,
  CalendarDays,
  CheckCircle2,
  Compass,
  Loader2,
  Lock,
  MapPin,
  PlayCircle,
  Send,
  Users,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { getBootstrap, joinTripPlan, createTripPlanMessage, startTripPlan } from '@/lib/tripundo-api'

function findProfile(profiles, id) {
  return profiles.find((profile) => profile.id === id)
}

export default function TripPlanRoom({ tripId }) {
  const [data, setData] = useState(null)
  const [trip, setTrip] = useState(null)
  const [message, setMessage] = useState('')
  const [notice, setNotice] = useState('')
  const [confirmedIds, setConfirmedIds] = useState([])

  useEffect(() => {
    getBootstrap().then((bootstrap) => {
      const localPlans =
        typeof window !== 'undefined'
          ? JSON.parse(window.localStorage.getItem('tripundo-demo-plans') || '[]')
          : []
      const selectedTrip =
        bootstrap.trips.find((item) => item.id === tripId) ||
        localPlans.find((item) => item.id === tripId) ||
        bootstrap.trips[0]
      setData(bootstrap)
      setTrip(selectedTrip)
      setConfirmedIds(selectedTrip.confirmedParticipants || [])
    })
  }, [tripId])

  const planMembers = useMemo(() => {
    if (!data || !trip) return []
    return (trip.planMembers || [trip.organizerId])
      .map((id) => findProfile(data.profiles, id))
      .filter(Boolean)
  }, [data, trip])

  const confirmedMembers = useMemo(() => {
    if (!data) return []
    return confirmedIds.map((id) => findProfile(data.profiles, id)).filter(Boolean)
  }, [confirmedIds, data])

  if (!data || !trip) {
    return (
      <div className="min-h-screen bg-[#07140d] text-white flex items-center justify-center">
        <Loader2 className="h-5 w-5 animate-spin text-emerald-300" />
      </div>
    )
  }

  async function joinPlan() {
    const userId = data.currentUser.id
    const result = await joinTripPlan({
      trip_id: trip.id,
      profile_id: userId,
      confirmed_for_trip: false,
    })

    setTrip((current) => ({
      ...current,
      planMembers: Array.from(new Set([...(current.planMembers || []), userId])),
    }))
    setNotice(result.persisted ? 'Joined planning group in Supabase.' : 'Joined planning group in demo mode.')
  }

  async function sendMessage(event) {
    event.preventDefault()
    if (!message.trim()) return

    const newMessage = {
      id: `msg-${Date.now()}`,
      authorId: data.currentUser.id,
      body: message.trim(),
      createdAt: new Date().toISOString(),
    }

    await createTripPlanMessage({
      trip_id: trip.id,
      profile_id: data.currentUser.id,
      body: newMessage.body,
    })

    setTrip((current) => ({
      ...current,
      chatMessages: [...(current.chatMessages || []), newMessage],
    }))
    setMessage('')
    setNotice('Message added to the planning chat.')
  }

  async function startTrip() {
    const result = await startTripPlan(trip.id, {
      finalized_profile_ids: confirmedIds,
    })

    setTrip((current) => ({
      ...current,
      status: 'started',
      lifecycleMoment: 'Trip started',
      planStatus: 'Trip started',
      confirmedParticipants: confirmedIds,
    }))
    setNotice(result.persisted ? 'Trip started in Supabase.' : 'Trip started in demo mode.')
  }

  function toggleConfirmed(profileId) {
    setConfirmedIds((current) =>
      current.includes(profileId)
        ? current.filter((id) => id !== profileId)
        : [...current, profileId]
    )
  }

  return (
    <main className="min-h-screen bg-[#07140d] px-4 py-5 text-white">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <Link href="/discover" className="inline-flex items-center gap-2 text-sm text-white/55 hover:text-white">
            <ArrowLeft className="h-4 w-4" />
            Discover
          </Link>
          <Badge className="w-fit bg-emerald-300 text-emerald-950 hover:bg-emerald-300">
            Open planning group
          </Badge>
        </div>

        <section className="mt-5 grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
          <Card className="relative overflow-hidden border-white/10 bg-white/[0.04] p-6 text-white">
            <div className="absolute right-[-12%] top-[-30%] h-80 w-80 rounded-full bg-emerald-400/15 blur-3xl" />
            <div className="relative">
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="outline" className="border-white/15 text-white/60">{trip.status}</Badge>
                <Badge variant="outline" className="border-emerald-300/20 text-emerald-100">{trip.planStatus || trip.lifecycleMoment}</Badge>
              </div>
              <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">{trip.title}</h1>
              <div className="mt-3 flex flex-wrap gap-3 text-sm text-white/58">
                <span className="inline-flex items-center gap-1.5"><MapPin className="h-4 w-4 text-emerald-300" /> {trip.route}</span>
                <span className="inline-flex items-center gap-1.5"><CalendarDays className="h-4 w-4 text-emerald-300" /> {trip.startDate}</span>
                <span className="inline-flex items-center gap-1.5"><Users className="h-4 w-4 text-emerald-300" /> {planMembers.length} in planning</span>
              </div>
              <p className="mt-5 max-w-2xl text-white/60">
                Join the planning group freely. Chat, discuss dates, and confirm only when you are actually joining the started trip.
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                <Button onClick={joinPlan} className="rounded-full bg-emerald-300 text-emerald-950 hover:bg-emerald-200">
                  Join planning group
                </Button>
                <Button onClick={startTrip} variant="ghost" className="rounded-full border border-white/10 bg-white/[0.04] text-white hover:bg-white/10">
                  <PlayCircle className="h-4 w-4" />
                  Start trip
                </Button>
              </div>
              {notice ? <div className="mt-4 rounded-xl border border-emerald-300/20 bg-emerald-300/10 px-3 py-2 text-sm text-emerald-100">{notice}</div> : null}
            </div>
          </Card>

          <Card className="border-white/10 bg-white/[0.04] p-5 text-white">
            <div className="text-xs uppercase tracking-widest text-white/45">Finalize travelers</div>
            <h2 className="mt-2 text-xl font-semibold">Who is actually going?</h2>
            <div className="mt-4 space-y-2">
              {planMembers.map((profile) => (
                <label key={profile.id} className="flex cursor-pointer items-center justify-between rounded-2xl border border-white/10 bg-black/20 p-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-400 to-amber-300 text-sm font-bold text-emerald-950">
                      {profile.initials}
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5 text-sm font-semibold">
                        {profile.name}
                        {profile.linkedInStatus === 'verified' ? <BadgeCheck className="h-3.5 w-3.5 text-[#8ccaff]" /> : null}
                      </div>
                      <div className="text-xs text-white/42">{profile.role}</div>
                    </div>
                  </div>
                  <input type="checkbox" checked={confirmedIds.includes(profile.id)} onChange={() => toggleConfirmed(profile.id)} />
                </label>
              ))}
            </div>
            <div className="mt-4 rounded-2xl border border-white/10 bg-black/20 p-3">
              <div className="flex items-center gap-2 text-sm font-semibold">
                <CheckCircle2 className="h-4 w-4 text-emerald-300" />
                {confirmedMembers.length} confirmed
              </div>
              <div className="mt-1 text-xs text-white/45">Only these people become started-trip participants.</div>
            </div>
          </Card>
        </section>

        <section className="mt-4 grid gap-4 lg:grid-cols-[1fr_360px]">
          <Card className="border-white/10 bg-white/[0.04] p-5 text-white">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs uppercase tracking-widest text-white/45">Planning chat</div>
                <h2 className="mt-1 text-xl font-semibold">Discuss before starting</h2>
              </div>
              <Lock className="h-4 w-4 text-white/38" />
            </div>
            <div className="mt-5 space-y-3">
              {(trip.chatMessages || []).map((chat) => {
                const author = findProfile(data.profiles, chat.authorId) || data.currentUser
                return (
                  <div key={chat.id} className="rounded-2xl border border-white/10 bg-black/20 p-4">
                    <div className="text-sm font-semibold text-emerald-200">{author.name}</div>
                    <div className="mt-1 text-sm text-white/68">{chat.body}</div>
                  </div>
                )
              })}
            </div>
            <form onSubmit={sendMessage} className="mt-4 flex gap-2">
              <input
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                placeholder="Ask about dates, route, pickup, stay..."
                className="min-w-0 flex-1 rounded-full border border-white/10 bg-black/25 px-4 py-2 text-sm outline-none placeholder:text-white/35"
              />
              <Button className="rounded-full bg-emerald-300 text-emerald-950 hover:bg-emerald-200">
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </Card>

          <Card className="border-white/10 bg-white/[0.04] p-5 text-white">
            <div className="text-xs uppercase tracking-widest text-white/45">Status visibility</div>
            <div className="mt-3 space-y-3">
              <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                <div className="flex items-center gap-2 font-semibold">
                  <Compass className="h-4 w-4 text-emerald-300" />
                  Trip status
                </div>
                <div className="mt-1 text-sm text-white/58">{trip.lifecycleMoment}</div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                <div className="font-semibold">Planning members</div>
                <div className="mt-1 text-sm text-white/58">Can view this planning chat and status updates.</div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                <div className="font-semibold">Confirmed travelers</div>
                <div className="mt-1 text-sm text-white/58">Only these people are added to the started trip.</div>
              </div>
            </div>
          </Card>
        </section>
      </div>
    </main>
  )
}
