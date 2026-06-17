'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { Loader2, Plus, Search, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import CommunityCard from '@/components/app/CommunityCard'
import { createCommunity, getBootstrap } from '@/lib/tripundo-api'

export default function DiscoverPage() {
  const [data, setData] = useState(null)
  const [query, setQuery] = useState('')
  const [message, setMessage] = useState('')
  const [form, setForm] = useState({
    name: 'Weekend Cloud Walkers',
    destination: 'Kerala',
    focus: 'Small nature-first weekend groups for tech folks.',
  })

  useEffect(() => {
    getBootstrap().then(setData)
  }, [])

  const official = useMemo(() => data?.communities?.filter((community) => community.community_type === 'official') || [], [data])
  const userCreated = useMemo(() => data?.communities?.filter((community) => community.community_type === 'user_created') || [], [data])
  const filteredOfficial = official.filter((community) => {
    const needle = query.toLowerCase()
    if (!needle) return true
    return [community.name, community.destination, community.focus, ...(community.theme_tags || [])].join(' ').toLowerCase().includes(needle)
  })

  async function submitCommunity(event) {
    event.preventDefault()
    try {
      const result = await createCommunity({
        ...form,
        created_by_profile_id: data.currentUser.id,
        cover_image_path: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1600&q=85',
        theme_tags: ['User group', 'Weekend', 'Nature'],
      })
      if (result.error) throw new Error(result.error)
      setMessage(result.persisted ? 'Community created in Supabase.' : 'Community created in demo mode.')
    } catch (error) {
      setMessage(error.message)
    }
  }

  if (!data) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center text-white">
        <Loader2 className="h-5 w-5 animate-spin text-emerald-300" />
      </div>
    )
  }

  const hero = official[0]

  return (
    <div className="space-y-8">
      <section className="relative -mx-4 -mt-6 min-h-[74vh] overflow-hidden sm:-mx-6 lg:-mx-8">
        <img src={hero.cover_image_path} alt="" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 hero-scrim" />
        <div className="relative mx-auto flex min-h-[74vh] max-w-7xl flex-col justify-end px-4 pb-8 sm:px-6 lg:px-8">
          <Badge className="w-fit bg-white text-emerald-950 hover:bg-white">Trending now</Badge>
          <h1 className="mt-5 max-w-3xl text-5xl font-semibold tracking-tight text-white sm:text-7xl">
            Find a community before you plan a trip.
          </h1>
          <p className="mt-4 max-w-xl text-lg text-white/72">
            Join open destination groups, talk with real travelers, then create focused trip sub-groups when the plan becomes real.
          </p>
          <div className="mt-7 flex max-w-2xl items-center gap-3 rounded-2xl border border-white/15 bg-black/22 px-4 py-3 backdrop-blur">
            <Search className="h-5 w-5 text-[hsl(var(--sunlight))]" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search Munnar, Varkala, founders, hikes..."
              className="w-full bg-transparent text-sm text-white outline-none placeholder:text-white/45"
            />
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {data.reservedKeywords.map((keyword) => (
              <button key={keyword} onClick={() => setQuery(keyword)} className="rounded-full bg-white/12 px-3 py-1.5 text-xs capitalize text-white/82 backdrop-blur hover:bg-white/20">
                {keyword}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="mb-4 flex items-end justify-between gap-3">
          <div>
            <div className="text-xs uppercase tracking-[0.28em] text-emerald-300/70">Official communities</div>
            <h2 className="mt-2 text-2xl font-semibold text-white">Trending destinations</h2>
          </div>
          <Link href="/communities" className="text-sm text-emerald-200">View all</Link>
        </div>
        <div className="grid gap-4 lg:grid-cols-2">
          {filteredOfficial.slice(0, 4).map((community, index) => (
            <CommunityCard key={community.id} community={community} featured={index === 0} />
          ))}
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-[1fr_360px]">
        <div>
          <div className="mb-4 flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-[hsl(var(--sunlight))]" />
            <h2 className="text-2xl font-semibold text-white">User-created groups</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {userCreated.map((community) => (
              <CommunityCard key={community.id} community={community} />
            ))}
          </div>
        </div>

        <Card className="border-white/10 bg-white/[0.04] p-5 text-white">
          <div className="text-xs uppercase tracking-widest text-white/45">Create community</div>
          <h3 className="mt-2 text-xl font-semibold">Start a travel group</h3>
          <p className="mt-1 text-sm text-white/50">Reserved destinations attach to official communities.</p>
          <form onSubmit={submitCommunity} className="mt-5 space-y-3">
            <input value={form.name} onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))} className="w-full rounded-xl border border-white/10 bg-black/25 px-3 py-2 text-sm outline-none" placeholder="Group name" />
            <input value={form.destination} onChange={(event) => setForm((current) => ({ ...current, destination: event.target.value }))} className="w-full rounded-xl border border-white/10 bg-black/25 px-3 py-2 text-sm outline-none" placeholder="Destination or region" />
            <textarea value={form.focus} onChange={(event) => setForm((current) => ({ ...current, focus: event.target.value }))} className="min-h-24 w-full rounded-xl border border-white/10 bg-black/25 px-3 py-2 text-sm outline-none" placeholder="What is this community for?" />
            <Button className="w-full rounded-full bg-[hsl(var(--sunlight))] text-emerald-950 hover:bg-[hsl(var(--sand))]">
              <Plus className="h-4 w-4" />
              Create Community
            </Button>
          </form>
          {message ? <div className="mt-3 rounded-xl border border-white/10 bg-black/25 px-3 py-2 text-xs text-white/70">{message}</div> : null}
        </Card>
      </section>
    </div>
  )
}
