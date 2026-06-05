'use client'

import { useMemo } from 'react'
import { motion } from 'framer-motion'

export default function MistyValley() {
  const snowflakes = useMemo(
    () =>
      Array.from({ length: 60 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 12,
        duration: 11 + Math.random() * 16,
        size: 1 + Math.random() * 3.5,
        opacity: 0.35 + Math.random() * 0.55,
        drift: -20 + Math.random() * 40,
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
        startTop: 10 + Math.random() * 40,
      })),
    []
  )

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Sky gradient — sunrise to misty mint */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(180deg, #fde4cf 0%, #fbcfe8 12%, #e6dff0 28%, #cfe1eb 48%, #b9d4cf 65%, #94baa5 82%, #4a6f54 100%)',
        }}
      />

      {/* Sun glow */}
      <div
        className="absolute"
        style={{
          top: '10%',
          left: '62%',
          width: '520px',
          height: '520px',
          background:
            'radial-gradient(circle, rgba(255,225,180,0.75) 0%, rgba(255,190,150,0.35) 30%, transparent 70%)',
          filter: 'blur(40px)',
        }}
      />

      {/* Far snowy peaks */}
      <svg
        className="absolute inset-x-0"
        style={{ top: '32%', height: '34%', width: '100%' }}
        viewBox="0 0 1920 400"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="farPeak" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.98" />
            <stop offset="45%" stopColor="#d5e2ea" />
            <stop offset="100%" stopColor="#94adb8" />
          </linearGradient>
          <linearGradient id="midMt" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#6e8d7a" />
            <stop offset="100%" stopColor="#33513f" />
          </linearGradient>
          <linearGradient id="nearMt" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#3a6048" />
            <stop offset="100%" stopColor="#152a1d" />
          </linearGradient>
          <linearGradient id="meadow" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#4a7a4f" />
            <stop offset="100%" stopColor="#0d1f12" />
          </linearGradient>
        </defs>
        <path
          d="M0,260 L120,90 L220,180 L340,40 L470,160 L600,70 L720,180 L850,50 L970,170 L1100,80 L1230,190 L1360,60 L1490,180 L1620,90 L1760,180 L1920,140 L1920,400 L0,400 Z"
          fill="url(#farPeak)"
          opacity="0.92"
        />
      </svg>

      {/* Mist layer 1 */}
      <motion.div
        animate={{ x: [0, 60, 0] }}
        transition={{ duration: 32, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute"
        style={{
          left: '-10%',
          right: '-10%',
          top: '55%',
          height: '140px',
          background:
            'radial-gradient(ellipse at center, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0.15) 50%, transparent 75%)',
          filter: 'blur(24px)',
        }}
      />

      {/* Mid mountains — forested */}
      <svg
        className="absolute inset-x-0"
        style={{ top: '52%', height: '32%', width: '100%' }}
        viewBox="0 0 1920 350"
        preserveAspectRatio="none"
      >
        <path
          d="M0,220 L150,100 L280,180 L420,60 L560,160 L700,80 L840,180 L990,90 L1130,190 L1280,100 L1420,200 L1560,120 L1700,200 L1860,140 L1920,180 L1920,350 L0,350 Z"
          fill="#5d7f6a"
          opacity="0.96"
        />
      </svg>

      {/* Mist layer 2 */}
      <motion.div
        animate={{ x: [0, -90, 0] }}
        transition={{ duration: 42, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute"
        style={{
          left: '-10%',
          right: '-10%',
          top: '68%',
          height: '160px',
          background:
            'radial-gradient(ellipse at center, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0.1) 50%, transparent 75%)',
          filter: 'blur(28px)',
        }}
      />

      {/* Near hills */}
      <svg
        className="absolute inset-x-0"
        style={{ bottom: '8%', height: '28%', width: '100%' }}
        viewBox="0 0 1920 300"
        preserveAspectRatio="none"
      >
        <path
          d="M0,180 L140,80 L290,160 L450,50 L600,140 L760,70 L920,160 L1080,80 L1240,170 L1400,90 L1560,180 L1720,120 L1920,160 L1920,300 L0,300 Z"
          fill="#2f4f37"
        />
      </svg>

      {/* Foreground valley meadow */}
      <div
        className="absolute inset-x-0 bottom-0"
        style={{
          height: '14%',
          background:
            'linear-gradient(180deg, rgba(34,68,40,0.0) 0%, rgba(20,42,25,0.85) 40%, rgba(7,20,13,1) 100%)',
        }}
      />

      {/* Flower dots in meadow (Valley of Flowers nod) */}
      <div className="absolute inset-x-0 bottom-0 h-[20%] pointer-events-none">
        {Array.from({ length: 36 }).map((_, i) => {
          const colors = ['#f8a5c2', '#fcd34d', '#c084fc', '#fda4af', '#fb923c']
          const c = colors[i % colors.length]
          return (
            <div
              key={i}
              className="absolute rounded-full"
              style={{
                left: `${(i * 2.78) % 100}%`,
                bottom: `${5 + ((i * 7) % 70)}%`,
                width: `${3 + (i % 4)}px`,
                height: `${3 + (i % 4)}px`,
                background: c,
                boxShadow: `0 0 6px ${c}`,
                opacity: 0.85,
              }}
            />
          )
        })}
      </div>

      {/* Snowflakes */}
      <div className="absolute inset-0 pointer-events-none">
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
              boxShadow: '0 0 5px rgba(255,255,255,0.7)',
              ['--drift']: `${f.drift}px`,
            }}
          />
        ))}
      </div>

      {/* Floating petals */}
      <div className="absolute inset-0 pointer-events-none">
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
              boxShadow: `0 0 10px ${p.color}`,
              animation: `petalDrift ${p.duration}s ease-in-out ${p.delay}s infinite`,
              opacity: 0.75,
            }}
          />
        ))}
      </div>
    </div>
  )
}
