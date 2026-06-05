'use client'

import { motion } from 'framer-motion'
import { Plane } from 'lucide-react'
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
        <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-black/30 backdrop-blur-xl px-4 py-2.5">
          <div className="flex items-center gap-2.5">
            <div className="relative">
              <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-cyan-400 via-violet-500 to-pink-500 flex items-center justify-center shadow-lg shadow-violet-500/30">
                <Plane className="h-4 w-4 text-white -rotate-45" />
              </div>
            </div>
            <div className="text-white font-semibold tracking-tight text-lg">
              Tripundo
              <span className="text-cyan-400">.</span>
              <span className="text-white/60 text-sm">in</span>
            </div>
          </div>
          <nav className="hidden md:flex items-center gap-7 text-sm text-white/70">
            <a href="#trust" className="hover:text-white transition">Trust</a>
            <a href="#communities" className="hover:text-white transition">Communities</a>
            <a href="#trips" className="hover:text-white transition">Trips</a>
            <a href="#stories" className="hover:text-white transition">Stories</a>
            <a href="#safety" className="hover:text-white transition">Safety</a>
          </nav>
          <div className="flex items-center gap-2">
            <Button variant="ghost" className="hidden sm:inline-flex text-white/80 hover:bg-white/10 hover:text-white">Sign in</Button>
            <Button className="bg-white text-black hover:bg-white/90 font-medium rounded-full px-4">
              Join Waitlist
            </Button>
          </div>
        </div>
      </div>
    </motion.header>
  )
}
