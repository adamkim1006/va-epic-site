"use client"

import { motion } from "framer-motion"
import { Clock, Smile, Bone, Heart, DollarSign, Sparkles } from "lucide-react"
import { Section, SectionHeader } from "@/components/section"

const benefits = [
  {
    icon: Clock,
    title: "Same-Day Results",
    description: "Walk out with a full set of teeth on the day of your procedure.",
  },
  {
    icon: Smile,
    title: "Natural Appearance",
    description: "Custom-designed to match your facial features and desired smile.",
  },
  {
    icon: Bone,
    title: "Preserves Jawbone",
    description: "Implants stimulate bone growth, preventing facial collapse.",
  },
  {
    icon: Heart,
    title: "Improved Quality of Life",
    description: "Eat, speak, and smile with complete confidence again.",
  },
  {
    icon: DollarSign,
    title: "Cost-Effective",
    description: "More affordable than replacing each tooth individually.",
  },
  {
    icon: Sparkles,
    title: "Easy Maintenance",
    description: "Care is simple with regular brushing and dental check-ups.",
  },
]

export function AllOnXBenefits() {
  return (
    <Section variant="muted">
      <SectionHeader
        subtitle="Why All-on-X?"
        title="Benefits Over Traditional Dentures"
        description="All-on-X offers significant advantages over removable dentures and traditional implant approaches."
      />
      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {benefits.map((benefit, index) => (
          <motion.div
            key={benefit.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-card rounded-xl p-6 border border-border"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 mb-4">
              <benefit.icon className="h-6 w-6 text-accent" />
            </div>
            <h3 className="font-semibold mb-2">{benefit.title}</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              {benefit.description}
            </p>
          </motion.div>
        ))}
      </div>
    </Section>
  )
}
