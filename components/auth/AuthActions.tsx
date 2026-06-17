'use client'

import { useMemo, useState } from 'react'
import { Loader2, Mail, Phone } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { createSupabaseBrowserClient, hasBrowserSupabaseConfig } from '@/lib/supabase-browser'

export default function AuthActions({ next = '/dashboard', callbackError }) {
  const [loadingProvider, setLoadingProvider] = useState(null)
  const [error, setError] = useState(callbackError || '')
  const supabaseConfigured = hasBrowserSupabaseConfig()

  const safeNext = useMemo(() => {
    if (!next || !next.startsWith('/') || next.startsWith('//')) return '/dashboard'
    return next
  }, [next])

  async function signInWithGoogle() {
    setError('')

    const supabase = createSupabaseBrowserClient()
    if (!supabase) {
      setError('Supabase is not configured yet. Add the env vars, then enable Google in Supabase Auth.')
      return
    }

    setLoadingProvider('google')
    const redirectTo = `${window.location.origin}/auth/callback?next=${encodeURIComponent(safeNext)}`
    const { error: signInError } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo },
    })

    if (signInError) {
      setError(signInError.message)
      setLoadingProvider(null)
    }
  }

  return (
    <div className="mt-6 space-y-3">
      <Button
        className="h-12 w-full rounded-full bg-white text-emerald-950 hover:bg-emerald-50"
        disabled={loadingProvider === 'google'}
        onClick={signInWithGoogle}
      >
        {loadingProvider === 'google' ? <Loader2 className="h-4 w-4 animate-spin" /> : <span className="text-base font-bold">G</span>}
        Continue with Google
      </Button>

      <Button disabled variant="ghost" className="h-12 w-full rounded-full border border-white/10 bg-white/[0.04] text-white hover:bg-white/10">
        <Mail className="h-4 w-4" />
        Email login coming next
      </Button>
      <Button disabled variant="ghost" className="h-12 w-full rounded-full border border-white/10 bg-white/[0.04] text-white hover:bg-white/10">
        <Phone className="h-4 w-4" />
        Mobile OTP coming next
      </Button>

      {!supabaseConfigured ? (
        <div className="rounded-2xl border border-amber-300/20 bg-amber-300/10 px-4 py-3 text-sm text-amber-100">
          Local demo mode is active because Supabase env vars are empty.
        </div>
      ) : null}
      {error ? (
        <div className="rounded-2xl border border-red-300/20 bg-red-400/10 px-4 py-3 text-sm text-red-100">
          {error}
        </div>
      ) : null}
    </div>
  )
}
