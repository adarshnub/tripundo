import Link from 'next/link'
import { BadgeCheck, Users } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

export default function CommunityCard({ community, featured = false }) {
  const image = community.cover_image_path || community.image

  return (
    <Link href={`/communities/${community.id}`} className="group block">
      <article className={`destination-card ${featured ? 'min-h-[360px]' : 'min-h-[260px]'}`}>
        <img src={image} alt="" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 hero-scrim-soft" />
        <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
          <div className="flex items-center gap-2">
            <Badge className={community.community_type === 'official' ? 'bg-white text-emerald-950 hover:bg-white' : 'bg-emerald-300/20 text-emerald-50 hover:bg-emerald-300/20'}>
              {community.community_type === 'official' ? (
                <>
                  <BadgeCheck className="mr-1.5 h-3.5 w-3.5" />
                  Official
                </>
              ) : (
                'User group'
              )}
            </Badge>
            <span className="rounded-full bg-black/30 px-2.5 py-1 text-xs text-white/75 backdrop-blur">
              {community.activeTrips} plans
            </span>
          </div>
          <h3 className={`${featured ? 'mt-5 text-4xl' : 'mt-4 text-2xl'} font-semibold tracking-tight text-white`}>
            {community.name}
          </h3>
          <p className="mt-2 line-clamp-2 max-w-xl text-sm text-white/72">{community.focus}</p>
          <div className="mt-4 flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1 rounded-full bg-black/30 px-2.5 py-1 text-xs text-white/70">
              <Users className="h-3.5 w-3.5" />
              {community.members} members
            </span>
            {(community.theme_tags || community.tags || []).slice(0, 3).map((tag) => (
              <span key={tag} className="rounded-full bg-white/12 px-2.5 py-1 text-xs text-white/75 backdrop-blur">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </article>
    </Link>
  )
}
