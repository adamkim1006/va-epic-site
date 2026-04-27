"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown, Menu, Phone, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { PromotionBanner } from "@/components/promotion-banner"
import { ThemeToggle } from "@/components/theme-toggle"
import { practice, primaryNav } from "@/lib/site"

function hasDropdownItems(
  link: (typeof primaryNav)[number]
): link is Extract<(typeof primaryNav)[number], { items: readonly unknown[] }> {
  return "items" in link
}

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [openMobileDropdown, setOpenMobileDropdown] = useState<string | null>(null)

  return (
    <header className="sticky top-0 z-50 w-full">
      <div className="bg-card/92 backdrop-blur-md">
        <nav className="relative mx-auto max-w-7xl border-b border-border/80 px-4 sm:px-6 lg:px-8">
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
              {primaryNav.map((link) =>
                hasDropdownItems(link) ? (
                  <div key={link.href} className="group relative">
                    <div className="flex items-center gap-1">
                      <Link
                        href={link.href}
                        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
                      >
                        {link.label}
                      </Link>
                      <ChevronDown className="h-4 w-4 text-muted-foreground transition-transform duration-200 group-hover:rotate-180 group-hover:text-primary" />
                    </div>
                    <div className="pointer-events-none absolute left-1/2 top-full z-50 w-[22rem] -translate-x-1/2 pt-4 opacity-0 transition-all duration-200 group-hover:pointer-events-auto group-hover:opacity-100">
                      <div className="overflow-hidden rounded-[1.6rem] border border-border bg-card p-3 shadow-[0_32px_80px_-44px_rgba(15,23,42,0.45)]">
                        <div className="rounded-[1.2rem] bg-[linear-gradient(135deg,rgba(79,209,217,0.08)_0%,rgba(37,99,235,0.05)_100%)] p-3">
                          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
                            {link.label}
                          </p>
                          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                            Explore the most relevant pages in this section.
                          </p>
                        </div>
                        <div className="mt-2 space-y-1">
                          {link.items.map((item) => (
                            <Link
                              key={item.href}
                              href={item.href}
                              className="block rounded-[1.15rem] px-4 py-3 transition-colors hover:bg-secondary"
                            >
                              <p className="text-sm font-semibold text-foreground">
                                {item.label}
                              </p>
                              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                                {item.description}
                              </p>
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
                  >
                    {link.label}
                  </Link>
                )
              )}
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
                onClick={() => {
                  setIsOpen(!isOpen)
                  if (isOpen) {
                    setOpenMobileDropdown(null)
                  }
                }}
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
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.18 }}
                className="absolute inset-x-0 top-full z-50 border-b border-border/80 bg-card/98 px-4 pb-4 pt-3 shadow-[0_24px_60px_-40px_rgba(15,23,42,0.5)] backdrop-blur-md lg:hidden sm:px-6"
              >
                <div className="mx-auto max-w-7xl space-y-2">
                  {primaryNav.map((link) =>
                    hasDropdownItems(link) ? (
                      <div
                        key={link.href}
                        className="rounded-2xl border border-border bg-secondary/35 px-3 py-3"
                      >
                        <button
                          type="button"
                          onClick={() =>
                            setOpenMobileDropdown((current) =>
                              current === link.href ? null : link.href
                            )
                          }
                          className="flex w-full items-center justify-between gap-3 text-left text-sm font-semibold text-foreground transition-colors hover:text-primary"
                          aria-expanded={openMobileDropdown === link.href}
                        >
                          <span>{link.label}</span>
                          <ChevronDown
                            className={`h-4 w-4 transition-transform ${
                              openMobileDropdown === link.href ? "rotate-180" : ""
                            }`}
                          />
                        </button>
                        <AnimatePresence initial={false}>
                          {openMobileDropdown === link.href ? (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.18 }}
                              className="overflow-hidden"
                            >
                              <div className="mt-3 space-y-1">
                                <Link
                                  href={link.href}
                                  onClick={() => {
                                    setIsOpen(false)
                                    setOpenMobileDropdown(null)
                                  }}
                                  className="block rounded-xl px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-background hover:text-primary"
                                >
                                  {link.label} Overview
                                </Link>
                                {link.items.map((item) => (
                                  <Link
                                    key={item.href}
                                    href={item.href}
                                    onClick={() => {
                                      setIsOpen(false)
                                      setOpenMobileDropdown(null)
                                    }}
                                    className="block rounded-xl px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-background hover:text-primary"
                                  >
                                    {item.label}
                                  </Link>
                                ))}
                              </div>
                            </motion.div>
                          ) : null}
                        </AnimatePresence>
                      </div>
                    ) : (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={() => {
                          setIsOpen(false)
                          setOpenMobileDropdown(null)
                        }}
                        className="block rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-primary"
                      >
                        {link.label}
                      </Link>
                    )
                  )}
                  <div className="px-3 pt-4">
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
