import { Metadata } from "next"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { HeroSection } from "@/components/hero-section"
import { Section, SectionHeader } from "@/components/section"
import { CTASection } from "@/components/cta-section"
import { FAQSection } from "@/components/faq-section"
import { PerioConditions } from "@/components/perio/conditions"
import { PerioTreatments } from "@/components/perio/treatments"
import { PerioImportance } from "@/components/perio/importance"
import { PerioReversalScene } from "@/components/three/perio-reversal-scene"

export const metadata: Metadata = {
  title: "Periodontal Treatment in Chantilly, VA",
  description: "Expert periodontal treatment in Chantilly, Virginia for gum disease, recession, bone loss, and long-term tooth support.",
}

const faqItems = [
  {
    question: "What symptoms suggest I may need periodontal treatment?",
    answer:
      "Common signs include bleeding gums, gum recession, persistent bad breath, loose teeth, bite changes, or being told you have bone loss. A periodontal evaluation can help determine what is happening and how advanced it is.",
  },
  {
    question: "Can gum disease be treated without losing teeth?",
    answer:
      "Often, yes. Early and moderate cases can frequently be stabilized with timely periodontal treatment and maintenance. Even in advanced cases, the goal is to preserve teeth whenever the long-term prognosis makes sense.",
  },
  {
    question: "Do all periodontal problems require surgery?",
    answer:
      "No. Treatment depends on the diagnosis. Some conditions can be managed with non-surgical therapy and maintenance, while others benefit from grafting, pocket reduction, or other surgical procedures.",
  },
]

export default function PeriodontalTreatmentPage() {
  return (
    <>
      <Navigation />
      <main id="main-content">
        <HeroSection
          subtitle="Periodontal Care"
          title="Periodontal Treatment in Chantilly, VA"
          description="Periodontal treatment at VA EPIC focuses on controlling disease, preserving teeth when possible, and restoring healthy support for long-term oral function."
          primaryButtonText="Schedule Consultation"
          primaryButtonHref="/contact"
          backgroundImageSrc="/images/Site%20Files/gum-disease-dentist-in-winchester-va.jpg"
          backgroundPosition="center 22%"
        />
        
        <Section>
          <SectionHeader
            subtitle="Understanding Gum Health"
            title="The Foundation of Your Smile"
            description="Your gums play a crucial role in supporting your teeth and overall oral health. Periodontal disease, if left untreated, can lead to tooth loss and has been linked to systemic health conditions including heart disease and diabetes."
          />
          <div className="mt-12 bg-card rounded-2xl p-8 border border-border">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold text-accent mb-2">47%</div>
                <p className="text-muted-foreground text-sm">
                  of adults over 30 have some form of periodontal disease
                </p>
              </div>
              <div>
                <div className="text-4xl font-bold text-accent mb-2">#1</div>
                <p className="text-muted-foreground text-sm">
                  cause of tooth loss in adults is periodontal disease
                </p>
              </div>
              <div>
                <div className="text-4xl font-bold text-accent mb-2">80%</div>
                <p className="text-muted-foreground text-sm">
                  of cases can be treated effectively with early intervention
                </p>
              </div>
            </div>
          </div>
        </Section>

        <Section>
          <SectionHeader
            subtitle="Understanding Gum Health"
            title="The Foundation of Your Smile"
            description="Your gums play a crucial role in supporting your teeth and overall oral health. Periodontal disease, if left untreated, can lead to tooth loss and has been linked to systemic health conditions including heart disease and diabetes."
          />
          <div className="mt-12 bg-card rounded-2xl p-8 border border-border">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold text-accent mb-2">47%</div>
                <p className="text-muted-foreground text-sm">
                  of adults over 30 have some form of periodontal disease
                </p>
              </div>
              <div>
                <div className="text-4xl font-bold text-accent mb-2">#1</div>
                <p className="text-muted-foreground text-sm">
                  cause of tooth loss in adults is periodontal disease
                </p>
              </div>
              <div>
                <div className="text-4xl font-bold text-accent mb-2">80%</div>
                <p className="text-muted-foreground text-sm">
                  of cases can be treated effectively with early intervention
                </p>
              </div>
            </div>
          </div>
        </Section>

        {/* ADD THIS NEW SECTION */}
        <Section className="p-0 lg:p-0 overflow-visible">
          <PerioReversalScene />
        </Section>

        <PerioConditions />
        <PerioTreatments />

        <PerioConditions />
        <PerioTreatments />
        <PerioImportance />
        <FAQSection
          items={faqItems}
          title="Periodontal Questions"
          subtitle="FAQ"
          description="Answers to common questions about gum disease, recession, and periodontal treatment."
        />
        
        <CTASection
          title="Protect Your Gums, Protect Your Smile"
          description="Early treatment is key to preventing tooth loss and maintaining your oral health. Schedule your periodontal evaluation today."
        />
      </main>
      <Footer />
    </>
  )
}
