"use client"

import { motion } from "framer-motion"
import { Check, Smile, Bone, Clock, Shield, Utensils } from "lucide-react"
import { Section, SectionHeader } from "@/components/section"

const benefits = [
  {
    icon: Smile,
    title: "Natural Appearance",
    description: "Implants look and feel like your own teeth, blending seamlessly with your smile.",
  },
  {
    icon: Bone,
    title: "Preserves Bone",
    description: "Stimulates your jawbone to prevent bone loss that occurs with missing teeth.",
  },
  {
    icon: Clock,
    title: "Long-Lasting",
    description: "With proper care, dental implants can last a lifetime unlike other options.",
  },
  {
    icon: Shield,
    title: "Protects Healthy Teeth",
    description: "No need to grind down adjacent teeth like traditional bridges require.",
  },
  {
    icon: Utensils,
    title: "Eat What You Love",
    description: "Chew confidently with the same force as natural teeth without restrictions.",
  },
  {
    icon: Check,
    title: "Easy Maintenance",
    description: "Care for implants just like natural teeth with brushing and flossing.",
  },
]

export function ImplantBenefits() {
  return (
    <Section variant="muted">
      <SectionHeader
        subtitle="Why Choose Implants?"
        title="Benefits of Dental Implants"
        description="Dental implants offer numerous advantages over traditional tooth replacement options."
      />
      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {benefits.map((benefit, index) => (
          <motion.div
            key={benefit.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="flex gap-4"
          >
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-accent/10">
              <benefit.icon className="h-6 w-6 text-accent" />
            </div>
            <div>
              <h3 className="font-semibold mb-1">{benefit.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {benefit.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  )
}
