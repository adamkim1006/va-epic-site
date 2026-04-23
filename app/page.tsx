import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { HeroSection } from "@/components/hero-section"
import { ServicesSection } from "@/components/home/services-section"
import { TestimonialsSection } from "@/components/home/testimonials-section"
import { CandidateSection } from "@/components/home/candidate-section"
import { ProcessSection } from "@/components/home/process-section"
import { FinancingSection } from "@/components/home/financing-section"
import { DoctorSection } from "@/components/home/doctor-section"
import { CTASection } from "@/components/cta-section"
import { SiteFilesCarousel } from "@/components/site-files-carousel"
import { editablePageContent } from "@/content/site-content"

export default function HomePage() {
  return (
    <>
      <Navigation />
      <main id="main-content">
        <HeroSection
          subtitle={editablePageContent.homeHero.subtitle}
          title={editablePageContent.homeHero.title}
          description={editablePageContent.homeHero.description}
          primaryButtonText="Schedule Consultation"
          primaryButtonHref="/contact"
          secondaryButtonText="Explore Our Services"
          secondaryButtonHref="/our-services"
          backgroundImageSrc="/images/Site Files/20210719_140741.jpg"
          backgroundPosition="center 42%"
        />
        <DoctorSection />
        <ServicesSection />
        <CandidateSection />
        <ProcessSection />
        <FinancingSection />
        {/* <SiteFilesCarousel /> */}
        <TestimonialsSection />
        <CTASection />
      </main>
      <Footer />
    </>
  )
}
