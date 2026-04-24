"use client"

import { useId, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Section, SectionHeader } from "@/components/section"

const featuredCase = {
  category: "All-on-X",
  title: "Full-Arch Pano Transformation",
  description:
    "Compare the pre-treatment panoramic view with the restored post-treatment result using the interactive slider.",
  beforeImage: "/images/Site Files/Lee All on 4 Before sx Pano.JPG",
  afterImage: "/images/Site Files/Lee All on 4 after sx Pano.JPG",
}

const supportingCases = [
  {
    title: "Smile Preview",
    category: "All-on-X",
    image: "/images/Site Files/All on 4 Lee before and after.jpg",
  },
  {
    title: "Pano Overview",
    category: "Dental Implants",
    image: "/images/Site Files/pano before and after.jpg",
  },
  {
    title: "Cosmetic Reference",
    category: "Smile Design",
    image: "/images/Site Files/Veneers before and after.jpg",
  },
]

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max)
}

function BeforeAfterSlider() {
  const [position, setPosition] = useState(58)
  const sliderId = useId()

  return (
    <div className="relative overflow-hidden rounded-[2rem] border border-border bg-card shadow-[0_24px_80px_-30px_rgba(15,23,42,0.25)]">
      <div className="relative aspect-[4/3] sm:aspect-[16/10]">
        <Image
          src={featuredCase.afterImage}
          alt={`${featuredCase.title} after`}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 66vw"
          priority={false}
        />

        <div
          className="absolute inset-y-0 left-0 overflow-hidden"
          style={{ width: `${position}%` }}
        >
          <div className="relative h-full w-[calc(100vw)] max-w-none sm:w-full">
            <Image
              src={featuredCase.beforeImage}
              alt={`${featuredCase.title} before`}
              fill
              className="object-cover object-left"
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

      <div className="flex flex-col gap-4 border-t border-border/80 bg-white/88 px-5 py-5 backdrop-blur-sm sm:flex-row sm:items-end sm:justify-between sm:px-6">
        <div className="space-y-2">
          <Badge variant="outline" className="rounded-full border-sky-200 bg-sky-50/60 text-sky-700">
            {featuredCase.category}
          </Badge>
          <h3 className="font-display text-2xl font-semibold tracking-tight text-slate-950">
            {featuredCase.title}
          </h3>
          <p className="max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">
            {featuredCase.description}
          </p>
        </div>
        <p className="text-xs font-medium uppercase tracking-[0.24em] text-slate-500">
          Drag to compare
        </p>
      </div>
    </div>
  )
}

export function BeforeAfterPreview() {
  return (
    <Section>
      <SectionHeader
        subtitle="Real Results"
        title="See the Transformation"
        description="Explore before-and-after outcomes and compare treatment changes in a more visual way."
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mt-12 grid gap-8 lg:grid-cols-[minmax(0,1.45fr)_minmax(280px,0.8fr)]"
      >
        <BeforeAfterSlider />

        <div className="grid gap-5 sm:grid-cols-3 lg:grid-cols-1">
          {supportingCases.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: index * 0.08 }}
              className="group overflow-hidden rounded-[1.5rem] border border-border bg-card shadow-[0_18px_50px_-30px_rgba(15,23,42,0.22)]"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  sizes="(max-width: 1024px) 33vw, 24vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/10 to-transparent" />
                <div className="absolute left-4 top-4">
                  <Badge className="rounded-full bg-white/90 text-slate-900 hover:bg-white">{item.category}</Badge>
                </div>
              </div>
              <div className="space-y-2 px-5 py-4">
                <h3 className="font-semibold text-slate-950">{item.title}</h3>
                <p className="text-sm leading-6 text-slate-600">
                  Additional before-and-after references from our treatment gallery.
                </p>
              </div>
            </motion.div>
          ))}
        </div>
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
