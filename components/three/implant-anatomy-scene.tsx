"use client"

import { useMemo, useRef, Suspense } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { ContactShadows, Environment, PerspectiveCamera, RoundedBox, useGLTF } from "@react-three/drei"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"
import * as THREE from "three"
import {
  cloneScene,
  GSAPInvalidator,
  normalizeSceneToHeight,
  SceneLoader,
  ScrollHint,
  WebGLErrorBoundary,
} from "./three-shared"

gsap.registerPlugin(ScrollTrigger)

const ASSEMBLY_HEIGHT = 2.15
const MODEL_ASSET_VERSION = "2026-04-24-2"
const ASSEMBLY_MODEL_URL = `/models/implant-anatomy-assembled.glb?v=${MODEL_ASSET_VERSION}`
const IMPLANT_START_Y_OFFSET = 1.1
const ABUTMENT_START_Y_OFFSET = 2.35
const CROWN_START_Y_OFFSET = 1.8
const SCENE_Y_OFFSET = -0.42

interface InnerSceneProps {
  scrollContainerRef: React.RefObject<HTMLDivElement | null>
}

interface PreparedAssembly {
  scene: THREE.Object3D
  implant: THREE.Object3D
  abutment: THREE.Object3D
  crown: THREE.Object3D
}

function createAssemblyMaterial(name: string) {
  const lowerName = name.toLowerCase()

  if (lowerName.includes("crown")) {
    return new THREE.MeshPhysicalMaterial({
      color: "#f8fafc",
      roughness: 0.08,
      clearcoat: 1,
      transmission: 0.08,
      thickness: 0.8,
    })
  }

  if (lowerName.includes("abutment")) {
    return new THREE.MeshPhysicalMaterial({
      color: "#a5b3c2",
      metalness: 1,
      roughness: 0.18,
      clearcoat: 0.24,
    })
  }

  return new THREE.MeshPhysicalMaterial({
    color: "#98a3b3",
    metalness: 1,
    roughness: 0.18,
    clearcoat: 0.2,
  })
}

