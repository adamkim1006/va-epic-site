"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

interface HeroSectionProps {
  title: string
  subtitle?: string
  description: string
  primaryButtonText?: string
  primaryButtonHref?: string
  secondaryButtonText?: string
  secondaryButtonHref?: string
  showAnimatedBackground?: boolean
  backgroundImageSrc?: string
  backgroundPosition?: string
  backgroundOpacity?: number
}

export function HeroSection({
  title,
  subtitle,
  description,
  primaryButtonText = "Schedule Consultation",
  primaryButtonHref = "/contact",
  secondaryButtonText,
  secondaryButtonHref,
  showAnimatedBackground = true,
  backgroundImageSrc,
  backgroundPosition = "center",
  backgroundOpacity = 0.60,
}: HeroSectionProps) {
  return (
    <section className="relative overflow-hidden bg-background">
      {backgroundImageSrc && (
        <>
          <div
            aria-hidden="true"
            className="absolute inset-0 scale-[1.02] bg-cover bg-no-repeat"
            style={{
              backgroundImage: `url("${backgroundImageSrc}")`,
              backgroundPosition,
              opacity: backgroundOpacity,
            }}
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(249,250,251,0.48)_0%,rgba(249,250,251,0.84)_72%,rgba(249,250,251,0.94)_100%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(79,209,217,0.22)_0%,rgba(37,99,235,0.14)_42%,rgba(255,255,255,0)_76%)]" />
        </>
      )}

      {showAnimatedBackground && (
        <div className="absolute inset-0 overflow-hidden">
          <div className="brand-gradient absolute inset-x-0 top-0 h-1" />
          <div className="brand-gradient-soft absolute inset-x-0 top-0 h-[72%]" />
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.7 }}
            transition={{ duration: 1 }}
            className="absolute top-0 right-0 h-[520px] w-[520px] -translate-y-1/4 translate-x-1/5 rounded-full bg-[radial-gradient(circle,rgba(79,209,217,0.35)_0%,rgba(79,209,217,0)_68%)] blur-2xl"
          />
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.55 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="absolute bottom-0 left-0 h-[460px] w-[460px] translate-y-1/4 -translate-x-1/5 rounded-full bg-[radial-gradient(circle,rgba(37,99,235,0.18)_0%,rgba(37,99,235,0)_70%)] blur-3xl"
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.04)_0%,rgba(255,255,255,0)_100%)]" />
        </div>
      )}

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        <div className="max-w-3xl">
          {subtitle && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-4 inline-flex rounded-full border border-accent/30 bg-white/80 px-4 py-1.5 text-sm font-medium uppercase tracking-[0.18em] text-primary shadow-sm backdrop-blur"
            >
              {subtitle}
            </motion.p>
          )}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-display text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-foreground text-balance"
          >
            {title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-6 text-lg sm:text-xl text-muted-foreground leading-relaxed text-pretty max-w-2xl"
          >
            {description}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-8 flex flex-col sm:flex-row gap-4"
          >
            <Button asChild size="lg" className="text-base">
              <Link href={primaryButtonHref}>
                {primaryButtonText}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            {secondaryButtonText && secondaryButtonHref && (
              <Button asChild variant="outline" size="lg" className="text-base">
                <Link href={secondaryButtonHref}>{secondaryButtonText}</Link>
              </Button>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
