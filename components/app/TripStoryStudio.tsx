'use client'

import Link from 'next/link'
import { useEffect, useMemo, useRef, useState } from 'react'
import { toPng } from 'html-to-image'
import {
  ArrowLeft,
  BadgeCheck,
  Camera,
  CheckCircle2,
  Download,
  Image as ImageIcon,
  Instagram,
  Loader2,
  MapPin,
  Route,
  Share2,
  Sparkles,
  Users,
} from 'lucide-react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Switch } from '@/components/ui/switch'
import { getBootstrap, createStoryAsset } from '@/lib/tripundo-api'

const formats = {
  story: { label: 'Instagram Story', size: '1080 x 1920', className: 'aspect-[9/16]', exportWidth: 1080, exportHeight: 1920 },
  portrait: { label: 'Feed Portrait', size: '1080 x 1350', className: 'aspect-[4/5]', exportWidth: 1080, exportHeight: 1350 },
  square: { label: 'Square Post', size: '1080 x 1080', className: 'aspect-square', exportWidth: 1080, exportHeight: 1080 },
}

const moments = [
  'Trip planned',
  'Starting now',
  'En route',
  'Reached destination',
  'Group checkpoint',
  'Trip completed',
  'Trust score increased',
]

const themes = [
  { id: 'cinematic', label: 'Cinematic', gradient: 'from-emerald-950 via-teal-800 to-amber-500' },
  { id: 'route-map', label: 'Route Map', gradient: 'from-slate-950 via-emerald-800 to-cyan-500' },
  { id: 'tech-community', label: 'Tech Community', gradient: 'from-zinc-950 via-emerald-900 to-lime-400' },
  { id: 'night-drive', label: 'Night Drive', gradient: 'from-black via-indigo-950 to-emerald-500' },
]

