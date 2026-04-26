"use client"

/**
 * @/components/three/three-shared.tsx
 *
 * Shared utilities for all scrollytelling R3F scenes on the site.
 * Import from here — never duplicate these in individual scene files.
 *
 * Exports:
 *   WebGLErrorBoundary  — catches WebGL context loss, renders StaticFallback
 *   StaticFallback      — plain-DOM fallback shown when WebGL is unavailable
 *   SceneLoader         — Suspense fallback rendered inside the Canvas via <Html>
 *   GSAPInvalidator     — syncs gsap.ticker → R3F invalidate() for frameloop="demand"
 *   ScrollHint          — "Scroll to explore" overlay that fades on first scroll
 *   useScrollToPhase    — returns a scrollToPhase(index) fn for keyboard sync
 */

import { useEffect, useRef, Component, type ReactNode } from "react"
import { useThree } from "@react-three/fiber"
import { Html } from "@react-three/drei"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ScrollToPlugin } from "gsap/ScrollToPlugin"
import * as THREE from "three"

// Register once at module load. Safe to call multiple times — GSAP deduplicates.
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)

// ─────────────────────────────────────────────────────────────────────────────
// WebGLErrorBoundary
//
// React error boundaries must be class components. This one wraps the Canvas
// so that a WebGL context failure (old Safari, corporate GPU blocklist, etc.)
// renders StaticFallback instead of crashing the page.
// ─────────────────────────────────────────────────────────────────────────────
interface ErrorBoundaryState { hasError: boolean }
interface ErrorBoundaryProps {
  children: ReactNode
  fallback: ReactNode
  /** Optional scene name for debug logging */
  sceneName?: string
}

