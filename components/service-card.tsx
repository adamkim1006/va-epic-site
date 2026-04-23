"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, LucideIcon } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface ServiceCardProps {
  title: string
  description: string
  href: string
  icon: LucideIcon
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
        <Card className="h-full overflow-hidden border-primary/10 bg-white/88 shadow-sm backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-xl">
          <CardHeader>
            <div className="mb-4 h-1 w-16 rounded-full brand-gradient" />
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[linear-gradient(135deg,rgba(79,209,217,0.22)_0%,rgba(37,99,235,0.12)_100%)] text-primary mb-4 ring-1 ring-accent/20 group-hover:bg-accent group-hover:text-accent-foreground transition-colors">
              <Icon className="h-6 w-6" />
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
