import { MarkdownProse } from "@/components/markdown/markdown-prose"
import { Section } from "@/components/section"

export function ServiceMarkdownSections({ sections }: { sections: string[] }) {
  return (
    <>
      {sections.map((section, index) => (
        <Section
          key={index}
          variant={index % 2 === 0 ? "default" : "muted"}
          className={index === 0 ? "pt-12 lg:pt-16" : undefined}
        >
          <MarkdownProse content={section} />
        </Section>
      ))}
    </>
  )
}

