'use client'

import { createBrowserClient } from '@supabase/ssr'

export function hasBrowserSupabaseConfig() {
  return Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)
}

export function createSupabaseBrowserClient() {
  if (!hasBrowserSupabaseConfig()) {
    return null
  }

  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  )
}
