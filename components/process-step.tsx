"use client"

import { motion } from "framer-motion"
import { LucideIcon } from "lucide-react"

interface ProcessStepProps {
  step: number
  title: string
  description: string
  icon: LucideIcon
  index?: number
}

export function ProcessStep({ step, title, description, icon: Icon, index = 0 }: ProcessStepProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.15 }}
      className="relative flex flex-col items-center rounded-[1.75rem] border border-primary/10 bg-white/78 p-6 text-center shadow-sm backdrop-blur-sm dark:border-white/10 dark:bg-slate-950/72 dark:shadow-[0_24px_60px_-42px_rgba(0,0,0,0.85)]"
    >
      <div className="relative mb-4">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[linear-gradient(135deg,#4fd1d9_0%,#2563eb_100%)] text-white shadow-lg shadow-accent/20">
          <Icon className="h-7 w-7" />
        </div>
        <div className="absolute -top-2 -right-2 flex h-7 w-7 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold ring-4 ring-white dark:ring-slate-950">
          {step}
        </div>
      </div>
      
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
        {description}
      </p>
    </motion.div>
  )
}
