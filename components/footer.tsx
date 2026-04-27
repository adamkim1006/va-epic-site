import Link from "next/link"
import { Phone, Mail, MapPin, Clock } from "lucide-react"
import { SiteLogo } from "@/components/site-logo"
import { patientSupportLinks } from "@/content/site-content"
import { practice, primaryNav, servicePages } from "@/lib/site"

export function Footer() {
  return (
    <footer className="bg-[linear-gradient(135deg,#1d4ed8_0%,#2563eb_56%,#4fd1d9_100%)] text-primary-foreground dark:bg-[linear-gradient(135deg,#08111d_0%,#0f172a_58%,#12324d_100%)]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          <div className="space-y-4">
            <SiteLogo
              href=""
              label={`${practice.name} logo`}
              containerClassName="h-16 w-full max-w-[260px] rounded-xl bg-white/96 shadow-lg ring-1 ring-white/70 dark:bg-transparent dark:ring-white/12"
              imageClassName="p-2"
              sizes="260px"
            />
            <div className="space-y-1">
              <p className="text-sm font-semibold tracking-[0.18em] text-white uppercase dark:text-slate-50">
                {practice.name}
              </p>
              <p className="text-sm text-primary-foreground/88 dark:text-slate-200/88">
                {practice.legalName}
              </p>
            </div>
            <p className="text-sm leading-relaxed text-primary-foreground/80 dark:text-slate-200/84">
              Specialist implant, periodontal, and prosthodontic care with a strong emphasis on diagnosis, treatment clarity, and long-term oral health.
            </p>
          </div>

          <div>
            <h3 className="mb-4 font-semibold text-white dark:text-slate-50">Our Services</h3>
            <ul className="space-y-3">
              {servicePages.map((service) => (
                <li key={service.href}>
                  <Link
                    href={service.href}
                    className="text-sm text-primary-foreground/80 transition-colors hover:text-white dark:text-slate-200/82 dark:hover:text-slate-50"
                  >
                    {service.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 font-semibold text-white dark:text-slate-50">Quick Links</h3>
            <ul className="space-y-3">
              {primaryNav.slice(1).map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-primary-foreground/80 transition-colors hover:text-white dark:text-slate-200/82 dark:hover:text-slate-50"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              {patientSupportLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-primary-foreground/80 transition-colors hover:text-white dark:text-slate-200/82 dark:hover:text-slate-50"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 font-semibold text-white dark:text-slate-50">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-primary-foreground/70 dark:text-slate-300/78" />
                <span className="text-sm text-primary-foreground/80 dark:text-slate-200/82">
                  {practice.addressLine1}<br />
                  {practice.addressLine2}
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-primary-foreground/70 dark:text-slate-300/78" />
                <a
                  href={practice.phoneHref}
                  className="text-sm text-primary-foreground/80 transition-colors hover:text-white dark:text-slate-200/82 dark:hover:text-slate-50"
                >
                  {practice.phoneDisplay}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-primary-foreground/70 dark:text-slate-300/78" />
                <a
                  href={practice.emailHref}
                  className="text-sm text-primary-foreground/80 transition-colors hover:text-white dark:text-slate-200/82 dark:hover:text-slate-50"
                >
                  {practice.email}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="mt-0.5 h-5 w-5 shrink-0 text-primary-foreground/70 dark:text-slate-300/78" />
                <span className="text-sm text-primary-foreground/80 dark:text-slate-200/82">
                  Mon-Thu: 9:00 AM - 5:00 PM<br />
                  Fri: Closed<br />
                  Sat: 1st & 3rd Sat · 9:00 AM - 1:00 PM<br />
                  Sun: Closed
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-primary-foreground/20">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-sm text-primary-foreground/70 dark:text-slate-300/78">
              © {new Date().getFullYear()} {practice.legalName}. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <Link href="/faqs" className="text-sm text-primary-foreground/70 transition-colors hover:text-white dark:text-slate-300/78 dark:hover:text-slate-50">
                FAQs
              </Link>
              <Link href="/contact" className="text-sm text-primary-foreground/70 transition-colors hover:text-white dark:text-slate-300/78 dark:hover:text-slate-50">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
