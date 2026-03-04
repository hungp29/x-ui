import { useEffect, useRef } from 'react'

/** px from the left screen edge that counts as the "open" trigger zone */
const EDGE_ZONE = 32
/** minimum horizontal swipe distance to register as a gesture */
const MIN_SWIPE_X = 60
/** maximum vertical drift before the gesture is treated as a scroll instead */
const MAX_SWIPE_Y = 80

/**
 * Attaches native (non-passive) touch listeners to the document so we can
 * call preventDefault() on the edge-swipe, which stops the browser from
 * treating it as a "back" navigation gesture at the same time.
 */
export function useSwipeDrawer(
  isOpen: boolean,
  onOpen: () => void,
  onClose: () => void,
) {
  // Keep stable refs so the listeners don't need to be re-registered on every render
  const isOpenRef = useRef(isOpen)
  const onOpenRef = useRef(onOpen)
  const onCloseRef = useRef(onClose)

  useEffect(() => { isOpenRef.current = isOpen }, [isOpen])
  useEffect(() => { onOpenRef.current = onOpen }, [onOpen])
  useEffect(() => { onCloseRef.current = onClose }, [onClose])

  useEffect(() => {
    const startX = { current: 0 }
    const startY = { current: 0 }
    const tracking = { current: false }

    const handleTouchStart = (e: TouchEvent) => {
      startX.current = e.touches[0].clientX
      startY.current = e.touches[0].clientY

      if (!isOpenRef.current && startX.current <= EDGE_ZONE) {
        // Starting in the edge zone while closed — claim this touch immediately
        // so the browser doesn't interpret the rightward drag as "go back"
        tracking.current = true
        e.preventDefault()
      } else if (isOpenRef.current) {
        tracking.current = true
      } else {
        tracking.current = false
      }
    }

    const handleTouchEnd = (e: TouchEvent) => {
      if (!tracking.current) return
      tracking.current = false

      const dx = e.changedTouches[0].clientX - startX.current
      const dy = Math.abs(e.changedTouches[0].clientY - startY.current)

      // Ignore if movement is more vertical than horizontal (scrolling)
      if (dy > MAX_SWIPE_Y || dy > Math.abs(dx)) return
      if (Math.abs(dx) < MIN_SWIPE_X) return

      if (!isOpenRef.current && dx > 0 && startX.current <= EDGE_ZONE) {
        onOpenRef.current()
      } else if (isOpenRef.current && dx < 0) {
        onCloseRef.current()
      }
    }

    // passive: false is required to allow preventDefault() on touchstart
    document.addEventListener('touchstart', handleTouchStart, { passive: false })
    document.addEventListener('touchend', handleTouchEnd)

    return () => {
      document.removeEventListener('touchstart', handleTouchStart)
      document.removeEventListener('touchend', handleTouchEnd)
    }
  }, []) // empty deps — stable refs handle updates
}
