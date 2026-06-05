'use client'

import { useEffect, useMemo, useRef, useState } from 'react'

const NUM_FLAKES = 200

// A single 6-armed snowflake crystal (rendered via inline SVG, no defs needed)
function SnowflakeIcon({ detailed }) {
  return (
    <svg viewBox="-10 -10 20 20" width="100%" height="100%">
      <g stroke="#ffffff" strokeWidth={detailed ? 0.75 : 1.1} strokeLinecap="round" fill="none">
        {[0, 60, 120, 180, 240, 300].map((angle) => (
          <g key={angle} transform={`rotate(${angle})`}>
            <line x1="0" y1="0" x2="0" y2="-9" />
            {detailed && (
              <>
                {/* tip branches */}
                <line x1="0" y1="-7" x2="-1.8" y2="-9" />
                <line x1="0" y1="-7" x2="1.8" y2="-9" />
                {/* mid branches */}
                <line x1="0" y1="-4" x2="-1.3" y2="-5.5" />
                <line x1="0" y1="-4" x2="1.3" y2="-5.5" />
                {/* inner tiny branches */}
                <line x1="0" y1="-1.5" x2="-0.8" y2="-2.5" />
                <line x1="0" y1="-1.5" x2="0.8" y2="-2.5" />
              </>
            )}
          </g>
        ))}
        {detailed && <circle cx="0" cy="0" r="0.7" fill="#ffffff" stroke="none" />}
      </g>
    </svg>
  )
}

export default function Snow() {
  const containerRef = useRef(null)
  const mouseRef = useRef({ x: -9999, y: -9999 })
  const flakesRef = useRef([])
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const flakes = useMemo(
    () =>
      Array.from({ length: NUM_FLAKES }, () => {
        const size = 5 + Math.random() * 11 // 5..16
        return {
          x: Math.random() * 100,
          y: Math.random() * -120 - 5,
          vx: -0.04 + Math.random() * 0.08,
          vy: 0.05 + Math.random() * 0.13,
          rotation: Math.random() * 360,
          rotationSpeed: -1.6 + Math.random() * 3.2,
          size,
          opacity: 0.55 + Math.random() * 0.45,
          sway: Math.random() * Math.PI * 2,
          swaySpeed: 0.008 + Math.random() * 0.024,
          swayAmp: 0.12 + Math.random() * 0.24,
          detailed: size > 8, // bigger flakes get full crystal detail
        }
      }),
    []
  )

  // Cursor tracking in container-local coords
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

  // raf animation loop with cursor-avoidance
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

        for (let i = 0; i < flakes.length; i++) {
          const f = flakes[i]
          f.sway += f.swaySpeed * dt
          const swayX = Math.sin(f.sway) * f.swayAmp
          f.x += (f.vx + swayX) * dt
          f.y += f.vy * dt
          f.rotation += f.rotationSpeed * dt

          let px = (f.x / 100) * w
          let py = (f.y / 100) * h

          const dx = px - mx
          const dy = py - my
          const d2 = dx * dx + dy * dy
          if (d2 < REPEL_RADIUS * REPEL_RADIUS && d2 > 1) {
            const d = Math.sqrt(d2)
            const force = (REPEL_RADIUS - d) / REPEL_RADIUS
            const push = force * REPEL_STRENGTH * dt
            px += (dx / d) * push
            py += (dy / d) * push
            f.x = (px / w) * 100
            f.y = (py / h) * 100
          }

          if (f.y > 115) {
            f.y = -10
            f.x = Math.random() * 100
          }
          if (f.x > 112) f.x = -8
          if (f.x < -12) f.x = 110

          const node = flakesRef.current[i]
          if (node) {
            const nx = (f.x / 100) * w
            const ny = (f.y / 100) * h
            node.style.transform = `translate3d(${nx}px, ${ny}px, 0) rotate(${f.rotation}deg)`
          }
        }
      }
      rafId = requestAnimationFrame(tick)
    }
    rafId = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafId)
  }, [flakes])

  if (!mounted) return null

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-none overflow-hidden z-[4]"
      aria-hidden
    >
      {flakes.map((f, i) => (
        <div
          key={i}
          ref={(el) => (flakesRef.current[i] = el)}
          className="absolute"
          style={{
            width: `${f.size}px`,
            height: `${f.size}px`,
            top: 0,
            left: 0,
            opacity: f.opacity,
            willChange: 'transform',
            filter: 'drop-shadow(0 0 2px rgba(255,255,255,0.7))',
          }}
        >
          <SnowflakeIcon detailed={f.detailed} />
        </div>
      ))}
    </div>
  )
}
