import Link from 'next/link'
import type { ComponentType } from 'react'
import { ArrowRight, CheckCircle2, Compass, MessageCircle, Users } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { tripundoCommunities } from '@/lib/tripundo-data'

const heroImage = 'https://images.unsplash.com/photo-1635756227689-01eda5140530?crop=entropy&cs=srgb&fm=jpg&q=85&w=2200'

const journeySteps: Array<[string, ComponentType<any>, string]> = [
  ['Join a community', Users, 'Enter open destination groups like Munnar or Varkala.'],
  ['Plan together', MessageCircle, 'Use community chat and trip-plan sub-groups to decide dates and routes.'],
  ['Travel with trust', CheckCircle2, 'Confirm travelers, start the trip, and build reputation through completed journeys.'],
]

export default function LandingPage() {
  const featured = tripundoCommunities.filter((community) => community.community_type === 'official').slice(0, 4)

  return (
    <main className="min-h-screen bg-[#07140d] text-white">
      <section className="relative min-h-screen overflow-hidden">
        <img src={heroImage} alt="" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 hero-scrim" />
        <nav className="relative z-10 mx-auto flex max-w-7xl items-center justify-between px-5 py-5 sm:px-8">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[hsl(var(--tea-hill))]">
              <Compass className="h-5 w-5 text-[hsl(var(--sunlight))]" />
            </div>
            <span className="font-semibold tracking-tight">Tripundo</span>
          </Link>
          <Button asChild className="rounded-full bg-white text-emerald-950 hover:bg-white/90">
            <Link href="/discover">Explore</Link>
          </Button>
        </nav>
        <div className="relative z-10 mx-auto flex min-h-[calc(100vh-80px)] max-w-7xl items-end px-5 pb-14 sm:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/12 px-3 py-1.5 text-xs uppercase tracking-widest text-white/80 backdrop-blur">
              Nature-first travel communities
            </div>
            <h1 className="mt-6 text-5xl font-semibold leading-[0.98] tracking-tight sm:text-7xl">
              Find your tribe. Plan the journey. Hit the trail.
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-white/72">
              Join open destination communities, discuss the route, form trip sub-groups, and travel with people you can trust.
            </p>
            <Button asChild className="mt-8 rounded-full bg-[hsl(var(--sunlight))] px-6 text-emerald-950 hover:bg-[hsl(var(--sand))]">
              <Link href="/discover">
                Explore Destinations
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
        <div className="mb-5 flex items-end justify-between">
          <div>
            <div className="text-xs uppercase tracking-[0.28em] text-emerald-300/70">Communities</div>
            <h2 className="mt-2 text-3xl font-semibold">Trending destinations</h2>
          </div>
          <Link href="/communities" className="text-sm text-emerald-200">View all</Link>
        </div>
        <div className="grid gap-4 md:grid-cols-4">
          {featured.map((community) => (
            <Link key={community.id} href={`/communities/${community.id}`} className="destination-card aspect-[3/4]">
              <img src={community.cover_image_path} alt="" className="absolute inset-0 h-full w-full object-cover" />
              <div className="absolute inset-0 hero-scrim-soft" />
              <div className="absolute inset-x-0 bottom-0 p-4">
                <div className="text-2xl font-semibold">{community.name}</div>
                <div className="mt-1 text-sm text-white/65">{community.activeTrips} plans open</div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-4 px-5 pb-20 sm:px-8 md:grid-cols-3">
        {journeySteps.map(([title, Icon, copy]) => (
          <Card key={title} className="border-white/10 bg-white/[0.04] p-5 text-white">
            <Icon className="h-6 w-6 text-[hsl(var(--sunlight))]" />
            <h3 className="mt-5 text-xl font-semibold">{title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-white/58">{copy}</p>
          </Card>
        ))}
      </section>
    </main>
  )
}
