"use client"

import { motion } from "framer-motion"
import { Check, FileText } from "lucide-react"
import { Section, SectionHeader } from "@/components/section"
import { insuranceProviders } from "@/lib/site"

const coverageInfo = [
  "We verify your benefits before treatment",
  "We file claims directly with your insurance",
  "We maximize your annual benefits",
  "We explain your coverage clearly",
]

export function InsuranceSection() {
  return (
    <Section variant="muted">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div>
          <SectionHeader
            align="left"
            subtitle="Insurance"
            title="We Work With Your Insurance"
            description="We help patients understand PPO benefits, estimate out-of-pocket costs, and coordinate claims whenever possible so you can make decisions with clearer financial expectations."
          />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-6 space-y-3"
          >
            {coverageInfo.map((item, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent/10">
                  <Check className="h-4 w-4 text-accent" />
                </div>
                <span className="text-muted-foreground">{item}</span>
              </div>
            ))}
          </motion.div>
        </div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-card rounded-2xl p-8 border border-border"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10">
              <FileText className="h-5 w-5 text-accent" />
            </div>
            <h3 className="font-semibold text-lg">Accepted Insurance Providers</h3>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {insuranceProviders.map((provider, index) => (
              <motion.div
                key={provider}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="flex items-center gap-2 text-sm text-muted-foreground"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                {provider}
              </motion.div>
            ))}
          </div>
          <p className="mt-6 text-sm text-muted-foreground">
            Do not see your provider? Contact the office and we can help review your benefits.
          </p>
        </motion.div>
      </div>
    </Section>
  )
}
