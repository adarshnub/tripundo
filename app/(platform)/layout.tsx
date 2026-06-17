import TopNavbar from '@/components/app/TopNavbar'
import { getCurrentAuthUser } from '@/lib/supabase-auth-server'
import { redirect } from 'next/navigation'

export default async function PlatformLayout({ children }) {
  const { configured, user } = await getCurrentAuthUser()
  if (configured && !user) {
    redirect('/auth?next=/dashboard')
  }

  return (
    <div className="travel-shell min-h-screen text-white">
      <TopNavbar />
      <main className="mx-auto max-w-7xl px-4 pb-10 pt-24 sm:px-6 lg:px-8">
        {children}
      </main>
    </div>
  )
}
