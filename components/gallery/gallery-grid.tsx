"use client"

import { motion } from "framer-motion"

const cases = [
  {
    id: 1,
    category: "Dental Implants",
    title: "Single Tooth Replacement",
    description: "Patient received a single implant to replace a missing molar.",
  },
  {
    id: 2,
    category: "All-on-X",
    title: "Full Arch Restoration",
    description: "Complete smile transformation with All-on-4 implants.",
  },
  {
    id: 3,
    category: "Periodontal",
    title: "Gum Grafting",
    description: "Treatment of severe gum recession with connective tissue graft.",
  },
  {
    id: 4,
    category: "Dental Implants",
    title: "Multiple Implants",
    description: "Three adjacent teeth replaced with individual implants.",
  },
  {
    id: 5,
    category: "All-on-X",
    title: "Upper Arch Restoration",
    description: "Full upper arch replaced with All-on-6 technique.",
  },
  {
    id: 6,
    category: "Periodontal",
    title: "Bone Regeneration",
    description: "Successful bone grafting before implant placement.",
  },
  {
    id: 7,
    category: "Dental Implants",
    title: "Front Tooth Implant",
    description: "Aesthetic anterior implant with custom crown.",
  },
  {
    id: 8,
    category: "All-on-X",
    title: "Lower Arch Restoration",
    description: "Complete lower arch replacement with immediate loading.",
  },
]

export function GalleryGrid() {
  return (
    <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {cases.map((item, index) => (
        <motion.div
          key={item.id}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: index * 0.05 }}
          className="group cursor-pointer"
        >
          <div className="relative aspect-square rounded-xl bg-secondary border border-border overflow-hidden mb-3">
            {/* Before/After Split View */}
            <div className="absolute inset-0 flex">
              <div className="w-1/2 bg-secondary/80 flex items-center justify-center border-r border-border">
                <span className="text-xs text-muted-foreground font-medium">Before</span>
              </div>
              <div className="w-1/2 bg-secondary flex items-center justify-center">
                <span className="text-xs text-muted-foreground font-medium">After</span>
              </div>
            </div>
            {/* Hover Overlay */}
            <div className="absolute inset-0 bg-primary/90 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-4">
              <p className="text-primary-foreground text-sm text-center">
                {item.description}
              </p>
            </div>
          </div>
          <span className="text-xs font-medium text-accent">{item.category}</span>
          <h3 className="font-semibold text-sm mt-1">{item.title}</h3>
        </motion.div>
      ))}
    </div>
  )
}
