"use client"

import { useRef, useEffect, Suspense } from "react"
import { Canvas, useThree } from "@react-three/fiber"
import { Environment, ContactShadows, useGLTF, PerspectiveCamera } from "@react-three/drei"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"
import * as THREE from "three"
import { SceneLoader, WebGLErrorBoundary } from "./three-shared"

gsap.registerPlugin(ScrollTrigger)

interface InnerSceneProps {
  scrollContainerRef: React.RefObject<HTMLDivElement | null>;
}

function InnerScene({ scrollContainerRef }: InnerSceneProps) {
  const { invalidate } = useThree()
  
  // 1. Load your new optimized models
  const screwGltf = useGLTF('/models/implant-screw.glb')
  const abutmentGltf = useGLTF('/models/implant-abutment.glb')
  const crownGltf = useGLTF('/models/dental-crown.glb')

  const implantRef = useRef<THREE.Group>(null)
  const abutmentRef = useRef<THREE.Group>(null)
  const crownRef = useRef<THREE.Group>(null)

  useGSAP(() => {
    if (!scrollContainerRef.current || !implantRef.current || !abutmentRef.current || !crownRef.current) return

    gsap.ticker.add(invalidate)

    // PHASE 4: Initial Setup for the real models
    // We set them high up so they can "fly in" during scroll
    gsap.set(implantRef.current.position, { y: 6, opacity: 0 })
    gsap.set(abutmentRef.current.position, { y: 8 })
    gsap.set(crownRef.current.position, { y: 10 })

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: scrollContainerRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: 1,
        onUpdate: () => invalidate(),
      },
    })

    // Animation Sequence
    tl.to(implantRef.current.position, { y: -0.5, duration: 1, ease: "power2.inOut" }, 0)
    tl.to(implantRef.current.rotation, { y: Math.PI * 6, duration: 1 }, 0) // Spinning screw effect
    
    tl.to(abutmentRef.current.position, { y: 1.1, duration: 1, ease: "back.out(1.2)" }, 0.8)
    
    tl.to(crownRef.current.position, { y: 2.4, duration: 1, ease: "back.out(1.5)" }, 1.5)

    return () => gsap.ticker.remove(invalidate)
  }, { dependencies: [scrollContainerRef] })

  return (
    <>
      <Environment preset="studio" intensity={1} />
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1.5} />

      {/* 2. Optimized Implant Screw (Titanium Override) */}
      <primitive 
        object={screwGltf.scene} 
        ref={implantRef} 
        scale={2.8} 
      >
        <meshStandardMaterial attach="material" color="#999999" metalness={1} roughness={0.2} />
      </primitive>

      {/* 3. Optimized Abutment (Gold Override) */}
      <primitive 
        object={abutmentGltf.scene} 
        ref={abutmentRef} 
        scale={3.3}
      >
        <meshStandardMaterial attach="material" color="#d4af37" metalness={0.9} roughness={0.1} />
      </primitive>

      {/* 4. Optimized Crown (Ceramic/Porcelain Override) */}
      <primitive 
        object={crownGltf.scene} 
        ref={crownRef} 
        scale={2.8}
      >
        <meshPhysicalMaterial 
          attach="material" 
          color="#ffffff" 
          roughness={0.1} 
          clearcoat={1} 
          transmission={0.2} 
          thickness={1} 
        />
      </primitive>

      {/* Jawbone placeholder for context */}
      <mesh position={[0, -2.5, 0]}>
        <boxGeometry args={[5, 3, 3]} />
        <meshPhysicalMaterial color="#f8fafc" transmission={0.6} thickness={2} roughness={0.2} />
      </mesh>

      <ContactShadows position={[0, -3.5, 0]} opacity={0.4} scale={10} blur={2.5} frames={1} />
    </>
  )
}

export function ImplantAnatomyScene() {
  const containerRef = useRef<HTMLDivElement>(null)

  return (
    <WebGLErrorBoundary fallback={<div className="h-full w-full bg-slate-50 flex items-center justify-center p-8 text-center">Interactive 3D model loading...</div>}>
      <div ref={containerRef} className="relative w-full overflow-visible">
        <div className="sticky top-0 h-[100dvh] w-full lg:w-1/2 lg:float-right right-0 z-0 overflow-hidden pointer-events-none">
          <Canvas 
            frameloop="demand"
            dpr={[1, 2]}
            gl={{ antialias: true, toneMapping: THREE.LinearToneMapping }}
          >
            <PerspectiveCamera makeDefault position={[0, 2, 10]} fov={35} />
            <Suspense fallback={<SceneLoader />}>
              <InnerScene scrollContainerRef={containerRef} />
            </Suspense>
          </Canvas>
        </div>

        <div className="relative z-10 w-full lg:w-1/2 pointer-events-none -mt-[100dvh] lg:mt-0">
          <div className="min-h-[100dvh] flex flex-col justify-center px-4 md:px-12 pt-[40dvh] lg:pt-0">
            <div className="bg-white/90 backdrop-blur-md rounded-xl p-8 border border-slate-200 max-w-md shadow-xl pointer-events-auto transition-all hover:border-blue-400">
              <p className="text-blue-600 text-sm font-bold tracking-widest uppercase mb-2">Phase 1</p>
              <h3 className="font-display text-3xl font-semibold mb-4 text-slate-900">The Implant</h3>
              <p className="text-slate-600 leading-relaxed">
                A medical-grade titanium post is surgically placed into the jawbone, acting as a sturdy root for your new tooth.
              </p>
            </div>
          </div>

          <div className="min-h-[100dvh] flex flex-col justify-center px-4 md:px-12">
            <div className="bg-white/90 backdrop-blur-md rounded-xl p-8 border border-slate-200 max-w-md shadow-xl pointer-events-auto">
              <p className="text-blue-600 text-sm font-bold tracking-widest uppercase mb-2">Phase 2</p>
              <h3 className="font-display text-3xl font-semibold mb-4 text-slate-900">The Abutment</h3>
              <p className="text-slate-600 leading-relaxed">
                Once the implant has fused with the bone, a connector called an abutment is attached to hold the custom crown.
              </p>
            </div>
          </div>

          <div className="min-h-[100dvh] flex flex-col justify-center px-4 md:px-12 pb-[20dvh]">
            <div className="bg-white/90 backdrop-blur-md rounded-xl p-8 border border-slate-200 max-w-md shadow-xl pointer-events-auto">
              <p className="text-blue-600 text-sm font-bold tracking-widest uppercase mb-2">Phase 3</p>
              <h3 className="font-display text-3xl font-semibold mb-4 text-slate-900">The Crown</h3>
              <p className="text-slate-600 leading-relaxed">
                Finally, a custom-shaded porcelain crown is placed, restoring full function and a natural aesthetic to your smile.
              </p>
            </div>
          </div>
        </div>
        <div className="clear-both" />
      </div>
    </WebGLErrorBoundary>
  )
}

// Preload assets for instant feel
useGLTF.preload('/models/implant-screw.glb')
useGLTF.preload('/models/implant-abutment.glb')
useGLTF.preload('/models/dental-crown.glb')