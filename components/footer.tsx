import Image from "next/image"
import Link from "next/link"
import { Phone, Mail, MapPin, Clock } from "lucide-react"
import { patientSupportLinks } from "@/content/site-content"
import { practice, primaryNav, servicePages } from "@/lib/site"

export function Footer() {
  return (
    <footer className="bg-[linear-gradient(135deg,#1d4ed8_0%,#2563eb_56%,#4fd1d9_100%)] text-primary-foreground">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          <div className="space-y-4">
            <div className="relative h-16 w-full max-w-[260px] overflow-hidden rounded-xl bg-white/96 shadow-lg ring-1 ring-white/70">
              <Image
                src="/images/va-epic-logo.jpg"
                alt={`${practice.name} logo`}
                fill
                className="object-contain p-2"
                sizes="260px"
              />
            </div>
            <div className="space-y-1">
              <p className="text-sm font-semibold tracking-[0.18em] text-white uppercase">
                {practice.name}
              </p>
              <p className="text-sm text-primary-foreground/88">
                {practice.legalName}
              </p>
            </div>
            <p className="text-sm text-primary-foreground/80 leading-relaxed">
              Specialist implant, periodontal, and prosthodontic care with a strong emphasis on diagnosis, treatment clarity, and long-term oral health.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Our Services</h3>
            <ul className="space-y-3">
              {servicePages.map((service) => (
                <li key={service.href}>
                  <Link
                    href={service.href}
                    className="text-sm text-primary-foreground/80 transition-colors hover:text-white"
                  >
                    {service.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-3">
              {primaryNav.slice(1).map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-primary-foreground/80 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              {patientSupportLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-primary-foreground/80 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-primary-foreground/70 shrink-0 mt-0.5" />
                <span className="text-sm text-primary-foreground/80">
                  {practice.addressLine1}<br />
                  {practice.addressLine2}
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-primary-foreground/70" />
                <a
                  href={practice.phoneHref}
                  className="text-sm text-primary-foreground/80 transition-colors hover:text-white"
                >
                  {practice.phoneDisplay}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-primary-foreground/70" />
                <a
                  href={practice.emailHref}
                  className="text-sm text-primary-foreground/80 transition-colors hover:text-white"
                >
                  {practice.email}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="h-5 w-5 text-primary-foreground/70 shrink-0 mt-0.5" />
                <span className="text-sm text-primary-foreground/80">
                  Mon-Fri: Call for scheduling<br />
                  Sat: 1st & 3rd by appointment
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-primary-foreground/20">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-sm text-primary-foreground/70">
              © {new Date().getFullYear()} {practice.legalName}. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <Link href="/faqs" className="text-sm text-primary-foreground/70 hover:text-white transition-colors">
                FAQs
              </Link>
              <Link href="/contact" className="text-sm text-primary-foreground/70 hover:text-white transition-colors">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
