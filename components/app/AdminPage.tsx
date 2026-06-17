'use client'

import { useEffect, useMemo, useState } from 'react'
import { BadgeCheck, Flag, Loader2, Shield, Users } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { getBootstrap } from '@/lib/tripundo-api'

function Metric({ label, value, icon: Icon }) {
  return (
    <Card className="border-white/10 bg-white/[0.04] p-4 text-white">
      <div className="flex items-center justify-between">
        <div className="text-xs uppercase tracking-widest text-white/45">{label}</div>
        <Icon className="h-4 w-4 text-emerald-300" />
      </div>
      <div className="mt-3 text-3xl font-semibold">{value}</div>
    </Card>
  )
}

export default function AdminPage() {
  const [data, setData] = useState(null)

  useEffect(() => {
    getBootstrap().then(setData)
  }, [])

  const official = useMemo(() => data?.communities?.filter((item) => item.community_type === 'official') || [], [data])
  const userCreated = useMemo(() => data?.communities?.filter((item) => item.community_type === 'user_created') || [], [data])

  if (!data) return <div className="flex min-h-[60vh] items-center justify-center"><Loader2 className="h-5 w-5 animate-spin text-emerald-300" /></div>

  return (
    <div className="space-y-6 text-white">
      <section>
        <div className="text-xs uppercase tracking-[0.28em] text-emerald-300/70">Admin</div>
        <h1 className="mt-2 text-4xl font-semibold tracking-tight">Community control room</h1>
      </section>

      <div className="grid gap-4 md:grid-cols-4">
        <Metric label="Official" value={official.length} icon={BadgeCheck} />
        <Metric label="User groups" value={userCreated.length} icon={Users} />
        <Metric label="Reserved" value={data.reservedKeywords.length} icon={Shield} />
        <Metric label="Reports" value={data.adminMetrics.reportsPending} icon={Flag} />
      </div>

      <section className="grid gap-4 lg:grid-cols-2">
        <Card className="border-white/10 bg-white/[0.04] p-5 text-white">
          <h2 className="text-xl font-semibold">Reserved keywords</h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {data.reservedKeywords.map((keyword) => (
              <Badge key={keyword} className="bg-white text-emerald-950 hover:bg-white">{keyword}</Badge>
            ))}
          </div>
        </Card>
        <Card className="border-white/10 bg-white/[0.04] p-5 text-white">
          <h2 className="text-xl font-semibold">User-created review</h2>
          <div className="mt-4 space-y-2">
            {userCreated.map((community) => (
              <div key={community.id} className="flex items-center justify-between rounded-xl bg-black/20 px-3 py-2">
                <div>
                  <div className="text-sm font-semibold">{community.name}</div>
                  <div className="text-xs text-white/42">{community.destination}</div>
                </div>
                <Button variant="ghost" className="text-emerald-200 hover:bg-white/10 hover:text-white">Review</Button>
              </div>
            ))}
          </div>
        </Card>
      </section>
    </div>
  )
}
