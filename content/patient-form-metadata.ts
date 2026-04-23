export type PatientFormCategory =
  | "Fillable Forms"
  | "Policies & Privacy"
  | "Post-Op Instructions"

export type PatientFormMetadata = {
  filename: string
  title: string
  description: string
  category: PatientFormCategory
}

export const patientFormMetadata: PatientFormMetadata[] = [
  {
    filename: "FILLABLE Registration Form.pdf",
    title: "Patient Registration Form",
    description:
      "Complete your core demographic, contact, and intake details before your first visit.",
    category: "Fillable Forms",
  },
  {
    filename: "FILLABLE HIPAA.pdf",
    title: "HIPAA Acknowledgement",
    description:
      "Review privacy practices and complete the office acknowledgement form before treatment.",
    category: "Policies & Privacy",
  },
  {
    filename: "FILLABLE Financial Policy (eng).pdf",
    title: "Financial Policy",
    description:
      "Read and complete VA EPIC's financial-policy form covering estimates, payment timing, and responsibility.",
    category: "Policies & Privacy",
  },
  {
    filename: "All_on_4_Post_Op_Instructions.pdf",
    title: "All-on-4 Post-Op Instructions",
    description:
      "Recovery guidance for full-arch surgery and immediate-load care after treatment.",
    category: "Post-Op Instructions",
  },
  {
    filename: "CGF_Graft_Post_Op_Instructions.pdf",
    title: "Periodontal Surgery + CGF Graft Instructions",
    description:
      "Post-surgical care guidance for periodontal procedures that use CGF-assisted graft healing.",
    category: "Post-Op Instructions",
  },
  {
    filename: "Vestibuloplasty_Post_Op_Instructions.pdf",
    title: "Vestibuloplasty Post-Op Instructions",
    description:
      "At-home recovery guidance after vestibuloplasty and related soft-tissue procedures.",
    category: "Post-Op Instructions",
  },
] as const
