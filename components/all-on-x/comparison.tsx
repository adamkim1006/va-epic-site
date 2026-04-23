"use client"

import { motion } from "framer-motion"
import { Check, X } from "lucide-react"
import { Section, SectionHeader } from "@/components/section"

const comparisonData = [
  {
    feature: "Stability",
    dentures: "May slip or click",
    allOnX: "Permanently fixed",
  },
  {
    feature: "Bone Preservation",
    dentures: "Bone loss continues",
    allOnX: "Stimulates bone growth",
  },
  {
    feature: "Taste & Sensation",
    dentures: "Covers palate, reduced taste",
    allOnX: "Full taste sensation",
  },
  {
    feature: "Diet Restrictions",
    dentures: "Many foods to avoid",
    allOnX: "Eat anything you want",
  },
  {
    feature: "Maintenance",
    dentures: "Daily removal, soaking",
    allOnX: "Brush like natural teeth",
  },
  {
    feature: "Adhesives Needed",
    dentures: "Often required",
    allOnX: "Never needed",
  },
  {
    feature: "Longevity",
    dentures: "Replace every 5-7 years",
    allOnX: "Lifetime with care",
  },
]

export function AllOnXComparison() {
  return (
    <Section>
      <SectionHeader
        subtitle="Comparison"
        title="All-on-X vs. Traditional Dentures"
        description="See how All-on-X compares to traditional removable dentures."
      />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mt-12 overflow-x-auto"
      >
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-4 px-4 font-semibold">Feature</th>
              <th className="text-left py-4 px-4 font-semibold">Traditional Dentures</th>
              <th className="text-left py-4 px-4 font-semibold text-accent">All-on-X</th>
            </tr>
          </thead>
          <tbody>
            {comparisonData.map((row, index) => (
              <motion.tr
                key={row.feature}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="border-b border-border last:border-0"
              >
                <td className="py-4 px-4 font-medium">{row.feature}</td>
                <td className="py-4 px-4">
                  <span className="flex items-center gap-2 text-muted-foreground">
                    <X className="h-4 w-4 text-destructive" />
                    {row.dentures}
                  </span>
                </td>
                <td className="py-4 px-4">
                  <span className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-accent" />
                    {row.allOnX}
                  </span>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </motion.div>
    </Section>
  )
}