export class WebGLErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true }
  }

  componentDidCatch(error: Error) {
    const label = this.props.sceneName ?? "Scene"
    console.warn(`[${label}] WebGL error — rendering static fallback.`, error.message)
  }

  render() {
    return this.state.hasError ? this.props.fallback : this.props.children
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// StaticFallback
//
// Shown when WebGLErrorBoundary catches an error.
// ─────────────────────────────────────────────────────────────────────────────
interface StaticFallbackProps {
  /** Alt text / label for the fallback content */
  label?: string
}

export function StaticFallback({ label = "3D Visualization" }: StaticFallbackProps) {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="text-center max-w-xs px-8 py-12 bg-card/80 backdrop-blur-sm rounded-2xl border border-border">
        <div className="text-5xl mb-4" aria-hidden="true">🦷</div>
        <h3 className="font-display text-xl font-semibold mb-2">{label} Unavailable</h3>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Your browser does not support WebGL. Update to a modern browser to view this
          interactive visualization.
        </p>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// SceneLoader
//
// Suspense fallback rendered INSIDE the Canvas via @react-three/drei's <Html>.
// Visible while async assets (useGLTF, useTexture, etc.) are loading.
// For the current procedural scenes this fires only briefly on first mount.
// ─────────────────────────────────────────────────────────────────────────────
export function SceneLoader() {
  return (
    <Html center>
      <div className="flex flex-col items-center gap-3">
        <div className="h-8 w-8 rounded-full border-2 border-accent border-t-transparent animate-spin" />
        <p className="text-xs text-muted-foreground font-medium tracking-widest uppercase">
          Loading visualization…
        </p>
      </div>
    </Html>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// GSAPInvalidator
//
// The required bridge between GSAP and R3F's frameloop="demand" mode.
//
// Problem: frameloop="demand" stops R3F from rendering every frame. But GSAP
// animates on its own RAF tick and has no knowledge of R3F's render loop.
// Without this component, scroll-driven GSAP tweens update Three.js object
// positions but never trigger a repaint — the canvas appears frozen.
//
// Solution: register R3F's `invalidate()` function as a GSAP ticker callback.
// On every GSAP tick where a tween is running, `invalidate()` is called, which
// queues exactly one new R3F frame. Between scroll events, no tweens run, no
// ticks fire, and the GPU is completely idle.
//
// Render this as the FIRST child of every InnerScene that uses frameloop="demand".
// ─────────────────────────────────────────────────────────────────────────────
export function GSAPInvalidator() {
  const invalidate = useThree((state) => state.invalidate)

  useEffect(() => {
    gsap.ticker.add(invalidate)
    return () => {
      gsap.ticker.remove(invalidate)
    }
  }, [invalidate])

  return null
}

export function cloneScene<T extends THREE.Object3D>(scene: T): T {
  return scene.clone(true)
}

export function replaceSceneMaterials(
  root: THREE.Object3D,
  createMaterial: () => THREE.Material
) {
  root.traverse((child) => {
    if (!(child instanceof THREE.Mesh)) return

    child.castShadow = true
    child.receiveShadow = true
    if (Array.isArray(child.material)) {
      child.material.forEach((material) => material.dispose())
    } else {
      child.material.dispose()
    }
    child.material = createMaterial()
  })
}

export function normalizeSceneToHeight(
  root: THREE.Object3D,
  targetHeight: number
) {
  root.position.set(0, 0, 0)
  root.rotation.set(0, 0, 0)
  root.updateMatrixWorld(true)

  const initialBox = new THREE.Box3().setFromObject(root)
  const size = initialBox.getSize(new THREE.Vector3())
  const currentHeight = size.y || 1
  const scale = targetHeight / currentHeight

  root.scale.setScalar(scale)
  root.updateMatrixWorld(true)

  const box = new THREE.Box3().setFromObject(root)
  const center = box.getCenter(new THREE.Vector3())
  root.position.x -= center.x
  root.position.z -= center.z
  root.position.y -= box.min.y
  root.updateMatrixWorld(true)
}

// ─────────────────────────────────────────────────────────────────────────────
// ScrollHint
//
// A "Scroll to explore" affordance rendered as plain DOM (not inside the Canvas)
// directly over the sticky viewport. It fades out as soon as the user begins
// scrolling through the sequence.
//
// Placed as a sibling of the Canvas div inside the sticky container, so it
// inherits the same stacking context and disappears with the scene.
// ─────────────────────────────────────────────────────────────────────────────
interface ScrollHintProps {
  containerRef: React.RefObject<HTMLDivElement | null>
}

export function ScrollHint({ containerRef }: ScrollHintProps) {
  const hintRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!hintRef.current || !containerRef.current) return

    const ctx = gsap.context(() => {
      gsap.to(hintRef.current, {
        opacity: 0,
        y: -10,
        pointerEvents: "none",
        ease: "power1.in",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top+=60 top",
          end: "top+=180 top",
          scrub: true,
        },
      })
    })

    return () => ctx.revert()
  }, [containerRef])

  return (
    <div
      ref={hintRef}
      aria-hidden="true"
      className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 pointer-events-none select-none"
    >
      <p className="text-[10px] font-semibold text-muted-foreground tracking-widest uppercase">
        Scroll to explore
      </p>
      {/* Staggered bouncing dots as a directional cue */}
      {[0, 150, 300].map((delay) => (
        <div
          key={delay}
          className="w-1 h-1 rounded-full bg-accent/70 animate-bounce"
          style={{ animationDelay: `${delay}ms` }}
        />
      ))}
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// useScrollToPhase
//
// Returns a `scrollToPhase(index)` function for keyboard sync.
//
// How it works:
//   Each phase occupies one full viewport-height (100dvh) of scroll distance
//   within the scrollytelling container. To bring phase `i` into view, we
//   scroll to:
//
//     containerTop + i × window.innerHeight
//
//   where containerTop = the container's distance from the top of the document.
//   GSAP's ScrollToPlugin handles the smooth animation; `autoKill: false`
//   prevents the user's momentum scroll from immediately cancelling it.
//
// Usage:
//   const scrollToPhase = useScrollToPhase(containerRef)
//   <div onFocus={() => scrollToPhase(2)} tabIndex={0}>Phase 3 card</div>
// ─────────────────────────────────────────────────────────────────────────────
export function useScrollToPhase(
  containerRef: React.RefObject<HTMLDivElement | null>
) {
  return (phaseIndex: number) => {
    const container = containerRef.current
    if (!container) return

    // getBoundingClientRect().top is relative to the viewport, so we add
    // window.scrollY to get the absolute document offset.
    const containerTop =
      container.getBoundingClientRect().top + window.scrollY

    const targetY = containerTop + phaseIndex * window.innerHeight

    gsap.to(window, {
      scrollTo: { y: targetY, autoKill: false },
      duration: 0.75,
      ease: "power2.inOut",
    })
  }
}
