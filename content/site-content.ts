export type OfficeHour = {
  day: string
  hours: string
}

export type PromotionBannerContent = {
  enabled: boolean
  title: string
  message: string
  imageSrc?: string
  imageAlt?: string
  startsOn?: string
  endsOn?: string
  ctaLabel?: string
  ctaHref?: string
}

export const officeHours: OfficeHour[] = [
  { day: "Monday", hours: "9:00 AM - 5:00 PM" },
  { day: "Tuesday", hours: "9:00 AM - 5:00 PM" },
  { day: "Wednesday", hours: "9:00 AM - 5:00 PM" },
  { day: "Thursday", hours: "9:00 AM - 5:00 PM" },
  { day: "Friday", hours: "CLOSED" },
  { day: "Saturday", hours: "1st & 3rd Saturday · 9:00 AM - 1:00 PM" },
  { day: "Sunday", hours: "CLOSED" },
]

export const editablePageContent = {
  homeHero: {
    subtitle: "Virginia Esthetic Perio & Implant Center",
    title: "Implants, Periodontology, and Complex Smile Planning in Chantilly",
    description:
      "VA EPIC provides specialist care for missing teeth, gum disease, recession, and full-arch reconstruction. We focus on accurate diagnosis, personalized treatment plans, and practical guidance for even the most challenging cases.",
  },
  aboutHero: {
    subtitle: "About Us",
    title: "A Specialist Practice Built Around Clarity and Precision",
    description:
      "At VA EPIC, we combine advanced periodontal and implant expertise with straightforward communication. Our goal is to help patients understand their condition, their options, and the path that best protects long-term function and health.",
  },
  contactHero: {
    subtitle: "Get In Touch",
    title: "Schedule Your Consultation",
    description:
      "If you have questions about implants, gum treatment, extractions, full-arch reconstruction, or treatment costs, our team is here to help you schedule the right next step.",
  },
  doctorSection: {
    subtitle: "Meet Your Doctor",
    title: "Dr. Dong-Soo Park, DDS, MS, PhD",
    description:
      "Dr. Park brings extensive military and academic experience in periodontics, implantology, and complex treatment planning. His approach emphasizes careful diagnosis, clear communication, and practical solutions built for long-term success.",
  },
  defaultCta: {
    title: "Ready to Transform Your Smile?",
    description:
      "Schedule your consultation today and take the first step toward a healthier, more confident smile. Our team is here to answer all your questions.",
  },
} as const

export const patientResourceCopy = {
  heroSubtitle: "For Patients",
  heroTitle: "Forms, Planning Resources, and Next Steps",
  heroDescription:
    "Use this page to access patient forms, prepare for your visit, and review the practical details that help consultations and treatment visits run smoothly.",
  introTitle: "Patient Resources",
  introDescription:
    "Find new-patient forms, office policies, and post-treatment instructions in one place so it is easier to prepare for your visit.",
  newPatientTitle: "New Patient Paperwork",
  newPatientDescription:
    "If this is your first visit, please complete the registration, HIPAA, and financial-policy forms ahead of time when possible. You can download them here and send the completed paperwork directly to the office before your appointment.",
  formsLibraryTitle: "Patient Forms Library",
  formsLibraryDescription:
    "Use the links below to open or download patient forms and post-operative instructions. New-patient paperwork is grouped separately above for easier first-visit preparation.",
  supportTitle: "Need Help With a Form?",
  supportDescription:
    "If you are unsure which form applies to your visit or prefer to complete paperwork in the office, call VA EPIC and the team can guide you.",
} as const

export const patientSupportLinks = [
  { label: "Financing & Insurance FAQs", href: "/faqs#financing" },
  { label: "General Questions", href: "/faqs" },
  { label: "Schedule a Consultation", href: "/contact" },
] as const

export const officeGalleryImages = [
  {
    src: "/images/Site Files/reception-area.jpg",
    alt: "VA EPIC reception area",
    label: "Reception Area",
  },
  {
    src: "/images/Site Files/technology-suite.jpg",
    alt: "VA EPIC technology suite",
    label: "Technology Suite",
  },
  {
    src: "/images/Site Files/treatment-room.jpg",
    alt: "VA EPIC treatment room",
    label: "Treatment Room",
  },
  {
    src: "/images/Site Files/waiting-area.jpg",
    alt: "VA EPIC waiting area",
    label: "Waiting Area",
  },
  {
    src: "/images/Site Files/front-doors.jpg",
    alt: "VA EPIC front entrance",
    label: "Front Entrance",
  },
  {
    src: "/images/Site Files/chair.webp",
    alt: "VA EPIC treatment chair",
    label: "Clinical Suite",
  },
] as const
