'use client'

import { motion } from 'framer-motion'
import { Linkedin, Shield, BadgeCheck } from 'lucide-react'

const PROFILES = [
  { name: 'Aarav', role: 'Senior SWE · Razorpay', initial: 'A', color: 'from-cyan-400 to-blue-500', x: '6%', y: '18%' },
  { name: 'Meera', role: 'Product · Atlassian', initial: 'M', color: 'from-fuchsia-400 to-pink-500', x: '88%', y: '24%' },
  { name: 'Karthik', role: 'Founder · Stealth', initial: 'K', color: 'from-amber-400 to-orange-500', x: '4%', y: '68%' },
  { name: 'Riya', role: 'Designer · Figma', initial: 'R', color: 'from-emerald-400 to-teal-500', x: '90%', y: '72%' },
  { name: 'Dev', role: 'ML Eng · Google', initial: 'D', color: 'from-violet-400 to-indigo-500', x: '72%', y: '8%' },
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
          <div className="flex items-center gap-2.5 rounded-full border border-white/10 bg-white/5 px-3 py-2 backdrop-blur-xl shadow-lg shadow-black/40">
            <div className={`h-8 w-8 rounded-full bg-gradient-to-br ${p.color} flex items-center justify-center text-[12px] font-bold text-white shadow-inner`}>
              {p.initial}
            </div>
            <div className="hidden sm:block">
              <div className="flex items-center gap-1">
                <span className="text-[12px] font-semibold text-white leading-none">{p.name}</span>
                <BadgeCheck className="h-3 w-3 text-cyan-400" />
              </div>
              <div className="text-[10px] text-white/60 leading-tight mt-0.5">{p.role}</div>
            </div>
            <Linkedin className="hidden sm:block h-3 w-3 text-[#0a66c2]" />
          </div>
        </motion.div>
      ))}

      {/* connector pulses */}
      <svg className="absolute inset-0 h-full w-full opacity-40" preserveAspectRatio="none">
        <defs>
          <linearGradient id="l1" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#22d3ee" stopOpacity="0" />
            <stop offset="50%" stopColor="#22d3ee" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#a855f7" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  )
}
