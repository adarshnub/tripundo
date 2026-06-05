'use client'

import dynamic from 'next/dynamic'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import {
  Linkedin, Shield, BadgeCheck, Sparkles, MapPin, Users, Camera,
  MessageCircle, Lock, Heart, ArrowRight, Star, Zap, Compass,
  TrendingUp, CheckCircle2, Globe2, Code2, Briefcase, Palette,
  Plane, ChevronRight, Eye, Image as ImageIcon, Share2
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import Nav from '@/components/landing/Nav'
import HeroOverlay from '@/components/landing/HeroOverlay'
import { Reveal, Eyebrow } from '@/components/landing/Section'

const Globe3D = dynamic(() => import('@/components/landing/Globe3D'), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="relative">
        <div className="h-72 w-72 rounded-full bg-gradient-to-br from-cyan-500/20 via-teal-500/20 to-pink-500/20 blur-3xl animate-pulse" />
        <div className="absolute inset-0 flex items-center justify-center text-white/40 text-sm">Loading globe…</div>
      </div>
    </div>
  ),
})

const DESTINATIONS = [
  { name: 'Munnar', sub: 'Bangalore Devs Weekend', img: 'https://images.unsplash.com/photo-1635756227689-01eda5140530?crop=entropy&cs=srgb&fm=jpg&q=85&w=1200', members: 234, trips: 18 },
  { name: 'Goa', sub: 'Startup Founders Escape', img: 'https://images.unsplash.com/photo-1685271552630-9bc169185566?crop=entropy&cs=srgb&fm=jpg&q=85&w=1200', members: 412, trips: 31 },
  { name: 'Wayanad', sub: 'Remote Workers Kerala', img: 'https://images.pexels.com/photos/34130875/pexels-photo-34130875.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=900&w=1200', members: 198, trips: 14 },
  { name: 'Varkala', sub: 'Designers + PMs', img: 'https://images.unsplash.com/photo-1708149995661-10ddb24e016e?crop=entropy&cs=srgb&fm=jpg&q=85&w=1200', members: 156, trips: 9 },
  { name: 'Himalayas', sub: 'Tech Trekkers Circle', img: 'https://images.unsplash.com/photo-1738482223844-7ff598553cf7?crop=entropy&cs=srgb&fm=jpg&q=85&w=1200', members: 287, trips: 22 },
  { name: 'Bali', sub: 'Digital Nomads SEA', img: 'https://images.unsplash.com/photo-1555400038-63f5ba517a47?crop=entropy&cs=srgb&fm=jpg&q=85&w=1200', members: 521, trips: 27 },
]

const COMPANIES = ['Razorpay', 'Atlassian', 'Stripe', 'Figma', 'Notion', 'Linear', 'Vercel', 'Zerodha', 'CRED', 'Postman', 'Freshworks', 'Zoho']

const MATCHES = [
  { initial: 'A', name: 'Aarav K.', role: 'Senior SWE', co: 'Razorpay', overlap: ['Trek', 'Photography', 'Coffee'], score: 92, color: 'from-emerald-400 to-teal-500' },
  { initial: 'M', name: 'Meera S.', role: 'Senior PM', co: 'Atlassian', overlap: ['Coastal trips', 'Sunrise hikes'], score: 88, color: 'from-fuchsia-400 to-pink-500' },
  { initial: 'D', name: 'Dev R.', role: 'ML Engineer', co: 'Google', overlap: ['Weekend trekker', 'Driver'], score: 84, color: 'from-teal-400 to-cyan-500' },
]

const BADGES = [
  { icon: Shield, label: 'Verified Professional', desc: 'Phone, email, photo & emergency contact verified.', color: 'from-emerald-400 to-teal-500' },
  { icon: Linkedin, label: 'LinkedIn Connected', desc: 'Identity backed by real professional profile.', color: 'from-blue-400 to-indigo-500' },
  { icon: Briefcase, label: 'Workplace Verified', desc: 'Company and role confirmed via LinkedIn.', color: 'from-emerald-400 to-teal-500' },
  { icon: Compass, label: 'Experienced Traveler', desc: 'Completed 5+ verified group trips.', color: 'from-amber-400 to-orange-500' },
  { icon: Star, label: 'Trusted Organizer', desc: 'High ratings across organized trips.', color: 'from-amber-400 to-orange-500' },
]

