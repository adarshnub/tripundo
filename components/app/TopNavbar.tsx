'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Bell, Compass, LogOut, Menu, Settings, Shield, User, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { createSupabaseBrowserClient, hasBrowserSupabaseConfig } from '@/lib/supabase-browser'

const links = [
  { href: '/discover', label: 'Discover' },
  { href: '/communities', label: 'Communities' },
  { href: '/trips', label: 'Plans' },
  { href: '/messages', label: 'Messages' },
  { href: '/story-studio', label: 'Story Studio' },
  { href: '/profile', label: 'Profile' },
]

export default function TopNavbar() {
  const pathname = usePathname()
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const supabaseConfigured = hasBrowserSupabaseConfig()

  function isActive(href) {
    return pathname === href || pathname.startsWith(`${href}/`)
  }

  async function signOut() {
    const supabase = createSupabaseBrowserClient()
    if (supabase) {
      await supabase.auth.signOut()
    }
    router.push('/auth')
    router.refresh()
  }

  return (
    <header className="fixed inset-x-0 top-0 z-50 top-nav-glass">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link href="/discover" className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[hsl(var(--tea-hill))] shadow-lg shadow-emerald-950/30">
            <Compass className="h-5 w-5 text-[hsl(var(--sunlight))]" />
          </div>
          <div>
            <div className="text-base font-semibold tracking-tight text-white">Tripundo</div>
            <div className="text-[11px] text-white/45">Travel communities</div>
          </div>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {links.slice(0, 5).map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`rounded-full px-4 py-2 text-sm transition ${
                isActive(link.href)
                  ? 'bg-white text-emerald-950'
                  : 'text-white/62 hover:bg-white/10 hover:text-white'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <div className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-3 py-2 text-xs text-white/70">
            <Shield className="h-3.5 w-3.5 text-emerald-300" />
            94 trust
          </div>
          <Button variant="ghost" size="icon" className="rounded-full border border-white/10 bg-white/[0.04] text-white hover:bg-white/10">
            <Bell className="h-4 w-4" />
          </Button>
          <Button asChild variant="ghost" size="icon" className="rounded-full border border-white/10 bg-white/[0.04] text-white hover:bg-white/10">
            <Link href="/admin">
              <Settings className="h-4 w-4" />
            </Link>
          </Button>
          <Button asChild className="rounded-full bg-[hsl(var(--sunlight))] text-emerald-950 hover:bg-[hsl(var(--sand))]">
            <Link href="/profile">
              <User className="h-4 w-4" />
              Profile
            </Link>
          </Button>
          {supabaseConfigured ? (
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full border border-white/10 bg-white/[0.04] text-white hover:bg-white/10"
              onClick={signOut}
              title="Sign out"
            >
              <LogOut className="h-4 w-4" />
            </Button>
          ) : null}
        </div>

        <Button
          variant="ghost"
          size="icon"
          className="rounded-full border border-white/10 bg-white/[0.04] text-white md:hidden"
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </Button>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-t border-white/10 bg-[#07140d]/96 md:hidden"
          >
            <nav className="grid gap-1 px-4 py-3">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={`rounded-xl px-3 py-2 text-sm ${
                    isActive(link.href) ? 'bg-white text-emerald-950' : 'text-white/70'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <Link href="/admin" onClick={() => setOpen(false)} className="rounded-xl px-3 py-2 text-sm text-white/70">
                Admin
              </Link>
              {supabaseConfigured ? (
                <button onClick={signOut} className="rounded-xl px-3 py-2 text-left text-sm text-white/70">
                  Sign out
                </button>
              ) : null}
            </nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  )
}
