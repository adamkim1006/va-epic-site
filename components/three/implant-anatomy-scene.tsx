"use client"

import { useMemo, useRef, Suspense } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { ContactShadows, Environment, PerspectiveCamera, useGLTF } from "@react-three/drei"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"
import * as THREE from "three"
import {
  cloneScene,
  GSAPInvalidator,
  normalizeSceneToHeight,
  replaceSceneMaterials,
  SceneLoader,
  ScrollHint,
  WebGLErrorBoundary,
} from "./three-shared"

gsap.registerPlugin(ScrollTrigger)

interface InnerSceneProps {
  scrollContainerRef: React.RefObject<HTMLDivElement | null>
}

function InnerScene({ scrollContainerRef }: InnerSceneProps) {
  const { camera } = useThree()
  const screwGltf = useGLTF("/models/implant-screw.glb")
  const abutmentGltf = useGLTF("/models/implant-abutment.glb")
  const crownGltf = useGLTF("/models/dental-crown.glb")

  const stageRef = useRef<THREE.Group>(null)
  const implantRef = useRef<THREE.Group>(null)
  const abutmentRef = useRef<THREE.Group>(null)
  const crownRef = useRef<THREE.Group>(null)
  const cameraTargetRef = useRef<THREE.Group>(null)
  const lookAtTarget = useMemo(() => new THREE.Vector3(), [])

  useFrame((_, delta) => {
    if (stageRef.current) {
      stageRef.current.rotation.y += delta * 0.06
    }

    if (cameraTargetRef.current) {
      camera.lookAt(cameraTargetRef.current.getWorldPosition(lookAtTarget))
    }
  })

  const screwModel = useMemo(() => {
    const clone = cloneScene(screwGltf.scene)
    replaceSceneMaterials(
      clone,
      () =>
        new THREE.MeshPhysicalMaterial({
          color: "#98a3b3",
          metalness: 1,
          roughness: 0.18,
          clearcoat: 0.2,
        })
    )
    normalizeSceneToHeight(clone, 1.35)
    return clone
  }, [screwGltf.scene])

  const abutmentModel = useMemo(() => {
    const clone = cloneScene(abutmentGltf.scene)
    replaceSceneMaterials(
      clone,
      () =>
        new THREE.MeshPhysicalMaterial({
          color: "#a5b3c2",
          metalness: 1,
          roughness: 0.18,
          clearcoat: 0.24,
        })
    )
    normalizeSceneToHeight(clone, 0.48)
    return clone
  }, [abutmentGltf.scene])

  const crownModel = useMemo(() => {
    const clone = cloneScene(crownGltf.scene)
    replaceSceneMaterials(
      clone,
      () =>
        new THREE.MeshPhysicalMaterial({
          color: "#f8fafc",
          roughness: 0.08,
          clearcoat: 1,
          transmission: 0.08,
          thickness: 0.8,
        })
    )
    normalizeSceneToHeight(clone, 0.82)
    clone.position.y = 0.08
    return clone
  }, [crownGltf.scene])

  useGSAP(() => {
    if (
      !scrollContainerRef.current ||
      !implantRef.current ||
      !abutmentRef.current ||
      !crownRef.current ||
      !cameraTargetRef.current
    ) {
      return
    }

    gsap.set(implantRef.current.position, { x: -0.04, y: 1.6, z: 0 })
    gsap.set(implantRef.current.rotation, { x: -0.35, y: -0.3, z: 0 })
    gsap.set(abutmentRef.current.position, { x: 0, y: 2.05, z: 0.02 })
    gsap.set(abutmentRef.current.rotation, { x: 0.1, y: 0.35, z: 0 })
    gsap.set(crownRef.current.position, { x: 0.02, y: 2.65, z: 0.04 })
    gsap.set(crownRef.current.rotation, { x: -0.05, y: 0.2, z: 0 })
    gsap.set(camera.position, { x: 0.35, y: 0.9, z: 4.8 })
    gsap.set(cameraTargetRef.current.position, { x: 0.04, y: 0.8, z: 0 })

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: scrollContainerRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: 1,
      },
    })

    tl.to(
      implantRef.current.position,
      { x: 0, y: 0, z: 0, duration: 1, ease: "power2.inOut" },
      0
    )
    tl.to(
      implantRef.current.rotation,
      { x: 0, y: Math.PI * 1.4, z: 0, duration: 1 },
      0
    )
    tl.to(
      abutmentRef.current.position,
      { x: 0, y: 0.95, z: 0.02, duration: 0.9, ease: "back.out(1.1)" },
      0.8
    )
    tl.to(
      crownRef.current.position,
      { x: 0, y: 1.52, z: 0.03, duration: 0.9, ease: "back.out(1.2)" },
      1.45
    )
    tl.to(
      camera.position,
      { x: 0.06, y: 1.0, z: 4.1, duration: 2.2, ease: "power2.inOut" },
      0
    )
    tl.to(
      cameraTargetRef.current.position,
      { x: 0, y: 1.05, z: 0, duration: 2.2, ease: "power2.inOut" },
      0
    )
    tl.to(
      camera,
      {
        fov: 28,
        duration: 2.2,
        ease: "power2.inOut",
        onUpdate: () => camera.updateProjectionMatrix(),
      },
      0
    )
  }, { dependencies: [scrollContainerRef] })

  return (
    <>
      <GSAPInvalidator />
      <Environment preset="studio" />
      <fog attach="fog" args={["#edf6fb", 6, 14]} />
      <ambientLight intensity={0.45} />
      <directionalLight position={[6, 8, 10]} intensity={1.8} />
      <pointLight position={[-4, 2, 5]} intensity={1.1} color="#7dd3fc" />
      <pointLight position={[3, 8, -2]} intensity={0.8} color="#f8fafc" />

      <group ref={stageRef}>
        <primitive object={screwModel} ref={implantRef} />
        <primitive object={abutmentModel} ref={abutmentRef} />
        <primitive object={crownModel} ref={crownRef} />
      </group>
      <group ref={cameraTargetRef} />

      <mesh position={[0, -0.7, 0]}>
        <boxGeometry args={[1.65, 0.92, 1.1]} />
        <meshPhysicalMaterial
          color="#f7f3ee"
          transmission={0.15}
          thickness={2}
          roughness={0.42}
          clearcoat={0.05}
        />
      </mesh>

      <ContactShadows position={[0, -1.18, 0]} opacity={0.35} scale={3.2} blur={2} frames={1} />
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
            dpr={[1, 1.5]}
            gl={{ antialias: true, powerPreference: "high-performance", toneMapping: THREE.LinearToneMapping }}
          >
            <PerspectiveCamera makeDefault position={[0, 0.9, 4.8]} fov={32} />
            <Suspense fallback={<SceneLoader />}>
              <InnerScene scrollContainerRef={containerRef} />
            </Suspense>
          </Canvas>
          <ScrollHint containerRef={containerRef} />
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
useGLTF.preload("/models/implant-screw.glb")
useGLTF.preload("/models/implant-abutment.glb")
useGLTF.preload("/models/dental-crown.glb")
