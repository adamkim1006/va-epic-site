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

function InnerScene({ scrollContainerRef }: { scrollContainerRef: React.RefObject<HTMLDivElement | null> }) {
  const { camera } = useThree()
  const toothGltf = useGLTF("/models/dental-crown.glb")
  const scalerGltf = useGLTF("/models/perio-scaler.glb")

  const stageRef = useRef<THREE.Group>(null)
  const scalerRef = useRef<THREE.Group>(null)
  const calculusGroupRef = useRef<THREE.Group>(null)
  const gumRef = useRef<THREE.Mesh>(null)
  const cameraTargetRef = useRef<THREE.Group>(null)
  const lookAtTarget = useMemo(() => new THREE.Vector3(), [])

  useFrame((_, delta) => {
    if (stageRef.current) {
      stageRef.current.rotation.y += delta * 0.05
    }

    if (cameraTargetRef.current) {
      camera.lookAt(cameraTargetRef.current.getWorldPosition(lookAtTarget))
    }
  })

  const toothModel = useMemo(() => {
    const clone = cloneScene(toothGltf.scene)
    replaceSceneMaterials(
      clone,
      () =>
        new THREE.MeshPhysicalMaterial({
          color: "#fbfbfc",
          roughness: 0.08,
          clearcoat: 1,
        })
    )
    normalizeSceneToHeight(clone, 1.25)
    return clone
  }, [toothGltf.scene])

  const scalerModel = useMemo(() => {
    const clone = cloneScene(scalerGltf.scene)
    replaceSceneMaterials(
      clone,
      () =>
        new THREE.MeshPhysicalMaterial({
          color: "#b8c1cb",
          metalness: 1,
          roughness: 0.16,
        })
    )
    normalizeSceneToHeight(clone, 0.72)
    return clone
  }, [scalerGltf.scene])

  useGSAP(() => {
    if (
      !scrollContainerRef.current ||
      !scalerRef.current ||
      !calculusGroupRef.current ||
      !cameraTargetRef.current
    ) {
      return
    }

    gsap.set(camera.position, { x: 0.25, y: 0.6, z: 4.8 })
    gsap.set(cameraTargetRef.current.position, { x: 0, y: -0.24, z: 0.18 })

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: scrollContainerRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: 1,
      },
    })

    tl.to(
      scalerRef.current.position,
      { x: -0.35, y: 0.02, z: 0.42, duration: 2, ease: "sine.inOut" },
      0
    )
    tl.to(
      scalerRef.current.rotation,
      { x: 0.15, y: 0.1, z: -Math.PI / 6, duration: 2 },
      0
    )

    calculusGroupRef.current.children.forEach((child, i) => {
      tl.to(child.scale, { x: 0, y: 0, z: 0, duration: 0.5 }, i * 0.4)
    })

    if (gumRef.current) {
      tl.to((gumRef.current.material as THREE.MeshStandardMaterial).color, {
        r: 1, g: 0.75, b: 0.8, 
        duration: 2
      }, 0.5)
    }

    tl.to(
      camera.position,
      { x: -0.08, y: 0.58, z: 4.05, duration: 2, ease: "power2.inOut" },
      0
    )
    tl.to(
      cameraTargetRef.current.position,
      { x: -0.08, y: -0.28, z: 0.22, duration: 2, ease: "power2.inOut" },
      0
    )
    tl.to(
      camera,
      {
        fov: 31,
        duration: 2,
        ease: "power2.inOut",
        onUpdate: () => camera.updateProjectionMatrix(),
      },
      0
    )
  }, [scrollContainerRef])

  return (
    <>
      <GSAPInvalidator />
      <Environment preset="studio" />
      <fog attach="fog" args={["#f7fbfd", 6, 14]} />
      <directionalLight position={[6, 8, 9]} intensity={1.6} />
      <ambientLight intensity={0.4} />
      <pointLight position={[-4, 4, 6]} intensity={0.9} color="#7dd3fc" />
      <pointLight position={[3, 7, -3]} intensity={0.9} color="#ffffff" />

      <group ref={stageRef}>
        <primitive object={toothModel} position={[0, -0.28, 0]} />

        <mesh ref={gumRef} position={[0, -0.82, 0.16]}>
          <boxGeometry args={[1.5, 0.64, 0.94]} />
          <meshStandardMaterial color="#d64545" roughness={0.3} /> 
        </mesh>

        <primitive object={scalerModel} ref={scalerRef} position={[0.92, 0.92, 0.62]} rotation={[0, 0, -0.12]} />

        <group ref={calculusGroupRef}>
          <mesh position={[0.18, -0.36, 0.3]}><sphereGeometry args={[0.06]} /><meshStandardMaterial color="#c2a378" /></mesh>
          <mesh position={[0, -0.42, 0.34]}><sphereGeometry args={[0.07]} /><meshStandardMaterial color="#b39164" /></mesh>
          <mesh position={[-0.18, -0.38, 0.32]}><sphereGeometry args={[0.06]} /><meshStandardMaterial color="#c2a378" /></mesh>
        </group>
      </group>
      <group ref={cameraTargetRef} />

      <ContactShadows position={[0, -1.12, 0]} opacity={0.35} scale={3.2} blur={1.7} frames={1} />
    </>
  )
}

