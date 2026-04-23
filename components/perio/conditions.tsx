"use client"

import { motion } from "framer-motion"
import { AlertCircle } from "lucide-react"
import { Section, SectionHeader } from "@/components/section"

const conditions = [
  {
    stage: "Gingivitis",
    severity: "Early Stage",
    symptoms: ["Red, swollen gums", "Bleeding when brushing", "Bad breath"],
    description: "The earliest and most treatable form of gum disease. With proper care, gingivitis can be completely reversed.",
  },
  {
    stage: "Mild Periodontitis",
    severity: "Moderate",
    symptoms: ["Gum recession", "Deeper pockets forming", "Slight bone loss"],
    description: "The disease has progressed below the gumline. Professional treatment is needed to prevent further damage.",
  },
  {
    stage: "Moderate Periodontitis",
    severity: "Advanced",
    symptoms: ["Increased bone loss", "Tooth mobility", "Pus between teeth"],
    description: "Significant damage to the supporting structures. Aggressive treatment is required to save affected teeth.",
  },
  {
    stage: "Severe Periodontitis",
    severity: "Critical",
    symptoms: ["Major bone loss", "Loose teeth", "Tooth loss risk"],
    description: "The most advanced stage requiring intensive treatment. Some teeth may not be salvageable at this point.",
  },
]

export function PerioConditions() {
  return (
    <Section variant="muted">
      <SectionHeader
        subtitle="Conditions We Treat"
        title="Stages of Periodontal Disease"
        description="Understanding the progression of gum disease helps you recognize warning signs and seek treatment early."
      />
      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
        {conditions.map((condition, index) => (
          <motion.div
            key={condition.stage}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-card rounded-xl p-6 border border-border"
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="font-semibold text-lg">{condition.stage}</h3>
                <span className={`inline-block text-xs font-medium px-2 py-1 rounded-full mt-1 ${
                  index === 0 ? "bg-green-100 text-green-700" :
                  index === 1 ? "bg-yellow-100 text-yellow-700" :
                  index === 2 ? "bg-orange-100 text-orange-700" :
                  "bg-red-100 text-red-700"
                }`}>
                  {condition.severity}
                </span>
              </div>
              <AlertCircle className={`h-5 w-5 ${
                index === 0 ? "text-green-500" :
                index === 1 ? "text-yellow-500" :
                index === 2 ? "text-orange-500" :
                "text-red-500"
              }`} />
            </div>
            <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
              {condition.description}
            </p>
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-2">
                Common Symptoms:
              </p>
              <ul className="space-y-1">
                {condition.symptoms.map((symptom, i) => (
                  <li key={i} className="text-sm text-muted-foreground flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                    {symptom}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  )
}
