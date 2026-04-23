import fs from "node:fs/promises"
import path from "node:path"
import matter from "gray-matter"

export type ServiceFaq = {
  question: string
  answer: string
}

export type ServicePageContent = {
  metaTitle: string
  metaDescription: string
  heroSubtitle: string
  heroTitle: string
  heroDescription: string
  heroBackgroundImageSrc: string
  heroBackgroundPosition: string
  visualSectionSubtitle: string
  visualSectionTitle: string
  visualSectionDescription: string
  faqTitle: string
  faqSubtitle: string
  faqDescription: string
  faqs: ServiceFaq[]
  ctaTitle: string
  ctaDescription: string
  sections: string[]
}

const servicesDir = path.join(process.cwd(), "content", "services")

function isFaqArray(value: unknown): value is ServiceFaq[] {
  return Array.isArray(value)
}

export async function getServicePageContent(slug: string): Promise<ServicePageContent> {
  const filePath = path.join(servicesDir, `${slug}.md`)
  const file = await fs.readFile(filePath, "utf8")
  const { data, content } = matter(file)

  if (!isFaqArray(data.faqs)) {
    throw new Error(`Missing or invalid faqs in service content: ${slug}`)
  }

  const sections = content
    .split(/\n---\n/g)
    .map((section) => section.trim())
    .filter(Boolean)

  return {
    metaTitle: String(data.metaTitle),
    metaDescription: String(data.metaDescription),
    heroSubtitle: String(data.heroSubtitle),
    heroTitle: String(data.heroTitle),
    heroDescription: String(data.heroDescription),
    heroBackgroundImageSrc: String(data.heroBackgroundImageSrc),
    heroBackgroundPosition: String(data.heroBackgroundPosition),
    visualSectionSubtitle: String(data.visualSectionSubtitle),
    visualSectionTitle: String(data.visualSectionTitle),
    visualSectionDescription: String(data.visualSectionDescription),
    faqTitle: String(data.faqTitle),
    faqSubtitle: String(data.faqSubtitle),
    faqDescription: String(data.faqDescription),
    faqs: data.faqs as ServiceFaq[],
    ctaTitle: String(data.ctaTitle),
    ctaDescription: String(data.ctaDescription),
    sections,
  }
}

