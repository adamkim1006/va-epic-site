import { Metadata } from "next"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { HeroSection } from "@/components/hero-section"
import { Section, SectionHeader } from "@/components/section"
import { CTASection } from "@/components/cta-section"
import { buildMetadata } from "@/lib/seo"
import { servicePages } from "@/lib/site"

export const metadata: Metadata = buildMetadata(
  "Our Services",
  "Explore dental implants, All-on-X full-arch reconstruction, and periodontal care at VA EPIC in Chantilly, Virginia.",
  "/our-services"
)

export default function OurServicesPage() {
  return (
    <>
      <Navigation />
      <main id="main-content">
        <HeroSection
          subtitle="Our Services"
          title="Specialist Care for Implants, Gums, and Full-Arch Reconstruction"
          description="VA EPIC provides focused care for patients dealing with missing teeth, failing dental work, gum recession, periodontal disease, and complex treatment decisions. Explore the service area that best matches your needs."
          primaryButtonText="Schedule Consultation"
          primaryButtonHref="/contact"
          backgroundImageSrc="/images/Site Files/1611800618164-8.jpg"
          backgroundPosition="center 48%"
        />

        <Section>
          <SectionHeader
            subtitle="Treatment Areas"
            title="Explore Our Core Services"
            description="Each service is built around diagnosis, planning, and long-term function, with treatment tailored to your oral health, goals, and restorative needs."
          />
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {servicePages.map((service) => (
              <Link
                key={service.href}
                href={service.href}
                className="group rounded-2xl border border-border bg-card p-8 transition-all hover:-translate-y-1 hover:border-accent/40 hover:shadow-lg"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-accent">
                  Specialty Service
                </p>
                <h3 className="mt-4 text-2xl font-semibold text-foreground">
                  {service.label}
                </h3>
                <p className="mt-4 leading-relaxed text-muted-foreground">
                  {service.shortDescription}
                </p>
                <span className="mt-6 inline-flex items-center text-sm font-medium text-accent">
                  Learn More
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            ))}
          </div>
        </Section>

        <Section variant="muted">
          <SectionHeader
            subtitle="Why Patients Visit"
            title="When It Is Time to See VA EPIC"
            description="Patients commonly come to us when they want a second opinion, have been told teeth may need to be removed, or need a specialist to guide implant and periodontal treatment planning."
          />
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              "You have one or more missing teeth and want a long-term replacement option.",
              "You have loose teeth, bleeding gums, or gum recession and want to preserve your natural teeth when possible.",
              "You are considering full-arch reconstruction after years of failing dentition or removable dentures.",
              "You want a clearer diagnosis before committing to extensive restorative or surgical treatment.",
            ].map((item) => (
              <div key={item} className="rounded-2xl border border-border bg-card p-6 text-muted-foreground">
                {item}
              </div>
            ))}
          </div>
        </Section>

        <CTASection
          title="Not Sure Which Service Fits Best?"
          description="That is exactly what the consultation is for. We can evaluate your condition, explain the diagnosis clearly, and help you understand the most sensible path forward."
        />
      </main>
      <Footer />
    </>
  )
}
