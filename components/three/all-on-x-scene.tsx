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
  const archGltf = useGLTF("/models/all-on-x-arch.glb")
  const screwGltf = useGLTF("/models/implant-screw.glb")

  const stageRef = useRef<THREE.Group>(null)
  const archRef = useRef<THREE.Group>(null)
  const implantsGroupRef = useRef<THREE.Group>(null)
  const cameraTargetRef = useRef<THREE.Group>(null)
  const lookAtTarget = useMemo(() => new THREE.Vector3(), [])

  useFrame((_, delta) => {
    if (stageRef.current) {
      stageRef.current.rotation.y += delta * 0.04
    }

    if (cameraTargetRef.current) {
      camera.lookAt(cameraTargetRef.current.getWorldPosition(lookAtTarget))
    }
  })

  const archModel = useMemo(() => {
    const clone = cloneScene(archGltf.scene)
    replaceSceneMaterials(
      clone,
      () =>
        new THREE.MeshPhysicalMaterial({
          color: "#fbfbfc",
          roughness: 0.08,
          clearcoat: 0.9,
          metalness: 0.02,
        })
    )
    normalizeSceneToHeight(clone, 1.28)
    clone.rotation.x = -0.12
    return clone
  }, [archGltf.scene])

  const screwClones = useMemo(
    () =>
      Array.from({ length: 4 }, () => {
        const clone = cloneScene(screwGltf.scene)
        replaceSceneMaterials(
          clone,
          () =>
            new THREE.MeshPhysicalMaterial({
              color: "#99a6b6",
              metalness: 1,
              roughness: 0.2,
            })
        )
        normalizeSceneToHeight(clone, 0.42)
        return clone
      }),
    [screwGltf.scene]
  )

  useGSAP(() => {
    if (
      !scrollContainerRef.current ||
      !archRef.current ||
      !implantsGroupRef.current ||
      !cameraTargetRef.current
    ) {
      return
    }

    gsap.set(implantsGroupRef.current.position, { y: 1.9 })
    gsap.set(archRef.current.position, { y: 2.35, z: 0.08 })
    gsap.set(archRef.current.rotation, { x: -0.35, y: 0.25, z: 0 })
    gsap.set(camera.position, { x: 0.22, y: 1.15, z: 5.3 })
    gsap.set(cameraTargetRef.current.position, { x: 0, y: 0.22, z: 0 })

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: scrollContainerRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: 1,
      },
    })

    tl.to(
      implantsGroupRef.current.position,
      { y: -0.03, duration: 1.35, ease: "power2.inOut" },
      0
    )
    tl.to(
      archRef.current.position,
      { y: 0.42, z: 0, duration: 1, ease: "back.out(1.1)" },
      0.95
    )
    tl.to(
      archRef.current.rotation,
      { x: -0.08, y: 0.05, z: 0, duration: 1 },
      0.95
    )
    tl.to(
      camera.position,
      { x: 0.08, y: 1.25, z: 4.7, duration: 1.8, ease: "power2.inOut" },
      0.2
    )
    tl.to(
      cameraTargetRef.current.position,
      { x: 0, y: 0.18, z: -0.05, duration: 1.8, ease: "power2.inOut" },
      0.2
    )
    tl.to(
      camera,
      {
        fov: 45,
        duration: 1.8,
        ease: "power2.inOut",
        onUpdate: () => camera.updateProjectionMatrix(),
      },
      0.2
    )
  }, [scrollContainerRef])

  return (
    <>
      <GSAPInvalidator />
      <Environment preset="studio" />
      <fog attach="fog" args={["#eef8fd", 7, 16]} />
      <directionalLight position={[8, 10, 8]} intensity={1.8} />
      <ambientLight intensity={0.4} />
      <pointLight position={[-7, 4, 5]} intensity={1.1} color="#93c5fd" />
      <pointLight position={[5, 8, -4]} intensity={0.8} color="#ffffff" />

      <group ref={stageRef}>
        <primitive object={archModel} ref={archRef} />

        <group ref={implantsGroupRef}>
          <primitive object={screwClones[0]} position={[-0.48, 0, 0.26]} rotation={[0.08, 0, 0.22]} />
          <primitive object={screwClones[1]} position={[0.48, 0, 0.26]} rotation={[0.08, 0, -0.22]} />
          <primitive object={screwClones[2]} position={[-0.24, 0, -0.3]} rotation={[0.18, 0, 0.12]} />
          <primitive object={screwClones[3]} position={[0.24, 0, -0.3]} rotation={[0.18, 0, -0.12]} />
        </group>
      </group>
      <group ref={cameraTargetRef} />

      <mesh position={[0, -0.56, 0]}>
        <boxGeometry args={[2.2, 1.2, 1.7]} />
        <meshPhysicalMaterial
          color="#f2ece5"
          transmission={0.1}
          thickness={2.2}
          transparent
          opacity={0.7}
          roughness={0.48}
        />
      </mesh>

      <ContactShadows position={[0, -1.2, 0]} opacity={0.3} scale={4.4} blur={2.4} frames={1} />
    </>
  )
}

export function AllOnXScene() {
  const containerRef = useRef<HTMLDivElement>(null)
  return (
    <WebGLErrorBoundary fallback={<div className="h-full w-full bg-slate-50 flex items-center justify-center">Loading All-on-X...</div>}>
      <div ref={containerRef} className="relative w-full">
        <div className="sticky top-0 h-[100dvh] w-full lg:w-1/2 lg:float-right right-0 z-0 overflow-hidden pointer-events-none">
          <Canvas frameloop="demand" dpr={[1, 1.5]} gl={{ powerPreference: "high-performance", toneMapping: THREE.LinearToneMapping }}>
            <PerspectiveCamera makeDefault position={[0, 1.15, 5.3]} fov={46} />
            <Suspense fallback={<SceneLoader />}>
              <InnerScene scrollContainerRef={containerRef} />
            </Suspense>
          </Canvas>
          <ScrollHint containerRef={containerRef} />
        </div>
        <div className="relative z-10 w-full lg:w-1/2 pointer-events-none -mt-[100dvh] lg:mt-0">
          <div className="min-h-[100dvh] flex flex-col justify-center px-8 pt-[40vh] lg:pt-0">
            <div className="max-w-md rounded-xl border bg-white/90 p-8 shadow-xl backdrop-blur-md pointer-events-auto dark:border-white/10 dark:bg-slate-950/76 dark:shadow-[0_24px_60px_-32px_rgba(0,0,0,0.88)]">
              <h3 className="mb-4 text-2xl font-bold dark:text-slate-50">Strategic Placement</h3>
              <p className="text-slate-700 dark:text-slate-300">Four precision implants are tilted and positioned to maximize existing bone density.</p>
            </div>
          </div>
          <div className="min-h-[100dvh] flex flex-col justify-center px-8">
            <div className="max-w-md rounded-xl border bg-white/90 p-8 shadow-xl backdrop-blur-md pointer-events-auto dark:border-white/10 dark:bg-slate-950/76 dark:shadow-[0_24px_60px_-32px_rgba(0,0,0,0.88)]">
              <h3 className="mb-4 text-2xl font-bold dark:text-slate-50">Immediate Function</h3>
              <p className="text-slate-700 dark:text-slate-300">A full-arch bridge is secured to the implants, restoring your smile in a single day.</p>
            </div>
          </div>
        </div>
      </div>
    </WebGLErrorBoundary>
  )
}

useGLTF.preload("/models/all-on-x-arch.glb")
useGLTF.preload("/models/implant-screw.glb")
