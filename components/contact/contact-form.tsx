"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Send, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsSubmitting(false)
    setIsSubmitted(true)
  }

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-card rounded-2xl p-8 border border-border text-center"
      >
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-accent/10 mx-auto mb-4">
          <Send className="h-8 w-8 text-accent" />
        </div>
        <h3 className="text-xl font-semibold mb-2">Message Sent!</h3>
        <p className="text-muted-foreground leading-relaxed">
          Thank you for contacting us. Our team will review your message and get back to you within 1 business day.
        </p>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-2xl font-bold mb-2">Send Us a Message</h2>
      <p className="text-muted-foreground mb-6">
        Fill out the form below and we will get back to you as soon as possible.
      </p>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="firstName">First Name</Label>
            <Input id="firstName" placeholder="John" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="lastName">Last Name</Label>
            <Input id="lastName" placeholder="Doe" required />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="john@example.com" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone">Phone Number</Label>
          <Input id="phone" type="tel" placeholder="(703) 466-5115" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="service">Service of Interest</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select a service" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="implants">Dental Implants</SelectItem>
              <SelectItem value="all-on-x">All-on-X Full Arch</SelectItem>
              <SelectItem value="periodontal">Periodontal Treatment</SelectItem>
              <SelectItem value="prosthodontics">Prosthodontic Consultation</SelectItem>
              <SelectItem value="general">General Consultation</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="message">Message</Label>
          <Textarea
            id="message"
            placeholder="Tell us about your needs or any questions you have..."
            rows={4}
            required
          />
        </div>
        <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Sending...
            </>
          ) : (
            <>
              Send Message
              <Send className="ml-2 h-5 w-5" />
            </>
          )}
        </Button>
      </form>
    </motion.div>
  )
}
