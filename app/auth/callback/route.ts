import { NextResponse } from 'next/server'
import { createSupabaseServerClient } from '@/lib/supabase-auth-server'

function redirectTo(requestUrl: URL, path: string, params: Record<string, string> = {}) {
  const url = new URL(path, requestUrl.origin)
  Object.entries(params).forEach(([key, value]) => {
    if (value) url.searchParams.set(key, value)
  })
  return NextResponse.redirect(url)
}

export async function GET(request: Request) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')
  const next = requestUrl.searchParams.get('next') || '/dashboard'

  if (!code) {
    return redirectTo(requestUrl, '/auth', { error: 'missing_oauth_code', next })
  }

  const supabase = createSupabaseServerClient()
  if (!supabase) {
    return redirectTo(requestUrl, '/auth', { error: 'supabase_not_configured', next })
  }

  const { error } = await supabase.auth.exchangeCodeForSession(code)
  if (error) {
    return redirectTo(requestUrl, '/auth', { error: error.message, next })
  }

  return redirectTo(requestUrl, next)
}
