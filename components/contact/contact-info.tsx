"use client"

import { motion } from "framer-motion"
import { Phone, Mail, MapPin, Clock, Car } from "lucide-react"
import { officeHours } from "@/content/site-content"
import { practice } from "@/lib/site"

const contactDetails = [
  {
    icon: Phone,
    title: "Phone",
    content: practice.phoneDisplay,
    href: practice.phoneHref,
    description: "Call to schedule your consultation",
  },
  {
    icon: Mail,
    title: "Email",
    content: practice.email,
    href: practice.emailHref,
    description: "We respond within 24 hours",
  },
  {
    icon: MapPin,
    title: "Address",
    content: `${practice.addressLine1}\n${practice.addressLine2}`,
    href: practice.mapsHref,
    description: "Free parking available",
  },
]

export function ContactInfo() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      <div>
        <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
        <div className="space-y-6">
          {contactDetails.map((item, index) => (
            <motion.a
              key={item.title}
              href={item.href}
              target={item.title === "Address" ? "_blank" : undefined}
              rel={item.title === "Address" ? "noopener noreferrer" : undefined}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="flex gap-4 p-4 bg-card rounded-xl border border-border hover:border-accent/30 transition-colors group"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-accent/10 group-hover:bg-accent group-hover:text-accent-foreground transition-colors">
                <item.icon className="h-6 w-6 text-accent group-hover:text-accent-foreground" />
              </div>
              <div>
                <p className="font-semibold mb-0.5">{item.title}</p>
                <p className="text-muted-foreground text-sm whitespace-pre-line">
                  {item.content}
                </p>
                <p className="text-xs text-muted-foreground/70 mt-1">
                  {item.description}
                </p>
              </div>
            </motion.a>
          ))}
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="bg-card rounded-xl p-6 border border-border"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10">
            <Clock className="h-5 w-5 text-accent" />
          </div>
          <h3 className="font-semibold">Office Hours</h3>
        </div>
        <ul className="space-y-2">
          {officeHours.map((item) => (
            <li key={item.day} className="flex justify-between text-sm">
              <span className="text-muted-foreground">{item.day}</span>
              <span className={item.hours === "Closed" ? "text-muted-foreground" : "font-medium"}>
                {item.hours}
              </span>
            </li>
          ))}
        </ul>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="bg-accent/5 rounded-xl p-6 border border-accent/20"
      >
        <div className="flex items-center gap-3 mb-3">
          <Car className="h-5 w-5 text-accent" />
          <h3 className="font-semibold">Getting Here</h3>
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed">
          We are conveniently located in Chantilly with easy access from Route 50 and nearby commuter corridors. Parking is available on site, and our team can help with arrival details when you book.
        </p>
      </motion.div>
    </motion.div>
  )
}
