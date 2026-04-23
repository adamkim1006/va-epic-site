"use client"

import { motion } from "framer-motion"
import { Star } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

interface TestimonialCardProps {
  name: string
  content: string
  rating: number
  treatment: string
  relativeTime?: string
  authorUrl?: string
  sourceUrl?: string
  index?: number
}

export function TestimonialCard({
  name,
  content,
  rating,
  treatment,
  relativeTime,
  sourceUrl,
  index = 0,
}: TestimonialCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="h-full"
    >
      <Card className="h-full max-h-[500px] w-full max-w-[440px] border-primary/10 bg-white/88 shadow-sm backdrop-blur-sm">
        <CardContent className="flex h-full flex-col pt-6">
          <div className="mb-5 h-1.5 w-14 rounded-full brand-gradient" />
          <div className="flex gap-1 mb-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`h-5 w-5 ${
                  i < rating ? "fill-amber-400 text-amber-400" : "text-muted"
                }`}
              />
            ))}
          </div>
          <blockquote className="mb-4 min-h-0 flex-1 overflow-y-auto pr-2 text-foreground leading-relaxed [scrollbar-width:thin]">
            &ldquo;{content}&rdquo;
          </blockquote>
          <div className="border-t border-primary/10 pt-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="font-semibold uppercase tracking-[0.18em] text-foreground">{name}</p>
                <p className="text-sm text-muted-foreground">{treatment}</p>
              </div>
              {relativeTime ? (
                <span className="rounded-full bg-secondary px-2.5 py-1 text-[11px] font-medium text-muted-foreground">
                  {relativeTime}
                </span>
              ) : null}
            </div>
            {sourceUrl ? (
              <a
                href={sourceUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="mt-3 inline-flex text-sm font-medium text-primary transition-colors hover:text-accent"
              >
                View on Google
              </a>
            ) : null}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
