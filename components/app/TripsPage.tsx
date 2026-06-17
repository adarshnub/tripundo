'use client'

import { useEffect, useState } from 'react'
import { Loader2 } from 'lucide-react'
import TripPlanCard from '@/components/app/TripPlanCard'
import { getBootstrap } from '@/lib/tripundo-api'

export default function TripsPage() {
  const [data, setData] = useState(null)

  useEffect(() => {
    getBootstrap().then(setData)
  }, [])

  if (!data) return <div className="flex min-h-[60vh] items-center justify-center"><Loader2 className="h-5 w-5 animate-spin text-emerald-300" /></div>

  return (
    <div className="space-y-6 text-white">
      <div>
        <div className="text-xs uppercase tracking-[0.28em] text-emerald-300/70">Plans and trips</div>
        <h1 className="mt-2 text-4xl font-semibold tracking-tight">Planning groups and active trips</h1>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {data.trips.map((trip) => <TripPlanCard key={trip.id} trip={trip} profiles={data.profiles} />)}
      </div>
    </div>
  )
}
