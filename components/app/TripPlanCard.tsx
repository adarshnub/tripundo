import Link from 'next/link'
import { CalendarDays, MapPin, Users } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

export default function TripPlanCard({ trip, profiles = [] }) {
  const confirmed = trip.confirmedParticipants?.length || 0
  const interested = (trip.planMembers?.length || 0) - confirmed

  return (
    <Link href={`/trip-plans/${trip.id}`} className="block">
      <article className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-white transition hover:-translate-y-1 hover:border-emerald-300/30 hover:bg-white/[0.06]">
        <div className="flex items-start justify-between gap-3">
          <div>
            <Badge className={trip.status === 'started' ? 'bg-[hsl(var(--sunlight))] text-emerald-950 hover:bg-[hsl(var(--sunlight))]' : 'bg-emerald-300/15 text-emerald-100 hover:bg-emerald-300/15'}>
              {trip.status === 'started' ? 'Active trip' : 'Planning'}
            </Badge>
            <h3 className="mt-3 text-lg font-semibold">{trip.title}</h3>
          </div>
          <div className="flex -space-x-2">
            {(trip.planMembers || []).slice(0, 4).map((id) => {
              const profile = profiles.find((item) => item.id === id)
              return (
                <div key={id} className="flex h-8 w-8 items-center justify-center rounded-full bg-[hsl(var(--sand))] text-xs font-bold text-emerald-950 ring-2 ring-[#07140d]">
                  {profile?.initials || '?'}
                </div>
              )
            })}
          </div>
        </div>
        <div className="mt-4 space-y-2 text-sm text-white/58">
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-emerald-300" />
            {trip.route}
          </div>
          <div className="flex items-center gap-2">
            <CalendarDays className="h-4 w-4 text-emerald-300" />
            {trip.startDate} to {trip.endDate}
          </div>
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-emerald-300" />
            {confirmed} confirmed, {Math.max(0, interested)} interested
          </div>
        </div>
        <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-white/10">
          <div className="route-line h-full rounded-full" style={{ width: `${Math.min(100, (confirmed / Math.max(1, trip.seats)) * 100)}%` }} />
        </div>
      </article>
    </Link>
  )
}
