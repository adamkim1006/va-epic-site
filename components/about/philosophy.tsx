"use client"

import { motion } from "framer-motion"
import { Heart, Target, Lightbulb, Users } from "lucide-react"
import { Section, SectionHeader } from "@/components/section"

const values = [
  {
    icon: Heart,
    title: "Patient-Centered Care",
    description: "Every treatment plan is tailored to your unique needs, goals, and concerns. We listen first, then create solutions.",
  },
  {
    icon: Target,
    title: "Clinical Excellence",
    description: "We maintain the highest standards of care through ongoing education and use of advanced technology and techniques.",
  },
  {
    icon: Lightbulb,
    title: "Education & Transparency",
    description: "We believe informed patients make the best decisions. We explain everything clearly and answer all your questions.",
  },
  {
    icon: Users,
    title: "Compassionate Team",
    description: "From your first call to your final follow-up, our entire team is dedicated to making your experience positive.",
  },
]

export function Philosophy() {
  return (
    <Section variant="muted">
      <SectionHeader
        subtitle="Our Philosophy"
        title="What Drives Us"
        description="Our mission is simple: provide exceptional periodontal and implant care in a comfortable, welcoming environment where every patient feels valued."
      />
      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
        {values.map((value, index) => (
          <motion.div
            key={value.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="flex gap-4"
          >
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-accent/10">
              <value.icon className="h-7 w-7 text-accent" />
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-2">{value.title}</h3>
              <p className="text-muted-foreground leading-relaxed">
                {value.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  )
}
