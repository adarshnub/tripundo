'use client'

import { useMemo } from 'react'
import { motion } from 'framer-motion'

// Real Himalayan / Valley of Flowers photograph
const HERO_BG = 'https://images.unsplash.com/photo-1777355369950-88da511abe38?auto=format&fit=crop&w=2400&q=85'

export default function MistyValley() {
  const snowflakes = useMemo(
    () =>
      Array.from({ length: 80 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 14,
        duration: 9 + Math.random() * 18,
        size: 1 + Math.random() * 4,
        opacity: 0.45 + Math.random() * 0.5,
        drift: -25 + Math.random() * 50,
      })),
    []
  )

  const petals = useMemo(
    () =>
      Array.from({ length: 22 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 10,
        duration: 14 + Math.random() * 10,
        color: ['#f8a5c2', '#fcd34d', '#c084fc', '#fda4af', '#fb923c', '#fef3c7'][i % 6],
        size: 4 + Math.random() * 4,
        startTop: 10 + Math.random() * 50,
      })),
    []
  )

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

      {/* Snowflakes */}
      <div className="absolute inset-0 pointer-events-none z-[3]">
        {snowflakes.map((f) => (
          <div
            key={f.id}
            className="absolute rounded-full bg-white"
            style={{
              left: `${f.left}%`,
              width: `${f.size}px`,
              height: `${f.size}px`,
              top: '-12px',
              opacity: f.opacity,
              animation: `snowfall ${f.duration}s linear ${f.delay}s infinite`,
              boxShadow: '0 0 6px rgba(255,255,255,0.8)',
              ['--drift']: `${f.drift}px`,
            }}
          />
        ))}
      </div>

      {/* Floating petals */}
      <div className="absolute inset-0 pointer-events-none z-[3]">
        {petals.map((p) => (
          <div
            key={p.id}
            className="absolute rounded-full"
            style={{
              left: `${p.left}%`,
              top: `${p.startTop}%`,
              width: `${p.size}px`,
              height: `${p.size}px`,
              background: p.color,
              boxShadow: `0 0 12px ${p.color}`,
              animation: `petalDrift ${p.duration}s ease-in-out ${p.delay}s infinite`,
              opacity: 0.85,
            }}
          />
        ))}
      </div>
    </div>
  )
}
