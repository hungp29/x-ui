import { createContext, useContext, useEffect, useState } from 'react'
import type { ReactNode } from 'react'

export type ThemePreference = 'system' | 'light' | 'dark'
export type ResolvedTheme = 'light' | 'dark'

type ThemeContextValue = {
  preference: ThemePreference
  resolved: ResolvedTheme
  setPreference: (p: ThemePreference) => void
}

const ThemeContext = createContext<ThemeContextValue | null>(null)

const STORAGE_KEY = 'theme'
const SYSTEM_MQ = '(prefers-color-scheme: dark)'

function getSystemTheme(): ResolvedTheme {
  return window.matchMedia(SYSTEM_MQ).matches ? 'dark' : 'light'
}

function resolve(preference: ThemePreference): ResolvedTheme {
  return preference === 'system' ? getSystemTheme() : preference
}

function applyTheme(resolved: ResolvedTheme) {
  if (resolved === 'dark') {
    document.body.setAttribute('theme-mode', 'dark')
  } else {
    document.body.removeAttribute('theme-mode')
  }
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [preference, setPreferenceState] = useState<ThemePreference>(
    () => (localStorage.getItem(STORAGE_KEY) as ThemePreference | null) ?? 'system',
  )
  const [resolved, setResolved] = useState<ResolvedTheme>(() => resolve(preference))

  // Apply on mount and whenever resolved changes
  useEffect(() => {
    applyTheme(resolved)
  }, [resolved])

  // Watch system preference changes when set to 'system'
  useEffect(() => {
    if (preference !== 'system') return
    const mq = window.matchMedia(SYSTEM_MQ)
    const handler = (e: MediaQueryListEvent) => {
      const next: ResolvedTheme = e.matches ? 'dark' : 'light'
      setResolved(next)
    }
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [preference])

  const setPreference = (p: ThemePreference) => {
    localStorage.setItem(STORAGE_KEY, p)
    setPreferenceState(p)
    setResolved(resolve(p))
  }

  return (
    <ThemeContext.Provider value={{ preference, resolved, setPreference }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme must be used inside ThemeProvider')
  return ctx
}
