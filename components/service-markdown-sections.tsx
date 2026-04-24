import Link from "next/link"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import { Check, ArrowRight } from "lucide-react"
import { Section } from "@/components/section"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

function getSectionHeading(section: string) {
  const match = section.match(/^##?\s+(.+)$/m)
  return match?.[1]?.trim() ?? null
}

function removeLeadingHeading(section: string) {
  return section.replace(/^##?\s+.+$\n?/m, "").trim()
}

function ServiceMarkdownBlock({ content }: { content: string }) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        h2: ({ children }) => (
          <h2 className="font-display text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
            {children}
          </h2>
        ),
        h3: ({ children }) => (
          <div className="mt-10 flex items-center gap-3">
            <Badge
              variant="outline"
              className="rounded-full border-sky-200 bg-sky-50/70 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-sky-700"
            >
              Focus
            </Badge>
            <h3 className="text-lg font-semibold text-slate-900 sm:text-xl">{children}</h3>
          </div>
        ),
        p: ({ children }) => (
          <p className="mt-5 max-w-4xl text-base leading-8 text-slate-600 sm:text-lg">
            {children}
          </p>
        ),
        ul: ({ children }) => (
          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {children}
          </div>
        ),
        ol: ({ children }) => (
          <ol className="mt-8 space-y-3">
            {children}
          </ol>
        ),
        li: ({ children }) => (
          <div className="flex items-start gap-3 rounded-2xl border border-slate-200/80 bg-white/70 px-4 py-4 shadow-[0_10px_30px_-24px_rgba(15,23,42,0.4)]">
            <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-sky-100 text-sky-700">
              <Check className="h-3.5 w-3.5" />
            </div>
            <div className="text-sm leading-7 text-slate-600 sm:text-[15px]">{children}</div>
          </div>
        ),
        strong: ({ children }) => <strong className="font-semibold text-slate-950">{children}</strong>,
        a: ({ href, children }) => {
          if (!href) return <>{children}</>

          const isExternal = href.startsWith("http")

          return (
            <Link
              href={href}
              target={isExternal ? "_blank" : undefined}
              rel={isExternal ? "noreferrer" : undefined}
              className="inline-flex items-center gap-1 font-medium text-sky-700 underline decoration-sky-200 underline-offset-4 transition-colors hover:text-sky-900"
            >
              {children}
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          )
        },
        hr: () => <Separator className="mt-10 bg-border/70" />,
        table: ({ children }) => (
          <div className="mt-8 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_18px_50px_-30px_rgba(15,23,42,0.3)]">
            <Table className="text-sm">
              {children}
            </Table>
          </div>
        ),
        thead: ({ children }) => <TableHeader className="bg-slate-50/90">{children}</TableHeader>,
        tbody: ({ children }) => <TableBody>{children}</TableBody>,
        tr: ({ children }) => <TableRow className="border-slate-200/80">{children}</TableRow>,
        th: ({ children }) => (
          <TableHead className="h-auto px-5 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
            {children}
          </TableHead>
        ),
        td: ({ children }) => (
          <TableCell className="px-5 py-4 align-top text-sm leading-7 whitespace-normal text-slate-600">
            {children}
          </TableCell>
        ),
        blockquote: ({ children }) => (
          <blockquote className="mt-8 border-l-2 border-sky-300 pl-5 text-lg leading-8 text-slate-700">
            {children}
          </blockquote>
        ),
      }}
    >
      {content}
    </ReactMarkdown>
  )
}

export function ServiceMarkdownSections({ sections }: { sections: string[] }) {
  return (
    <>
      {sections.map((section, index) => {
        const heading = getSectionHeading(section)
        const body = removeLeadingHeading(section)

        return (
          <Section
            key={index}
            variant="default"
            className={index === 0 ? "pt-12 lg:pt-16" : ""}
            contentClassName="max-w-5xl"
          >
            <div className="space-y-8">
              {index > 0 ? <Separator className="bg-border/70" /> : null}

              <div className="space-y-5">
                {heading ? (
                  <div className="space-y-4">
                    <Badge
                      variant="outline"
                      className="rounded-full border-sky-200 bg-transparent px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] text-sky-700"
                    >
                      Treatment Details
                    </Badge>
                    <h2 className="max-w-3xl font-display text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
                      {heading}
                    </h2>
                    <div className="h-px w-20 bg-gradient-to-r from-sky-500/70 to-transparent" />
                  </div>
                ) : null}

                <ServiceMarkdownBlock content={body} />
              </div>
            </div>
          </Section>
        )
      })}
    </>
  )
}
