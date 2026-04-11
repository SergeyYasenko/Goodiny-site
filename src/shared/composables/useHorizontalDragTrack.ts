import { nextTick, onMounted, onUnmounted, ref, type Ref } from 'vue'

export interface UseHorizontalDragTrackOptions {
  trackRef: Ref<HTMLElement | null>
  /** When false: no auto-scroll, drag is clamped to the ends of the track. */
  infinite?: boolean
  speedPxPerSecond?: number
  /**
   * Only when `infinite === false`. `center`: начальная позиция — середина ленты
   * (и при `track <= viewport` можно сдвигать от края до края).
   */
  finiteInitial?: 'start' | 'center'
}

const SEGMENT_SELECTOR = '[data-marquee-segment]'

/**
 * Horizontal track: optional infinite auto-scroll with seamless segments,
 * or finite drag with clamped translate (track parent = viewport).
 */
export function useHorizontalDragTrack(options: UseHorizontalDragTrackOptions) {
  const { trackRef, infinite = true, speedPxPerSecond = 48, finiteInitial = 'start' } = options

  const offsetPx = ref(0)
  const isDragging = ref(false)

  let segmentWidth = 0
  let rafId = 0
  let lastTs = 0
  let dragStartClientX = 0
  let dragStartOffset = 0
  let reduceMotion = false
  let resizeObserver: ResizeObserver | null = null

  function getViewportEl(): HTMLElement | null {
    const track = trackRef.value
    if (!track?.parentElement) return null
    return track.parentElement
  }

  function getFirstSegment(): HTMLElement | null {
    const track = trackRef.value
    if (!track) return null
    return track.querySelector(SEGMENT_SELECTOR)
  }

  function measureSegment() {
    const seg = getFirstSegment()
    segmentWidth = seg?.getBoundingClientRect().width ?? 0
  }

  function getFiniteDragBounds(viewW: number, trackW: number): { min: number; max: number } {
    if (finiteInitial === 'center') {
      if (trackW > viewW) {
        return { min: -(trackW - viewW), max: 0 }
      }
      return { min: 0, max: Math.max(0, viewW - trackW) }
    }
    if (trackW > viewW) {
      return { min: -(trackW - viewW), max: 0 }
    }
    return { min: 0, max: 0 }
  }

  function clampOffsetToViewport() {
    if (infinite) return
    const track = trackRef.value
    const viewport = getViewportEl()
    if (!track || !viewport) return
    const viewW = viewport.clientWidth
    const trackW = track.scrollWidth
    const { min, max } = getFiniteDragBounds(viewW, trackW)
    offsetPx.value = Math.min(max, Math.max(min, offsetPx.value))
  }

  function applyFiniteInitialOffset() {
    if (infinite) return
    const track = trackRef.value
    const viewport = getViewportEl()
    if (!track || !viewport) return
    const viewW = viewport.clientWidth
    const trackW = track.scrollWidth
    if (finiteInitial === 'center') {
      offsetPx.value = (viewW - trackW) / 2
    } else {
      offsetPx.value = 0
    }
    clampOffsetToViewport()
  }

  function normalizeOffset() {
    if (!infinite) {
      clampOffsetToViewport()
      return
    }
    if (segmentWidth <= 0) return
    let v = offsetPx.value
    while (v <= -segmentWidth) {
      v += segmentWidth
    }
    while (v > 0) {
      v -= segmentWidth
    }
    offsetPx.value = v
  }

  function tick(ts: number) {
    if (!infinite) return
    if (!lastTs) lastTs = ts
    const dt = Math.min((ts - lastTs) / 1000, 0.064)
    lastTs = ts
    if (!reduceMotion && !isDragging.value) {
      offsetPx.value -= speedPxPerSecond * dt
    }
    normalizeOffset()
    rafId = requestAnimationFrame(tick)
  }

  function onPointerDown(e: PointerEvent) {
    if (e.pointerType === 'mouse' && e.button !== 0) return
    isDragging.value = true
    dragStartClientX = e.clientX
    dragStartOffset = offsetPx.value
    ;(e.currentTarget as HTMLElement).setPointerCapture(e.pointerId)
  }

  function onPointerMove(e: PointerEvent) {
    if (!isDragging.value) return
    offsetPx.value = dragStartOffset + (e.clientX - dragStartClientX)
    if (!infinite) {
      clampOffsetToViewport()
    }
  }

  function endDrag(e: PointerEvent) {
    if (!isDragging.value) return
    isDragging.value = false
    if (!infinite) {
      clampOffsetToViewport()
    }
    try {
      ;(e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId)
    } catch {
      /* already released */
    }
  }

  function onResizeMeasure() {
    if (infinite) {
      measureSegment()
    } else {
      applyFiniteInitialOffset()
    }
  }

  onMounted(() => {
    if (typeof window === 'undefined') return
    reduceMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false

    window.addEventListener('resize', onResizeMeasure)

    resizeObserver = new ResizeObserver(() => onResizeMeasure())

    void nextTick(() => {
      if (infinite) {
        measureSegment()
        const seg = getFirstSegment()
        if (seg) resizeObserver?.observe(seg)
        else if (trackRef.value) resizeObserver?.observe(trackRef.value)
      } else {
        if (trackRef.value) resizeObserver?.observe(trackRef.value)
        const vp = getViewportEl()
        if (vp) resizeObserver?.observe(vp)
        applyFiniteInitialOffset()
      }
    })

    if (infinite) {
      rafId = requestAnimationFrame(tick)
    }
  })

  onUnmounted(() => {
    cancelAnimationFrame(rafId)
    window.removeEventListener('resize', onResizeMeasure)
    resizeObserver?.disconnect()
  })

  return {
    offsetPx,
    isDragging,
    onPointerDown,
    onPointerMove,
    onPointerUp: endDrag,
    onPointerCancel: endDrag,
  }
}
