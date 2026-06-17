import TripPlanPage from '@/components/app/TripPlanPage'

export const metadata = {
  title: 'Trip Plan - Tripundo',
}

export default function TripPlanRoute({ params }) {
  return <TripPlanPage tripId={params.id} />
}
