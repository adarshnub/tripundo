'use client'

import { motion } from 'framer-motion'
import { Mountain } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function Nav() {
  return (
    <motion.header
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="fixed top-0 inset-x-0 z-50"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8 py-4">
        <div className="flex items-center justify-between rounded-2xl border border-white/30 bg-white/50 backdrop-blur-xl px-4 py-2.5 shadow-lg shadow-emerald-900/10">
          <div className="flex items-center gap-2.5">
            <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-emerald-400 via-teal-500 to-amber-400 flex items-center justify-center shadow-lg shadow-emerald-500/30">
              <Mountain className="h-4 w-4 text-white" />
            </div>
            <div className="text-emerald-950 font-semibold tracking-tight text-lg">
              Tripundo
              <span className="text-emerald-600">.</span>
              <span className="text-emerald-900/60 text-sm">in</span>
            </div>
          </div>
          <nav className="hidden md:flex items-center gap-7 text-sm text-emerald-950/75">
            <a href="#trust" className="hover:text-emerald-700 transition">Trust</a>
            <a href="#communities" className="hover:text-emerald-700 transition">Communities</a>
            <a href="#trips" className="hover:text-emerald-700 transition">Trips</a>
            <a href="#stories" className="hover:text-emerald-700 transition">Stories</a>
            <a href="#safety" className="hover:text-emerald-700 transition">Safety</a>
          </nav>
          <div className="flex items-center gap-2">
            <Button variant="ghost" className="hidden sm:inline-flex text-emerald-950/80 hover:bg-emerald-900/10">Sign in</Button>
            <Button className="bg-emerald-950 text-white hover:bg-emerald-900 font-medium rounded-full px-4 shadow-md">
              Join Waitlist
            </Button>
          </div>
        </div>
      </div>
    </motion.header>
  )
}
