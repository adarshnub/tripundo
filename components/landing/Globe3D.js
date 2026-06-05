'use client'

import { motion } from 'framer-motion'

// Real Himalayan / Valley of Flowers photograph
const HERO_BG = 'https://images.unsplash.com/photo-1777355369950-88da511abe38?auto=format&fit=crop&w=2400&q=85'

export default function MistyValley() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Real Himalayan photograph */}
      <motion.div
        initial={{ scale: 1.08 }}
        animate={{ scale: 1.0 }}
        transition={{ duration: 8, ease: 'easeOut' }}
        className="absolute inset-0"
      >
        <img
          src={HERO_BG}
          alt="Himalayan misty mountains and valley of flowers"
          className="absolute inset-0 w-full h-full object-cover"
          loading="eager"
          fetchpriority="high"
        />
      </motion.div>

      {/* Subtle warm tone wash for cohesion */}
      <div
        className="absolute inset-0 pointer-events-none mix-blend-soft-light"
        style={{
          background:
            'linear-gradient(135deg, rgba(255,220,180,0.25) 0%, rgba(255,255,255,0.0) 40%, rgba(180,210,200,0.15) 100%)',
        }}
      />

      {/* Soft left-side cream vignette for text legibility */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'linear-gradient(90deg, rgba(252,247,235,0.85) 0%, rgba(252,247,235,0.70) 18%, rgba(252,247,235,0.45) 35%, rgba(252,247,235,0.15) 50%, rgba(252,247,235,0.0) 65%)',
        }}
      />

      {/* Top sky lift (slight brighten in upper area) */}
      <div
        className="absolute inset-x-0 top-0 h-[35%] pointer-events-none"
        style={{
          background:
            'linear-gradient(180deg, rgba(255,235,210,0.20) 0%, rgba(255,235,210,0.05) 60%, transparent 100%)',
        }}
      />

      {/* Animated drifting cloud strip (over far mountains) */}
      <motion.div
        animate={{ x: [0, 60, 0] }}
        transition={{ duration: 50, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute left-[-10%] right-[-10%] pointer-events-none"
        style={{
          top: '38%',
          height: '90px',
          background:
            'radial-gradient(ellipse at 25% center, rgba(255,255,255,0.45) 0%, rgba(255,255,255,0.1) 45%, transparent 70%), radial-gradient(ellipse at 70% center, rgba(255,250,240,0.4) 0%, rgba(255,250,240,0.08) 45%, transparent 70%)',
          filter: 'blur(22px)',
        }}
      />
      <motion.div
        animate={{ x: [0, -90, 0] }}
        transition={{ duration: 65, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute left-[-10%] right-[-10%] pointer-events-none"
        style={{
          top: '52%',
          height: '120px',
          background:
            'radial-gradient(ellipse at center, rgba(255,255,255,0.32) 0%, rgba(255,255,255,0.05) 50%, transparent 75%)',
          filter: 'blur(28px)',
        }}
      />

      {/* Bottom fade to dark forest (transitions into next sections) */}
      <div
        className="absolute inset-x-0 bottom-0 pointer-events-none"
        style={{
          height: '22%',
          background:
            'linear-gradient(180deg, transparent 0%, rgba(15,30,20,0.5) 55%, rgba(7,20,13,1) 100%)',
        }}
      />

      {/* Ambient snow handled by separate cursor-aware Snow component */}
    </div>
  )
}
