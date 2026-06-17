import Link from 'next/link'
import { ArrowRight, Briefcase, Camera, Car, HeartPulse, MapPin, Shield, Sparkles, User } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export const metadata = {
  title: 'Tripundo Onboarding',
}

const steps = [
  {
    title: 'Basic information',
    icon: User,
    fields: ['Full name', 'Profile photo', 'Gender', 'Age range'],
  },
  {
    title: 'Professional information',
    icon: Briefcase,
    fields: ['Company', 'Designation', 'Industry', 'LinkedIn connection'],
  },
  {
    title: 'Travel interests',
    icon: MapPin,
    fields: ['Munnar', 'Wayanad', 'Vagamon', 'Varkala', 'Gavi', 'Thekkady', 'Goa', 'Bangalore'],
  },
  {
    title: 'Travel preferences',
    icon: Sparkles,
    fields: ['Weekend trips', 'Road trips', 'Trekking', 'Backpacking', 'Leisure travel'],
  },
  {
    title: 'Budget preference',
    icon: Shield,
    fields: ['Budget', 'Moderate', 'Premium'],
  },
  {
    title: 'Lifestyle information',
    icon: Camera,
    fields: ['Smoking preference', 'Drinking preference', 'Food preference'],
  },
  {
    title: 'Travel capability',
    icon: Car,
    fields: ['Own car', 'Own bike', 'Can drive', 'Trek experience', 'First aid knowledge'],
  },
  {
    title: 'Emergency contact',
    icon: HeartPulse,
    fields: ['Name', 'Relationship', 'Phone number'],
  },
]

export default function OnboardingPage() {
  return (
    <main className="min-h-screen bg-[#07140d] px-4 py-8 text-white">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <Link href="/auth" className="text-sm text-white/55 hover:text-white">Back to auth</Link>
            <div className="mt-6 text-xs uppercase tracking-[0.28em] text-emerald-300/70">Verification-first onboarding</div>
            <h1 className="mt-3 max-w-3xl text-4xl font-semibold tracking-tight sm:text-5xl">
              Build enough trust before anyone joins a trip.
            </h1>
            <p className="mt-4 max-w-2xl text-white/58">
              These steps become the profile, matching, safety, and trust-score inputs for Tripundo V1.
            </p>
          </div>
          <Link href="/dashboard">
            <Button className="rounded-full bg-emerald-300 text-emerald-950 hover:bg-emerald-200">
              Enter app preview
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {steps.map((step, index) => {
            const Icon = step.icon
            return (
              <Card key={step.title} className="border-white/10 bg-white/[0.04] p-5 text-white">
                <div className="flex items-center justify-between">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-400 to-amber-300 text-emerald-950">
                    <Icon className="h-5 w-5" />
                  </div>
                  <Badge variant="outline" className="border-white/15 text-white/55">Step {index + 1}</Badge>
                </div>
                <h2 className="mt-5 text-lg font-semibold">{step.title}</h2>
                <div className="mt-4 flex flex-wrap gap-2">
                  {step.fields.map((field) => (
                    <span key={field} className="rounded-full border border-white/10 bg-black/20 px-3 py-1 text-xs text-white/55">
                      {field}
                    </span>
                  ))}
                </div>
              </Card>
            )
          })}
        </div>
      </div>
    </main>
  )
}
