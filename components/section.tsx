"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface SectionProps {
  children: React.ReactNode
  className?: string
  id?: string
  variant?: "default" | "muted" | "primary"
  backgroundImageSrc?: string
  backgroundImageAlt?: string
  backgroundPosition?: string
  backgroundOpacity?: number
  contentClassName?: string
}

export function Section({
  children,
  className,
  id,
  variant = "default",
  backgroundImageSrc,
  backgroundPosition = "center",
  backgroundOpacity = 0.18,
  contentClassName,
}: SectionProps) {
  const variants = {
    default: "bg-background",
    muted: "bg-secondary",
    primary: "bg-primary text-primary-foreground",
  }

  return (
    <section id={id} className={cn("relative overflow-hidden py-16 lg:py-24", variants[variant], className)}>
      {backgroundImageSrc && (
        <>
          <div
            aria-hidden="true"
            className="absolute inset-0 scale-[1.03] bg-cover bg-no-repeat saturate-[1.05]"
            style={{
              backgroundImage: `url("${backgroundImageSrc}")`,
              backgroundPosition,
              opacity: backgroundOpacity,
            }}
          />
          <div
            aria-hidden="true"
            className={cn(
              "absolute inset-0",
              variant === "primary"
                ? "bg-[linear-gradient(180deg,rgba(29,78,216,0.76)_0%,rgba(37,99,235,0.84)_100%)]"
                : "bg-[linear-gradient(180deg,rgba(249,250,251,0.56)_0%,rgba(249,250,251,0.82)_100%)]"
            )}
          />
          <div
            aria-hidden="true"
            className={cn(
              "absolute inset-0",
              variant === "primary"
                ? "bg-[radial-gradient(circle_at_top_left,rgba(79,209,217,0.22)_0%,rgba(79,209,217,0)_36%)]"
                : "bg-[linear-gradient(120deg,rgba(79,209,217,0.16)_0%,rgba(37,99,235,0.08)_42%,rgba(255,255,255,0)_76%)]"
            )}
          />
        </>
      )}
      <div className={cn("relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8", contentClassName)}>
        {children}
      </div>
    </section>
  )
}

interface SectionHeaderProps {
  title: string
  subtitle?: string
  description?: string
  align?: "left" | "center"
  className?: string
}

export function SectionHeader({ title, subtitle, description, align = "center", className }: SectionHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={cn(
        "max-w-3xl",
        align === "center" && "mx-auto text-center",
        className
      )}
    >
      {subtitle && (
        <p className="text-sm font-medium text-accent uppercase tracking-wider mb-2">
          {subtitle}
        </p>
      )}
      <h2 className="font-display text-3xl sm:text-4xl font-semibold tracking-tight text-balance">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-lg text-muted-foreground leading-relaxed text-pretty">
          {description}
        </p>
      )}
    </motion.div>
  )
}
