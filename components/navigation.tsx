"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { PromotionBanner } from "@/components/promotion-banner"
import { ThemeToggle } from "@/components/theme-toggle"
import { practice, primaryNav } from "@/lib/site"

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full">
      <div className="bg-card/92 backdrop-blur-md">
        <nav className="mx-auto max-w-7xl border-b border-border/80 px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <Link
              href="/"
              className="flex items-center"
              aria-label={`${practice.legalName} home`}
            >
              <div className="relative h-11 w-[176px] overflow-hidden rounded-md bg-white ring-1 ring-border/80 sm:h-12 sm:w-[196px] lg:h-14 lg:w-[248px]">
                <Image
                  src="/images/va-epic-logo.jpg"
                  alt={`${practice.name} logo`}
                  fill
                  className="object-contain p-1.5 sm:p-2"
                  sizes="(max-width: 640px) 176px, (max-width: 1024px) 196px, 248px"
                  priority
                />
              </div>
            </Link>

            <div className="hidden lg:flex lg:items-center lg:gap-6">
              {primaryNav.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <div className="flex items-center gap-3">
              <PromotionBanner />
              <ThemeToggle />
              <a
                href={practice.phoneHref}
                className="hidden items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-primary md:flex"
              >
                <Phone className="h-4 w-4" />
                {practice.phoneDisplay}
              </a>
              <Button asChild className="hidden sm:inline-flex">
                <Link href="/contact">Schedule Consultation</Link>
              </Button>

              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 text-muted-foreground hover:text-primary lg:hidden"
                aria-label="Toggle menu"
                aria-expanded={isOpen}
                aria-controls="mobile-nav"
              >
                {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>

          <AnimatePresence>
            {isOpen && (
              <motion.div
                id="mobile-nav"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden lg:hidden"
              >
                <div className="space-y-2 py-4">
                  {primaryNav.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className="block rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-primary"
                    >
                      {link.label}
                    </Link>
                  ))}
                  <div className="px-3 pt-4">
                    <div className="mb-3 flex justify-end">
                      <ThemeToggle />
                    </div>
                    <Button asChild className="w-full">
                      <Link href="/contact">Schedule Consultation</Link>
                    </Button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </nav>
      </div>
    </header>
  )
}
