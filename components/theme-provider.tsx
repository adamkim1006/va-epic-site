"use client"

import * as React from "react"

type Theme = "light" | "dark" | "system"

type ThemeProviderProps = React.PropsWithChildren<{
  attribute?: "class"
  defaultTheme?: Theme
  enableSystem?: boolean
  disableTransitionOnChange?: boolean
  storageKey?: string
}>

type ThemeContextValue = {
  theme: Theme
  resolvedTheme: "light" | "dark"
  setTheme: (theme: Theme) => void
}

const ThemeContext = React.createContext<ThemeContextValue | undefined>(undefined)

function getSystemTheme() {
  if (typeof window === "undefined") {
    return "light" as const
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? ("dark" as const)
    : ("light" as const)
}

function applyThemeToDocument(theme: "light" | "dark") {
  const root = document.documentElement
  root.classList.remove("light", "dark")
  root.classList.add(theme)
  root.style.colorScheme = theme
}

export function ThemeProvider({
  children,
  defaultTheme = "light",
  enableSystem = true,
  disableTransitionOnChange = true,
  storageKey = "theme",
}: ThemeProviderProps) {
  const [theme, setThemeState] = React.useState<Theme>(defaultTheme)
  const [resolvedTheme, setResolvedTheme] = React.useState<"light" | "dark">("light")

  React.useEffect(() => {
    const storedTheme = window.localStorage.getItem(storageKey) as Theme | null
    const nextTheme = storedTheme ?? defaultTheme
    const nextResolvedTheme =
      nextTheme === "system" && enableSystem ? getSystemTheme() : nextTheme === "dark" ? "dark" : "light"

    setThemeState(nextTheme)
    setResolvedTheme(nextResolvedTheme)
    applyThemeToDocument(nextResolvedTheme)
  }, [defaultTheme, enableSystem, storageKey])

  React.useEffect(() => {
    if (!enableSystem || theme !== "system") {
      return
    }

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)")

    const updateTheme = () => {
      const nextResolvedTheme = getSystemTheme()
      setResolvedTheme(nextResolvedTheme)
      applyThemeToDocument(nextResolvedTheme)
    }

    mediaQuery.addEventListener("change", updateTheme)

    return () => {
      mediaQuery.removeEventListener("change", updateTheme)
    }
  }, [enableSystem, theme])

  const setTheme = React.useCallback(
    (nextTheme: Theme) => {
      const nextResolvedTheme =
        nextTheme === "system" && enableSystem
          ? getSystemTheme()
          : nextTheme === "dark"
            ? "dark"
            : "light"

      let cleanup: (() => void) | undefined

      if (disableTransitionOnChange) {
        const style = document.createElement("style")
        style.appendChild(
          document.createTextNode(
            "*,*::before,*::after{transition:none!important}"
          )
        )
        document.head.appendChild(style)
        cleanup = () => {
          window.getComputedStyle(document.body)
          window.setTimeout(() => {
            document.head.removeChild(style)
          }, 1)
        }
      }

      setThemeState(nextTheme)
      setResolvedTheme(nextResolvedTheme)
      window.localStorage.setItem(storageKey, nextTheme)
      applyThemeToDocument(nextResolvedTheme)
      cleanup?.()
    },
    [disableTransitionOnChange, enableSystem, storageKey]
  )

  const value = React.useMemo(
    () => ({
      theme,
      resolvedTheme,
      setTheme,
    }),
    [theme, resolvedTheme, setTheme]
  )

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  const context = React.useContext(ThemeContext)

  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider.")
  }

  return context
}
