import type { ReactNode } from 'react'

export type AppItem = {
  /** Unique key for the app */
  key: string
  /** Display name shown below the icon */
  name: string
  /** Icon element — Semi icon, emoji, or <img /> */
  icon: ReactNode
  /** Short description shown on hover / below the name */
  description?: string
  /** Navigate to a route when clicked */
  href?: string
  /** Custom click handler (takes precedence over href) */
  onClick?: () => void
  disabled?: boolean
}
