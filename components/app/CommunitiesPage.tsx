'use client'

import { useEffect, useMemo, useState } from 'react'
import { Loader2, Search } from 'lucide-react'
import { Button } from '@/components/ui/button'
import CommunityCard from '@/components/app/CommunityCard'
import { getBootstrap } from '@/lib/tripundo-api'

export default function CommunitiesPage() {
  const [data, setData] = useState(null)
  const [type, setType] = useState('all')
  const [query, setQuery] = useState('')

  useEffect(() => {
    getBootstrap().then(setData)
  }, [])

  const communities = useMemo(() => {
    if (!data) return []
    return data.communities.filter((community) => {
      const typeMatch = type === 'all' || community.community_type === type
      const text = [community.name, community.destination, community.focus, ...(community.theme_tags || [])].join(' ').toLowerCase()
      return typeMatch && text.includes(query.toLowerCase())
    })
  }, [data, query, type])

  if (!data) {
    return <div className="flex min-h-[60vh] items-center justify-center"><Loader2 className="h-5 w-5 animate-spin text-emerald-300" /></div>
  }

  const official = communities.filter((community) => community.community_type === 'official')
  const userCreated = communities.filter((community) => community.community_type === 'user_created')

  return (
    <div className="space-y-8 text-white">
      <section className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-5 sm:p-7">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="text-xs uppercase tracking-[0.28em] text-emerald-300/70">Communities</div>
            <h1 className="mt-2 text-4xl font-semibold tracking-tight">Open travel groups</h1>
            <p className="mt-2 max-w-2xl text-white/55">Official destinations and user-created groups where travelers discuss, plan, and create trip sub-groups.</p>
          </div>
          <div className="flex flex-col gap-2 sm:flex-row">
            <div className="flex items-center gap-2 rounded-full border border-white/10 bg-black/25 px-3 py-2">
              <Search className="h-4 w-4 text-white/40" />
              <input value={query} onChange={(event) => setQuery(event.target.value)} className="bg-transparent text-sm outline-none placeholder:text-white/35" placeholder="Search groups" />
            </div>
            {['all', 'official', 'user_created'].map((item) => (
              <Button key={item} onClick={() => setType(item)} variant="ghost" className={`rounded-full border border-white/10 ${type === item ? 'bg-white text-emerald-950' : 'bg-white/[0.04] text-white hover:bg-white/10'}`}>
                {item === 'user_created' ? 'User groups' : item}
              </Button>
            ))}
          </div>
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-semibold">Official destinations</h2>
        <div className="grid gap-4 lg:grid-cols-2">
          {official.map((community) => <CommunityCard key={community.id} community={community} />)}
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-semibold">User-created groups</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {userCreated.map((community) => <CommunityCard key={community.id} community={community} />)}
        </div>
      </section>
    </div>
  )
}
