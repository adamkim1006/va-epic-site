"use client"

import { Section, SectionHeader } from "@/components/section"
import { ServiceCard } from "@/components/service-card"
import { servicePages } from "@/lib/site"

import { DentalImplantIcon, FullArchIcon, PeriodontalCareIcon } from "@/components/service-icons"

const services = [
  {
    title: servicePages[0].label,
    description: servicePages[0].shortDescription,
    href: servicePages[0].href,
    icon: DentalImplantIcon,
  },
  {
    title: servicePages[1].label,
    description: servicePages[1].shortDescription,
    href: servicePages[1].href,
    icon: FullArchIcon,
  },
  {
    title: servicePages[2].label,
    description: servicePages[2].shortDescription,
    href: servicePages[2].href,
    icon: PeriodontalCareIcon,
  },
]

export function ServicesSection() {
  return (
    <Section
      backgroundImageSrc="/images/Site%20Files/20210709_125021.jpg"
      backgroundPosition="center 32%"
      backgroundOpacity={0.24}
    >
      <SectionHeader
        subtitle="Our Services"
        title="Comprehensive Implant & Periodontal Care"
        description="From single-tooth implant planning to full-arch reconstruction and advanced gum treatment, our services are designed around diagnosis, stability, and long-term function."
      />
      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service, index) => (
          <ServiceCard key={service.href} {...service} index={index} />
        ))}
      </div>
    </Section>
  )
}