function InnerScene({ scrollContainerRef }: InnerSceneProps) {
  const { camera } = useThree()
  const assemblyGltf = useGLTF(ASSEMBLY_MODEL_URL)

  const stageRef = useRef<THREE.Group>(null)
  const tissueCoverRef = useRef<THREE.Mesh>(null)
  const cameraTargetRef = useRef<THREE.Group>(null)
  const lookAtTarget = useMemo(() => new THREE.Vector3(), [])

  useFrame(() => {
    if (cameraTargetRef.current) {
      camera.lookAt(cameraTargetRef.current.getWorldPosition(lookAtTarget))
    }
  })

  const assembly = useMemo<PreparedAssembly>(() => {
    const clone = cloneScene(assemblyGltf.scene)

    clone.traverse((child) => {
      if (!(child instanceof THREE.Mesh)) return

      child.castShadow = true
      child.receiveShadow = true
      child.material = createAssemblyMaterial(child.name)
    })

    normalizeSceneToHeight(clone, ASSEMBLY_HEIGHT)

    const implant = clone.getObjectByName("implant-screw")
    const abutment = clone.getObjectByName("implant-abutment")
    const crown = clone.getObjectByName("dental-crown")

    if (!implant || !abutment || !crown) {
      throw new Error("Implant anatomy assembly is missing named nodes.")
    }

    return {
      scene: clone,
      implant,
      abutment,
      crown,
    }
  }, [assemblyGltf.scene])

  useGSAP(() => {
    if (!scrollContainerRef.current || !cameraTargetRef.current) {
      return
    }

    const implantBasePosition = assembly.implant.position.clone()
    const abutmentBasePosition = assembly.abutment.position.clone()
    const crownBasePosition = assembly.crown.position.clone()
    const implantBaseRotation = assembly.implant.rotation.clone()
    const abutmentBaseRotation = assembly.abutment.rotation.clone()
    const crownBaseRotation = assembly.crown.rotation.clone()
    const tissueMaterial = tissueCoverRef.current?.material as THREE.MeshPhysicalMaterial | undefined

    gsap.set(assembly.implant.position, { x: implantBasePosition.x - 0.08, y: implantBasePosition.y + IMPLANT_START_Y_OFFSET, z: implantBasePosition.z + 0.04 })
    gsap.set(assembly.implant.rotation, { x: implantBaseRotation.x - 0.42, y: implantBaseRotation.y - 0.45, z: implantBaseRotation.z + 0.04 })
    gsap.set(assembly.abutment.position, { x: abutmentBasePosition.x + 0.18, y: abutmentBasePosition.y + ABUTMENT_START_Y_OFFSET, z: abutmentBasePosition.z + 0.05 })
    gsap.set(assembly.abutment.rotation, { x: abutmentBaseRotation.x + 0.26, y: abutmentBaseRotation.y + 0.58, z: abutmentBaseRotation.z - 0.2 })
    gsap.set(assembly.crown.position, { x: crownBasePosition.x - 0.1, y: crownBasePosition.y + CROWN_START_Y_OFFSET, z: crownBasePosition.z + 0.03 })
    gsap.set(assembly.crown.rotation, { x: crownBaseRotation.x - 0.06, y: crownBaseRotation.y - 0.14, z: crownBaseRotation.z + 0.03 })
    gsap.set(camera.position, { x: 0.24, y: 1.1, z: 5.95 })
    gsap.set(cameraTargetRef.current.position, { x: 0, y: 1.04, z: 0 })
    if (tissueMaterial) {
      gsap.set(tissueMaterial, { opacity: 0 })
    }

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: scrollContainerRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: 1,
      },
    })

    tl.to(
      assembly.implant.position,
      { x: implantBasePosition.x, y: implantBasePosition.y, z: implantBasePosition.z, duration: 1, ease: "power2.inOut" },
      0
    )
    tl.to(
      assembly.implant.rotation,
      { x: implantBaseRotation.x, y: implantBaseRotation.y + Math.PI * 2.6, z: implantBaseRotation.z, duration: 1 },
      0
    )
    tl.to(
      assembly.abutment.position,
      { x: abutmentBasePosition.x, y: abutmentBasePosition.y, z: abutmentBasePosition.z, duration: 0.8, ease: "power3.out" },
      0.8
    )
    tl.to(
      assembly.abutment.rotation,
      { x: abutmentBaseRotation.x, y: abutmentBaseRotation.y, z: abutmentBaseRotation.z, duration: 0.8, ease: "power3.out" },
      0.8
    )
    tl.to(
      assembly.crown.position,
      { x: crownBasePosition.x, y: crownBasePosition.y, z: crownBasePosition.z, duration: 0.8, ease: "power3.out" },
      1.4
    )
    tl.to(
      assembly.crown.rotation,
      { x: crownBaseRotation.x, y: crownBaseRotation.y, z: crownBaseRotation.z, duration: 0.8, ease: "power3.out" },
      1.4
    )
    tl.to(
      camera.position,
      { x: 0.06, y: 1.0, z: 4.8, duration: 2.2, ease: "power2.inOut" },
      0
    )
    tl.to(
      cameraTargetRef.current.position,
      { x: 0, y: 1.02, z: 0, duration: 2.2, ease: "power2.inOut" },
      0
    )
    tl.to(
      camera,
      {
        fov: 32,
        duration: 2.2,
        ease: "power2.inOut",
        onUpdate: () => camera.updateProjectionMatrix(),
      },
      0
    )
    if (tissueMaterial) {
      tl.to(
        tissueMaterial,
        { opacity: 0.96, duration: 0.45, ease: "power1.out" },
        2.28
      )
    }
  }, { dependencies: [assembly, scrollContainerRef] })

  return (
    <>
      <GSAPInvalidator />
      <Environment preset="studio" />
      <fog attach="fog" args={["#edf6fb", 6, 14]} />
      <ambientLight intensity={0.45} />
      <directionalLight position={[6, 8, 10]} intensity={1.8} />
      <pointLight position={[-4, 2, 5]} intensity={1.1} color="#7dd3fc" />
      <pointLight position={[3, 8, -2]} intensity={0.8} color="#f8fafc" />

      <group ref={stageRef} position={[0, SCENE_Y_OFFSET, 0]}>
        <primitive object={assembly.scene} />
      </group>
      <group ref={cameraTargetRef} />

      <RoundedBox
        ref={tissueCoverRef}
        args={[1.56, 1.14, 1.04]}
        radius={0.16}
        smoothness={6}
        position={[0, 0.9 + SCENE_Y_OFFSET, 0]}
      >
        <meshStandardMaterial
          color="#e69aa7"
          roughness={0.92}
          transparent
          opacity={0.2}
        />
      </RoundedBox>

      <mesh position={[0, 0.06 + SCENE_Y_OFFSET, 0]}>
        <boxGeometry args={[1.65, 1.16, 1.1]} />
        <meshPhysicalMaterial
          color="#f7f3ee"
          transmission={0.15}
          thickness={2}
          roughness={0.42}
          clearcoat={0.05}
        />
      </mesh>

      <ContactShadows position={[0, -1.18 + SCENE_Y_OFFSET, 0]} opacity={0.35} scale={3.2} blur={2} frames={1} />
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
            <PerspectiveCamera makeDefault position={[0.06, 1, 4.8]} fov={32} />
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
useGLTF.preload(ASSEMBLY_MODEL_URL)
