"use client"

import { motion } from "framer-motion"
import { Section, SectionHeader } from "@/components/section"

const team = [
  {
    name: "Patient Coordination",
    role: "Scheduling & Support",
    description: "Our front-office team helps new and returning patients navigate scheduling, consultation questions, and treatment coordination.",
  },
  {
    name: "Clinical Support",
    role: "Surgical Assistance",
    description: "Our clinical team supports implant and periodontal procedures with a strong focus on comfort, preparation, and follow-up care.",
  },
  {
    name: "Insurance Guidance",
    role: "Benefits Coordination",
    description: "We help patients understand insurance details, consultation flow, and next steps so treatment planning feels more manageable.",
  },
  {
    name: "Restorative Planning",
    role: "Case Collaboration",
    description: "When needed, we coordinate closely with restorative providers so surgical and prosthodontic planning stay aligned from the start.",
  },
]

export function TeamSection() {
  return (
    <Section>
      <SectionHeader
        subtitle="Our Team"
        title="The Faces Behind Your Care"
        description="Our dedicated team works together to provide you with the highest level of care and service."
      />
      <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {team.map((member, index) => (
          <motion.div
            key={member.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-card rounded-xl border border-border overflow-hidden"
          >
            <div className="aspect-square bg-secondary flex items-center justify-center">
              <span className="text-muted-foreground text-sm">Photo</span>
            </div>
            <div className="p-5">
              <h3 className="font-semibold">{member.name}</h3>
              <p className="text-sm text-accent mb-2">{member.role}</p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {member.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  )
}
