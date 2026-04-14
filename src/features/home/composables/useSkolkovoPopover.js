import { ref, onMounted, onBeforeUnmount } from 'vue'

/**
 * Toggle panel + close on outside click / Escape.
 * @returns {{ open: import('vue').Ref<boolean>, rootRef: import('vue').Ref<HTMLElement | null>, toggle: () => void, close: () => void }}
 */
export function useSkolkovoPopover() {
  const AUTO_HIDE_MS = 5000
  const open = ref(false)
  /** @type {import('vue').Ref<HTMLElement | null>} */
  const rootRef = ref(null)
  /** @type {ReturnType<typeof setTimeout> | null} */
  let hideTimer = null

  function clearHideTimer() {
    if (hideTimer) {
      clearTimeout(hideTimer)
      hideTimer = null
    }
  }

  function scheduleAutoHide() {
    clearHideTimer()
    hideTimer = setTimeout(() => {
      open.value = false
      hideTimer = null
    }, AUTO_HIDE_MS)
  }

  function showTemporarily() {
    open.value = true
    scheduleAutoHide()
  }

  function toggle() {
    if (open.value) {
      close()
      return
    }
    showTemporarily()
  }

  function close() {
    clearHideTimer()
    open.value = false
  }

  /** @param {MouseEvent} e */
  function onDocClick(e) {
    if (!open.value) return
    const el = rootRef.value
    if (el && e.target instanceof Node && el.contains(e.target)) return
    close()
  }

  /** @param {KeyboardEvent} e */
  function onKey(e) {
    if (e.key === 'Escape') close()
  }

  onMounted(() => {
    document.addEventListener('click', onDocClick)
    document.addEventListener('keydown', onKey)
    showTemporarily()
  })

  onBeforeUnmount(() => {
    clearHideTimer()
    document.removeEventListener('click', onDocClick)
    document.removeEventListener('keydown', onKey)
  })

  return { open, rootRef, toggle, close }
}