export function PerioReversalScene() {
  const containerRef = useRef<HTMLDivElement>(null)
  return (
    <WebGLErrorBoundary fallback={<div className="h-full w-full bg-slate-50 flex items-center justify-center">Loading Treatment View...</div>}>
      <div ref={containerRef} className="relative w-full">
        <div className="sticky top-0 h-[100dvh] w-full lg:w-1/2 lg:float-right right-0 z-0 overflow-hidden pointer-events-none">
          <Canvas frameloop="demand" dpr={[1, 1.5]} gl={{ powerPreference: "high-performance", toneMapping: THREE.LinearToneMapping }}>
            <PerspectiveCamera makeDefault position={[0, 0.6, 4.8]} fov={33} />
            <Suspense fallback={<SceneLoader />}>
              <InnerScene scrollContainerRef={containerRef} />
            </Suspense>
          </Canvas>
          <ScrollHint containerRef={containerRef} />
        </div>
        <div className="relative z-10 w-full lg:w-1/2 pointer-events-none -mt-[100dvh] lg:mt-0">
          <div className="min-h-[100dvh] flex flex-col justify-center px-8 pt-[40vh] lg:pt-0">
            <div className="max-w-md rounded-xl border bg-white/90 p-8 shadow-xl backdrop-blur-md pointer-events-auto dark:border-white/10 dark:bg-slate-950/76 dark:shadow-[0_24px_60px_-32px_rgba(0,0,0,0.88)]">
              <h3 className="mb-4 text-2xl font-bold text-red-600 dark:text-rose-300">Active Infection</h3>
              <p className="text-slate-700 dark:text-slate-300">Hardened calculus (tartar) below the gumline causes inflammation and bone loss.</p>
            </div>
          </div>
          <div className="min-h-[100dvh] flex flex-col justify-center px-8">
            <div className="max-w-md rounded-xl border bg-white/90 p-8 shadow-xl backdrop-blur-md pointer-events-auto dark:border-white/10 dark:bg-slate-950/76 dark:shadow-[0_24px_60px_-32px_rgba(0,0,0,0.88)]">
              <h3 className="mb-4 text-2xl font-bold text-green-600 dark:text-emerald-300">Guided Healing</h3>
              <p className="text-slate-700 dark:text-slate-300">Precise scaling and root planing removes bacteria, allowing gums to reattach and heal.</p>
            </div>
          </div>
        </div>
      </div>
    </WebGLErrorBoundary>
  )
}

useGLTF.preload("/models/perio-scaler.glb")
useGLTF.preload("/models/dental-crown.glb")
