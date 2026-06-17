'use client'

import { useEffect, useMemo, useState } from 'react'
import { BadgeCheck, Camera, Loader2, MessageCircle, Plus, Share2, Users } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import ChatThread from '@/components/app/ChatThread'
import TripPlanCard from '@/components/app/TripPlanCard'
import { createTrip, getBootstrap, joinCommunity, sendCommunityMessage } from '@/lib/tripundo-api'

export default function CommunityDetailPage({ communityId }) {
  const [data, setData] = useState(null)
  const [community, setCommunity] = useState(null)
  const [notice, setNotice] = useState('')
  const [plans, setPlans] = useState([])
  const [form, setForm] = useState({
    title: 'New weekend plan',
    startPoint: 'Bangalore',
    date: 'Next month',
    budget: 'Moderate',
  })

  useEffect(() => {
    getBootstrap().then((bootstrap) => {
      const selected = bootstrap.communities.find((item) => item.id === communityId) || bootstrap.communities[0]
      setData(bootstrap)
      setCommunity(selected)
      setPlans(bootstrap.trips.filter((trip) => trip.communityId === selected.id))
    })
  }, [communityId])

  const topMembers = useMemo(() => data?.profiles?.slice(0, 4) || [], [data])

  if (!data || !community) {
    return <div className="flex min-h-[60vh] items-center justify-center"><Loader2 className="h-5 w-5 animate-spin text-emerald-300" /></div>
  }

  async function join() {
    const result = await joinCommunity({ community_id: community.id, profile_id: data.currentUser.id })
    setNotice(result.persisted ? 'Joined community in Supabase.' : 'Joined community in demo mode.')
  }

  async function sendMessage(body) {
    await sendCommunityMessage({ community_id: community.id, profile_id: data.currentUser.id, body })
    setCommunity((current) => ({
      ...current,
      messages: [...(current.messages || []), { id: `cm-${Date.now()}`, authorId: data.currentUser.id, body, createdAt: new Date().toISOString() }],
    }))
  }

  async function createPlan(event) {
    event.preventDefault()
    const result = await createTrip({
      community_id: community.id,
      organizer_profile_id: data.currentUser.id,
      title: form.title,
      destination: community.destination,
      route: `${form.startPoint} -> ${community.destination}`,
      pickup_location: form.startPoint,
      expected_budget: form.budget,
      maximum_participants: 8,
      status: 'planning',
      lifecycle_moment: 'Planning group open',
    })
    const plan = {
      id: result.id || `trip-${Date.now()}`,
      communityId: community.id,
      title: form.title,
      destination: community.destination,
      route: `${form.startPoint} -> ${community.destination}`,
      startDate: form.date,
      endDate: 'To finalize',
      budget: form.budget,
      status: 'planning',
      seats: 8,
      planMembers: [data.currentUser.id],
      confirmedParticipants: [],
    }
    setPlans((current) => [plan, ...current])
    setNotice(result.persisted ? 'Trip plan created in Supabase.' : 'Trip plan created in demo mode.')
  }

  return (
    <div className="space-y-6 text-white">
      <section className="relative -mx-4 -mt-6 min-h-[430px] overflow-hidden sm:-mx-6 lg:-mx-8">
        <img src={community.cover_image_path || community.image} alt="" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 hero-scrim" />
        <div className="relative mx-auto flex min-h-[430px] max-w-7xl flex-col justify-end px-4 pb-8 sm:px-6 lg:px-8">
          <Badge className="w-fit bg-white text-emerald-950 hover:bg-white">
            {community.community_type === 'official' ? <><BadgeCheck className="mr-1.5 h-3.5 w-3.5" /> Official community</> : 'User-created group'}
          </Badge>
          <h1 className="mt-4 text-5xl font-semibold tracking-tight sm:text-7xl">{community.name}</h1>
          <p className="mt-3 max-w-2xl text-lg text-white/72">{community.focus}</p>
          <div className="mt-6 flex flex-wrap gap-2">
            <Button onClick={join} className="rounded-full bg-[hsl(var(--sunlight))] text-emerald-950 hover:bg-[hsl(var(--sand))]">
              <Users className="h-4 w-4" />
              Join Community
            </Button>
            <Button variant="ghost" className="rounded-full border border-white/15 bg-white/10 text-white hover:bg-white/15">
              <Share2 className="h-4 w-4" />
              Share
            </Button>
          </div>
          {notice ? <div className="mt-3 rounded-xl bg-black/30 px-3 py-2 text-sm text-white/75">{notice}</div> : null}
        </div>
      </section>

      <Tabs defaultValue="overview">
        <TabsList className="flex h-auto flex-wrap justify-start gap-2 bg-transparent p-0">
          {['overview', 'discussion', 'plans', 'photos', 'about'].map((tab) => (
            <TabsTrigger key={tab} value={tab} className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 capitalize data-[state=active]:bg-white data-[state=active]:text-emerald-950">
              {tab}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="overview" className="mt-5 grid gap-4 lg:grid-cols-[1fr_360px]">
          <Card className="border-white/10 bg-white/[0.04] p-5 text-white">
            <h2 className="text-2xl font-semibold">Community overview</h2>
            <p className="mt-3 text-white/60">{community.focus}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              {(community.theme_tags || []).map((tag) => <span key={tag} className="rounded-full bg-white/8 px-3 py-1.5 text-sm text-white/70">{tag}</span>)}
            </div>
          </Card>
          <Card className="border-white/10 bg-white/[0.04] p-5 text-white">
            <h3 className="font-semibold">Top members</h3>
            <div className="mt-4 space-y-3">
              {topMembers.map((profile) => (
                <div key={profile.id} className="flex items-center gap-3 rounded-xl bg-black/20 p-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[hsl(var(--sand))] text-xs font-bold text-emerald-950">{profile.initials}</div>
                  <div>
                    <div className="text-sm font-semibold">{profile.name}</div>
                    <div className="text-xs text-white/42">{profile.role}</div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="discussion" className="mt-5">
          <ChatThread messages={community.messages || []} profiles={data.profiles} currentUser={data.currentUser} onSend={sendMessage} placeholder="Discuss routes, dates, stays..." />
        </TabsContent>

        <TabsContent value="plans" className="mt-5 grid gap-4 lg:grid-cols-[1fr_360px]">
          <div className="grid gap-4 md:grid-cols-2">
            {plans.map((trip) => <TripPlanCard key={trip.id} trip={trip} profiles={data.profiles} />)}
          </div>
          <Card className="border-white/10 bg-white/[0.04] p-5 text-white">
            <h3 className="text-xl font-semibold">Create trip plan</h3>
            <form onSubmit={createPlan} className="mt-4 space-y-3">
              <input value={form.title} onChange={(event) => setForm((current) => ({ ...current, title: event.target.value }))} className="w-full rounded-xl border border-white/10 bg-black/25 px-3 py-2 text-sm outline-none" placeholder="Plan title" />
              <input value={form.startPoint} onChange={(event) => setForm((current) => ({ ...current, startPoint: event.target.value }))} className="w-full rounded-xl border border-white/10 bg-black/25 px-3 py-2 text-sm outline-none" placeholder="Starting point" />
              <input value={form.date} onChange={(event) => setForm((current) => ({ ...current, date: event.target.value }))} className="w-full rounded-xl border border-white/10 bg-black/25 px-3 py-2 text-sm outline-none" placeholder="Date idea" />
              <input value={form.budget} onChange={(event) => setForm((current) => ({ ...current, budget: event.target.value }))} className="w-full rounded-xl border border-white/10 bg-black/25 px-3 py-2 text-sm outline-none" placeholder="Budget" />
              <Button className="w-full rounded-full bg-[hsl(var(--sunlight))] text-emerald-950 hover:bg-[hsl(var(--sand))]">
                <Plus className="h-4 w-4" />
                Create Plan
              </Button>
            </form>
          </Card>
        </TabsContent>

        <TabsContent value="photos" className="mt-5 grid gap-3 md:grid-cols-3">
          {(community.photos || []).map((photo) => (
            <div key={photo} className="destination-card aspect-[4/3]">
              <img src={photo} alt="" className="h-full w-full object-cover" />
            </div>
          ))}
        </TabsContent>

        <TabsContent value="about" className="mt-5">
          <Card className="border-white/10 bg-white/[0.04] p-5 text-white">
            <div className="flex items-center gap-2 text-lg font-semibold"><Camera className="h-5 w-5 text-emerald-300" /> Community rules</div>
            <div className="mt-3 grid gap-2 text-sm text-white/60">
              <div>Open planning, respectful chat, verified identity preferred.</div>
              <div>Official reserved keyword: {community.reserved_keyword || 'none'}</div>
              <div>Created: {community.createdAt}</div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
