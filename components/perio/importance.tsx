"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Heart, Brain, Shield, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Section, SectionHeader } from "@/components/section"

const connections = [
  {
    icon: Heart,
    title: "Heart Health",
    description: "Gum disease is linked to increased risk of heart disease and stroke due to inflammation.",
  },
  {
    icon: Brain,
    title: "Diabetes",
    description: "Periodontal disease can make blood sugar harder to control and vice versa.",
  },
  {
    icon: Shield,
    title: "Immune System",
    description: "Chronic oral infections can strain your immune system and affect overall health.",
  },
]

export function PerioImportance() {
  return (
    <Section variant="muted">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div>
          <SectionHeader
            align="left"
            subtitle="Why It Matters"
            title="The Mouth-Body Connection"
            description="Your oral health is deeply connected to your overall health. Research shows strong links between periodontal disease and several systemic conditions."
          />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-8 space-y-6"
          >
            {connections.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="flex gap-4"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-accent/10">
                  <item.icon className="h-6 w-6 text-accent" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">{item.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </motion.div>
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
          <h3 className="font-semibold text-xl mb-4">Early Treatment Saves Teeth</h3>
          <p className="text-muted-foreground leading-relaxed mb-6">
            The earlier periodontal disease is caught, the easier it is to treat. Regular dental check-ups and cleanings are your first line of defense. If you notice any warning signs like bleeding gums, persistent bad breath, or loose teeth, do not wait.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-8">
            Our team specializes in diagnosing and treating all stages of gum disease. We create personalized treatment plans to restore your gum health and prevent future problems.
          </p>
          <Button asChild size="lg">
            <Link href="/contact">
              Schedule Your Evaluation
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </Section>
  )
}
