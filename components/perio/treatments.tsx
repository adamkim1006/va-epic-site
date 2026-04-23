"use client"

import { motion } from "framer-motion"
import { Sparkles, Scissors, Bone, RefreshCw } from "lucide-react"
import { Section, SectionHeader } from "@/components/section"

const treatments = [
  {
    icon: Sparkles,
    title: "Scaling & Root Planing",
    description: "Deep cleaning below the gumline to remove plaque, tartar, and bacteria. The root surfaces are smoothed to help gums reattach to teeth.",
    ideal: "For mild to moderate periodontitis",
  },
  {
    icon: Scissors,
    title: "Gum Grafting",
    description: "Tissue is taken from another area (often the palate) to cover exposed roots and restore the gumline. This protects roots and improves aesthetics.",
    ideal: "For gum recession",
  },
  {
    icon: Bone,
    title: "Bone Grafting",
    description: "Regenerative procedure that rebuilds bone lost to periodontal disease. Essential for maintaining tooth stability and preparing for implants.",
    ideal: "For bone loss from periodontitis",
  },
  {
    icon: RefreshCw,
    title: "LANAP Laser Therapy",
    description: "Minimally invasive laser treatment that targets diseased tissue while preserving healthy gum. Faster healing and less discomfort than traditional surgery.",
    ideal: "For moderate to severe periodontitis",
  },
]

export function PerioTreatments() {
  return (
    <Section>
      <SectionHeader
        subtitle="Treatment Options"
        title="Comprehensive Periodontal Care"
        description="We offer a range of treatments tailored to your specific condition and needs."
      />
      <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-6">
        {treatments.map((treatment, index) => (
          <motion.div
            key={treatment.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="flex gap-4 p-6 bg-card rounded-xl border border-border"
          >
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-accent/10">
              <treatment.icon className="h-7 w-7 text-accent" />
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-2">{treatment.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-3">
                {treatment.description}
              </p>
              <span className="inline-block text-xs font-medium text-accent bg-accent/10 px-3 py-1 rounded-full">
                {treatment.ideal}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  )
}
