'use client'

import { motion } from 'framer-motion'
import { Linkedin, BadgeCheck } from 'lucide-react'

const PROFILES = [
  { name: 'Aarav', role: 'Senior SWE · Razorpay', initial: 'A', color: 'from-emerald-400 to-teal-500', x: '6%', y: '20%' },
  { name: 'Meera', role: 'Product · Atlassian', initial: 'M', color: 'from-pink-400 to-rose-500', x: '88%', y: '26%' },
  { name: 'Karthik', role: 'Founder · Stealth', initial: 'K', color: 'from-amber-400 to-orange-500', x: '4%', y: '66%' },
  { name: 'Riya', role: 'Designer · Figma', initial: 'R', color: 'from-fuchsia-400 to-pink-500', x: '90%', y: '70%' },
  { name: 'Dev', role: 'ML Eng · Google', initial: 'D', color: 'from-lime-400 to-emerald-500', x: '74%', y: '10%' },
]

export default function HeroOverlay() {
  return (
    <div className="pointer-events-none absolute inset-0 z-10">
      {PROFILES.map((p, i) => (
        <motion.div
          key={p.name}
          className="absolute"
          style={{ left: p.x, top: p.y }}
          initial={{ opacity: 0, y: 12, scale: 0.85 }}
          animate={{ opacity: 1, y: [0, -10, 0], scale: 1 }}
          transition={{
            opacity: { delay: 1.2 + i * 0.18, duration: 0.6 },
            scale: { delay: 1.2 + i * 0.18, duration: 0.6 },
            y: { duration: 4 + i, repeat: Infinity, ease: 'easeInOut' },
          }}
        >
          <div className="flex items-center gap-2.5 rounded-full border border-white/40 bg-white/70 px-3 py-2 backdrop-blur-xl shadow-lg shadow-emerald-900/20">
            <div className={`h-8 w-8 rounded-full bg-gradient-to-br ${p.color} flex items-center justify-center text-[12px] font-bold text-white shadow-inner`}>
              {p.initial}
            </div>
            <div className="hidden sm:block">
              <div className="flex items-center gap-1">
                <span className="text-[12px] font-semibold text-emerald-950 leading-none">{p.name}</span>
                <BadgeCheck className="h-3 w-3 text-emerald-600" />
              </div>
              <div className="text-[10px] text-emerald-900/70 leading-tight mt-0.5">{p.role}</div>
            </div>
            <Linkedin className="hidden sm:block h-3 w-3 text-[#0a66c2]" />
          </div>
        </motion.div>
      ))}
    </div>
  )
}
