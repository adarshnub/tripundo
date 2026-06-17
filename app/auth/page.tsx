import Link from 'next/link'
import type { ComponentType } from 'react'
import { BadgeCheck, Linkedin, Phone, Shield } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import AuthActions from '@/components/auth/AuthActions'

export const metadata = {
  title: 'Sign in to Tripundo',
}

const trustItems: Array<[string, ComponentType<any>]> = [
  ['Phone and email verification', Phone],
  ['LinkedIn-backed trust layer', Linkedin],
  ['Profile photo and real name required', BadgeCheck],
  ['Emergency contact before trip access', Shield],
]

export default function AuthPage({ searchParams }: any) {
  const next = searchParams?.next || '/dashboard'
  const callbackError = searchParams?.error || ''

  return (
    <main className="min-h-screen bg-[#07140d] px-4 py-10 text-white">
      <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.85fr_1.15fr]">
        <section className="flex flex-col justify-center">
          <Link href="/" className="text-sm text-white/55 hover:text-white">Tripundo.in</Link>
          <h1 className="mt-8 text-5xl font-semibold tracking-tight">
            Verified access for trustworthy group travel.
          </h1>
          <p className="mt-5 text-lg text-white/60">
            Connect professional identity, complete required verification, and enter destination communities with real context.
          </p>
          <div className="mt-8 grid gap-3">
            {trustItems.map(([label, Icon]) => (
              <div key={label} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3">
                <Icon className="h-5 w-5 text-emerald-300" />
                <span className="text-sm text-white/70">{label}</span>
              </div>
            ))}
          </div>
        </section>

        <Card className="border-white/10 bg-white/[0.04] p-6 text-white">
          <div className="text-xs uppercase tracking-[0.28em] text-emerald-300/70">Supabase Google auth</div>
          <h2 className="mt-3 text-3xl font-semibold">Sign in</h2>
          <p className="mt-2 text-sm text-white/55">
            Google sign-in uses Supabase Auth. LinkedIn verification can still be added later as a trust layer after account creation.
          </p>
          <AuthActions next={next} callbackError={callbackError} />
          <Link href="/onboarding">
            <Button className="mt-6 h-12 w-full rounded-full bg-emerald-300 text-emerald-950 hover:bg-emerald-200">
              Preview onboarding
            </Button>
          </Link>
        </Card>
      </div>
    </main>
  )
}
