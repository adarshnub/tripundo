'use client'

import Link from 'next/link'
import { useEffect, useMemo, useState } from 'react'
import {
  Bell,
  BadgeCheck,
  Briefcase,
  Camera,
  CheckCircle2,
  Compass,
  LayoutDashboard,
  Linkedin,
  Loader2,
  Lock,
  Map,
  MessageCircle,
  Plus,
  Search,
  Shield,
  Sparkles,
  Star,
  User,
  Users,
} from 'lucide-react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { getBootstrap, createTrip, joinTripPlan, enableTravelerPresence } from '@/lib/tripundo-api'

const navItems = [
  { href: '/discover', label: 'Discover', icon: Search },
  { href: '/communities', label: 'Communities', icon: Users },
  { href: '/trips', label: 'Trips', icon: Compass },
  { href: '/messages', label: 'Messages', icon: MessageCircle },
  { href: '/profile', label: 'Profile', icon: User },
]

function LoadingState() {
  return (
    <div className="min-h-screen bg-[#07140d] text-white flex items-center justify-center">
      <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-4">
        <Loader2 className="h-5 w-5 animate-spin text-emerald-300" />
        <span className="text-sm text-white/70">Loading Tripundo workspace</span>
      </div>
    </div>
  )
}

function AppChrome({ active, children, data }) {
  const sourceLabel = data?.source === 'supabase' ? 'Supabase live' : 'Demo API mode'

  return (
    <div className="min-h-screen bg-[#07140d] text-white">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute left-[-12%] top-[-8%] h-96 w-96 rounded-full bg-emerald-500/15 blur-3xl" />
        <div className="absolute right-[-10%] top-[18%] h-96 w-96 rounded-full bg-amber-400/10 blur-3xl" />
        <div className="absolute bottom-[-12%] left-[35%] h-96 w-96 rounded-full bg-teal-500/10 blur-3xl" />
      </div>

      <aside className="fixed left-0 top-0 z-40 hidden h-screen w-72 border-r border-white/10 bg-[#07140d]/85 px-4 py-5 backdrop-blur-xl lg:block">
        <Link href="/" className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] p-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-400 via-teal-500 to-amber-400">
            <Map className="h-5 w-5 text-white" />
          </div>
          <div>
            <div className="text-lg font-semibold tracking-tight">Tripundo</div>
            <div className="text-xs text-white/45">Verified group travel</div>
          </div>
        </Link>

        <nav className="mt-7 space-y-1.5">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = active === item.label.toLowerCase()
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition ${
                  isActive
                    ? 'bg-emerald-400 text-emerald-950 shadow-lg shadow-emerald-500/20'
                    : 'text-white/65 hover:bg-white/[0.06] hover:text-white'
                }`}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </Link>
            )
          })}
          <Link
            href="/story-studio"
            className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition ${
              active === 'stories'
                ? 'bg-amber-300 text-emerald-950 shadow-lg shadow-amber-500/20'
                : 'text-white/65 hover:bg-white/[0.06] hover:text-white'
            }`}
          >
            <Camera className="h-4 w-4" />
            Trip Story Studio
          </Link>
          <Link
            href="/admin"
            className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition ${
              active === 'admin'
                ? 'bg-white text-emerald-950'
                : 'text-white/65 hover:bg-white/[0.06] hover:text-white'
            }`}
          >
            <LayoutDashboard className="h-4 w-4" />
            Admin
          </Link>
        </nav>

        <div className="absolute inset-x-4 bottom-5 rounded-2xl border border-white/10 bg-white/[0.04] p-4">
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-white/40">
            <Shield className="h-3.5 w-3.5 text-emerald-300" />
            Data mode
          </div>
          <div className="mt-2 text-sm font-medium">{sourceLabel}</div>
          <div className="mt-1 text-xs text-white/45">UI uses API routes only. Supabase stays server-side.</div>
        </div>
      </aside>

      <main className="relative pb-24 lg:ml-72 lg:pb-0">
        <header className="sticky top-0 z-30 border-b border-white/10 bg-[#07140d]/80 px-4 py-3 backdrop-blur-xl sm:px-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <div className="text-xs uppercase tracking-[0.28em] text-emerald-300/70">Tripundo V1</div>
              <h1 className="mt-1 text-xl font-semibold tracking-tight sm:text-2xl">
                {active === 'discover' ? 'Discover' : 'Trust-first travel for tech communities'}
              </h1>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" className="rounded-full border border-white/10 bg-white/[0.04] text-white">
                <Bell className="h-4 w-4" />
              </Button>
              <Button className="hidden rounded-full bg-white text-emerald-950 hover:bg-white/90 sm:inline-flex">
                <Plus className="h-4 w-4" />
                Create trip
              </Button>
            </div>
          </div>
        </header>

        {children}
      </main>

      <nav className="fixed inset-x-0 bottom-0 z-50 border-t border-white/10 bg-[#07140d]/92 px-2 pb-2 pt-1 backdrop-blur-xl lg:hidden">
        <div className="grid grid-cols-5 gap-1">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = active === item.label.toLowerCase()
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex flex-col items-center gap-1 rounded-xl px-1 py-2 text-[11px] ${
                  isActive ? 'bg-emerald-400 text-emerald-950' : 'text-white/55'
                }`}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </Link>
            )
          })}
        </div>
      </nav>
    </div>
  )
}

