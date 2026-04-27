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
  SceneLoader,
  ScrollHint,
  WebGLErrorBoundary,
} from "./three-shared"

gsap.registerPlugin(ScrollTrigger)

const ASSEMBLY_HEIGHT = 2.15
const MODEL_ASSET_VERSION = "2026-04-24-4"
const ASSEMBLY_MODEL_URL = `/models/implant-anatomy-assembled-v3.glb?v=${MODEL_ASSET_VERSION}`
const IMPLANT_START_Y_OFFSET = 2
const ABUTMENT_START_Y_OFFSET = 2.7
const CROWN_START_Y_OFFSET = 2.3
const SCENE_Y_OFFSET = -0.8
const TISSUE_HALF_WIDTH = 0.84

interface InnerSceneProps {
  scrollContainerRef: React.RefObject<HTMLDivElement | null>
}

interface PreparedAssembly {
  scene: THREE.Object3D
  implant: THREE.Object3D
  abutment: THREE.Object3D
  crown: THREE.Object3D
  adjacentCrowns: THREE.Object3D[]
  adjacentCrownMaterials: THREE.MeshPhysicalMaterial[]
}

interface TransformSnapshot {
  position: THREE.Vector3
  rotation: THREE.Euler
}

function createBoneTextures() {
  const size = 512
  const colorData = new Uint8Array(size * size * 4)
  const normalData = new Uint8Array(size * size * 4)

  const NUM_PORES = 20
  const poreField = new Float32Array(size * size)

  for (let p = 0; p < NUM_PORES; p++) {
    const cx = Math.floor(Math.random() * size)
    const cy = Math.floor(Math.random() * size)
    const radius = 1.5 + Math.random() * 2

    for (let dy = -Math.ceil(radius); dy <= Math.ceil(radius); dy++) {
      for (let dx = -Math.ceil(radius); dx <= Math.ceil(radius); dx++) {
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist > radius) continue
        const px = (cx + dx + size) % size
        const py = (cy + dy + size) % size
        const depth = Math.pow(1 - dist / radius, 2)
        poreField[py * size + px] = Math.max(poreField[py * size + px], depth)
      }
    }
  }

  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const i = y * size + x
      const pore = poreField[i]

      const xi = x / size
      const yi = y / size
      const n1 = Math.sin(xi * 127.1 + yi * 311.7) * 43758.5453
      const n2 = Math.sin(xi * 269.5 + yi * 183.3) * 43758.5453
      const noise = ((n1 - Math.floor(n1)) + (n2 - Math.floor(n2))) / 2
      const intensity = noise * 0.6 + 0.4

      colorData[i * 4]     = Math.max(0, 242 - intensity * 12 - pore * 55)
      colorData[i * 4 + 1] = Math.max(0, 234 - intensity * 18 - pore * 60)
      colorData[i * 4 + 2] = Math.max(0, 220 - intensity * 22 - pore * 55)
      colorData[i * 4 + 3] = 255

      const right = poreField[y * size + Math.min(x + 1, size - 1)]
      const left  = poreField[y * size + Math.max(x - 1, 0)]
      const down  = poreField[Math.min(y + 1, size - 1) * size + x]
      const up    = poreField[Math.max(y - 1, 0) * size + x]
      const strength = 6.0
      const nx = (left - right) * strength
      const ny = (up - down) * strength
      const nz = 1.0
      const len = Math.sqrt(nx * nx + ny * ny + nz * nz)

      normalData[i * 4]     = Math.floor(((nx / len) * 0.5 + 0.5) * 255)
      normalData[i * 4 + 1] = Math.floor(((ny / len) * 0.5 + 0.5) * 255)
      normalData[i * 4 + 2] = Math.floor(((nz / len) * 0.5 + 0.5) * 255)
      normalData[i * 4 + 3] = 255
    }
  }

  const colorMap = new THREE.DataTexture(colorData, size, size, THREE.RGBAFormat)
  colorMap.colorSpace = THREE.SRGBColorSpace
  colorMap.wrapS = colorMap.wrapT = THREE.RepeatWrapping
  colorMap.repeat.set(2, 1.6)
  colorMap.needsUpdate = true

  const normalMap = new THREE.DataTexture(normalData, size, size, THREE.RGBAFormat)
  normalMap.wrapS = normalMap.wrapT = THREE.RepeatWrapping
  normalMap.repeat.set(2, 1.6)
  normalMap.needsUpdate = true

  return { colorMap, normalMap }
}

