"use client"

import { useRef, useMemo, Suspense, useEffect } from "react"
import { Canvas, useThree } from "@react-three/fiber"
import { Environment, ContactShadows, useGLTF, PerspectiveCamera } from "@react-three/drei"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"
import * as THREE from "three"
import { SceneLoader, WebGLErrorBoundary } from "./three-shared"

gsap.registerPlugin(ScrollTrigger)

function InnerScene({ scrollContainerRef }: { scrollContainerRef: React.RefObject<HTMLDivElement | null> }) {
  const { invalidate } = useThree()
  
  const archGltf = useGLTF('/models/all-on-x-arch.glb')
  const screwGltf = useGLTF('/models/implant-screw.glb')

  const archRef = useRef<THREE.Group>(null)
  const implantsGroupRef = useRef<THREE.Group>(null)

  // Memory Optimization: Dispose of AI textures
  useEffect(() => {
    archGltf.scene.traverse((child) => {
      if (child instanceof THREE.Mesh && child.material.map) {
        child.material.map.dispose()
      }
    })
  }, [archGltf])

  const screwClones = useMemo(() => [
    screwGltf.scene.clone(),
    screwGltf.scene.clone(),
    screwGltf.scene.clone(),
    screwGltf.scene.clone()
  ], [screwGltf])

  useGSAP(() => {
    if (!scrollContainerRef.current || !archRef.current || !implantsGroupRef.current) return
    gsap.ticker.add(() => invalidate())

    gsap.set(implantsGroupRef.current.position, { y: 8 })
    gsap.set(archRef.current.position, { y: 12, opacity: 0 })

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: scrollContainerRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: 1,
        onUpdate: () => invalidate(),
      },
    })

    tl.to(implantsGroupRef.current.position, { y: -0.5, duration: 1.5, ease: "power2.inOut" }, 0)
    // Adjusted y-target to match the new larger arch scale
    tl.to(archRef.current.position, { y: 2.2, duration: 1, ease: "back.out(1.2)" }, 1)

    return () => gsap.ticker.remove(() => invalidate())
  }, [scrollContainerRef])

  return (
    <>
      <Environment preset="studio" />
      
      {/* SCALED UP ARCH: 7.5 */}
      <primitive object={archGltf.scene} ref={archRef} scale={7.5}>
        <meshStandardMaterial attach="material" color="#ffffff" roughness={0.1} metalness={0.05} />
      </primitive>
      
      <group ref={implantsGroupRef}>
        {/* SCALED DOWN SCREWS: 1.2, spaced out further to match 7.5 Arch */}
        <primitive object={screwClones[0]} position={[-3.5, 0, 1.5]} scale={1.2} rotation={[0, 0, 0.2]} />
        <primitive object={screwClones[1]} position={[3.5, 0, 1.5]} scale={1.2} rotation={[0, 0, -0.2]} />
        <primitive object={screwClones[2]} position={[-1.8, 0, -2.0]} scale={1.2} rotation={[0.1, 0, 0.1]} />
        <primitive object={screwClones[3]} position={[1.8, 0, -2.0]} scale={1.2} rotation={[0.1, 0, -0.1]} />
      </group>

      <mesh position={[0, -2, 0]}>
        <boxGeometry args={[10, 5, 7]} />
        <meshPhysicalMaterial color="#f0f4f8" transmission={0.7} thickness={3} transparent opacity={0.5} />
      </mesh>

      <ContactShadows position={[0, -4, 0]} opacity={0.3} scale={20} blur={3} frames={1} />
    </>
  )
}

export function AllOnXScene() {
  const containerRef = useRef<HTMLDivElement>(null)
  return (
    <WebGLErrorBoundary fallback={<div className="h-full w-full bg-slate-50 flex items-center justify-center">Loading All-on-X...</div>}>
      <div ref={containerRef} className="relative w-full">
        <div className="sticky top-0 h-[100dvh] w-full lg:w-1/2 lg:float-right right-0 z-0 overflow-hidden pointer-events-none">
          <Canvas frameloop="demand" dpr={[1, 2]} gl={{ toneMapping: THREE.LinearToneMapping }}>
            <PerspectiveCamera makeDefault position={[0, 4, 18]} fov={40} />
            <Suspense fallback={<SceneLoader />}>
              <InnerScene scrollContainerRef={containerRef} />
            </Suspense>
          </Canvas>
        </div>
        <div className="relative z-10 w-full lg:w-1/2 pointer-events-none -mt-[100dvh] lg:mt-0">
          <div className="min-h-[100dvh] flex flex-col justify-center px-8 pt-[40vh] lg:pt-0">
            <div className="bg-white/90 backdrop-blur-md p-8 rounded-xl border shadow-xl pointer-events-auto max-w-md">
              <h3 className="text-2xl font-bold mb-4">Strategic Placement</h3>
              <p>Four precision implants are tilted and positioned to maximize existing bone density.</p>
            </div>
          </div>
          <div className="min-h-[100dvh] flex flex-col justify-center px-8">
            <div className="bg-white/90 backdrop-blur-md p-8 rounded-xl border shadow-xl pointer-events-auto max-w-md">
              <h3 className="text-2xl font-bold mb-4">Immediate Function</h3>
              <p>A full-arch bridge is secured to the implants, restoring your smile in a single day.</p>
            </div>
          </div>
        </div>
      </div>
    </WebGLErrorBoundary>
  )
}

useGLTF.preload('/models/all-on-x-arch.glb')
useGLTF.preload('/models/implant-screw.glb')