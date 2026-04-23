"use client"

import { useRef, Suspense, useEffect } from "react"
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
  
  const toothGltf = useGLTF('/models/dental-crown.glb')
  const scalerGltf = useGLTF('/models/perio-scaler.glb')

  const scalerRef = useRef<THREE.Group>(null)
  const calculusGroupRef = useRef<THREE.Group>(null)
  const gumRef = useRef<THREE.Mesh>(null)

  // Memory Optimization: Dispose of AI textures
  useEffect(() => {
    toothGltf.scene.traverse((child) => {
      if (child instanceof THREE.Mesh && child.material.map) {
        child.material.map.dispose()
      }
    })
  }, [toothGltf])

  useGSAP(() => {
    if (!scrollContainerRef.current || !scalerRef.current || !calculusGroupRef.current) return
    gsap.ticker.add(() => invalidate())

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: scrollContainerRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: 1,
        onUpdate: () => invalidate(),
      },
    })

    // Adjusted coordinates to match the new 5.0 Tooth Scale
    tl.to(scalerRef.current.position, { x: -1.5, y: 0.8, z: 1.8, duration: 2, ease: "sine.inOut" }, 0)
    tl.to(scalerRef.current.rotation, { z: -Math.PI / 6, duration: 2 }, 0)

    calculusGroupRef.current.children.forEach((child, i) => {
      tl.to(child.scale, { x: 0, y: 0, z: 0, duration: 0.5 }, i * 0.4)
    })

    if (gumRef.current) {
      tl.to((gumRef.current.material as THREE.MeshStandardMaterial).color, {
        r: 1, g: 0.75, b: 0.8, 
        duration: 2
      }, 0.5)
    }

    return () => gsap.ticker.remove(() => invalidate())
  }, [scrollContainerRef])

  return (
    <>
      <Environment preset="studio" />
      
      {/* SCALED UP TOOTH: 5.0 */}
      <primitive object={toothGltf.scene} scale={5.0} position={[0, -1, 0]}>
         <meshPhysicalMaterial attach="material" color="#ffffff" roughness={0.1} />
      </primitive>

      <mesh ref={gumRef} position={[0, -2.5, 0.5]}>
        <boxGeometry args={[5, 2, 3]} />
        <meshStandardMaterial color="#d64545" roughness={0.3} /> 
      </mesh>

      {/* SCALED DOWN & THINNED SCALER */}
      <primitive object={scalerGltf.scene} ref={scalerRef} position={[3, 4, 2]} scale={[0.8, 1.5, 0.8]}>
        <meshStandardMaterial attach="material" color="#bdc3c7" metalness={1} roughness={0.1} />
      </primitive>

      {/* Adjusted Calculus to sit on the larger tooth */}
      <group ref={calculusGroupRef}>
        <mesh position={[0.8, -1.2, 1.2]}><sphereGeometry args={[0.25]} /><meshStandardMaterial color="#c2a378" /></mesh>
        <mesh position={[0, -1.4, 1.4]}><sphereGeometry args={[0.3]} /><meshStandardMaterial color="#b39164" /></mesh>
        <mesh position={[-0.8, -1.3, 1.3]}><sphereGeometry args={[0.22]} /><meshStandardMaterial color="#c2a378" /></mesh>
      </group>

      <ContactShadows position={[0, -3.5, 0]} opacity={0.4} scale={12} blur={2} frames={1} />
    </>
  )
}

export function PerioReversalScene() {
  const containerRef = useRef<HTMLDivElement>(null)
  return (
    <WebGLErrorBoundary fallback={<div className="h-full w-full bg-slate-50 flex items-center justify-center">Loading Treatment View...</div>}>
      <div ref={containerRef} className="relative w-full">
        <div className="sticky top-0 h-[100dvh] w-full lg:w-1/2 lg:float-right right-0 z-0 overflow-hidden pointer-events-none">
          <Canvas frameloop="demand" dpr={[1, 2]} gl={{ toneMapping: THREE.LinearToneMapping }}>
            <PerspectiveCamera makeDefault position={[0, 2, 12]} fov={35} />
            <Suspense fallback={<SceneLoader />}>
              <InnerScene scrollContainerRef={containerRef} />
            </Suspense>
          </Canvas>
        </div>
        <div className="relative z-10 w-full lg:w-1/2 pointer-events-none -mt-[100dvh] lg:mt-0">
          <div className="min-h-[100dvh] flex flex-col justify-center px-8 pt-[40vh] lg:pt-0">
            <div className="bg-white/90 backdrop-blur-md p-8 rounded-xl border shadow-xl pointer-events-auto max-w-md">
              <h3 className="text-2xl font-bold mb-4 text-red-600">Active Infection</h3>
              <p>Hardened calculus (tartar) below the gumline causes inflammation and bone loss.</p>
            </div>
          </div>
          <div className="min-h-[100dvh] flex flex-col justify-center px-8">
            <div className="bg-white/90 backdrop-blur-md p-8 rounded-xl border shadow-xl pointer-events-auto max-w-md">
              <h3 className="text-2xl font-bold mb-4 text-green-600">Guided Healing</h3>
              <p>Precise scaling and root planing removes bacteria, allowing gums to reattach and heal.</p>
            </div>
          </div>
        </div>
      </div>
    </WebGLErrorBoundary>
  )
}

useGLTF.preload('/models/perio-scaler.glb')
useGLTF.preload('/models/dental-crown.glb')