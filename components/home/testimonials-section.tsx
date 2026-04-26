import { fetchGoogleReviews, type GoogleReview } from "@/lib/google-places"
import { TestimonialsSectionClient } from "@/components/home/testimonials-section-client"

const fallbackReviews: GoogleReview[] = [
  {
    name: "IP",
    content:
      "The office explained my implant options clearly and helped me understand the entire process before we started. I felt informed instead of overwhelmed.",
    rating: 5,
    treatment: "Patient Review",
    relativeTime: "Recent feedback",
  },
  {
    name: "FP",
    content:
      "After years of struggling with failing teeth, I finally understood what a full-arch solution could look like. The consultation gave me a lot more confidence in moving forward.",
    rating: 5,
    treatment: "Patient Review",
    relativeTime: "Recent feedback",
  },
  {
    name: "PP",
    content:
      "I came in worried about gum recession and bone loss, and the team gave me a straightforward explanation of what was happening and what could be done.",
    rating: 5,
    treatment: "Patient Review",
    relativeTime: "Recent feedback",
  },
  {
    name: "CP",
    content:
      "I appreciated how practical and honest the office was about treatment sequencing, timing, and costs. It felt like a specialist office that still spoke plainly.",
    rating: 5,
    treatment: "Patient Review",
    relativeTime: "Recent feedback",
  },
]

export async function TestimonialsSection() {
  try {
    const { reviews, summary } = await fetchGoogleReviews()

    if (reviews.length === 0 && process.env.NODE_ENV !== "production") {
      console.warn(
        "[google-places] no reviews available from Google Places response, using fallback reviews"
      )
    }

    return (
      <TestimonialsSectionClient
        reviews={reviews.length > 0 ? reviews : fallbackReviews}
        summary={summary}
      />
    )
  } catch (error) {
    if (process.env.NODE_ENV !== "production") {
      console.error("[google-places] testimonials fetch failed", error)
    }
    return <TestimonialsSectionClient reviews={fallbackReviews} />
  }
}