function createTissueTextures() {
  const size = 800
  const colorData = new Uint8Array(size * size * 4)
  const normalData = new Uint8Array(size * size * 4)
  const alphaData = new Uint8Array(size * size * 4)
  const maskOpenAlpha = new Float32Array(size * size)
  const stippleField = new Float32Array(size * size)
  const rectCenterX = 0.55
  const rectCenterY = 0.775
  const rectHalfWidth = 0.20
  const rectHalfHeight = 1
  const rectCornerRadius = 0.06
  const rectEdgeSoftness = 0.012

  const NUM_STIPPLES = 40

  for (let p = 0; p < NUM_STIPPLES; p++) {
    const cx = Math.floor(Math.random() * size)
    const cy = Math.floor(Math.random() * size)
    const radius = 2 + Math.random() * 5

    for (let dy = -Math.ceil(radius); dy <= Math.ceil(radius); dy++) {
      for (let dx = -Math.ceil(radius); dx <= Math.ceil(radius); dx++) {
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist > radius) continue
        const px = (cx + dx + size) % size
        const py = (cy + dy + size) % size
        const depth = Math.pow(1 - dist / radius, 1.8)
        const index = py * size + px
        stippleField[index] = Math.max(stippleField[index], depth)
      }
    }
  }

  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const i = y * size + x
      const xi = x / size
      const yi = y / size
      const stipple = stippleField[i]
      const n1 = Math.sin(xi * 151.7 + yi * 97.3) * 43758.5453
      const n2 = Math.sin(xi * 281.1 + yi * 183.7) * 43758.5453
      const softNoise = ((n1 - Math.floor(n1)) + (n2 - Math.floor(n2))) / 2
      const verticalTint = 0.85 + yi * 0.15
      const blush = Math.max(0, 1 - Math.abs(xi - 0.5) * 2) * 0.06
      const marginBand = Math.exp(-Math.pow((yi - 0.78) / 0.055, 2))
      const inflamedCollarBand =
        Math.exp(-Math.pow((yi - 0.73) / 0.06, 2)) *
        Math.exp(-Math.pow((xi - 0.55) / 0.34, 2))
      const dx = Math.abs(xi - rectCenterX)
      const dy = Math.abs(yi - rectCenterY)
      const qx = Math.max(dx - (rectHalfWidth - rectCornerRadius), 0)
      const qy = Math.max(dy - (rectHalfHeight - rectCornerRadius), 0)
      const outsideDistance = Math.sqrt(qx * qx + qy * qy)
      const insideDistance = Math.min(
        Math.max(dx - (rectHalfWidth - rectCornerRadius), dy - (rectHalfHeight - rectCornerRadius)),
        0
      )
      const roundedRectDistance = outsideDistance + insideDistance - rectCornerRadius
      const centerWindow =
        1 -
        THREE.MathUtils.smoothstep(
          roundedRectDistance,
          -rectEdgeSoftness,
          rectEdgeSoftness
        )
      const alpha = Math.max(0.2, Math.min(1, 1 - centerWindow * 0.7))
      maskOpenAlpha[i] = alpha

      colorData[i * 4] = Math.min(
        255,
        198 +
          softNoise * 10 +
          stipple * 6 +
          verticalTint * 8 -
          marginBand * 10 +
          inflamedCollarBand * 20
      )
      colorData[i * 4 + 1] = Math.min(
        255,
        108 +
          softNoise * 8 -
          stipple * 8 +
          blush * 40 -
          marginBand * 34 -
          inflamedCollarBand * 34
      )
      colorData[i * 4 + 2] = Math.min(
        255,
        132 +
          softNoise * 10 -
          stipple * 5 +
          blush * 18 -
          marginBand * 22 -
          inflamedCollarBand * 20
      )
      colorData[i * 4 + 3] = 255

      const alphaByte = Math.round(alpha * 255)
      alphaData[i * 4] = alphaByte
      alphaData[i * 4 + 1] = alphaByte
      alphaData[i * 4 + 2] = alphaByte
      alphaData[i * 4 + 3] = 255

      const right = stippleField[y * size + Math.min(x + 1, size - 1)]
      const left = stippleField[y * size + Math.max(x - 1, 0)]
      const down = stippleField[Math.min(y + 1, size - 1) * size + x]
      const up = stippleField[Math.max(y - 1, 0) * size + x]
      const strength = 3.4
      const nx = (left - right) * strength
      const ny = (up - down) * strength
      const nz = 1
      const len = Math.sqrt(nx * nx + ny * ny + nz * nz)

      normalData[i * 4] = Math.floor(((nx / len) * 0.5 + 0.5) * 255)
      normalData[i * 4 + 1] = Math.floor(((ny / len) * 0.5 + 0.5) * 255)
      normalData[i * 4 + 2] = Math.floor(((nz / len) * 0.5 + 0.5) * 255)
      normalData[i * 4 + 3] = 255
    }
  }

  const colorMap = new THREE.DataTexture(colorData, size, size, THREE.RGBAFormat)
  colorMap.colorSpace = THREE.SRGBColorSpace
  colorMap.wrapS = colorMap.wrapT = THREE.RepeatWrapping
  colorMap.repeat.set(1.1, 1.3)
  colorMap.minFilter = THREE.LinearFilter
  colorMap.magFilter = THREE.LinearFilter
  colorMap.generateMipmaps = false
  colorMap.needsUpdate = true

  const normalMap = new THREE.DataTexture(normalData, size, size, THREE.RGBAFormat)
  normalMap.wrapS = normalMap.wrapT = THREE.RepeatWrapping
  normalMap.repeat.set(1.1, 1.3)
  normalMap.minFilter = THREE.LinearFilter
  normalMap.magFilter = THREE.LinearFilter
  normalMap.generateMipmaps = false
  normalMap.needsUpdate = true

  const alphaMap = new THREE.DataTexture(alphaData, size, size, THREE.RGBAFormat)
  alphaMap.wrapS = alphaMap.wrapT = THREE.RepeatWrapping
  alphaMap.repeat.set(1.1, 1.3)
  alphaMap.minFilter = THREE.LinearFilter
  alphaMap.magFilter = THREE.LinearFilter
  alphaMap.generateMipmaps = false
  alphaMap.needsUpdate = true

  return {
    colorMap,
    normalMap,
    alphaMap,
    alphaData,
    maskOpenAlpha,
    size,
    maskRect: {
      centerX: rectCenterX,
      centerY: rectCenterY,
      halfWidth: rectHalfWidth,
      halfHeight: rectHalfHeight,
      cornerRadius: rectCornerRadius,
      edgeSoftness: rectEdgeSoftness,
    },
  }
}

