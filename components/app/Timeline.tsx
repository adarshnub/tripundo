'use client'

import { motion } from 'framer-motion'
import { CheckCircle2, Circle, MapPin } from 'lucide-react'

export default function Timeline({ events = [] }) {
  return (
    <div className="space-y-0">
      {events.map((event, index) => {
        const done = event.status === 'done'
        const active = event.status === 'active'
        return (
          <motion.div
            key={`${event.label}-${index}`}
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.08 }}
            className="relative flex gap-3 pb-5"
          >
            <div className="flex flex-col items-center">
              <div className={`flex h-9 w-9 items-center justify-center rounded-full border ${done || active ? 'border-emerald-300 bg-emerald-300 text-emerald-950' : 'border-white/15 bg-white/[0.04] text-white/40'}`}>
                {done ? <CheckCircle2 className="h-4 w-4" /> : active ? <MapPin className="h-4 w-4" /> : <Circle className="h-4 w-4" />}
              </div>
              {index < events.length - 1 ? <div className="mt-2 h-full min-h-10 w-px bg-white/10" /> : null}
            </div>
            <div className="pt-1">
              <div className="font-semibold text-white">{event.label}</div>
              <div className="mt-1 text-sm text-white/55">{event.detail}</div>
            </div>
          </motion.div>
        )
      })}
    </div>
  )
}
