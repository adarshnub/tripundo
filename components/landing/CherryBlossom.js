'use client'

import { useEffect, useMemo, useRef } from 'react'

const NUM_PETALS = 180

export default function CherryBlossom() {
  const containerRef = useRef(null)
  const mouseRef = useRef({ x: -9999, y: -9999 })
  const petalsRef = useRef([])

  const petals = useMemo(
    () =>
      Array.from({ length: NUM_PETALS }, () => ({
        x: Math.random() * 100,
        y: Math.random() * -120 - 5,
        vx: -0.05 + Math.random() * 0.10,
        vy: 0.06 + Math.random() * 0.11,
        rotation: Math.random() * 360,
        rotationSpeed: -1.8 + Math.random() * 3.6,
        size: 7 + Math.random() * 9,
        opacity: 0.75 + Math.random() * 0.25,
        sway: Math.random() * Math.PI * 2,
        swaySpeed: 0.008 + Math.random() * 0.022,
        swayAmp: 0.14 + Math.random() * 0.26,
        tint: Math.random(),
      })),
    []
  )

  useEffect(() => {
    const onMove = (e) => {
      const rect = containerRef.current?.getBoundingClientRect()
      if (!rect) return
      mouseRef.current.x = e.clientX - rect.left
      mouseRef.current.y = e.clientY - rect.top
    }
    const onLeave = () => {
      mouseRef.current.x = -9999
      mouseRef.current.y = -9999
    }
    window.addEventListener('mousemove', onMove, { passive: true })
    window.addEventListener('mouseout', onLeave)
    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseout', onLeave)
    }
  }, [])

  useEffect(() => {
    let rafId
    let last = performance.now()
    const REPEL_RADIUS = 95
    const REPEL_STRENGTH = 14

    const tick = (now) => {
      const dt = Math.min((now - last) / 16.67, 2.2)
      last = now
      const el = containerRef.current
      if (el) {
        const rect = el.getBoundingClientRect()
        const w = rect.width
        const h = rect.height
        const mx = mouseRef.current.x
        const my = mouseRef.current.y

        for (let i = 0; i < petals.length; i++) {
          const p = petals[i]
          p.sway += p.swaySpeed * dt
          const swayX = Math.sin(p.sway) * p.swayAmp
          p.x += (p.vx + swayX) * dt
          p.y += p.vy * dt
          p.rotation += p.rotationSpeed * dt

          let px = (p.x / 100) * w
          let py = (p.y / 100) * h

          const dx = px - mx
          const dy = py - my
          const d2 = dx * dx + dy * dy
          if (d2 < REPEL_RADIUS * REPEL_RADIUS && d2 > 1) {
            const d = Math.sqrt(d2)
            const force = (REPEL_RADIUS - d) / REPEL_RADIUS
            const push = force * REPEL_STRENGTH * dt
            px += (dx / d) * push
            py += (dy / d) * push
            p.x = (px / w) * 100
            p.y = (py / h) * 100
          }

          if (p.y > 115) {
            p.y = -10
            p.x = Math.random() * 100
          }
          if (p.x > 112) p.x = -8
          if (p.x < -12) p.x = 110

          const nodeEl = petalsRef.current[i]
          if (nodeEl) {
            const nx = (p.x / 100) * w
            const ny = (p.y / 100) * h
            nodeEl.style.transform = `translate3d(${nx}px, ${ny}px, 0) rotate(${p.rotation}deg)`
          }
        }
      }
      rafId = requestAnimationFrame(tick)
    }
    rafId = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafId)
  }, [petals])

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-none overflow-hidden z-[4]"
      aria-hidden
    >
      {/* Shared gradient defs (single SVG with defs available globally to other SVGs in same doc) */}
      <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden>
        <defs>
          <radialGradient id="cb-pink-1" cx="35%" cy="28%" r="85%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="22%" stopColor="#ffe4ed" />
            <stop offset="60%" stopColor="#ffa8c3" />
            <stop offset="100%" stopColor="#e8447a" />
          </radialGradient>
          <radialGradient id="cb-pink-2" cx="35%" cy="28%" r="85%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="22%" stopColor="#ffd6e3" />
            <stop offset="60%" stopColor="#ff8db1" />
            <stop offset="100%" stopColor="#d12f6a" />
          </radialGradient>
        </defs>
      </svg>

      {petals.map((p, i) => (
        <div
          key={i}
          ref={(el) => (petalsRef.current[i] = el)}
          className="absolute"
          style={{
            width: `${p.size}px`,
            height: `${p.size * 0.95}px`,
            top: 0,
            left: 0,
            opacity: p.opacity,
            willChange: 'transform',
            filter: 'drop-shadow(0 2px 3px rgba(255,100,150,0.5))',
          }}
        >
          <svg viewBox="0 0 20 20" width="100%" height="100%">
            <path
              d="M10,18.5 C2.2,18.5 -0.3,10 3.5,4.5 C6.5,0.5 10,2.8 10,6 C10,2.8 13.5,0.5 16.5,4.5 C20.3,10 17.8,18.5 10,18.5 Z"
              fill={p.tint > 0.5 ? 'url(#cb-pink-1)' : 'url(#cb-pink-2)'}
              stroke="#c92f5c"
              strokeWidth="0.5"
              strokeOpacity="0.7"
            />
            {/* subtle vein */}
            <path
              d="M10,7 C9.6,11 9.6,14 10,17.5"
              stroke="#ff6d96"
              strokeWidth="0.22"
              strokeOpacity="0.4"
              fill="none"
            />
          </svg>
        </div>
      ))}
    </div>
  )
}
