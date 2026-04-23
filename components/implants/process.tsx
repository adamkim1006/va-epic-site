"use client"

import { motion } from "framer-motion"
import { Section, SectionHeader } from "@/components/section"

const processSteps = [
  {
    step: 1,
    title: "Initial Consultation",
    duration: "Day 1",
    description: "Comprehensive exam, 3D imaging, and personalized treatment planning. We discuss your goals and answer all your questions.",
  },
  {
    step: 2,
    title: "Implant Placement",
    duration: "2-4 Weeks Later",
    description: "The titanium implant is precisely placed into your jawbone. This outpatient procedure typically takes 1-2 hours per implant.",
  },
  {
    step: 3,
    title: "Healing Period",
    duration: "3-6 Months",
    description: "The implant integrates with your bone through osseointegration. We monitor your healing with follow-up appointments.",
  },
  {
    step: 4,
    title: "Abutment Placement",
    duration: "After Healing",
    description: "Once healed, we attach the abutment that will connect your implant to the crown. This is a minor procedure.",
  },
  {
    step: 5,
    title: "Crown Placement",
    duration: "2-3 Weeks Later",
    description: "Your custom-made crown is attached, completing your new tooth. You leave with a beautiful, functional smile.",
  },
]

export function ImplantProcess() {
  return (
    <Section variant="muted">
      <SectionHeader
        subtitle="The Process"
        title="Your Dental Implant Journey"
        description="We guide you through every step, ensuring a comfortable experience and optimal results."
      />
      <div className="mt-12 max-w-4xl mx-auto">
        {processSteps.map((step, index) => (
          <motion.div
            key={step.step}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="relative flex gap-6 pb-12 last:pb-0"
          >
            {/* Timeline line */}
            {index !== processSteps.length - 1 && (
              <div className="absolute left-6 top-14 bottom-0 w-px bg-border" />
            )}
            {/* Step number */}
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-accent text-accent-foreground font-bold">
              {step.step}
            </div>
            {/* Content */}
            <div className="flex-1 pt-1">
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
                <h3 className="font-semibold text-lg">{step.title}</h3>
                <span className="inline-flex items-center rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground">
                  {step.duration}
                </span>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                {step.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  )
}
