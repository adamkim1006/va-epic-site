"use client"

import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { Award, GraduationCap, Heart, ArrowRight } from "lucide-react"
import { editablePageContent } from "@/content/site-content"
import { Button } from "@/components/ui/button"
import { Section, SectionHeader } from "@/components/section"

const credentials = [
  {
    icon: GraduationCap,
    title: "Board Certified",
    description: "American Board of Periodontology and Implantology",
  },
  {
    icon: Award,
    title: "26+ Years of Service",
    description: "US Army periodontist and implant specialist",
  },
  {
    icon: Heart,
    title: "Diagnosis-Driven Care",
    description: "Personalized planning for every patient",
  },
]

export function DoctorSection() {
  return (
    <Section variant="muted">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative mx-auto w-full max-w-xl lg:mx-0"
        >
          <div className="brand-gradient-soft rounded-[2.3rem] border border-accent/15 p-6 shadow-sm">
            <div className="rounded-[1.8rem] bg-white p-6 ring-1 ring-border/80">
              <div className="relative mx-auto aspect-[4/5] max-w-[360px] overflow-hidden rounded-[1.6rem] bg-secondary">
                <Image
                  src="/images/dong-park-profile-id-photo.png"
                  alt="Dr. Dong-Soo Park"
                  fill
                  className="object-contain p-3"
                />
              </div>
            </div>
          </div>
        </motion.div>
        <div>
          <SectionHeader
            align="left"
            subtitle={editablePageContent.doctorSection.subtitle}
            title={editablePageContent.doctorSection.title}
            description={editablePageContent.doctorSection.description}
          />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="mt-6 space-y-4"
          >
            {credentials.map((credential, index) => (
              <motion.div
                key={credential.title}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="flex items-center gap-3"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10">
                  <credential.icon className="h-5 w-5 text-accent" />
                </div>
                <div>
                  <p className="font-medium">{credential.title}</p>
                  <p className="text-sm text-muted-foreground">{credential.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-8"
          >
            <Button asChild variant="outline" size="lg">
              <Link href="/about">
                Learn More About Dr. Park
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </div>
    </Section>
  )
}
