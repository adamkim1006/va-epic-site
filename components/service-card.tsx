"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ComponentType, SVGProps } from "react"

interface ServiceCardProps {
  title: string
  description: string
  href: string
  icon: ComponentType<SVGProps<SVGSVGElement> & { size?: number | string }>
  index?: number
}

export function ServiceCard({ title, description, href, icon: Icon, index = 0 }: ServiceCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Link href={href} className="block group">
        <Card className="h-full overflow-hidden border-primary/10 bg-white/88 shadow-sm backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-xl dark:border-white/10 dark:bg-slate-950/72 dark:shadow-[0_24px_60px_-42px_rgba(0,0,0,0.85)]">
          <CardHeader>
            <div className="mb-4 h-1 w-16 rounded-full brand-gradient" />
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[linear-gradient(135deg,rgba(79,209,217,0.22)_0%,rgba(37,99,235,0.12)_100%)] text-primary ring-1 ring-accent/20 transition-colors group-hover:bg-accent group-hover:text-accent-foreground dark:bg-[linear-gradient(135deg,rgba(79,209,217,0.18)_0%,rgba(37,99,235,0.24)_100%)] dark:text-accent dark:ring-accent/25">
              <Icon size={32} />
            </div>
            <CardTitle className="text-xl group-hover:text-primary transition-colors">
              {title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground leading-relaxed mb-4">
              {description}
            </p>
            <span className="inline-flex items-center text-sm font-medium text-primary group-hover:gap-2 transition-all">
              Learn More
              <ArrowRight className="h-4 w-4 ml-1 transition-transform group-hover:translate-x-1" />
            </span>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  )
}