import CommunityDetailPage from '@/components/app/CommunityDetailPage'

export const metadata = {
  title: 'Community - Tripundo',
}

export default function CommunityDetailRoute({ params }) {
  return <CommunityDetailPage communityId={params.id} />
}
