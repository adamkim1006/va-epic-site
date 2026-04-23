"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"

const filters = [
  { id: "all", label: "All Cases" },
  { id: "implants", label: "Dental Implants" },
  { id: "all-on-x", label: "All-on-X" },
  { id: "periodontal", label: "Periodontal" },
]

export function GalleryFilters() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mt-8 flex flex-wrap justify-center gap-3"
    >
      {filters.map((filter, index) => (
        <Button
          key={filter.id}
          variant={index === 0 ? "default" : "outline"}
          size="sm"
          className="rounded-full"
        >
          {filter.label}
        </Button>
      ))}
    </motion.div>
  )
}
