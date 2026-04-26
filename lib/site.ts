export const practice = {
  name: "VA EPIC",
  legalName: "Virginia Esthetic Perio & Implant Center",
  shortDescription: "Implants & Periodontology Center",
  city: "Chantilly",
  state: "VA",
  phoneDisplay: "(703) 466-5115",
  phoneHref: "tel:+17034665115",
  faxDisplay: "(703) 466-5502",
  email: "govaepic@gmail.com",
  emailHref: "mailto:govaepic@gmail.com",
  addressLine1: "14100 Park Meadow Dr #110",
  addressLine2: "Chantilly, VA 20151",
  mapsHref:
    "https://maps.google.com/?q=14100+Park+Meadow+Dr+%23110+Chantilly+VA+20151",
  serviceArea:
    "Proudly serving Chantilly, Centreville, South Riding, Fairfax, and surrounding Northern Virginia communities.",
} as const

export const servicePages = [
  {
    href: "/dental-implants-chantilly-va",
    label: "Dental Implants",
    shortDescription:
      "Single-tooth and multi-tooth implant solutions designed for long-term stability, function, and esthetics.",
  },
  {
    href: "/all-on-4-chantilly-va",
    label: "All-on-X Full Arch",
    shortDescription:
      "Full-arch reconstruction with a fixed implant-supported smile for patients with advanced tooth loss or failing dentition.",
  },
  {
    href: "/periodontal-treatment-chantilly-va",
    label: "Periodontal Care",
    shortDescription:
      "Evidence-based gum disease treatment, grafting, and periodontal surgery focused on preserving teeth and supporting oral health.",
  },
] as const

export const primaryNav = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  {
    href: "/our-services",
    label: "Our Services",
    items: servicePages.map((page) => ({
      href: page.href,
      label: page.label,
      description: page.shortDescription,
    })),
  },
  {
    href: "/for-patients",
    label: "For Patients",
    items: [
      {
        href: "/for-patients#patient-forms",
        label: "New Patient Paperwork",
        description:
          "Download and send first-visit registration, HIPAA, and financial-policy forms.",
      },
      {
        href: "/for-patients",
        label: "Patient Forms Library",
        description:
          "Open patient forms and post-operative PDFs from one central page.",
      },
      {
        href: "/faqs#financing",
        label: "Financing & Insurance",
        description:
          "Review common payment and insurance questions before your consultation.",
      },
    ],
  },
  { href: "/faqs", label: "FAQs" },
  { href: "/contact", label: "Contact" },
] as const

export const insuranceProviders = [
  "Anthem",
  "Medicare",
  "Delta Dental",
  "Cigna",
  "United Concordia",
  "MetLife",
  "Humana",
  "Geha",
  "Aetna",
  "Guardian"
] as const

export const generalFaqItems = [
  {
    question: "What makes VA EPIC different from a general dental office?",
    answer:
      "VA EPIC is focused on implants, periodontology, and prosthodontic-driven treatment planning. That means complex tooth replacement, gum health, and full-mouth rehabilitation are approached with a specialist's perspective and a personalized plan.",
  },
  {
    question: "When should I see a periodontist?",
    answer:
      "If you have loose teeth, bleeding gums, gum recession, bone loss, failing dental work, or have been told you may need extractions, a periodontal consultation can help clarify your options before moving forward with treatment.",
  },
  {
    question: "Do you provide both surgical and restorative planning?",
    answer:
      "Yes. Our approach is comprehensive and diagnosis-driven, whether you need a single implant, full-arch reconstruction, gum treatment, or coordination with your restorative dentist.",
  },
  {
    question: "What can I expect at my consultation?",
    answer:
      "Your visit typically includes a review of your concerns, medical and dental history, an examination, and a discussion of the treatment options that best fit your condition, goals, and timeline.",
  },
  {
    question: "Do you treat patients with advanced or complicated cases?",
    answer:
      "Yes. VA EPIC is built around careful diagnosis and treatment planning for both straightforward and challenging implant and periodontal cases, with an emphasis on predictable long-term outcomes.",
  },
] as const

export const financingFaqItems = [
  {
    question: "How do I get an accurate cost estimate?",
    answer:
      "The most accurate way is to call and schedule a consultation. Once Dr. Park evaluates your case, we can give you a specific treatment recommendation and explain the associated fees clearly.",
  },
  {
    question: "Do you accept dental insurance?",
    answer:
      "Yes. We work with PPO plans and help patients understand benefits, out-of-pocket estimates, and claim submission. Coverage varies by plan, so we review your benefits before treatment whenever possible.",
  },
  {
    question: "Which insurance carriers do you commonly work with?",
    answer:
      "We commonly work with plans such as Anthem, Medicare, Delta Dental, Cigna, United Concordia, and MetLife. If you do not see your carrier listed, contact the office and we can help review your situation.",
  },
  {
    question: "Can I still be seen if I do not have insurance?",
    answer:
      "Yes. Many patients move forward without dental insurance. We will walk through the treatment sequence, expected fees, and available payment options so you can make an informed decision.",
  },
  {
    question: "Do you discuss financing during the consultation?",
    answer:
      "Yes. Once your diagnosis and treatment plan are clear, our team can explain the financial side of care, including benefit coordination and the next steps for scheduling treatment.",
  },
] as const
