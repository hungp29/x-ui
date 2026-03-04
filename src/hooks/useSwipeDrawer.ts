import { useCallback, useRef } from 'react'

/** px from the left screen edge that counts as the "open" trigger zone */
const EDGE_ZONE = 32
/** minimum horizontal swipe distance to register as a gesture */
const MIN_SWIPE_X = 60
/** maximum vertical drift before the gesture is treated as a scroll instead */
const MAX_SWIPE_Y = 80

/**
 * Returns touch event handlers that open the drawer when the user swipes
 * right from the left edge, and close it when they swipe left.
 */
export function useSwipeDrawer(
  isOpen: boolean,
  onOpen: () => void,
  onClose: () => void,
) {
  const startX = useRef(0)
  const startY = useRef(0)

  const onTouchStart = useCallback((e: React.TouchEvent) => {
    startX.current = e.touches[0].clientX
    startY.current = e.touches[0].clientY
  }, [])

  const onTouchEnd = useCallback(
    (e: React.TouchEvent) => {
      const dx = e.changedTouches[0].clientX - startX.current
      const dy = Math.abs(e.changedTouches[0].clientY - startY.current)

      // Treat as a scroll if vertical movement dominates
      if (dy > MAX_SWIPE_Y || dy > Math.abs(dx)) return
      if (Math.abs(dx) < MIN_SWIPE_X) return

      if (!isOpen && dx > 0 && startX.current <= EDGE_ZONE) {
        onOpen()
      } else if (isOpen && dx < 0) {
        onClose()
      }
    },
    [isOpen, onOpen, onClose],
  )

  return { onTouchStart, onTouchEnd }
}