function applyExplodedPose(parts: Pick<PreparedAssembly, "implant" | "abutment" | "crown">) {
  parts.implant.position.x -= 0.08
  parts.implant.position.y += IMPLANT_START_Y_OFFSET
  parts.implant.position.z += 0.04
  parts.implant.rotation.x -= 0.42
  parts.implant.rotation.y -= 0.45
  parts.implant.rotation.z += 0.04

  parts.abutment.position.x += 0.18
  parts.abutment.position.y += ABUTMENT_START_Y_OFFSET
  parts.abutment.position.z += 0.05
  parts.abutment.rotation.x += 0.26
  parts.abutment.rotation.y += 0.58
  parts.abutment.rotation.z -= 0.2

  parts.crown.position.x -= 0.1
  parts.crown.position.y += CROWN_START_Y_OFFSET
  parts.crown.position.z += 0.03
  parts.crown.rotation.x -= 0.06
  parts.crown.rotation.y -= 0.14
  parts.crown.rotation.z += 0.03
}

function snapshotTransform(object: THREE.Object3D): TransformSnapshot {
  return {
    position: object.position.clone(),
    rotation: object.rotation.clone(),
  }
}

function createAssemblyMaterial(name: string) {
  const lowerName = name.toLowerCase()

  if (lowerName.includes("crown")) {
    return new THREE.MeshPhysicalMaterial({
      color: "#fbfbf4",
      roughness: 0.08,
      clearcoat: 1,
      transmission: 0.005,
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

function createAdjacentCrown(root: THREE.Object3D, xOffset: number) {
  const clone = cloneScene(root)
  const clippingPlanes = [
    new THREE.Plane(new THREE.Vector3(1, 0, 0), TISSUE_HALF_WIDTH),
    new THREE.Plane(new THREE.Vector3(-1, 0, 0), TISSUE_HALF_WIDTH),
  ]

  clone.traverse((child) => {
    if (!(child instanceof THREE.Mesh)) return

    const material = new THREE.MeshPhysicalMaterial({
      color: "#f8fafc",
      roughness: 0.1,
      clearcoat: 1,
      transmission: 0.003,
      thickness: 0.7,
      clippingPlanes,
      clipShadows: true,
    })

    child.castShadow = true
    child.receiveShadow = true
    child.material = material
  })

  clone.position.x += xOffset
  clone.position.y += 0.67
  clone.position.z = 0
  clone.rotation.set(0, xOffset < 0 ? 0.08 : -0.08, 0)

  return { clone, materials: [] }
}

function InnerScene({ scrollContainerRef }: InnerSceneProps) {
  const { camera } = useThree()
  const assemblyGltf = useGLTF(ASSEMBLY_MODEL_URL)
  const boneTextures = useMemo(() => createBoneTextures(), [])
  const tissueTextures = useMemo(() => createTissueTextures(), [])
  const tissueGeometry = useMemo(() => {
    const geo = new THREE.BoxGeometry(1.65, 1.14, 0.92, 36, 18, 24)
    const pos = geo.attributes.position
    const halfWidth = 1.65 / 2
    const crownCenters = [0, -0.79, 0.79]

    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i)
      const y = pos.getY(i)
      const z = pos.getZ(i)

      const nx = x / (1.65 / 2)
      const nz = z / (0.92 / 2)
      const absNx = Math.abs(nx)
      const frontBias = 1 - Math.min(1, Math.abs(nz) * 0.9)
      const leftInterproximalDip = Math.exp(-Math.pow((x + 0.39) / 0.085, 2)) * 0.055
      const valleyDip = crownCenters.reduce((sum, center) => {
        const distance = x - center
        return (
          sum +
          Math.exp(-Math.pow(distance / 0.17, 2)) *
            (center === 0 ? 0.11 : 0.078)
        )
      }, 0)

      if (y > 0.08) {
        const overallLift = 0.038
        const centralDip = valleyDip + leftInterproximalDip
        const shoulderRise =
          Math.exp(-Math.pow((absNx - 0.535) / 0.115, 2)) * 0.165
        const collarBand = Math.exp(-Math.pow((y - 0.12) / 0.16, 2))
        const facialCollarBulge =
          Math.exp(-Math.pow(nx / 0.68, 2)) *
          Math.exp(-Math.pow(nz / 0.52, 2)) *
          collarBand *
          0.04
        const outerFalloff = absNx * -0.016
        const facialSoftening = Math.pow(Math.abs(nz), 1.6) * -0.03
        const noise =
          (Math.sin(x * 14 + z * 10) + Math.cos(x * 9 - z * 7)) * 0.0025

        pos.setY(
          i,
          y +
            overallLift +
            shoulderRise +
            facialCollarBulge * 0.45 +
            outerFalloff +
            facialSoftening +
            noise -
            centralDip * frontBias
        )

        if (z > 0.02) {
          pos.setZ(i, z + facialCollarBulge)
        }

        if (x < 0 && y > 0.18) {
          const leftPeakPull =
            Math.exp(-Math.pow((x + 0.5) / 0.08, 2)) *
            Math.max(0, Math.min(1, (y - 0.18) / 0.24)) *
            0.047
          pos.setX(i, x + leftPeakPull)
        }
      }

      if (z > 0.22 && y > -0.08) {
        const frontDip = crownCenters.reduce((sum, center) => {
          const distance = x - center
          return (
            sum +
            Math.exp(-Math.pow(distance / 0.18, 2)) *
              (center === 0 ? 0.05 : 0.036)
          )
        }, 0)
        const shoulderRise =
          Math.exp(-Math.pow((absNx - 0.54) / 0.11, 2)) * 0.058
        const topBand = Math.max(0, Math.min(1, (y - 0.22) / 0.28))
        const leftInnerShoulderBias =
          Math.exp(-Math.pow((x + 0.31) / 0.07, 2)) *
          Math.exp(-Math.pow((absNx - 0.38) / 0.09, 2)) *
          0.045 *
          topBand
        const leftInterproximalPushback =
          Math.exp(-Math.pow((x + 0.39) / 0.08, 2)) * 0.032 * topBand
        const shoulderPushback =
          Math.exp(-Math.pow((absNx - 0.54) / 0.1, 2)) * 0.055 * topBand
        pos.setY(i, pos.getY(i) + shoulderRise - frontDip)
        pos.setZ(
          i,
          z - shoulderPushback - leftInnerShoulderBias - leftInterproximalPushback
        )
      }
    }

    pos.needsUpdate = true
    geo.computeVertexNormals()
    return geo
  }, [])

  // Bone geometry with top vertices displaced for an organic, uneven tissue interface.
  // Only vertices above y=0.4 are displaced so sides and bottom stay flat.
  const boneGeometry = useMemo(() => {
    const geo = new THREE.BoxGeometry(1.65, 1.08, 1.1, 32, 4, 32)
    const pos = geo.attributes.position

    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i)
      const y = pos.getY(i)
      const z = pos.getZ(i)

      if (y > 0.4) {
        const nx = x / (1.65 / 2)
        const nz = z / (1.1 / 2)
        const distFromCenter = Math.sqrt(nx * nx + nz * nz)
        const centerPeak = Math.max(0, 1 - distFromCenter * 1.5) * 0.15
        const sideSlope = Math.abs(nx) * -0.05
        const facialDip = Math.pow(Math.abs(nz), 2) * -0.12
        const noise =
          (Math.sin(x * 20 + z * 15) + Math.cos(x * 10 - z * 8)) * 0.006

        pos.setY(i, y + centerPeak + sideSlope + facialDip + noise)
      }
    }

    pos.needsUpdate = true
    geo.computeVertexNormals()
    return geo
  }, [])

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

    implant.userData.assembledTransform = snapshotTransform(implant)
    abutment.userData.assembledTransform = snapshotTransform(abutment)
    crown.userData.assembledTransform = snapshotTransform(crown)

    const leftAdjacent = createAdjacentCrown(crown, -0.80)
    const rightAdjacent = createAdjacentCrown(crown, 0.80)

    applyExplodedPose({ implant, abutment, crown })

    return {
      scene: clone,
      implant,
      abutment,
      crown,
      adjacentCrowns: [leftAdjacent.clone, rightAdjacent.clone],
      adjacentCrownMaterials: [
        ...leftAdjacent.materials,
        ...rightAdjacent.materials,
      ],
    }
  }, [assemblyGltf.scene])

  useGSAP(() => {
    if (!scrollContainerRef.current || !cameraTargetRef.current) {
      return
    }

    const implantAssembled = assembly.implant.userData.assembledTransform as TransformSnapshot | undefined
    const abutmentAssembled = assembly.abutment.userData.assembledTransform as TransformSnapshot | undefined
    const crownAssembled = assembly.crown.userData.assembledTransform as TransformSnapshot | undefined

    if (!implantAssembled || !abutmentAssembled || !crownAssembled) {
      return
    }

    const implantBasePosition = implantAssembled.position
    const abutmentBasePosition = abutmentAssembled.position
    const crownBasePosition = crownAssembled.position
    const implantBaseRotation = implantAssembled.rotation
    const abutmentBaseRotation = abutmentAssembled.rotation
    const crownBaseRotation = crownAssembled.rotation
    const maskCloseState = { progress: 0 }

    const updateTissueAlpha = (closeProgress: number) => {
      const { alphaData, alphaMap, maskOpenAlpha, size } = tissueTextures

      for (let y = 0; y < size; y++) {
        for (let x = 0; x < size; x++) {
          const i = y * size + x
          const openAlpha = maskOpenAlpha[i]
          const alpha = THREE.MathUtils.lerp(openAlpha, 1, closeProgress)
          const alphaByte = Math.round(alpha * 255)

          alphaData[i * 4] = alphaByte
          alphaData[i * 4 + 1] = alphaByte
          alphaData[i * 4 + 2] = alphaByte
          alphaData[i * 4 + 3] = 255
        }
      }

      alphaMap.needsUpdate = true
    }

    gsap.set(assembly.implant.position, { x: implantBasePosition.x - 0.08, y: implantBasePosition.y + IMPLANT_START_Y_OFFSET, z: implantBasePosition.z + 0.04 })
    gsap.set(assembly.implant.rotation, { x: implantBaseRotation.x - 0.42, y: implantBaseRotation.y - 0.45, z: implantBaseRotation.z + 0.04 })
    gsap.set(assembly.abutment.position, { x: abutmentBasePosition.x + 0.18, y: abutmentBasePosition.y + ABUTMENT_START_Y_OFFSET, z: abutmentBasePosition.z + 0.05 })
    gsap.set(assembly.abutment.rotation, { x: abutmentBaseRotation.x + 0.26, y: abutmentBaseRotation.y + 0.58, z: abutmentBaseRotation.z - 0.2 })
    gsap.set(assembly.crown.position, { x: crownBasePosition.x - 0.1, y: crownBasePosition.y + CROWN_START_Y_OFFSET, z: crownBasePosition.z + 0.03 })
    gsap.set(assembly.crown.rotation, { x: crownBaseRotation.x - 0.06, y: crownBaseRotation.y - 0.14, z: crownBaseRotation.z + 0.03 })
    gsap.set(camera.position, { x: 0.24, y: 1.34, z: 5.95 })
    gsap.set(cameraTargetRef.current.position, { x: 0, y: 1.28, z: 0 })
    updateTissueAlpha(0)

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
      { x: implantBasePosition.x, y: implantBasePosition.y, z: implantBasePosition.z, duration: 1, ease: "power3.out" },
      0
    )
    tl.to(
      assembly.implant.rotation,
      { x: implantBaseRotation.x, y: implantBaseRotation.y + Math.PI * 5.2, z: implantBaseRotation.z, duration: 1, ease: "power3.out" },
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
      { x: 0.06, y: 1.14, z: 4.8, duration: 2.2, ease: "power2.inOut" },
      0
    )
    tl.to(
      cameraTargetRef.current.position,
      { x: 0, y: 1.14, z: 0, duration: 2.2, ease: "power2.inOut" },
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
    tl.to(
      maskCloseState,
      {
        progress: 1,
        duration: 0.8,
        ease: "power1.inOut",
        onUpdate: () => updateTissueAlpha(maskCloseState.progress),
      },
      1.95
    )
  }, { dependencies: [assembly, scrollContainerRef, tissueTextures] })

  return (
    <>
      <GSAPInvalidator />
      <Environment preset="studio" />
      <fog attach="fog" args={["#edf6fb", 6, 14]} />
      <ambientLight intensity={0.38} />
      <directionalLight position={[6, 8, 10]} intensity={1.9} />
      <pointLight position={[-4, 2, 5]} intensity={1.1} color="#7dd3fc" />
      <pointLight position={[3, 8, -2]} intensity={0.8} color="#f8fafc" />

      <group ref={stageRef} position={[0, SCENE_Y_OFFSET, 0]}>
        <primitive object={assembly.scene} />
        {assembly.adjacentCrowns.map((crown, index) => (
          <primitive key={index} object={crown} />
        ))}
      </group>
      <group ref={cameraTargetRef} />

      {/* Tissue cover — sits above bone layer, fades in on scroll */}
      <mesh
        ref={tissueCoverRef}
        geometry={tissueGeometry}
        position={[0, 0.885 + SCENE_Y_OFFSET, -0.08]}
        scale={[1, 1.12, 1]}
        renderOrder={3}
      >
        <meshPhysicalMaterial
          color="#cf7084"
          map={tissueTextures.colorMap}
          normalMap={tissueTextures.normalMap}
          alphaMap={tissueTextures.alphaMap}
          normalScale={new THREE.Vector2(0.22, 0.22)}
          emissive="#9f2a3d"
          emissiveIntensity={0.08}
          roughness={0.39}
          clearcoat={0.66}
          clearcoatRoughness={0.2}
          metalness={0.02}
          sheen={0.9}
          sheenColor="#ffb2bf"
          specularIntensity={0.84}
          alphaTest={0.08}
          transparent
          opacity={1}
        />
      </mesh>

      {/* Cortical bone — displaced top vertices create organic tissue interface */}
      <mesh geometry={boneGeometry} position={[0, 0.61 + SCENE_Y_OFFSET, -0.2]} scale={[1, 0.87, 1]} renderOrder={1}>
        <meshPhysicalMaterial
          color="#d4c4a8"
          map={boneTextures.colorMap}
          normalMap={boneTextures.normalMap}
          normalScale={new THREE.Vector2(1.4, 1.4)}
          roughness={0.92}
          clearcoat={0}
        />
      </mesh>

      <ContactShadows position={[0, -1.18 + SCENE_Y_OFFSET, 0]} opacity={0.42} scale={3.2} blur={2.1} frames={1} />
    </>
  )
}

