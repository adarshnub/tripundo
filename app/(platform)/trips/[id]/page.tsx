import ActiveTripPage from '@/components/app/ActiveTripPage'

export const metadata = {
  title: 'Active Trip - Tripundo',
}

export default function ActiveTripRoute({ params }) {
  return <ActiveTripPage tripId={params.id} />
}
