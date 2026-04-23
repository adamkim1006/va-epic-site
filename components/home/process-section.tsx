"use client"

import { MessageCircle, ScanSearch, Wrench, Heart } from "lucide-react"
import { Section, SectionHeader } from "@/components/section"
import { ProcessStep } from "@/components/process-step"

const processSteps = [
  {
    step: 1,
    title: "Consultation",
    description: "We discuss your goals, review your medical history, and perform a comprehensive examination to create your personalized treatment plan.",
    icon: MessageCircle,
  },
  {
    step: 2,
    title: "Planning",
    description: "Using advanced 3D imaging, we map out every detail of your procedure to ensure precision and optimal results.",
    icon: ScanSearch,
  },
  {
    step: 3,
    title: "Procedure",
    description: "Your treatment is performed with the latest techniques and technology, prioritizing your comfort throughout the process.",
    icon: Wrench,
  },
  {
    step: 4,
    title: "Recovery",
    description: "We provide detailed aftercare instructions and follow-up appointments to ensure a smooth healing process and lasting results.",
    icon: Heart,
  },
]

export function ProcessSection() {
  return (
    <Section
      variant="muted"
      backgroundImageSrc="/images/Site%20Files/CT%20Image.JPG"
      backgroundPosition="center"
      backgroundOpacity={0.2}
    >
      <SectionHeader
        subtitle="Our Process"
        title="Your Journey to a Healthier Smile"
        description="We make the process simple, comfortable, and transparent from start to finish."
      />
      <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
        {processSteps.map((step, index) => (
          <ProcessStep key={step.step} {...step} index={index} />
        ))}
      </div>
    </Section>
  )
}