export function ImplantAnatomyScene() {
  const containerRef = useRef<HTMLDivElement>(null)

  return (
    <WebGLErrorBoundary fallback={<div className="h-full w-full bg-slate-50 flex items-center justify-center p-8 text-center">Interactive 3D model loading...</div>}>
      <div ref={containerRef} className="relative w-full overflow-visible">
        <div className="sticky top-0 h-[100svh] lg:h-[100dvh] w-full lg:w-1/2 lg:float-right right-0 z-0 overflow-hidden pointer-events-none">
          <Canvas 
            frameloop="demand"
            dpr={[1, 1.5]}
            gl={{ antialias: true, powerPreference: "high-performance", toneMapping: THREE.LinearToneMapping, localClippingEnabled: true }}
          >
            <PerspectiveCamera makeDefault position={[0.06, 1, 4.8]} fov={32} />
            <Suspense fallback={<SceneLoader />}>
              <InnerScene scrollContainerRef={containerRef} />
            </Suspense>
          </Canvas>
          <ScrollHint containerRef={containerRef} />
        </div>

        <div className="relative z-10 w-full lg:w-1/2 pointer-events-none -mt-[100svh] lg:mt-0">
          <div className="min-h-[100svh] lg:min-h-[100dvh] flex flex-col justify-end lg:justify-center px-4 md:px-12 pb-[12svh] pt-[40svh] lg:pb-0 lg:pt-0">
            <div className="mr-auto max-w-[17rem] rounded-xl border border-slate-200 bg-white/78 p-6 shadow-xl backdrop-blur-md transition-all hover:border-blue-400 pointer-events-auto dark:border-white/10 dark:bg-slate-950/76 dark:shadow-[0_24px_60px_-32px_rgba(0,0,0,0.88)] lg:max-w-md lg:bg-white/90 lg:p-8">
              <p className="mb-2 text-sm font-bold uppercase tracking-widest text-blue-600 dark:text-sky-300">Phase 1</p>
              <h3 className="mb-4 font-display text-3xl font-semibold text-slate-900 dark:text-slate-50">The Implant</h3>
              <p className="leading-relaxed text-slate-600 dark:text-slate-300">
                A medical-grade titanium post is surgically placed into the jawbone, acting as a sturdy root for your new tooth.
              </p>
            </div>
          </div>

          <div className="min-h-[100svh] lg:min-h-[100dvh] flex flex-col justify-end lg:justify-center px-4 md:px-12 pb-[12svh] lg:pb-0">
            <div className="ml-auto max-w-[17rem] rounded-xl border border-slate-200 bg-white/78 p-6 shadow-xl backdrop-blur-md pointer-events-auto dark:border-white/10 dark:bg-slate-950/76 dark:shadow-[0_24px_60px_-32px_rgba(0,0,0,0.88)] lg:max-w-md lg:bg-white/90 lg:p-8">
              <p className="mb-2 text-sm font-bold uppercase tracking-widest text-blue-600 dark:text-sky-300">Phase 2</p>
              <h3 className="mb-4 font-display text-3xl font-semibold text-slate-900 dark:text-slate-50">The Abutment</h3>
              <p className="leading-relaxed text-slate-600 dark:text-slate-300">
                Once the implant has fused with the bone, a connector called an abutment is attached to hold the custom crown.
              </p>
            </div>
          </div>

          <div className="min-h-[100svh] lg:min-h-[100dvh] flex flex-col justify-end px-4 md:px-12 pb-[10svh] lg:justify-center lg:pb-[20dvh]">
            <div className="mr-auto max-w-[17rem] rounded-xl border border-slate-200 bg-white/78 p-6 shadow-xl backdrop-blur-md pointer-events-auto dark:border-white/10 dark:bg-slate-950/76 dark:shadow-[0_24px_60px_-32px_rgba(0,0,0,0.88)] lg:mr-0 lg:max-w-md lg:bg-white/90 lg:p-8">
              <p className="mb-2 text-sm font-bold uppercase tracking-widest text-blue-600 dark:text-sky-300">Phase 3</p>
              <h3 className="mb-4 font-display text-3xl font-semibold text-slate-900 dark:text-slate-50">The Crown</h3>
              <p className="leading-relaxed text-slate-600 dark:text-slate-300">
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
