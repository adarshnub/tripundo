'use client'

import { useMemo } from 'react'
import { motion } from 'framer-motion'

export default function MistyValley() {
  const snowflakes = useMemo(
    () =>
      Array.from({ length: 70 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 12,
        duration: 10 + Math.random() * 16,
        size: 1 + Math.random() * 3.5,
        opacity: 0.4 + Math.random() * 0.55,
        drift: -25 + Math.random() * 50,
      })),
    []
  )

  const petals = useMemo(
    () =>
      Array.from({ length: 24 }, (_, i) => ({
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
      {/* ============ SKY ============ */}
      {/* Multi-stop dawn-to-dusk sky */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(180deg, #fcd9a8 0%, #fbb6ce 9%, #f3a8c4 18%, #d9b8de 28%, #b8c8e0 40%, #c6d8d8 52%, #c3d6c5 64%, #9cbca6 78%, #5e8268 92%, #2f4f37 100%)',
        }}
      />

      {/* Sun rays (subtle streaks from sun) */}
      <div
        className="absolute"
        style={{
          top: '5%',
          left: '50%',
          width: '90%',
          height: '50%',
          transform: 'translateX(-50%)',
          background:
            'conic-gradient(from 200deg at 70% 20%, transparent 0deg, rgba(255,220,170,0.15) 8deg, transparent 16deg, transparent 25deg, rgba(255,220,170,0.12) 33deg, transparent 41deg, transparent 50deg, rgba(255,220,170,0.10) 58deg, transparent 66deg)',
          filter: 'blur(6px)',
          opacity: 0.7,
          pointerEvents: 'none',
        }}
      />

      {/* Sun disc + glow */}
      <div
        className="absolute"
        style={{
          top: '14%',
          left: '64%',
          width: '600px',
          height: '600px',
          background:
            'radial-gradient(circle, rgba(255,236,200,0.95) 0%, rgba(255,210,160,0.6) 10%, rgba(255,180,140,0.35) 22%, rgba(255,160,140,0.18) 35%, transparent 65%)',
          filter: 'blur(20px)',
        }}
      />
      <div
        className="absolute rounded-full"
        style={{
          top: '17%',
          left: '70%',
          width: '110px',
          height: '110px',
          background: 'radial-gradient(circle, #fff8e7 0%, #ffd6a8 60%, transparent 100%)',
          filter: 'blur(2px)',
          boxShadow: '0 0 80px 40px rgba(255,220,180,0.5)',
        }}
      />

      {/* Wispy clouds (parallax drifting) */}
      <motion.div
        animate={{ x: [0, 50, 0] }}
        transition={{ duration: 55, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute pointer-events-none"
        style={{ inset: 0 }}
      >
        <svg viewBox="0 0 1920 1080" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
          <g opacity="0.55">
            <ellipse cx="220" cy="180" rx="160" ry="14" fill="#ffffff" filter="blur(6px)" />
            <ellipse cx="280" cy="195" rx="90" ry="9" fill="#ffffff" filter="blur(4px)" />
            <ellipse cx="780" cy="120" rx="220" ry="16" fill="#ffffff" filter="blur(8px)" />
            <ellipse cx="850" cy="138" rx="140" ry="10" fill="#fdf2f8" filter="blur(5px)" />
            <ellipse cx="1380" cy="200" rx="180" ry="13" fill="#ffffff" filter="blur(7px)" />
            <ellipse cx="1560" cy="160" rx="120" ry="9" fill="#ffffff" filter="blur(5px)" />
            <ellipse cx="500" cy="280" rx="240" ry="18" fill="#fef9f0" filter="blur(9px)" />
            <ellipse cx="1700" cy="280" rx="200" ry="14" fill="#ffffff" filter="blur(7px)" />
          </g>
        </svg>
      </motion.div>

      {/* Distant atmospheric haze peaks (very faint, behind everything) */}
      <svg
        className="absolute inset-x-0"
        style={{ top: '34%', height: '14%', width: '100%' }}
        viewBox="0 0 1920 200"
        preserveAspectRatio="none"
      >
        <path
          d="M0,140 L100,90 L200,110 L320,70 L440,100 L560,80 L700,110 L820,75 L940,105 L1080,80 L1200,110 L1340,85 L1480,115 L1620,80 L1760,110 L1920,90 L1920,200 L0,200 Z"
          fill="#dde6eb"
          opacity="0.45"
        />
      </svg>

      {/* ============ FAR SNOW PEAKS (highest mountains) ============ */}
      <svg
        className="absolute inset-x-0"
        style={{ top: '28%', height: '42%', width: '100%' }}
        viewBox="0 0 1920 500"
        preserveAspectRatio="none"
      >
        <defs>
          {/* Shadow side of far peaks */}
          <linearGradient id="farShadow" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#7d96a8" />
            <stop offset="60%" stopColor="#5d7889" />
            <stop offset="100%" stopColor="#3e576a" />
          </linearGradient>
          {/* Lit side gradient (sunrise warm light) */}
          <linearGradient id="farLit" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="20%" stopColor="#fde4cf" />
            <stop offset="55%" stopColor="#d4dae1" />
            <stop offset="100%" stopColor="#8aa1b1" />
          </linearGradient>
          {/* Snow cap pure white */}
          <linearGradient id="snowCap" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="100%" stopColor="#e4ebf0" stopOpacity="0.7" />
          </linearGradient>
        </defs>

        {/* Shadow side (behind, slightly offset right) */}
        <path
          d="M0,360 L70,220 L140,140 L210,200 L280,80 L350,180 L410,120 L470,200 L540,60 L610,170 L680,110 L750,190 L820,50 L890,150 L960,20 L1030,140 L1100,80 L1180,170 L1250,40 L1330,150 L1400,90 L1470,180 L1540,50 L1620,150 L1700,90 L1780,180 L1860,100 L1920,160 L1920,500 L0,500 Z"
          fill="url(#farShadow)"
          opacity="0.95"
        />

        {/* Lit side overlay (slightly left offset, lighter fill) */}
        <path
          d="M0,365 L65,225 L135,148 L208,210 L275,90 L345,190 L405,130 L468,212 L535,70 L605,180 L675,120 L745,200 L815,60 L885,160 L955,30 L1025,150 L1095,90 L1175,180 L1245,50 L1325,160 L1395,100 L1465,190 L1535,60 L1615,160 L1695,100 L1775,190 L1855,110 L1920,170 L1920,500 L0,500 Z"
          fill="url(#farLit)"
          opacity="0.55"
        />

        {/* Snow caps — only top portion of each peak */}
        <path
          d="M55,260 L140,140 L195,225 M260,140 L280,80 L300,135 M335,180 L355,160 L370,170 M455,180 L470,200 L495,170 M520,135 L540,60 L562,135 M595,180 L610,170 L630,165 M660,160 L680,110 L702,160 M735,190 L750,190 L770,180 M800,145 L820,50 L845,140 M870,160 L890,150 L912,150 M935,110 L960,20 L990,120 M1015,165 L1030,140 L1055,150 M1080,135 L1100,80 L1125,135 M1160,180 L1180,170 L1205,170 M1230,140 L1250,40 L1280,140 M1310,165 L1330,150 L1355,150 M1380,160 L1400,90 L1425,160 M1455,190 L1470,180 L1495,170 M1520,140 L1540,50 L1565,140 M1600,165 L1620,150 L1645,150 M1675,160 L1695,90 L1720,155 M1755,195 L1775,180 L1800,180 M1835,170 L1855,100 L1885,160"
          fill="none"
          stroke="url(#snowCap)"
          strokeWidth="3"
          strokeLinejoin="round"
          opacity="0.85"
        />

        {/* Filled snow caps for visual mass */}
        <path
          d="M125,170 L140,140 L160,170 Z M275,110 L280,80 L300,115 Z M535,90 L540,60 L562,100 Z M820,80 L820,50 L845,90 Z M960,40 L960,20 L990,55 Z M1100,100 L1100,80 L1125,115 Z M1250,60 L1250,40 L1278,75 Z M1400,110 L1400,90 L1425,125 Z M1540,75 L1540,50 L1565,85 Z M1695,110 L1695,90 L1720,120 Z"
          fill="#ffffff"
          opacity="0.95"
        />

        {/* Thin highlight ridge on lit side */}
        <path
          d="M70,220 L140,140 L210,200 L280,80 L350,180 L470,200 L540,60 L610,170 L750,190 L820,50 L890,150 L960,20 L1100,80 L1250,40 L1330,150 L1400,90 L1540,50 L1695,90"
          fill="none"
          stroke="#ffffff"
          strokeWidth="1.2"
          strokeOpacity="0.4"
          strokeLinejoin="round"
        />
      </svg>

      {/* Cloud band between far + mid (creates floating-peak effect) */}
      <motion.div
        animate={{ x: [0, 70, 0] }}
        transition={{ duration: 40, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute"
        style={{
          left: '-10%',
          right: '-10%',
          top: '58%',
          height: '140px',
          background:
            'radial-gradient(ellipse at 30% center, rgba(255,255,255,0.75) 0%, rgba(255,255,255,0.25) 35%, transparent 60%), radial-gradient(ellipse at 75% center, rgba(255,250,240,0.7) 0%, rgba(255,250,240,0.2) 30%, transparent 60%)',
          filter: 'blur(20px)',
        }}
      />

      {/* ============ MID MOUNTAINS (forested) ============ */}
      <svg
        className="absolute inset-x-0"
        style={{ top: '54%', height: '32%', width: '100%' }}
        viewBox="0 0 1920 380"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="midShadow" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#3f5a4a" />
            <stop offset="60%" stopColor="#2c4536" />
            <stop offset="100%" stopColor="#1a2a20" />
          </linearGradient>
          <linearGradient id="midLit" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#7e9c87" />
            <stop offset="50%" stopColor="#5a7d65" />
            <stop offset="100%" stopColor="#3e5a48" />
          </linearGradient>
        </defs>

        {/* Shadow base (whole silhouette) */}
        <path
          d="M0,250 L80,180 L150,90 L240,170 L320,60 L410,160 L500,80 L600,180 L690,70 L790,170 L890,90 L980,180 L1080,60 L1180,170 L1280,90 L1380,180 L1470,70 L1570,170 L1670,80 L1770,180 L1870,100 L1920,150 L1920,380 L0,380 Z"
          fill="url(#midShadow)"
        />

        {/* Lit side overlay (slightly inset) */}
        <path
          d="M0,255 L80,195 L150,105 L240,180 L320,75 L410,170 L500,95 L600,190 L690,85 L790,180 L890,105 L980,190 L1080,75 L1180,180 L1280,105 L1380,190 L1470,85 L1570,180 L1670,95 L1770,190 L1870,115 L1920,165 L1920,380 L0,380 Z"
          fill="url(#midLit)"
          opacity="0.5"
        />

        {/* Tree-line texture stroke (suggests forest detail) */}
        <path
          d="M0,255 L80,195 L150,105 L240,180 L320,75 L410,170 L500,95 L600,190 L690,85 L790,180 L890,105 L980,190 L1080,75 L1180,180 L1280,105 L1380,190 L1470,85 L1570,180 L1670,95 L1770,190 L1870,115 L1920,165"
          fill="none"
          stroke="#1f2f24"
          strokeWidth="1"
          strokeOpacity="0.5"
        />
        {/* Snow dusting on tallest mid peaks */}
        <path
          d="M140,118 L150,90 L165,118 Z M310,82 L320,60 L335,82 Z M685,90 L690,70 L705,95 Z M1075,82 L1080,60 L1098,90 Z M1465,90 L1470,70 L1488,95 Z M1665,100 L1670,80 L1688,108 Z"
          fill="#e4ebf0"
          opacity="0.75"
        />
      </svg>

      {/* Wispy low mist drifting (between mid + near) */}
      <motion.div
        animate={{ x: [0, -90, 0] }}
        transition={{ duration: 50, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute"
        style={{
          left: '-10%',
          right: '-10%',
          top: '72%',
          height: '160px',
          background:
            'radial-gradient(ellipse at 50% center, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0.1) 50%, transparent 70%)',
          filter: 'blur(28px)',
        }}
      />

      {/* ============ NEAR HILLS (foreground forest) ============ */}
      <svg
        className="absolute inset-x-0"
        style={{ bottom: '6%', height: '30%', width: '100%' }}
        viewBox="0 0 1920 320"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="nearGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#2c4f38" />
            <stop offset="100%" stopColor="#0a1d12" />
          </linearGradient>
          <linearGradient id="nearLit" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#4a7a52" />
            <stop offset="100%" stopColor="#1f3d28" />
          </linearGradient>
        </defs>

        {/* Main dark hill silhouette */}
        <path
          d="M0,200 L70,140 L160,50 L260,150 L360,30 L470,140 L580,60 L700,160 L820,40 L940,150 L1060,70 L1180,170 L1300,50 L1420,160 L1540,80 L1660,180 L1780,90 L1920,150 L1920,320 L0,320 Z"
          fill="url(#nearGrad)"
        />

        {/* Lit-side highlight (warm rim from sun) */}
        <path
          d="M0,205 L70,150 L160,65 L260,158 L360,45 L470,150 L580,75 L700,170 L820,55 L940,160 L1060,82 L1180,180 L1300,65 L1420,170 L1540,92 L1660,188 L1780,100 L1920,160 L1920,320 L0,320 Z"
          fill="url(#nearLit)"
          opacity="0.35"
        />

        {/* Pine tree silhouettes scattered on near hills */}
        <g fill="#0d2218" opacity="0.95">
          {[
            [120, 200], [200, 180], [300, 195], [380, 175], [460, 195],
            [540, 175], [620, 200], [720, 175], [800, 195], [880, 175],
            [960, 200], [1040, 175], [1120, 195], [1200, 175], [1300, 195],
            [1400, 175], [1480, 200], [1580, 175], [1680, 200], [1780, 180],
          ].map(([x, y], i) => (
            <path
              key={i}
              d={`M${x},${y} l-${4 + (i % 3)},${10 + (i % 4)} l${8 + (i % 3) * 2},0 z M${x},${y + 6} l-${5 + (i % 3)},${12 + (i % 3)} l${10 + (i % 3) * 2},0 z`}
            />
          ))}
        </g>
      </svg>

      {/* Foreground darkening fade */}
      <div
        className="absolute inset-x-0 bottom-0"
        style={{
          height: '14%',
          background:
            'linear-gradient(180deg, rgba(15,35,22,0.0) 0%, rgba(10,25,15,0.7) 35%, rgba(7,20,13,1) 100%)',
        }}
      />

      {/* Flower dots in meadow (Valley of Flowers nod) */}
      <div className="absolute inset-x-0 bottom-0 h-[20%] pointer-events-none">
        {Array.from({ length: 42 }).map((_, i) => {
          const colors = ['#f8a5c2', '#fcd34d', '#c084fc', '#fda4af', '#fb923c', '#fef08a']
          const c = colors[i % colors.length]
          return (
            <div
              key={i}
              className="absolute rounded-full"
              style={{
                left: `${(i * 2.38) % 100}%`,
                bottom: `${4 + ((i * 11) % 60)}%`,
                width: `${3 + (i % 4)}px`,
                height: `${3 + (i % 4)}px`,
                background: c,
                boxShadow: `0 0 8px ${c}`,
                opacity: 0.9,
              }}
            />
          )
        })}
      </div>

      {/* Snowflakes layer */}
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
              boxShadow: '0 0 6px rgba(255,255,255,0.7)',
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
              opacity: 0.8,
            }}
          />
        ))}
      </div>
    </div>
  )
}
