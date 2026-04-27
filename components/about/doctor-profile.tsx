"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { GraduationCap, Award, BookOpen, Users } from "lucide-react"
import { Section, SectionHeader } from "@/components/section"

const credentials = [
  {
    icon: GraduationCap,
    title: "Education",
    items: [
      "DDS from Northwestern University Dental School in Chicago",
      "MS in Oral Biology at the Medical College of Georgia",
      "Ph.D. in Periodontology from Yonsei University Graduate School in Seoul",
      "AEGD program at the Martin US Army Hospital at Fort Benning, GA",
      "Post-Grad Periodontics Residency Program at Eisenhower US Army Medical Center",
    ],
  },
  {
    icon: Award,
    title: "Certifications",
    items: [
      "American Board of Periodontology and Implantology (Diplomate)",
      "World Academy of Ultrasonic and Piezoelectric Bone Surgery (Diplomate)",
      "International Congress of Oral Implantology (Fellow)",
    ],
  },
  {
    icon: BookOpen,
    title: "Academic Leadership",
    items: [
      "Dean's Faculty Professor, University of Maryland School of Dentistry",
      "Visiting Professor, Yonsei University School of Dentistry",
      "Extensive military and academic leadership in periodontics",
    ],
  },
  {
    icon: Users,
    title: "Professional Memberships",
    items: [
      "International College of Dentists (Fellow)",
      "Board-certified specialty affiliations",
      "Collaborative care with restorative and surgical teams",
    ],
  },
]

// Update src paths and captions to match your actual files
const personalPhotos = [
  {
    src: "/images/doctor-gallery/hiking-couple.jpg",
    alt: "Dr. Park and his wife hiking",
    caption: "Hiking with his wife in Red Rock Canyon",
    imageClassName: "object-cover object-center",
  },
  {
    src: "/images/doctor-gallery/army-uniform.jpg",
    alt: "Dr. Park in US Army uniform",
    caption: "26 years as a US Army periodontist",
    imageClassName: "object-cover object-[center_40%]",
  },
  {
    src: "/images/doctor-gallery/dental-presentation.jpg",
    alt: "Dr. Park teaching at a conference",
    caption: "Teaching at the University of Maryland School of Dentistry",
    imageClassName: "object-cover object-center",
  },
  {
    src: "/images/doctor-gallery/mission-trip.jpg",
    alt: "Dr. Park on a mission trip",
    caption: "Annual mission trips through his local church",
    imageClassName: "object-cover object-center",
  },
] as const

export function DoctorProfile() {
  return (
    <Section id="doctor">
      {/* ── Main two-column bio ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="mx-auto w-full max-w-md lg:mx-0"
        >
          <div className="relative overflow-hidden rounded-[1.75rem] border border-border/70 bg-muted shadow-[0_22px_48px_-28px_rgba(15,23,42,0.28)]">
            <div className="relative aspect-[4/5] w-full">
              <Image
                src="/images/dong-park-profile-id-photo.png"
                alt="Dr. Dong-Soo Park, DDS, MS, PhD"
                fill
                className="object-cover object-[center_18%]"
                sizes="(max-width: 1024px) min(100vw - 3rem, 420px), 420px"
                priority
              />
            </div>
          </div>
        </motion.div>

        <div>
          <SectionHeader
            align="left"
            subtitle="Your Periodontist"
            title="Dr. Dong-Soo Park, DDS, MS, PhD"
            description="Dr. Park combines decades of specialty experience with a practical, highly personalized approach to implants, periodontology, and complex restorative planning. He is especially focused on helping patients understand their diagnosis before committing to major treatment."
          />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-8 space-y-6"
          >
            <p className="text-muted-foreground leading-relaxed">
              With more than 26 years of experience as a US Army periodontist, Dr. Park has treated
              a wide range of straightforward and highly complex cases. His goal at VA EPIC is to
              deliver enhanced diagnosis and treatment planning while keeping care practical, honest,
              and approachable.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Patients come to the office for implant solutions, periodontal care, and guidance
              through difficult decisions about saving teeth, extracting teeth, or rebuilding a
              stable bite. Dr. Park believes those decisions should be made with clarity, not
              pressure.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              His background in military service, teaching, and specialty leadership shapes the
              culture of the practice: careful evaluation first, efficient execution second, and
              recommendations grounded in what will actually serve the patient best over time.
            </p>
          </motion.div>
        </div>
      </div>

      {/* ── Personal photo strip ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4"
      >
        {personalPhotos.map((photo, index) => (
          <motion.div
            key={photo.src}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 + index * 0.08 }}
            className="flex flex-col gap-2.5"
          >
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl border border-border/70 bg-muted">
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                unoptimized
                className={photo.imageClassName}
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 200px"
              />
            </div>
            <p className="text-xs text-muted-foreground leading-snug px-0.5">
              {photo.caption}
            </p>
          </motion.div>
        ))}
      </motion.div>

      {/* ── Credentials grid ── */}
      <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-6">
        {credentials.map((credential, index) => (
          <motion.div
            key={credential.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-card rounded-xl p-6 border border-border"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10">
                <credential.icon className="h-5 w-5 text-accent" />
              </div>
              <h3 className="font-semibold">{credential.title}</h3>
            </div>
            <ul className="space-y-2">
              {credential.items.map((item, i) => (
                <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </Section>
  )
}
