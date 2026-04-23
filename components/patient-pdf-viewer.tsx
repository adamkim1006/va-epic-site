"use client"

import { useTheme } from "next-themes"

export function PatientPdfViewer({
  src,
  title,
}: {
  src: string
  title: string
}) {
  const { resolvedTheme } = useTheme()
  const isDark = resolvedTheme === "dark"

  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-card">
      <iframe
        key={`${src}-${resolvedTheme ?? "system"}`}
        src={`${src}#toolbar=1&navpanes=1&view=FitH`}
        title={title}
        className={`patient-pdf-frame h-[980px] w-full ${
          isDark ? "patient-pdf-frame-dark" : ""
        }`}
      />
    </div>
  )
}
