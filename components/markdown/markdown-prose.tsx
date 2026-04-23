import Link from "next/link"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"

export function MarkdownProse({ content }: { content: string }) {
  return (
    <div className="max-w-4xl mx-auto">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h2: ({ children }) => (
            <h2 className="font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="mt-8 text-xl font-semibold text-foreground">{children}</h3>
          ),
          p: ({ children }) => (
            <p className="mt-4 text-base leading-8 text-muted-foreground sm:text-lg">{children}</p>
          ),
          ul: ({ children }) => (
            <ul className="mt-6 space-y-3 text-muted-foreground">{children}</ul>
          ),
          ol: ({ children }) => (
            <ol className="mt-6 list-decimal space-y-3 pl-6 text-muted-foreground">{children}</ol>
          ),
          li: ({ children }) => <li className="leading-7">{children}</li>,
          strong: ({ children }) => <strong className="font-semibold text-foreground">{children}</strong>,
          a: ({ href, children }) => {
            if (!href) return <>{children}</>

            const isExternal = href.startsWith("http")

            return (
              <Link
                href={href}
                target={isExternal ? "_blank" : undefined}
                rel={isExternal ? "noreferrer" : undefined}
                className="font-medium text-primary underline decoration-primary/30 underline-offset-4 transition-colors hover:text-accent"
              >
                {children}
              </Link>
            )
          },
          hr: () => <div className="mt-10 h-px w-full bg-border" />,
          table: ({ children }) => (
            <div className="mt-8 overflow-x-auto rounded-2xl border border-border bg-card">
              <table className="w-full border-collapse text-left text-sm">{children}</table>
            </div>
          ),
          thead: ({ children }) => <thead className="bg-secondary/70">{children}</thead>,
          th: ({ children }) => (
            <th className="border-b border-border px-4 py-3 font-semibold text-foreground">
              {children}
            </th>
          ),
          td: ({ children }) => (
            <td className="border-b border-border px-4 py-3 align-top text-muted-foreground last:border-b-0">
              {children}
            </td>
          ),
          blockquote: ({ children }) => (
            <blockquote className="mt-6 rounded-2xl border-l-4 border-accent bg-white/70 px-5 py-4 text-muted-foreground shadow-sm">
              {children}
            </blockquote>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  )
}