export default function TripStoryStudio() {
  const cardRef = useRef(null)
  const [data, setData] = useState(null)
  const [format, setFormat] = useState('story')
  const [moment, setMoment] = useState('Starting now')
  const [theme, setTheme] = useState('route-map')
  const [privacy, setPrivacy] = useState({
    showMemberNames: true,
    showCompany: false,
    showLinkedInBadge: true,
    showRoute: true,
  })
  const [status, setStatus] = useState('')
  const [imageUrl, setImageUrl] = useState('')

  useEffect(() => {
    getBootstrap().then(setData).catch((err) => setStatus(err.message))
  }, [])

  const selectedTrip = data?.trips?.[0]
  const selectedTheme = themes.find((item) => item.id === theme) || themes[0]
  const selectedFormat = formats[format]
  const members = data?.profiles?.slice(0, 4) || []
  const caption = useMemo(() => {
    if (!selectedTrip) return ''
    return `${moment} with a verified Tripundo group: ${selectedTrip.route}. #Tripundo #TechTravel #WeekendTrip`
  }, [moment, selectedTrip])

  async function exportCard(action = 'download') {
    if (!cardRef.current || !selectedTrip) return
    setStatus('Rendering Instagram-ready image...')

    const dataUrl = await toPng(cardRef.current, {
      cacheBust: true,
      pixelRatio: 2,
      width: cardRef.current.offsetWidth,
      height: cardRef.current.offsetHeight,
      backgroundColor: '#07140d',
    })

    setImageUrl(dataUrl)

    await createStoryAsset({
      trip_id: selectedTrip.id,
      template_moment: moment,
      format,
      theme,
      caption,
      privacy,
      export_size: selectedFormat.size,
    })

    if (action === 'share' && navigator.share) {
      const blob = await (await fetch(dataUrl)).blob()
      const file = new File([blob], `tripundo-${moment.toLowerCase().replace(/\s+/g, '-')}.png`, { type: blob.type })
      await navigator.share({
        title: 'Tripundo trip story',
        text: caption,
        files: [file],
      }).catch(() => null)
      setStatus('Card rendered. Mobile share sheet opened when supported.')
      return
    }

    const link = document.createElement('a')
    link.download = `tripundo-${moment.toLowerCase().replace(/\s+/g, '-')}.png`
    link.href = dataUrl
    link.click()
    setStatus('Card downloaded. Caption copied below for Instagram.')
  }

  if (!data || !selectedTrip) {
    return (
      <div className="min-h-screen bg-[#07140d] text-white flex items-center justify-center">
        <Loader2 className="h-5 w-5 animate-spin text-emerald-300" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#07140d] text-white">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute left-[-10%] top-[-10%] h-96 w-96 rounded-full bg-emerald-500/15 blur-3xl" />
        <div className="absolute right-[-10%] bottom-[-10%] h-96 w-96 rounded-full bg-amber-400/10 blur-3xl" />
      </div>

      <header className="sticky top-0 z-40 border-b border-white/10 bg-[#07140d]/82 px-4 py-3 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3">
          <Link href="/discover" className="inline-flex items-center gap-2 text-sm text-white/65 hover:text-white">
            <ArrowLeft className="h-4 w-4" />
            Back to app
          </Link>
          <Badge className="bg-amber-300 text-emerald-950 hover:bg-amber-300">
            <Instagram className="mr-1.5 h-3.5 w-3.5" />
            Instagram-first export
          </Badge>
        </div>
      </header>

      <main className="relative mx-auto grid max-w-7xl gap-6 px-4 py-6 lg:grid-cols-[390px_1fr]">
        <section className="space-y-4">
          <div>
            <div className="text-xs uppercase tracking-[0.28em] text-emerald-300/70">Trip Story Studio</div>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight">Create shareable trip moments</h1>
            <p className="mt-2 text-sm text-white/55">
              Generate beautiful route, destination, and group cards without exposing private trip data.
            </p>
          </div>

          <Card className="border-white/10 bg-white/[0.04] p-4 text-white">
            <div className="text-sm font-semibold">Moment</div>
            <div className="mt-3 grid grid-cols-2 gap-2">
              {moments.map((item) => (
                <button
                  key={item}
                  onClick={() => setMoment(item)}
                  className={`rounded-xl border px-3 py-2 text-left text-xs transition ${
                    moment === item ? 'border-emerald-300 bg-emerald-300 text-emerald-950' : 'border-white/10 bg-black/20 text-white/60 hover:text-white'
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </Card>

          <Card className="border-white/10 bg-white/[0.04] p-4 text-white">
            <div className="text-sm font-semibold">Format</div>
            <div className="mt-3 grid gap-2">
              {Object.entries(formats).map(([id, item]) => (
                <button
                  key={id}
                  onClick={() => setFormat(id)}
                  className={`flex items-center justify-between rounded-xl border px-3 py-2 text-sm transition ${
                    format === id ? 'border-emerald-300 bg-emerald-300/15 text-emerald-100' : 'border-white/10 bg-black/20 text-white/60'
                  }`}
                >
                  <span>{item.label}</span>
                  <span className="text-xs opacity-65">{item.size}</span>
                </button>
              ))}
            </div>
          </Card>

          <Card className="border-white/10 bg-white/[0.04] p-4 text-white">
            <div className="text-sm font-semibold">Theme</div>
            <div className="mt-3 grid grid-cols-2 gap-2">
              {themes.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setTheme(item.id)}
                  className={`rounded-xl border p-2 text-left transition ${
                    theme === item.id ? 'border-emerald-300' : 'border-white/10'
                  }`}
                >
                  <div className={`h-12 rounded-lg bg-gradient-to-br ${item.gradient}`} />
                  <div className="mt-2 text-xs text-white/70">{item.label}</div>
                </button>
              ))}
            </div>
          </Card>

          <Card className="border-white/10 bg-white/[0.04] p-4 text-white">
            <div className="text-sm font-semibold">Privacy controls</div>
            <div className="mt-3 space-y-3">
              {[
                ['showMemberNames', 'Show member first names'],
                ['showCompany', 'Show company names'],
                ['showLinkedInBadge', 'Show LinkedIn badge'],
                ['showRoute', 'Show route'],
              ].map(([key, label]) => (
                <div key={key} className="flex items-center justify-between rounded-xl border border-white/10 bg-black/20 px-3 py-2">
                  <span className="text-sm text-white/65">{label}</span>
                  <Switch checked={privacy[key]} onCheckedChange={(checked) => setPrivacy((current) => ({ ...current, [key]: checked }))} />
                </div>
              ))}
            </div>
          </Card>

          <div className="flex gap-2">
            <Button onClick={() => exportCard('download')} className="flex-1 rounded-full bg-emerald-300 text-emerald-950 hover:bg-emerald-200">
              <Download className="h-4 w-4" />
              Download
            </Button>
            <Button onClick={() => exportCard('share')} variant="ghost" className="rounded-full border border-white/10 bg-white/[0.04] text-white hover:bg-white/10">
              <Share2 className="h-4 w-4" />
              Share
            </Button>
          </div>

          {status ? <div className="rounded-2xl border border-emerald-300/20 bg-emerald-300/10 px-4 py-3 text-sm text-emerald-100">{status}</div> : null}
        </section>

        <section className="flex flex-col items-center gap-4">
          <div className="flex w-full items-center justify-between gap-3">
            <div>
              <div className="text-sm font-semibold">Live preview</div>
              <div className="text-xs text-white/45">{selectedFormat.label} · {selectedFormat.size}</div>
            </div>
            <Badge variant="outline" className="border-white/15 text-white/60">
              <ImageIcon className="mr-1.5 h-3.5 w-3.5" />
              Rendered in browser
            </Badge>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            className={`w-full max-w-[420px] ${selectedFormat.className}`}
          >
            <div
              ref={cardRef}
              className={`relative h-full w-full overflow-hidden rounded-[2rem] bg-gradient-to-br ${selectedTheme.gradient} p-7 text-white shadow-2xl shadow-black/50`}
            >
              <div className="absolute inset-0 opacity-20">
                <div className="absolute left-[-20%] top-[-10%] h-64 w-64 rounded-full bg-white blur-3xl" />
                <div className="absolute bottom-[-10%] right-[-15%] h-72 w-72 rounded-full bg-amber-300 blur-3xl" />
              </div>
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_15%,rgba(255,255,255,0.18),transparent_28%),radial-gradient(circle_at_80%_70%,rgba(255,255,255,0.14),transparent_30%)]" />
              <div className="relative flex h-full flex-col justify-between">
                <div className="flex items-center justify-between">
                  <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1.5 text-[11px] uppercase tracking-widest backdrop-blur">
                    <Sparkles className="h-3.5 w-3.5" />
                    {moment}
                  </div>
                  <div className="text-[11px] uppercase tracking-[0.2em] text-white/70">Tripundo</div>
                </div>

                <div className="space-y-5">
                  {privacy.showRoute ? (
                    <div className="rounded-3xl border border-white/15 bg-black/20 p-4 backdrop-blur">
                      <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-white/60">
                        <Route className="h-3.5 w-3.5" />
                        Verified route
                      </div>
                      <svg className="mt-4 w-full" viewBox="0 0 280 94" fill="none">
                        <path d="M18 70 C 82 8, 168 8, 262 70" stroke="white" strokeWidth="3" strokeDasharray="8 8" opacity="0.88" />
                        <circle cx="18" cy="70" r="8" fill="white" />
                        <circle cx="262" cy="70" r="8" fill="white" />
                        <path d="M140 31 l10 24 l-10 -5 l-10 5 z" fill="#fcd34d" />
                      </svg>
                      <div className="mt-2 flex items-center justify-between text-sm font-semibold">
                        <span>{selectedTrip.route.split(' -> ')[0]}</span>
                        <span>{selectedTrip.destination}</span>
                      </div>
                    </div>
                  ) : null}

                  <div>
                    <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-emerald-100/80">
                      <MapPin className="h-3.5 w-3.5" />
                      {selectedTrip.destination}
                    </div>
                    <h2 className="mt-2 text-5xl font-semibold leading-[0.95] tracking-tight">
                      {selectedTrip.title}
                    </h2>
                    <div className="mt-3 text-sm text-white/75">{selectedTrip.startDate} · {selectedTrip.groupType} · {selectedTrip.groupTrustScore} group trust</div>
                  </div>

                  <div className="rounded-3xl border border-white/15 bg-black/25 p-4 backdrop-blur">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-white/60">
                        <Users className="h-3.5 w-3.5" />
                        Verified group
                      </div>
                      {privacy.showLinkedInBadge ? <BadgeCheck className="h-4 w-4 text-[#9bd1ff]" /> : null}
                    </div>
                    <div className="mt-3 flex -space-x-2">
                      {members.map((member) => (
                        <div key={member.id} className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-sm font-bold text-emerald-950 ring-2 ring-black/40">
                          {member.initials.slice(0, 1)}
                        </div>
                      ))}
                    </div>
                    {privacy.showMemberNames ? (
                      <div className="mt-3 text-xs text-white/65">
                        {members.map((member) => member.name.split(' ')[0]).join(', ')}
                        {privacy.showCompany ? ` · ${members.map((member) => member.company).join(', ')}` : ''}
                      </div>
                    ) : (
                      <div className="mt-3 text-xs text-white/65">Member names hidden by privacy settings.</div>
                    )}
                  </div>
                </div>

                <div className="flex items-end justify-between text-xs text-white/65">
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="h-4 w-4 text-emerald-200" />
                    Privacy-first share card
                  </div>
                  <div>tripundo.in</div>
                </div>
              </div>
            </div>
          </motion.div>

          <Card className="w-full border-white/10 bg-white/[0.04] p-4 text-white">
            <div className="flex items-start gap-3">
              <Camera className="mt-0.5 h-4 w-4 text-emerald-300" />
              <div>
                <div className="text-sm font-semibold">Suggested caption</div>
                <div className="mt-1 text-sm text-white/60">{caption}</div>
              </div>
            </div>
          </Card>

          {imageUrl ? (
            <Card className="w-full border-emerald-300/20 bg-emerald-300/10 p-4 text-emerald-100">
              Generated image is ready. Use Download or mobile Share to post it to Instagram manually.
            </Card>
          ) : null}
        </section>
      </main>
    </div>
  )
}
