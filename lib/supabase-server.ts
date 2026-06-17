import { createClient } from '@supabase/supabase-js'
import { createServerClient } from '@supabase/ssr'

export function hasSupabaseConfig() {
  return Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)
}

export function createSupabaseApiClient(request) {
  if (!hasSupabaseConfig()) {
    return null
  }

  const authorization = request?.headers?.get?.('authorization')
  const requestCookies = request?.cookies?.getAll?.() || []

  if (authorization || requestCookies.length > 0) {
    return createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      {
        cookies: {
          getAll() {
            return requestCookies
          },
          setAll() {},
        },
        global: {
          headers: authorization ? { Authorization: authorization } : {},
        },
      }
    )
  }

  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  return createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, key, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
    global: {
      headers: authorization ? { Authorization: authorization } : {},
    },
  })
}

export function normalizeSupabaseRows(rows, fallback) {
  if (!Array.isArray(rows) || rows.length === 0) {
    return fallback
  }

  return rows
}
