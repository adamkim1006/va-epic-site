import { Metadata } from "next"
import Image from "next/image"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { HeroSection } from "@/components/hero-section"
import { Section, SectionHeader } from "@/components/section"
import { CTASection } from "@/components/cta-section"
import { DoctorProfile } from "@/components/about/doctor-profile"
import { Philosophy } from "@/components/about/philosophy"
import { TeamSection } from "@/components/about/team-section"

export const metadata: Metadata = {
  title: "About Us",
  description: "Meet Dr. Dong-Soo Park and learn about the diagnosis-driven, specialist approach behind VA EPIC in Chantilly, Virginia.",
}

const importedImages = [
  {
    src: "/images/Site Files/reception-area.jpg",
    alt: "Reception Area",
  },
  {
    src: "/images/Site Files/technology-suite.jpg",
    alt: "Technology Suite",
  },
  {
    src: "/images/Site Files/treatment-room.jpg",
    alt: "Treatment Room",
  }
] as const

export default function AboutPage() {
  return (
    <>
      <Navigation />
      <main id="main-content">
        <HeroSection
          subtitle="About Us"
          title="A Specialist Practice Built Around Clarity and Precision"
          description="At VA EPIC, we combine advanced periodontal and implant expertise with straightforward communication. Our goal is to help patients understand their condition, their options, and the path that best protects long-term function and health."
          primaryButtonText="Meet Dr. Park"
          primaryButtonHref="#doctor"
          showAnimatedBackground={false}
          backgroundImageSrc="/images/Site Files/1626896176227-4.jpg"
          backgroundPosition="center 44%"
        />
        
        <DoctorProfile />
        <Philosophy />
        {/* <TeamSection /> */}

        <Section >
          <SectionHeader
            subtitle="Our Office"
            title="A Modern Office Designed for Thoughtful Care"
            description="Our office is built to support careful diagnosis, efficient treatment planning, and a comfortable patient experience from the first consultation through follow-up care."
          />
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            {["Reception Area", "Technology Suite", "Treatment Room"].map((area, index) => (
              <div
                key={area}
                className="aspect-[4/3] rounded-2xl bg-secondary border border-border overflow-hidden relative"
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-muted-foreground text-sm">{area}</span>
                  <Image
                    src={importedImages[index].src}
                    alt={importedImages[index].alt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 88vw, (max-width: 1280px) 50vw, 33vw"
                  />
                </div>
              </div>
            ))}
          </div>
        </Section>

        <CTASection
          title="Ready to Experience the Difference?"
          description="Schedule your consultation and learn how VA EPIC approaches implant and periodontal care with clarity, precision, and long-term planning."
        />
      </main>
      <Footer />
    </>
  )
}