function Hero() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [0, 120])
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  return (
    <section ref={ref} className="relative min-h-screen overflow-hidden aurora-bg grain">
      {/* 3D Globe full-bleed */}
      <div className="absolute inset-0 z-0">
        <Globe3D />
      </div>

      {/* Floating profile bubbles */}
      <HeroOverlay />

      {/* Soft fade to dark forest sections below */}
      <div className="absolute inset-0 z-[5] bg-gradient-to-b from-transparent via-transparent to-[#07140d] pointer-events-none" />
      <div className="absolute inset-0 z-[5] pointer-events-none" />

      {/* Text content */}
      <motion.div style={{ y, opacity }} className="relative z-20 mx-auto max-w-7xl px-5 sm:px-8 pt-32 pb-24 sm:pt-40 sm:pb-32">
        <div className="max-w-2xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.7 }}>
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-900/15 bg-white/70 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-emerald-800 backdrop-blur shadow-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Verified Group Travel
            </div>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 text-[44px] sm:text-6xl lg:text-7xl font-semibold tracking-tight leading-[1.02] text-emerald-950 drop-shadow-[0_2px_8px_rgba(255,255,255,0.4)]"
          >
            Travel with people <br className="hidden sm:block" />
            <span className="text-gradient-dark">you can actually trust.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.7 }}
            className="mt-6 text-lg sm:text-xl text-emerald-950/80 max-w-xl leading-relaxed font-medium drop-shadow-[0_1px_4px_rgba(255,255,255,0.5)]"
          >
            Tripundo connects verified tech professionals into destination communities,
            helps you break the ice before the trip, and turns every journey into a beautiful,
            shareable story — backed by LinkedIn identity and group trust.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0, duration: 0.7 }}
            className="mt-9 flex flex-wrap items-center gap-3"
          >
            <Button size="lg" className="h-12 px-6 rounded-full bg-emerald-950 text-white hover:bg-emerald-900 font-medium shadow-xl shadow-emerald-900/30">
              Join the Waitlist <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button size="lg" variant="ghost" className="h-12 px-6 rounded-full border border-emerald-900/20 bg-white/70 backdrop-blur text-emerald-950 hover:bg-white/90 shadow-lg shadow-emerald-900/10">
              <Linkedin className="mr-2 h-4 w-4 text-[#0a66c2]" /> Continue with LinkedIn
            </Button>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.3, duration: 0.7 }}
            className="mt-10 flex flex-wrap items-center gap-5 text-xs text-emerald-950/75 font-medium"
          >
            <div className="flex items-center gap-1.5"><CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" /> Phone + LinkedIn verified</div>
            <div className="flex items-center gap-1.5"><CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" /> Women-only trips supported</div>
            <div className="flex items-center gap-1.5"><CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" /> No public follower feeds</div>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.6 }}
        className="absolute bottom-7 left-1/2 -translate-x-1/2 z-20 text-emerald-950/55 text-xs flex flex-col items-center gap-2"
      >
        <span className="tracking-widest uppercase font-medium">Scroll</span>
        <div className="h-9 w-[1px] bg-gradient-to-b from-emerald-900/50 to-transparent" />
      </motion.div>
    </section>
  )
}

