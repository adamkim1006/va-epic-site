import type { MetadataRoute } from "next"

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "VA EPIC",
    short_name: "VA EPIC",
    description:
      "Specialist implant, periodontal, and prosthodontic care in Chantilly, Virginia.",
    start_url: "/",
    display: "standalone",
    background_color: "#f9fafb",
    theme_color: "#2d4658",
    icons: [
      {
        src: "/apple-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
      {
        src: "/icon-light-32x32.png",
        sizes: "32x32",
        type: "image/png",
      },
    ],
  }
}

