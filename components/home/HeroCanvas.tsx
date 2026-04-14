"use client"

import React, { Suspense, useRef, useEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { OrbitControls, Environment, ContactShadows, PerspectiveCamera, Float, Preload } from '@react-three/drei'
import { usePathname } from 'next/navigation'
import ScrollTrigger from 'gsap/ScrollTrigger'
import * as THREE from 'three'
import CreamModel from '../models/CreamModel'
import CreamModelClosed from '../models/CreamModelClosed'

interface RigProps {
  children: React.ReactNode
}

function Rig({ children }: RigProps) {
  const group = useRef<THREE.Group>(null!)
  useFrame((state) => {
    const { mouse } = state
    // Position Parallax (Subtle move on X & Y)
    group.current.position.x = THREE.MathUtils.lerp(group.current.position.x, mouse.x * 0.05, 0.1)
    group.current.position.y = THREE.MathUtils.lerp(group.current.position.y, (mouse.y * 0.05) - 1, 0.1)

    // Rotation Parallax (Tilt towards cursor)
    group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, (mouse.x * Math.PI) / 40 - (Math.PI / 3), 0.1)
    group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, (mouse.y * Math.PI) / 40, 0.1)
  })
  return <group ref={group}>{children}</group>
}

const HeroCanvas = () => {
  const pathname = usePathname()

  useEffect(() => {
    // Ensure ScrollTrigger refreshes after the 3D context has had a moment to initialize
    const timer = setTimeout(() => {
      ScrollTrigger.refresh()
    }, 500)
    return () => clearTimeout(timer)
  }, [pathname])

  return (
    <div className="w-full h-full relative">
      <Canvas
        key={pathname} // 🔥 Force fresh mount on navigation to prevent context loss
        shadows
        dpr={[1, 2]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance" // Ensure priority for hero model
        }}
      >
        <Suspense fallback={null}>
          <PerspectiveCamera makeDefault position={[0, 0.5, 6]} fov={30} />

          <ambientLight intensity={2} />
          <directionalLight position={[5, 10, 5]} intensity={1.2} />
          <Environment preset="city" environmentIntensity={0.5} />

          <Rig>
            <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1}>
              <CreamModel scale={0.7} rotation={[0, (Math.PI / 2) + 0.1, 0]} />
            </Float>

            <ContactShadows
              opacity={0.3}
              scale={12}
              blur={2.5}
              far={4.5}
              position={[0, -0.01, 0]}
            />
          </Rig>

          <OrbitControls
            enableZoom={false}
            enablePan={false}
            minPolarAngle={Math.PI / 3}
            maxPolarAngle={Math.PI / 1.5}
          />
          <Preload all />
        </Suspense>
      </Canvas>
    </div>
  )
}

export default HeroCanvas
