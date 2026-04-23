"use client"

import { motion } from "framer-motion"
import { Section, SectionHeader } from "@/components/section"

const timelineSteps = [
  {
    phase: "Consultation",
    time: "Week 1",
    description: "Comprehensive evaluation with 3D imaging, treatment planning, and discussion of your goals and expectations.",
  },
  {
    phase: "Pre-Surgery Planning",
    time: "Week 2-3",
    description: "Digital smile design, surgical guide fabrication, and preparation of your temporary prosthesis.",
  },
  {
    phase: "Surgery Day",
    time: "Procedure Day",
    description: "Extraction of remaining teeth if needed, implant placement, and attachment of your temporary fixed bridge. All in one visit.",
  },
  {
    phase: "Healing Period",
    time: "3-6 Months",
    description: "Your implants integrate with the bone while you enjoy your temporary teeth. Regular check-ups monitor progress.",
  },
  {
    phase: "Final Restoration",
    time: "After Healing",
    description: "Your custom permanent prosthesis is crafted and placed, completing your smile transformation.",
  },
]

export function AllOnXProcess() {
  return (
    <Section variant="muted">
      <SectionHeader
        subtitle="The Timeline"
        title="Your All-on-X Journey"
        description="From consultation to final restoration, here&apos;s what to expect."
      />
      <div className="mt-12 max-w-4xl mx-auto">
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-4 sm:left-1/2 sm:-translate-x-px top-0 bottom-0 w-0.5 bg-border" />
          
          {timelineSteps.map((step, index) => (
            <motion.div
              key={step.phase}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`relative flex items-start gap-6 pb-12 last:pb-0 ${
                index % 2 === 0 ? "sm:flex-row" : "sm:flex-row-reverse"
              }`}
            >
              {/* Dot */}
              <div className="absolute left-4 sm:left-1/2 sm:-translate-x-1/2 w-3 h-3 rounded-full bg-accent border-4 border-background" />
              
              {/* Content */}
              <div className={`flex-1 ml-12 sm:ml-0 ${index % 2 === 0 ? "sm:pr-12 sm:text-right" : "sm:pl-12"}`}>
                <span className="inline-block text-xs font-medium text-accent uppercase tracking-wider mb-1">
                  {step.time}
                </span>
                <h3 className="font-semibold text-lg mb-2">{step.phase}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
              
              {/* Spacer for alternating layout */}
              <div className="hidden sm:block flex-1" />
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  )
}
