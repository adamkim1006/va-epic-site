"use client"

import { useId, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Section, SectionHeader } from "@/components/section"

export type BeforeAfterCase = {
  category: string
  title: string
  description: string
  beforeImage: string
  afterImage: string
}

export type BeforeAfterSupportCase = {
  title: string
  category: string
  image: string
  description: string
  imageClassName?: string
}

interface BeforeAfterPreviewProps {
  subtitle?: string
  title?: string
  description?: string
  featuredCase: BeforeAfterCase
  supportingCases?: BeforeAfterSupportCase[]
}

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max)
}

function BeforeAfterSlider({ featuredCase }: { featuredCase: BeforeAfterCase }) {
  const [position, setPosition] = useState(58)
  const sliderId = useId()

  return (
    <div className="relative flex h-full flex-col overflow-hidden rounded-[2rem] border border-border bg-card shadow-[0_24px_80px_-30px_rgba(15,23,42,0.25)] dark:border-white/10 dark:bg-slate-950/76 dark:shadow-[0_24px_80px_-36px_rgba(0,0,0,0.88)]">
      <div className="relative aspect-[4/3] sm:aspect-[16/10] lg:min-h-[28rem] lg:flex-1">
        <Image
          src={featuredCase.afterImage}
          alt={`${featuredCase.title} after`}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 66vw"
          priority={false}
        />

        {/* The Clipping Mask (The Slider Handle Position) */}
        <div
          className="absolute inset-y-0 left-0 z-10 overflow-hidden pointer-events-none"
          style={{ width: `${position}%` }}
        >
          {/* THE FIX: Use a fixed width that matches the total slider area.
              By using 'aspect-[4/3]' (or your container's ratio) and a fixed width,
              the image will remain perfectly still while the parent clips it.
          */}
          <div className="relative h-full w-[var(--slider-width)] aspect-[4/3] sm:aspect-[16/10] lg:min-h-[28rem]">
            <Image
              src={featuredCase.beforeImage}
              alt={`${featuredCase.title} before`}
              fill
              className="object-cover"
              style={{ objectPosition: 'center' }} 
              sizes="(max-width: 768px) 100vw, 66vw"
              priority={false}
            />
          </div>
        </div>

        <div
          className="absolute inset-y-0 w-px bg-white/95 shadow-[0_0_0_1px_rgba(15,23,42,0.08)]"
          style={{ left: `${position}%` }}
        />

        <div
          className="absolute top-1/2 z-10 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/90 bg-white/95 text-slate-900 shadow-lg"
          style={{ left: `${position}%` }}
          aria-hidden="true"
        >
          <div className="flex items-center gap-1">
            <span className="block h-4 w-px bg-slate-400" />
            <span className="block h-4 w-px bg-slate-400" />
          </div>
        </div>

        <div className="absolute left-4 top-4">
          <Badge className="rounded-full bg-white/90 text-slate-900 hover:bg-white">Before</Badge>
        </div>
        <div className="absolute right-4 top-4">
          <Badge className="rounded-full bg-slate-950/80 text-white hover:bg-slate-950">After</Badge>
        </div>

        <input
          id={sliderId}
          type="range"
          min={0}
          max={100}
          value={position}
          aria-label="Compare before and after images"
          onChange={(event) => setPosition(clamp(Number(event.target.value), 0, 100))}
          className="absolute inset-0 z-20 h-full w-full cursor-ew-resize opacity-0"
        />
      </div>

      <div className="flex flex-col gap-4 border-t border-border/80 bg-white/88 px-5 py-5 backdrop-blur-sm dark:border-white/10 dark:bg-slate-950/80 sm:flex-row sm:items-end sm:justify-between sm:px-6">
        <div className="space-y-2">
          <Badge variant="outline" className="rounded-full border-sky-200 bg-sky-50/60 text-sky-700 dark:border-sky-400/20 dark:bg-sky-400/10 dark:text-sky-300">
            {featuredCase.category}
          </Badge>
          <h3 className="font-display text-2xl font-semibold tracking-tight text-slate-950 dark:text-slate-50">
            {featuredCase.title}
          </h3>
          <p className="max-w-2xl text-sm leading-7 text-slate-600 dark:text-slate-300 sm:text-base">
            {featuredCase.description}
          </p>
        </div>
        <p className="text-xs font-medium uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">
          Drag to compare
        </p>
      </div>
    </div>
  )
}

export function BeforeAfterPreview({
  subtitle = "Real Results",
  title = "See the Transformation",
  description = "Explore before-and-after outcomes and compare treatment changes in a more visual way.",
  featuredCase,
  supportingCases = [],
}: BeforeAfterPreviewProps) {
  return (
    <Section>
      <SectionHeader
        subtitle={subtitle}
        title={title}
        description={description}
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mt-12 grid items-start gap-8 lg:grid-cols-[minmax(0,1.45fr)_320px] lg:items-stretch"
      >
        <BeforeAfterSlider featuredCase={featuredCase} />

        {supportingCases.length > 0 ? (
          <div className="grid gap-5">
            {supportingCases.map((supportingCase, index) => (
              <motion.div
                key={supportingCase.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: 0.08 + index * 0.06 }}
                className="group overflow-hidden rounded-[1.5rem] border border-border bg-card dark:border-white/10 dark:bg-slate-950/76 dark:shadow-[0_24px_60px_-36px_rgba(0,0,0,0.88)]"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={supportingCase.image}
                  alt={supportingCase.title}
                  fill
                  className={`object-cover transition-transform duration-500 group-hover:scale-[1.03] ${supportingCase.imageClassName ?? ""}`}
                  sizes="(max-width: 1024px) 100vw, 320px"
                />
                  <div className="absolute left-4 top-4">
                    <Badge className="rounded-full bg-white/90 text-slate-900 hover:bg-white dark:bg-slate-950/84 dark:text-slate-50 dark:hover:bg-slate-900">{supportingCase.category}</Badge>
                  </div>
                </div>
                <div className="space-y-2 px-5 py-4">
                  <h3 className="font-semibold text-slate-950 dark:text-slate-50">{supportingCase.title}</h3>
                  <p className="text-sm leading-6 text-slate-600 dark:text-slate-300">
                    {supportingCase.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        ) : null}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mt-10 text-center"
      >
        <Button asChild variant="outline" size="lg">
          <Link href="/before-after">
            View Full Gallery
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </Button>
      </motion.div>
    </Section>
  )
}
