'use client'

import { motion } from 'framer-motion'

export function Reveal({ children, delay = 0, y = 24, className = '' }) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export function Eyebrow({ children }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[11px] font-medium uppercase tracking-wider text-cyan-300 backdrop-blur">
      <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse" />
      {children}
    </div>
  )
}