function TrustStrip() {
  return (
    <section className="relative py-10 border-y border-white/5 bg-[#0a1f15] overflow-hidden">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="text-sm text-white/50 uppercase tracking-widest">Verified professionals from</div>
        <div className="relative overflow-hidden flex-1 max-w-3xl">
          <div className="flex gap-10 animate-marquee whitespace-nowrap">
            {[...COMPANIES, ...COMPANIES].map((c, i) => (
              <span key={i} className="text-white/70 font-semibold text-lg tracking-tight">{c}</span>
            ))}
          </div>
          <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-[#0a1f15] to-transparent" />
          <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-[#0a1f15] to-transparent" />
        </div>
      </div>
    </section>
  )
}

function TrustSection() {
  return (
    <section id="trust" className="relative py-28 sm:py-36 overflow-hidden">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid lg:grid-cols-2 gap-14 items-center">
          <div>
            <Reveal><Eyebrow>Trust Layer</Eyebrow></Reveal>
            <Reveal delay={0.1}>
              <h2 className="mt-5 text-4xl sm:text-5xl font-semibold tracking-tight leading-tight">
                Identity that’s <span className="text-gradient">verified, not vibes.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="mt-5 text-lg text-white/65 max-w-xl leading-relaxed">
                Every Tripundo traveler signs in with LinkedIn, verifies their phone, photo and
                emergency contact. Organizers see real names, companies and trip history before
                approving a single seat.
              </p>
            </Reveal>
            <div className="mt-8 grid sm:grid-cols-2 gap-3">
              {BADGES.map((b, i) => (
                <Reveal key={b.label} delay={0.1 + i * 0.07}>
                  <div className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/[0.03] p-4 backdrop-blur hover:bg-white/[0.06] transition">
                    <div className={`h-9 w-9 shrink-0 rounded-lg bg-gradient-to-br ${b.color} flex items-center justify-center shadow-lg`}>
                      <b.icon className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-white">{b.label}</div>
                      <div className="text-xs text-white/55 mt-0.5 leading-snug">{b.desc}</div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          {/* Profile card mockup */}
          <Reveal delay={0.2}>
            <div className="relative">
              <div className="absolute -inset-8 bg-gradient-to-br from-cyan-500/20 via-teal-500/20 to-pink-500/20 blur-3xl -z-10" />
              <Card className="relative bg-gradient-to-b from-white/[0.06] to-white/[0.02] border-white/10 backdrop-blur-xl p-6 rounded-3xl shadow-2xl shadow-black/40">
                <div className="flex items-start gap-4">
                  <div className="relative">
                    <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-2xl font-bold text-white shadow-lg">A</div>
                    <div className="absolute -bottom-1 -right-1 h-6 w-6 rounded-full bg-[#0a66c2] flex items-center justify-center shadow-lg ring-2 ring-[#0a0d22]">
                      <Linkedin className="h-3 w-3 text-white" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <div className="text-xl font-semibold">Aarav Kumar</div>
                      <BadgeCheck className="h-5 w-5 text-emerald-400" />
                    </div>
                    <div className="text-sm text-white/70 mt-0.5">Senior Software Engineer · Razorpay</div>
                    <div className="text-xs text-white/45 mt-0.5">Bangalore · 7 yrs exp</div>
                  </div>
                </div>

                <div className="mt-5 flex flex-wrap gap-2">
                  {[{i: Shield, t: 'ID Verified'}, {i: Linkedin, t: 'LinkedIn'}, {i: Briefcase, t: 'Workplace'}, {i: Compass, t: '8 trips'}].map((b, i) => (
                    <div key={i} className="flex items-center gap-1.5 rounded-full bg-white/5 border border-white/10 px-2.5 py-1 text-xs text-white/80">
                      <b.i className="h-3 w-3 text-emerald-400" /> {b.t}
                    </div>
                  ))}
                </div>

                <div className="mt-6 rounded-2xl border border-white/10 bg-black/30 p-4">
                  <div className="flex items-center justify-between">
                    <div className="text-xs uppercase tracking-wider text-white/50">Trust Score</div>
                    <div className="text-xs text-emerald-300">Excellent</div>
                  </div>
                  <div className="mt-3 flex items-baseline gap-2">
                    <div className="text-4xl font-semibold text-gradient">94</div>
                    <div className="text-sm text-white/40">/ 100</div>
                  </div>
                  <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-white/5">
                    <motion.div initial={{ width: 0 }} whileInView={{ width: '94%' }} viewport={{ once: true }} transition={{ duration: 1.4, ease: 'easeOut' }} className="h-full rounded-full bg-gradient-to-r from-cyan-400 via-amber-400 to-pink-400" />
                  </div>
                  <div className="mt-3 grid grid-cols-5 gap-2 text-[10px] text-white/50">
                    <div><div className="text-white/80 font-semibold">25</div>Identity</div>
                    <div><div className="text-white/80 font-semibold">20</div>LinkedIn</div>
                    <div><div className="text-white/80 font-semibold">19</div>Trips</div>
                    <div><div className="text-white/80 font-semibold">22</div>Ratings</div>
                    <div><div className="text-white/80 font-semibold">8</div>Safety</div>
                  </div>
                </div>
              </Card>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

function MatchingSection() {
  return (
    <section className="relative py-28 sm:py-36 bg-[#0a1f15] overflow-hidden">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="text-center max-w-2xl mx-auto">
          <Reveal><Eyebrow>Smart Matching</Eyebrow></Reveal>
          <Reveal delay={0.1}>
            <h2 className="mt-5 text-4xl sm:text-5xl font-semibold tracking-tight">
              Find your <span className="text-gradient">travel tribe</span> from the tech community.
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-5 text-lg text-white/65 leading-relaxed">
              Tripundo matches you by industry, role, interests, travel style and capabilities —
              so the people in your trip group already feel like your kind of people.
            </p>
          </Reveal>
        </div>

        <div className="mt-14 grid lg:grid-cols-3 gap-4">
          {MATCHES.map((m, i) => (
            <Reveal key={m.name} delay={i * 0.1}>
              <Card className="relative bg-gradient-to-b from-white/[0.06] to-white/[0.02] border-white/10 backdrop-blur p-6 rounded-3xl hover:border-emerald-400/30 transition-all hover:-translate-y-1 hover:shadow-2xl hover:shadow-emerald-500/10">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`h-12 w-12 rounded-2xl bg-gradient-to-br ${m.color} flex items-center justify-center text-lg font-bold text-white`}>{m.initial}</div>
                    <div>
                      <div className="flex items-center gap-1.5"><span className="font-semibold">{m.name}</span><BadgeCheck className="h-4 w-4 text-emerald-400" /></div>
                      <div className="text-xs text-white/55">{m.role} · {m.co}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-white/40 uppercase tracking-wider">Match</div>
                    <div className="text-2xl font-semibold text-emerald-300">{m.score}%</div>
                  </div>
                </div>
                <div className="mt-5 text-xs text-white/45 uppercase tracking-wider">Shared interests</div>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {m.overlap.map((o) => (
                    <span key={o} className="rounded-full bg-emerald-500/10 border border-emerald-400/20 px-2.5 py-1 text-xs text-emerald-200">{o}</span>
                  ))}
                </div>
                <div className="mt-5 flex items-center justify-between rounded-xl bg-black/30 border border-white/5 px-3 py-2.5">
                  <div className="text-xs text-white/55">“Both weekend trekkers”</div>
                  <Sparkles className="h-3.5 w-3.5 text-violet-300" />
                </div>
              </Card>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.3}>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-2">
            {[
              { i: Code2, l: 'Developers' },
              { i: Briefcase, l: 'Founders' },
              { i: Palette, l: 'Designers' },
              { i: TrendingUp, l: 'Product' },
              { i: Globe2, l: 'Remote workers' },
              { i: Zap, l: 'Startup folks' },
            ].map((f) => (
              <div key={f.l} className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 text-sm text-white/75">
                <f.i className="h-3.5 w-3.5 text-emerald-300" /> {f.l}
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}

function CommunitiesSection() {
  return (
    <section id="communities" className="relative py-28 sm:py-36 overflow-hidden">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div className="max-w-2xl">
            <Reveal><Eyebrow>Destination Communities</Eyebrow></Reveal>
            <Reveal delay={0.1}>
              <h2 className="mt-5 text-4xl sm:text-5xl font-semibold tracking-tight">
                Where <span className="text-gradient">tech meets terrain.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="mt-5 text-lg text-white/65">
                Join curated communities built around routes and roles — from Bangalore devs to Wayanad,
                to startup founders escaping to Goa.
              </p>
            </Reveal>
          </div>
        </div>

        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {DESTINATIONS.map((d, i) => (
            <Reveal key={d.name} delay={(i % 3) * 0.08}>
              <div className="group relative overflow-hidden rounded-3xl border border-white/10 aspect-[4/5] cursor-pointer">
                <img src={d.img} alt={d.name} className="absolute inset-0 h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
                <div className="absolute top-4 left-4 right-4 flex justify-between">
                  <div className="flex items-center gap-1.5 rounded-full bg-black/50 border border-white/15 backdrop-blur px-2.5 py-1 text-[11px] text-white/90">
                    <Users className="h-3 w-3" /> {d.members} members
                  </div>
                  <div className="flex items-center gap-1.5 rounded-full bg-black/50 border border-white/15 backdrop-blur px-2.5 py-1 text-[11px] text-white/90">
                    <Plane className="h-3 w-3" /> {d.trips} trips
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <div className="text-xs text-emerald-300 uppercase tracking-widest font-medium">{d.sub}</div>
                  <div className="mt-1 text-3xl font-semibold tracking-tight">{d.name}</div>
                  <div className="mt-3 flex items-center gap-2 text-sm text-white/70 group-hover:text-white transition">
                    Explore community <ChevronRight className="h-4 w-4 transition group-hover:translate-x-1" />
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function TripPlanningSection() {
  return (
    <section id="trips" className="relative py-28 sm:py-36 bg-[#0a1f15] overflow-hidden">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 grid lg:grid-cols-2 gap-14 items-center">
        {/* Mock chat UI */}
        <Reveal>
          <div className="relative">
            <div className="absolute -inset-10 bg-gradient-to-br from-teal-500/25 via-emerald-500/20 to-transparent blur-3xl -z-10" />
            <Card className="relative bg-gradient-to-b from-white/[0.06] to-white/[0.02] border-white/10 backdrop-blur p-5 rounded-3xl">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div className="flex items-center gap-2.5">
                  <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center font-semibold text-sm">BM</div>
                  <div>
                    <div className="text-sm font-semibold flex items-center gap-1.5">Bangalore → Munnar <Lock className="h-3 w-3 text-white/40" /></div>
                    <div className="text-xs text-white/50">7 verified members · Dec 13–16</div>
                  </div>
                </div>
                <div className="text-xs rounded-full bg-emerald-500/15 border border-emerald-400/30 text-emerald-300 px-2.5 py-1">Planning</div>
              </div>

              <div className="mt-4 space-y-3">
                <div className="flex gap-2">
                  <div className="h-8 w-8 rounded-full bg-gradient-to-br from-fuchsia-400 to-pink-500 flex items-center justify-center text-xs font-semibold">M</div>
                  <div className="rounded-2xl rounded-tl-sm bg-white/[0.06] border border-white/10 px-3.5 py-2 text-sm max-w-[80%]">
                    Excited! Quick poll → sunrise at Top Station or chill day at Echo Point?
                  </div>
                </div>
                <div className="ml-10 rounded-2xl border border-white/10 bg-black/30 p-3.5">
                  <div className="text-xs text-white/55 uppercase tracking-wider">Group Poll · 5 voted</div>
                  <div className="mt-2 space-y-2">
                    {[
                      { l: 'Sunrise — Top Station', p: 71, c: 'from-emerald-400 to-teal-500' },
                      { l: 'Chill — Echo Point', p: 29, c: 'from-fuchsia-400 to-pink-500' },
                    ].map((o) => (
                      <div key={o.l} className="relative overflow-hidden rounded-lg border border-white/10 bg-white/5">
                        <div className={`absolute inset-y-0 left-0 bg-gradient-to-r ${o.c} opacity-25`} style={{ width: `${o.p}%` }} />
                        <div className="relative flex justify-between px-3 py-1.5 text-sm"><span>{o.l}</span><span className="text-white/60">{o.p}%</span></div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex gap-2 justify-end">
                  <div className="rounded-2xl rounded-tr-sm bg-gradient-to-br from-emerald-500/20 to-amber-500/20 border border-emerald-400/30 px-3.5 py-2 text-sm max-w-[80%]">
                    Going with sunrise 🔥 — I’ll drive my Innova. 4 seats.
                  </div>
                  <div className="h-8 w-8 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-xs font-semibold">A</div>
                </div>
                <div className="flex gap-2">
                  <div className="h-8 w-8 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-xs font-semibold">K</div>
                  <div className="rounded-2xl rounded-tl-sm bg-white/[0.06] border border-white/10 px-3.5 py-2 text-sm max-w-[80%]">
                    I’ve got first-aid + camera gear covered ✨
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </Reveal>

        <div>
          <Reveal><Eyebrow>Icebreakers + Coordination</Eyebrow></Reveal>
          <Reveal delay={0.1}>
            <h2 className="mt-5 text-4xl sm:text-5xl font-semibold tracking-tight">
              Break the ice <span className="text-gradient">before the trip even starts.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-5 text-lg text-white/65 leading-relaxed">
              Private trip groups with intro prompts, route polls, checklists, expense splits, and
              announcements — so by the time you meet at the pickup point, you already feel like a team.
            </p>
          </Reveal>
          <div className="mt-7 grid sm:grid-cols-2 gap-3">
            {[
              { i: MessageCircle, t: 'Private group chat', d: 'Encrypted to participants only.' },
              { i: Users, t: 'Intro prompts', d: 'Why this trip? Capability tags.' },
              { i: TrendingUp, t: 'Polls + checklists', d: 'Decide routes, food, music, tasks.' },
              { i: Lock, t: 'Location privacy', d: 'Approximate-only en route.' },
            ].map((f) => (
              <div key={f.t} className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 hover:bg-white/[0.06] transition">
                <f.i className="h-5 w-5 text-emerald-300" />
                <div className="mt-3 text-sm font-semibold">{f.t}</div>
                <div className="text-xs text-white/55 mt-1">{f.d}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function StoriesSection() {
  const moments = ['Trip planned', 'Starting now', 'En route', 'Reached', 'Group photo', 'Completed']
  return (
    <section id="stories" className="relative py-28 sm:py-36 overflow-hidden">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 grid lg:grid-cols-2 gap-14 items-center">
        <div>
          <Reveal><Eyebrow>Trip Story Studio</Eyebrow></Reveal>
          <Reveal delay={0.1}>
            <h2 className="mt-5 text-4xl sm:text-5xl font-semibold tracking-tight">
              Every milestone, <span className="text-gradient">a story worth sharing.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-5 text-lg text-white/65 leading-relaxed">
              Tripundo auto-generates Instagram-ready story cards for each trip moment — stylized
              route maps, destination atmospheres, and group checkpoints. Privacy-first by default.
            </p>
          </Reveal>
          <div className="mt-7 flex flex-wrap gap-2">
            {moments.map((m) => (
              <span key={m} className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white/75">{m}</span>
            ))}
          </div>
          <div className="mt-7 flex flex-wrap items-center gap-3">
            <Button className="rounded-full bg-white text-black hover:bg-white/90"><Camera className="h-4 w-4 mr-2" /> Generate a card</Button>
            <Button variant="ghost" className="rounded-full border border-white/15 bg-white/5 text-white hover:bg-white/10"><Share2 className="h-4 w-4 mr-2" /> Open Instagram</Button>
          </div>
        </div>

        {/* Story card mockups */}
        <Reveal delay={0.2}>
          <div className="relative h-[560px]">
            {/* Card 1 — Trip planned */}
            <motion.div
              initial={{ opacity: 0, y: 30, rotate: -8 }}
              whileInView={{ opacity: 1, y: 0, rotate: -8 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: 'easeOut' }}
              className="absolute left-2 top-8 w-56 aspect-[9/16] rounded-3xl overflow-hidden border border-white/15 shadow-2xl shadow-black/60"
            >
              <img src="https://images.unsplash.com/photo-1635756227689-01eda5140530?crop=entropy&cs=srgb&fm=jpg&q=85&w=600" className="absolute inset-0 h-full w-full object-cover" alt="" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/40" />
              <div className="relative z-10 h-full p-4 flex flex-col justify-between text-white">
                <div>
                  <div className="inline-flex items-center gap-1.5 rounded-full bg-white/15 backdrop-blur px-2 py-1 text-[10px] uppercase tracking-widest"><Sparkles className="h-3 w-3" /> Trip planned</div>
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-widest text-emerald-300">Bangalore Devs</div>
                  <div className="text-3xl font-semibold leading-tight tracking-tight">Munnar</div>
                  <div className="text-xs text-white/70 mt-1">Dec 13 — 16 · 7 verified</div>
                  <div className="mt-3 flex -space-x-1.5">
                    {['A', 'M', 'K', 'R'].map((x) => <div key={x} className="h-6 w-6 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 ring-2 ring-black flex items-center justify-center text-[10px] font-bold">{x}</div>)}
                  </div>
                  <div className="mt-3 text-[10px] text-white/60">tripundo.in</div>
                </div>
              </div>
            </motion.div>

            {/* Card 2 — Starting now */}
            <motion.div
              initial={{ opacity: 0, y: 30, rotate: 0 }}
              whileInView={{ opacity: 1, y: 0, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 0.15 }}
              className="absolute left-1/2 -translate-x-1/2 top-0 w-60 aspect-[9/16] rounded-3xl overflow-hidden border border-white/15 shadow-2xl shadow-black/60 z-10"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500 via-teal-600 to-amber-500" />
              <div className="absolute inset-0 grain" />
              <div className="relative z-10 h-full p-5 flex flex-col justify-between text-white">
                <div className="inline-flex items-center gap-1.5 rounded-full bg-white/15 backdrop-blur px-2 py-1 text-[10px] uppercase tracking-widest w-fit"><Zap className="h-3 w-3" /> Starting now</div>
                <div>
                  <div className="text-[10px] uppercase tracking-widest text-white/80">Route</div>
                  <div className="text-2xl font-semibold leading-tight">Bangalore <span className="text-white/70">→</span> Munnar</div>
                  <svg className="mt-3" viewBox="0 0 200 60" fill="none">
                    <path d="M10 50 Q 100 -10 190 50" stroke="white" strokeWidth="2" strokeDasharray="4 4" />
                    <circle cx="10" cy="50" r="4" fill="white" />
                    <circle cx="190" cy="50" r="4" fill="white" />
                  </svg>
                  <div className="mt-2 text-xs text-white/85">Sunrise pickup • 4 cars • 8 hrs</div>
                  <div className="mt-2 flex items-center gap-1.5 text-[10px]"><BadgeCheck className="h-3 w-3" /> Verified Tripundo group</div>
                  <div className="mt-2 text-[10px] text-white/70">tripundo.in</div>
                </div>
              </div>
            </motion.div>

            {/* Card 3 — Completed */}
            <motion.div
              initial={{ opacity: 0, y: 30, rotate: 8 }}
              whileInView={{ opacity: 1, y: 0, rotate: 8 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 0.3 }}
              className="absolute right-2 top-12 w-56 aspect-[9/16] rounded-3xl overflow-hidden border border-white/15 shadow-2xl shadow-black/60"
            >
              <img src="https://images.unsplash.com/photo-1685271552630-9bc169185566?crop=entropy&cs=srgb&fm=jpg&q=85&w=600" className="absolute inset-0 h-full w-full object-cover" alt="" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/30" />
              <div className="relative z-10 h-full p-4 flex flex-col justify-between text-white">
                <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/20 backdrop-blur border border-emerald-400/40 text-emerald-200 px-2 py-1 text-[10px] uppercase tracking-widest w-fit"><CheckCircle2 className="h-3 w-3" /> Completed</div>
                <div>
                  <div className="text-[10px] uppercase tracking-widest text-emerald-300">Goa Founders</div>
                  <div className="text-3xl font-semibold leading-tight">Beach run.</div>
                  <div className="text-xs text-white/75 mt-1">9 verified · ★ 4.9 · +3 trust</div>
                  <div className="mt-3 inline-flex items-center gap-1 rounded-md bg-white/15 px-2 py-1 text-[10px]"><TrendingUp className="h-3 w-3" /> Group trust 87</div>
                  <div className="mt-2 text-[10px] text-white/70">tripundo.in</div>
                </div>
              </div>
            </motion.div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

function TrustScoreSection() {
  return (
    <section className="relative py-28 sm:py-36 bg-[#0a1f15] overflow-hidden">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="text-center max-w-2xl mx-auto">
          <Reveal><Eyebrow>Trust grows with every trip</Eyebrow></Reveal>
          <Reveal delay={0.1}>
            <h2 className="mt-5 text-4xl sm:text-5xl font-semibold tracking-tight">
              Complete trips. <span className="text-gradient">Build a reputation.</span>
            </h2>
          </Reveal>
        </div>

        <div className="mt-14 grid md:grid-cols-5 gap-3">
          {[
            { label: 'Identity verified', value: 25, color: 'from-emerald-400 to-teal-500' },
            { label: 'LinkedIn verified', value: 20, color: 'from-indigo-400 to-violet-500' },
            { label: 'Completed trips', value: 20, color: 'from-emerald-400 to-teal-500' },
            { label: 'Ratings', value: 25, color: 'from-amber-400 to-orange-500' },
            { label: 'No active reports', value: 10, color: 'from-pink-400 to-fuchsia-500' },
          ].map((b, i) => (
            <Reveal key={b.label} delay={i * 0.08}>
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                <div className="text-xs text-white/55 uppercase tracking-wider">{b.label}</div>
                <div className="mt-2 flex items-baseline gap-1">
                  <div className="text-3xl font-semibold">{b.value}</div>
                  <div className="text-xs text-white/40">pts</div>
                </div>
                <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-white/5">
                  <motion.div initial={{ width: 0 }} whileInView={{ width: `${b.value * 4}%` }} viewport={{ once: true }} transition={{ duration: 1, delay: i * 0.08 }} className={`h-full rounded-full bg-gradient-to-r ${b.color}`} />
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.3}>
          <div className="mt-10 rounded-3xl border border-white/10 bg-gradient-to-br from-emerald-500/10 via-teal-500/10 to-pink-500/10 p-6 sm:p-10 text-center">
            <div className="text-sm text-white/60 uppercase tracking-widest">Group Trust Score</div>
            <div className="mt-2 text-5xl sm:text-6xl font-semibold text-gradient">Built by completed journeys, not influencer feeds.</div>
            <div className="mt-3 text-white/60 max-w-2xl mx-auto text-sm">Groups earn trust through actual completed trips, healthy reviews, low incident history, and reliable organizers.</div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

function SafetySection() {
  return (
    <section id="safety" className="relative py-28 sm:py-36 overflow-hidden">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="max-w-2xl">
          <Reveal><Eyebrow>Safety + Privacy</Eyebrow></Reveal>
          <Reveal delay={0.1}>
            <h2 className="mt-5 text-4xl sm:text-5xl font-semibold tracking-tight">
              Built with <span className="text-gradient">safety as a default</span>, not an upsell.
            </h2>
          </Reveal>
        </div>
        <div className="mt-12 grid md:grid-cols-3 gap-4">
          {[
            { i: Heart, t: 'Women-only trips', d: 'Optional women-only groups with gender verification, hosted by trusted female organizers.' },
            { i: Eye, t: 'No public follower feeds', d: 'No influencer dynamics. Your trips and updates stay inside your verified circle.' },
            { i: MapPin, t: 'Location privacy', d: 'Approximate location only. Never expose exact live coordinates, emergency contacts or phone.' },
            { i: Shield, t: 'Reports + blocks', d: 'One-tap reporting, blocking and admin moderation across communities.' },
            { i: Lock, t: 'Private trip groups', d: 'Only approved participants access chat, photos and documents. Default privacy.' },
            { i: ImageIcon, t: 'Consent-based social', d: 'Faces, names, LinkedIn badges and company never appear on shared cards without consent.' },
          ].map((b, i) => (
            <Reveal key={b.t} delay={(i % 3) * 0.08}>
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 hover:bg-white/[0.06] transition h-full">
                <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center"><b.i className="h-4 w-4" /></div>
                <div className="mt-4 text-base font-semibold">{b.t}</div>
                <div className="mt-1 text-sm text-white/60 leading-relaxed">{b.d}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function CTASection() {
  return (
    <section className="relative py-28 sm:py-36 overflow-hidden">
      <div className="mx-auto max-w-5xl px-5 sm:px-8">
        <div className="relative rounded-[2rem] overflow-hidden border border-white/10 p-10 sm:p-16 text-center aurora-bg">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/40" />
          <div className="relative z-10">
            <Reveal>
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-500/10 px-3 py-1.5 text-xs uppercase tracking-widest text-emerald-200"><Sparkles className="h-3 w-3" /> Early access</div>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="mt-6 text-4xl sm:text-6xl font-semibold tracking-tight leading-[1.05]">
                Plan your first trip <br /> <span className="text-gradient">with people you’ll actually trust.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="mt-5 text-lg text-white/65 max-w-2xl mx-auto">
                Join the Tripundo waitlist. We’re onboarding the first 500 verified tech professionals across Bangalore, Mumbai, Delhi, SF and Singapore.
              </p>
            </Reveal>
            <Reveal delay={0.3}>
              <form className="mt-9 mx-auto flex max-w-md flex-col sm:flex-row gap-2">
                <input type="email" placeholder="you@company.com" className="flex-1 rounded-full border border-white/15 bg-black/40 backdrop-blur px-5 py-3 text-sm text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-cyan-400/60" />
                <Button className="rounded-full bg-white text-black hover:bg-white/90 h-12 px-6 font-medium">Join Waitlist <ArrowRight className="ml-2 h-4 w-4" /></Button>
              </form>
            </Reveal>
            <Reveal delay={0.4}>
              <div className="mt-5 text-xs text-white/40">Free during early access · No spam · Unsubscribe anytime</div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="relative border-t border-white/5 py-10">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-white/50">
        <div className="flex items-center gap-2">
          <div className="h-7 w-7 rounded-lg bg-gradient-to-br from-cyan-400 via-teal-500 to-pink-500 flex items-center justify-center"><Plane className="h-3.5 w-3.5 text-white -rotate-45" /></div>
          <span className="text-white/70 font-medium">Tripundo.in</span>
          <span>· Verified group travel for professionals</span>
        </div>
        <div className="flex items-center gap-5">
          <a className="hover:text-white" href="#">Privacy</a>
          <a className="hover:text-white" href="#">Terms</a>
          <a className="hover:text-white" href="#">Safety</a>
          <a className="hover:text-white" href="#">Contact</a>
        </div>
      </div>
    </footer>
  )
}

function App() {
  return (
    <div className="App relative">
      <Nav />
      <Hero />
      <TrustStrip />
      <TrustSection />
      <MatchingSection />
      <CommunitiesSection />
      <TripPlanningSection />
      <StoriesSection />
      <TrustScoreSection />
      <SafetySection />
      <CTASection />
      <Footer />
    </div>
  )
}

export default App

