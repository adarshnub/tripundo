'use client'

import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Sphere, Stars, Line } from '@react-three/drei'
import * as THREE from 'three'
import { CITIES, ROUTES, latLngToVec3 } from '@/lib/cities'

const ARC_COLORS = ['#22d3ee', '#a855f7', '#ec4899', '#f59e0b', '#34d399', '#60a5fa']

function ArcRoute({ from, to, color, speed, offset }) {
  const { curve, points } = useMemo(() => {
    const start = new THREE.Vector3(...latLngToVec3(from.lat, from.lng, 2))
    const end = new THREE.Vector3(...latLngToVec3(to.lat, to.lng, 2))
    const mid = start.clone().add(end).multiplyScalar(0.5)
    const dist = start.distanceTo(end)
    mid.normalize().multiplyScalar(2 + Math.min(dist * 0.45, 1.4))
    const c = new THREE.QuadraticBezierCurve3(start, mid, end)
    return { curve: c, points: c.getPoints(64) }
  }, [from, to])

  const cometRef = useRef()
  useFrame(({ clock }) => {
    const t = (clock.elapsedTime * speed + offset) % 1
    if (cometRef.current) {
      const p = curve.getPoint(t)
      cometRef.current.position.set(p.x, p.y, p.z)
      const scale = 0.6 + Math.sin(t * Math.PI) * 0.6
      cometRef.current.scale.setScalar(scale)
    }
  })

  return (
    <group>
      <Line points={points} color={color} lineWidth={1} transparent opacity={0.55} />
      <mesh ref={cometRef}>
        <sphereGeometry args={[0.03, 12, 12]} />
        <meshBasicMaterial color={color} toneMapped={false} />
      </mesh>
    </group>
  )
}

function CityDot({ city }) {
  const pos = latLngToVec3(city.lat, city.lng, 2)
  const pulseRef = useRef()
  useFrame(({ clock }) => {
    if (pulseRef.current) {
      const s = 1 + Math.sin(clock.elapsedTime * 2 + pos[0]) * 0.25
      pulseRef.current.scale.setScalar(s)
    }
  })
  return (
    <group position={pos}>
      <mesh>
        <sphereGeometry args={[0.035, 16, 16]} />
        <meshBasicMaterial color="#67e8f9" toneMapped={false} />
      </mesh>
      <mesh ref={pulseRef}>
        <sphereGeometry args={[0.065, 16, 16]} />
        <meshBasicMaterial color="#22d3ee" transparent opacity={0.25} toneMapped={false} />
      </mesh>
    </group>
  )
}

function Earth() {
  const ref = useRef()
  useFrame((_, dt) => {
    if (ref.current) ref.current.rotation.y += dt * 0.06
  })
  return (
    <group ref={ref}>
      <Sphere args={[1.98, 64, 64]}>
        <meshStandardMaterial color="#0b1430" metalness={0.3} roughness={0.85} />
      </Sphere>
      <Sphere args={[2.001, 48, 48]}>
        <meshBasicMaterial color="#22d3ee" wireframe transparent opacity={0.08} />
      </Sphere>
      <Sphere args={[2.08, 32, 32]}>
        <meshBasicMaterial color="#a855f7" transparent opacity={0.05} side={THREE.BackSide} />
      </Sphere>
      {CITIES.map((c) => (
        <CityDot key={c.name} city={c} />
      ))}
      {ROUTES.map(([a, b], i) => {
        const from = CITIES.find((c) => c.name === a)
        const to = CITIES.find((c) => c.name === b)
        if (!from || !to) return null
        return (
          <ArcRoute
            key={i}
            from={from}
            to={to}
            color={ARC_COLORS[i % ARC_COLORS.length]}
            speed={0.12 + (i % 5) * 0.04}
            offset={(i * 0.137) % 1}
          />
        )
      })}
    </group>
  )
}

export default function Globe3D() {
  return (
    <Canvas
      dpr={[1, 1.6]}
      camera={{ position: [0, 0.4, 5.5], fov: 50 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
    >
      <color attach="background" args={['#050816']} />
      <ambientLight intensity={0.55} />
      <pointLight position={[5, 5, 5]} intensity={1.2} color="#22d3ee" />
      <pointLight position={[-5, -3, -5]} intensity={0.7} color="#a855f7" />
      <Stars radius={60} depth={50} count={2500} factor={4} fade speed={0.4} />
      <Earth />
      <OrbitControls enableZoom={false} enablePan={false} enableDamping dampingFactor={0.1} rotateSpeed={0.4} />
    </Canvas>
  )
}