function StatCard({ label, value, helper, icon: Icon }) {
  return (
    <Card className="border-white/10 bg-white/[0.04] p-4 text-white">
      <div className="flex items-center justify-between">
        <div className="text-xs uppercase tracking-widest text-white/45">{label}</div>
        <Icon className="h-4 w-4 text-emerald-300" />
      </div>
      <div className="mt-3 text-3xl font-semibold">{value}</div>
      <div className="mt-1 text-xs text-white/45">{helper}</div>
    </Card>
  )
}

function DiscoverView({ data }) {
  const profile = data.currentUser
  const [query, setQuery] = useState('')
  const [plans, setPlans] = useState(data.trips)
  const [planMessage, setPlanMessage] = useState('')
  const [form, setForm] = useState({
    destination: 'Munnar',
    startingPoint: 'Bangalore',
    title: 'Munnar weekend plan',
    dateWindow: 'Mid July',
    budget: 'Moderate',
    seats: 8,
    note: 'Open planning group. Dates can be finalized in chat.',
  })
  const destinations = data.communities.filter((community) => {
    const needle = query.trim().toLowerCase()
    if (!needle) return true
    return [community.name, community.destination, community.focus, ...(community.tags || [])]
      .join(' ')
      .toLowerCase()
      .includes(needle)
  })

  async function createOpenPlan(event) {
    event.preventDefault()
    const community =
      data.communities.find((item) => item.destination.toLowerCase() === form.destination.toLowerCase()) ||
      data.communities[0]
    const localPlan = {
      id: `trip-plan-${Date.now()}`,
      communityId: community.id,
      title: form.title,
      destination: form.destination,
      route: `${form.startingPoint} -> ${form.destination}`,
      startDate: form.dateWindow,
      endDate: 'To finalize',
      pickup: form.startingPoint,
      budget: form.budget,
      status: 'planning',
      groupType: 'Mixed',
      seats: Number(form.seats) || 8,
      seatsAvailable: Number(form.seats) || 8,
      planMembers: [profile.id],
      confirmedParticipants: [],
      organizerId: profile.id,
      organizer: profile.name,
      matchScore: 90,
      groupTrustScore: profile.trustScore,
      lifecycleMoment: 'Planning group open',
      planStatus: 'Date not finalized',
      resources: ['Open discussion', 'Date to finalize', 'Route to finalize'],
      icebreakers: ['Who is seriously interested?', 'Which date works for everyone?'],
      chatMessages: [
        {
          id: `msg-${Date.now()}`,
          authorId: profile.id,
          body: form.note,
          createdAt: new Date().toISOString(),
        },
      ],
    }

    const result = await createTrip({
      community_id: community.id,
      organizer_profile_id: profile.id,
      title: form.title,
      destination: form.destination,
      route: localPlan.route,
      pickup_location: form.startingPoint,
      expected_budget: form.budget,
      description: form.note,
      maximum_participants: Number(form.seats) || 8,
      status: 'planning',
      lifecycle_moment: 'Planning group open',
    })

    const nextPlan = result.persisted ? { ...localPlan, id: result.id } : localPlan
    if (typeof window !== 'undefined') {
      const existing = JSON.parse(window.localStorage.getItem('tripundo-demo-plans') || '[]')
      window.localStorage.setItem('tripundo-demo-plans', JSON.stringify([nextPlan, ...existing]))
    }
    setPlans((current) => [nextPlan, ...current])
    setPlanMessage(result.persisted ? 'Trip plan created in Supabase.' : 'Trip plan created in demo mode.')
  }

  return (
    <div className="space-y-6 p-4 sm:p-6">
      <section className="grid gap-4 xl:grid-cols-[1.15fr_0.85fr]">
        <Card className="relative overflow-hidden border-white/10 bg-gradient-to-br from-emerald-950 via-[#0b281d] to-[#18200d] p-5 text-white sm:p-6">
          <div className="absolute inset-0 opacity-55">
            <img
              src="https://images.unsplash.com/photo-1635756227689-01eda5140530?crop=entropy&cs=srgb&fm=jpg&q=85&w=1600"
              alt=""
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#07140d] via-[#07140d]/70 to-[#07140d]/25" />
            <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#07140d] to-transparent" />
          </div>
          <div className="relative max-w-xl">
            <Badge className="border-emerald-300/30 bg-emerald-300/15 text-emerald-100 hover:bg-emerald-300/15">
              Discover
            </Badge>
            <h2 className="mt-5 text-4xl font-semibold tracking-tight sm:text-5xl">
              Pick a destination.
            </h2>
            <p className="mt-3 text-white/65">Find plans. Or start one.</p>
            <div className="mt-6 flex items-center gap-3 rounded-2xl border border-white/15 bg-white/12 px-4 py-3 backdrop-blur">
              <Search className="h-5 w-5 text-emerald-200" />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Try Munnar, Wayanad, Goa, Varkala..."
                className="w-full bg-transparent text-sm text-white outline-none placeholder:text-white/42"
              />
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {['Munnar', 'Wayanad', 'Goa', 'Varkala'].map((tag) => (
                <button
                  key={tag}
                  onClick={() => setQuery(tag)}
                  className="rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-xs text-white/78 hover:bg-white/18"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </Card>

        <Card className="border-white/10 bg-white/[0.04] p-5 text-white">
          <div className="text-xs uppercase tracking-widest text-white/45">Create trip plan</div>
          <form onSubmit={createOpenPlan} className="mt-4 space-y-3">
            <div className="grid grid-cols-2 gap-2">
              <input value={form.destination} onChange={(event) => setForm((current) => ({ ...current, destination: event.target.value }))} className="rounded-xl border border-white/10 bg-black/25 px-3 py-2 text-sm outline-none" placeholder="Destination" />
              <input value={form.startingPoint} onChange={(event) => setForm((current) => ({ ...current, startingPoint: event.target.value }))} className="rounded-xl border border-white/10 bg-black/25 px-3 py-2 text-sm outline-none" placeholder="Starting point" />
            </div>
            <input value={form.title} onChange={(event) => setForm((current) => ({ ...current, title: event.target.value }))} className="w-full rounded-xl border border-white/10 bg-black/25 px-3 py-2 text-sm outline-none" placeholder="Plan title" />
            <div className="grid grid-cols-3 gap-2">
              <input value={form.dateWindow} onChange={(event) => setForm((current) => ({ ...current, dateWindow: event.target.value }))} className="rounded-xl border border-white/10 bg-black/25 px-3 py-2 text-sm outline-none" placeholder="Date idea" />
              <input value={form.budget} onChange={(event) => setForm((current) => ({ ...current, budget: event.target.value }))} className="rounded-xl border border-white/10 bg-black/25 px-3 py-2 text-sm outline-none" placeholder="Budget" />
              <input type="number" min="2" max="20" value={form.seats} onChange={(event) => setForm((current) => ({ ...current, seats: Number(event.target.value) }))} className="rounded-xl border border-white/10 bg-black/25 px-3 py-2 text-sm outline-none" placeholder="People" />
            </div>
            <textarea value={form.note} onChange={(event) => setForm((current) => ({ ...current, note: event.target.value }))} className="min-h-20 w-full rounded-xl border border-white/10 bg-black/25 px-3 py-2 text-sm outline-none" placeholder="What should people discuss first?" />
            <Button className="w-full rounded-full bg-emerald-300 text-emerald-950 hover:bg-emerald-200">
              Create open planning group
            </Button>
          </form>
          {planMessage ? <div className="mt-3 rounded-xl border border-emerald-300/20 bg-emerald-300/10 px-3 py-2 text-xs text-emerald-100">{planMessage}</div> : null}
        </Card>
      </section>

      <section>
        <div className="mb-3 flex items-end justify-between gap-3">
          <div>
            <h2 className="text-xl font-semibold">Trending destinations</h2>
            <p className="mt-1 text-sm text-white/45">Open plans under each place.</p>
          </div>
          <Link href="/communities" className="text-sm text-emerald-300">All communities</Link>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {destinations.map((community) => (
            <Card key={community.id} className="group overflow-hidden border-white/10 bg-white/[0.04] text-white">
                <div className="relative h-44">
                  <img src={community.image} alt="" className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#07140d] via-[#07140d]/18 to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3">
                    <div className="text-2xl font-semibold">{community.destination}</div>
                    <div className="text-xs text-white/70">{plans.filter((trip) => trip.communityId === community.id || trip.destination === community.destination).length} open plans</div>
                  </div>
                </div>
                <div className="p-3">
                  <div className="line-clamp-1 text-sm font-medium">{community.name}</div>
                  <div className="mt-2 flex items-center justify-between text-xs text-white/45">
                    <span>{community.members} members</span>
                    <span>{community.trustScore} trust</span>
                  </div>
                  <div className="mt-3 space-y-2">
                    {plans
                      .filter((trip) => trip.communityId === community.id || trip.destination === community.destination)
                      .slice(0, 3)
                      .map((trip) => (
                        <div key={trip.id} className="rounded-xl border border-white/10 bg-black/25 p-3">
                          <div className="flex items-start justify-between gap-3">
                            <div>
                              <div className="text-sm font-semibold">{trip.title}</div>
                              <div className="mt-1 text-xs text-white/45">{trip.route} · {trip.planStatus || trip.lifecycleMoment}</div>
                            </div>
                            <Link href={`/trip-plans/${trip.id}`} className="shrink-0 rounded-full bg-emerald-300 px-3 py-1 text-xs font-medium text-emerald-950">
                              Open
                            </Link>
                          </div>
                          <div className="mt-2 flex items-center gap-2 text-[11px] text-white/42">
                            <span>{trip.planMembers?.length || 1} in plan</span>
                            <span>·</span>
                            <span>{trip.confirmedParticipants?.length || 0} confirmed</span>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </Card>
          ))}
        </div>
      </section>

      <section className="grid gap-4 xl:grid-cols-[1fr_0.8fr]">
        <TripsPanel trips={plans.slice(0, 3)} profile={profile} />
        <MatchesPanel data={data} />
      </section>
    </div>
  )
}

function TripsPanel({ trips, profile }) {
  const [message, setMessage] = useState('')

  async function joinPlan(trip) {
    const result = await joinTripPlan({
      trip_id: trip.id,
      profile_id: profile.id,
      confirmed_for_trip: false,
    })
    setMessage(result.persisted ? 'Joined planning group in Supabase.' : 'Joined planning group in demo mode.')
  }

  return (
    <Card className="border-white/10 bg-white/[0.04] p-5 text-white">
      <div className="flex items-center justify-between gap-3">
        <div>
          <div className="text-xs uppercase tracking-widest text-white/45">Open planning groups</div>
          <h2 className="mt-1 text-xl font-semibold">Join freely. Decide later.</h2>
        </div>
        <Link href="/trips" className="text-sm text-emerald-300">View all</Link>
      </div>
      <div className="mt-5 space-y-3">
        {trips.map((trip) => (
          <div key={trip.id} className="rounded-2xl border border-white/10 bg-black/20 p-4">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="font-semibold">{trip.title}</h3>
                  <Badge className="bg-emerald-300/15 text-emerald-100 hover:bg-emerald-300/15">{trip.status}</Badge>
                  <Badge variant="outline" className="border-white/15 text-white/60">{trip.groupType}</Badge>
                </div>
                <div className="mt-1 text-sm text-white/55">{trip.route} · {trip.startDate} · {trip.seatsAvailable} seats left</div>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {trip.resources.slice(0, 2).map((resource) => (
                    <span key={resource} className="rounded-full bg-white/5 px-2 py-1 text-[11px] text-white/50">{resource}</span>
                  ))}
                </div>
              </div>
              <div className="flex shrink-0 flex-wrap gap-2">
                <Button onClick={() => joinPlan(trip)} className="rounded-full bg-emerald-300 text-emerald-950 hover:bg-emerald-200">
                  Join plan
                </Button>
                <Button asChild variant="ghost" className="rounded-full border border-white/10 bg-white/[0.04] text-white hover:bg-white/10">
                  <Link href={`/trip-plans/${trip.id}`}>Open chat</Link>
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {message ? <div className="mt-4 rounded-xl border border-emerald-300/20 bg-emerald-300/10 px-3 py-2 text-sm text-emerald-100">{message}</div> : null}
    </Card>
  )
}

function MatchesPanel({ data }) {
  const currentUser = data.currentUser
  const matches = data.profiles
    .filter((profile) => profile.id !== currentUser.id)
    .map((profile) => ({
      ...profile,
      matchScore: Math.max(80, Math.round((profile.trustScore + currentUser.trustScore) / 2)),
    }))

  return (
    <Card className="border-white/10 bg-white/[0.04] p-5 text-white">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-xs uppercase tracking-widest text-white/45">Icebreaker matches</div>
          <h2 className="mt-1 text-xl font-semibold">Compatible travelers</h2>
        </div>
        <Search className="h-4 w-4 text-white/40" />
      </div>
      <div className="mt-5 space-y-3">
        {matches.map((profile) => (
          <div key={profile.id} className="rounded-2xl border border-white/10 bg-black/20 p-4">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-400 to-amber-300 font-bold text-emerald-950">
                  {profile.initials}
                </div>
                <div>
                  <div className="flex items-center gap-1.5 text-sm font-semibold">
                    {profile.name}
                    {profile.linkedInStatus === 'verified' ? <Linkedin className="h-3.5 w-3.5 text-[#72b7ff]" /> : null}
                  </div>
                  <div className="text-xs text-white/45">{profile.role} · {profile.company}</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-xl font-semibold text-emerald-200">{profile.matchScore}%</div>
                <div className="text-[10px] uppercase tracking-widest text-white/35">match</div>
              </div>
            </div>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {[profile.persona, profile.industry, ...profile.interests.slice(0, 2)].map((tag) => (
                <span key={tag} className="rounded-full bg-white/5 px-2 py-1 text-[11px] text-white/50">{tag}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}

function CommunitiesView({ data }) {
  return (
    <div className="space-y-6 p-4 sm:p-6">
      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
        <div>
          <div className="text-xs uppercase tracking-[0.28em] text-emerald-300/70">Destination communities</div>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight">Admin-created circles for similar-minded professionals</h2>
        </div>
        <Badge className="w-fit bg-white/10 text-white hover:bg-white/10">Community creation restricted to admins in V1</Badge>
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        {data.communities.map((community) => (
          <Card key={community.id} className="overflow-hidden border-white/10 bg-white/[0.04] text-white">
            <div className="relative h-48">
              <img src={community.image} alt="" className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#07140d] via-[#07140d]/25 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <div className="text-2xl font-semibold">{community.name}</div>
                <div className="mt-1 text-sm text-white/70">{community.focus}</div>
              </div>
            </div>
            <div className="p-4">
              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="rounded-xl bg-black/20 p-3"><div className="font-semibold">{community.members}</div><div className="text-xs text-white/40">members</div></div>
                <div className="rounded-xl bg-black/20 p-3"><div className="font-semibold">{community.activeTrips}</div><div className="text-xs text-white/40">trips</div></div>
                <div className="rounded-xl bg-black/20 p-3"><div className="font-semibold">{community.trustScore}</div><div className="text-xs text-white/40">trust</div></div>
              </div>
              <Tabs defaultValue="discussions" className="mt-4">
                <TabsList className="grid w-full grid-cols-4 bg-black/25">
                  <TabsTrigger value="discussions">Talk</TabsTrigger>
                  <TabsTrigger value="trips">Trips</TabsTrigger>
                  <TabsTrigger value="photos">Photos</TabsTrigger>
                  <TabsTrigger value="about">About</TabsTrigger>
                </TabsList>
                <TabsContent value="discussions" className="space-y-2">
                  {community.discussions.map((item) => (
                    <div key={item} className="rounded-xl border border-white/10 bg-black/20 px-3 py-2 text-sm text-white/65">{item}</div>
                  ))}
                </TabsContent>
                <TabsContent value="trips" className="text-sm text-white/60">
                  {data.trips.filter((trip) => trip.communityId === community.id).length || 'No active trip in demo seed yet.'}
                </TabsContent>
                <TabsContent value="photos" className="text-sm text-white/60">Private community photos appear after joining.</TabsContent>
                <TabsContent value="about" className="text-sm text-white/60">{community.tags.join(' · ')}</TabsContent>
              </Tabs>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}

function TripsView({ data }) {
  return (
    <div className="space-y-6 p-4 sm:p-6">
        <div>
          <div className="text-xs uppercase tracking-[0.28em] text-emerald-300/70">Trip planning</div>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight">Open plans, group chat, then start the trip</h2>
      </div>
      <div className="grid gap-4">
        {data.trips.map((trip) => (
          <Card key={trip.id} className="border-white/10 bg-white/[0.04] p-5 text-white">
            <div className="grid gap-5 lg:grid-cols-[1fr_280px]">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="text-2xl font-semibold">{trip.title}</h3>
                  <Badge className="bg-emerald-300/15 text-emerald-100 hover:bg-emerald-300/15">{trip.status}</Badge>
                  <Badge variant="outline" className="border-white/15 text-white/60">{trip.lifecycleMoment}</Badge>
                </div>
                <div className="mt-2 text-white/55">{trip.route} · {trip.startDate} to {trip.endDate} · pickup {trip.pickup}</div>
                <div className="mt-4 grid gap-2 sm:grid-cols-3">
                  <div className="rounded-xl bg-black/20 p-3"><div className="text-xs text-white/40">Seats</div><div className="font-semibold">{trip.seatsAvailable}/{trip.seats} available</div></div>
                  <div className="rounded-xl bg-black/20 p-3"><div className="text-xs text-white/40">Budget</div><div className="font-semibold">{trip.budget}</div></div>
                  <div className="rounded-xl bg-black/20 p-3"><div className="text-xs text-white/40">Group trust</div><div className="font-semibold">{trip.groupTrustScore}</div></div>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {trip.icebreakers.map((prompt) => (
                    <span key={prompt} className="rounded-full border border-amber-300/20 bg-amber-300/10 px-3 py-1 text-xs text-amber-100">
                      {prompt}
                    </span>
                  ))}
                </div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                <div className="text-xs uppercase tracking-widest text-white/40">Organizer review card</div>
                <div className="mt-3 text-lg font-semibold">{trip.organizer}</div>
                <div className="mt-1 text-sm text-white/55">Anyone can join the planning group. Final travelers are locked only when the trip starts.</div>
                <Button asChild className="mt-4 w-full rounded-full bg-emerald-300 text-emerald-950 hover:bg-emerald-200">
                  <Link href={`/trip-plans/${trip.id}`}>Open planning group</Link>
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}

function MessagesView({ data }) {
  const [presence, setPresence] = useState('')

  async function togglePresence() {
    const result = await enableTravelerPresence({
      profile_id: data.currentUser.id,
      trip_id: data.trips[0].id,
      approximate_distance_band: 'Within 5 KM',
      enabled: true,
    })
    setPresence(result.persisted ? 'Travel Presence saved to Supabase.' : 'Travel Presence enabled in demo API mode.')
  }

  return (
    <div className="grid gap-4 p-4 sm:p-6 xl:grid-cols-[0.7fr_1.3fr]">
      <Card className="border-white/10 bg-white/[0.04] p-5 text-white">
        <div className="text-xs uppercase tracking-widest text-white/45">Private groups</div>
        <div className="mt-4 space-y-3">
          {data.trips.map((trip) => (
            <div key={trip.id} className="rounded-2xl border border-white/10 bg-black/20 p-4">
              <div className="font-semibold">{trip.title}</div>
              <div className="mt-1 text-xs text-white/45">Only approved participants can access.</div>
            </div>
          ))}
        </div>
      </Card>
      <Card className="border-white/10 bg-white/[0.04] p-5 text-white">
        <div className="flex items-start justify-between">
          <div>
            <div className="text-xs uppercase tracking-widest text-white/45">Munnar Mist Sprint</div>
            <h2 className="mt-1 text-2xl font-semibold">Planning chat</h2>
          </div>
          <Lock className="h-5 w-5 text-emerald-300" />
        </div>
        <div className="mt-5 space-y-3">
          {[
            ['Aarav', 'I can drive the first leg. Need one more driver for hill roads.'],
            ['Meera', 'Poll created: sunrise stop or breakfast stop first?'],
            ['Tripundo', 'Checklist updated: medicines, power banks, ID documents.'],
          ].map(([name, text]) => (
            <div key={text} className="rounded-2xl border border-white/10 bg-black/20 p-4">
              <div className="text-sm font-semibold text-emerald-200">{name}</div>
              <div className="mt-1 text-sm text-white/65">{text}</div>
            </div>
          ))}
        </div>
        <div className="mt-5 rounded-2xl border border-emerald-300/20 bg-emerald-300/10 p-4">
          <div className="font-semibold text-emerald-100">Active Traveler Discovery</div>
          <div className="mt-1 text-sm text-white/60">Enable approximate presence only while on an active trip. Exact location is never shown automatically.</div>
          <Button onClick={togglePresence} className="mt-3 rounded-full bg-emerald-300 text-emerald-950 hover:bg-emerald-200">Enable Travel Presence</Button>
          {presence ? <div className="mt-3 text-sm text-emerald-100">{presence}</div> : null}
        </div>
      </Card>
    </div>
  )
}

function ProfileView({ data }) {
  const profile = data.currentUser

  return (
    <div className="grid gap-4 p-4 sm:p-6 xl:grid-cols-[0.75fr_1.25fr]">
      <Card className="border-white/10 bg-white/[0.04] p-6 text-white">
        <div className="flex items-center gap-4">
          <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-emerald-400 to-amber-300 text-2xl font-bold text-emerald-950">
            {profile.initials}
          </div>
          <div>
            <div className="flex items-center gap-2 text-2xl font-semibold">
              {profile.name}
              <BadgeCheck className="h-5 w-5 text-emerald-300" />
            </div>
            <div className="text-white/55">{profile.role} · {profile.company}</div>
          </div>
        </div>
        <div className="mt-6">
          <div className="text-xs uppercase tracking-widest text-white/40">Trust score</div>
          <div className="mt-1 text-6xl font-semibold text-emerald-200">{profile.trustScore}</div>
          <Progress value={profile.trustScore} className="mt-4 bg-white/10" />
        </div>
      </Card>
      <div className="grid gap-4 md:grid-cols-2">
        {[
          ['Professional', [profile.company, profile.role, profile.industry, 'LinkedIn Connected']],
          ['Travel', [`${profile.tripsCompleted} trips completed`, 'Munnar, Wayanad, Goa', 'Weekend treks', 'Road trips']],
          ['Lifestyle', ['Non-smoker', 'Vegetarian friendly', 'Moderate budget', 'Coffee stops']],
          ['Trust', profile.badges],
        ].map(([title, items]) => (
          <Card key={title} className="border-white/10 bg-white/[0.04] p-5 text-white">
            <div className="text-lg font-semibold">{title}</div>
            <div className="mt-4 space-y-2">
              {items.map((item) => (
                <div key={item} className="flex items-center gap-2 rounded-xl border border-white/10 bg-black/20 px-3 py-2 text-sm text-white/65">
                  <CheckCircle2 className="h-4 w-4 text-emerald-300" />
                  {item}
                </div>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}

function AdminView({ data }) {
  const metrics = data.adminMetrics

  return (
    <div className="space-y-6 p-4 sm:p-6">
      <div>
        <div className="text-xs uppercase tracking-[0.28em] text-emerald-300/70">Admin control room</div>
        <h2 className="mt-2 text-3xl font-semibold tracking-tight">Moderation, reports, communities, safety</h2>
      </div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        <StatCard label="Total users" value={metrics.totalUsers} helper="Registered profiles" icon={Users} />
        <StatCard label="Verified users" value={metrics.verifiedUsers} helper="Phone/email/profile complete" icon={Shield} />
        <StatCard label="Trips created" value={metrics.tripsCreated} helper="All-time" icon={Compass} />
        <StatCard label="Trips completed" value={metrics.tripsCompleted} helper="Trust events" icon={Star} />
        <StatCard label="Communities" value={metrics.activeCommunities} helper="Admin-created" icon={Briefcase} />
        <StatCard label="Reports pending" value={metrics.reportsPending} helper="Needs review" icon={Bell} />
      </div>
      <Card className="border-white/10 bg-white/[0.04] p-5 text-white">
        <div className="font-semibold">Pending moderation queue</div>
        <div className="mt-4 space-y-3">
          {['Fake identity report in Goa Founders', 'Unsafe behaviour report in Wayanad Remote Reset', 'Community photo needs review'].map((item) => (
            <div key={item} className="flex items-center justify-between rounded-2xl border border-white/10 bg-black/20 p-4">
              <span className="text-sm text-white/65">{item}</span>
              <Button variant="ghost" className="text-emerald-200 hover:bg-white/10 hover:text-white">Review</Button>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}

export default function TripundoApp({ active = 'home' }) {
  const [data, setData] = useState(null)
  const [error, setError] = useState('')

  useEffect(() => {
    getBootstrap()
      .then(setData)
      .catch((err) => setError(err.message))
  }, [])

  const view = useMemo(() => {
    if (!data) return null
    if (active === 'communities') return <CommunitiesView data={data} />
    if (active === 'trips') return <TripsView data={data} />
    if (active === 'messages') return <MessagesView data={data} />
    if (active === 'profile') return <ProfileView data={data} />
    if (active === 'admin') return <AdminView data={data} />
    return <DiscoverView data={data} />
  }, [active, data])

  if (error) {
    return (
      <div className="min-h-screen bg-[#07140d] p-6 text-white">
        <Card className="mx-auto mt-20 max-w-xl border-red-400/20 bg-red-500/10 p-5 text-red-100">
          {error}
        </Card>
      </div>
    )
  }

  if (!data) return <LoadingState />

  return (
    <AppChrome active={active} data={data}>
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}>
        {view}
      </motion.div>
    </AppChrome>
  )
}
