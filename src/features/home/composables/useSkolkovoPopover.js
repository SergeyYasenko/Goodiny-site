import { ref, onMounted, onBeforeUnmount } from 'vue'

/**
 * Toggle panel + close on outside click / Escape.
 * @returns {{ open: import('vue').Ref<boolean>, rootRef: import('vue').Ref<HTMLElement | null>, toggle: () => void, close: () => void }}
 */
export function useSkolkovoPopover() {
  const open = ref(false)
  /** @type {import('vue').Ref<HTMLElement | null>} */
  const rootRef = ref(null)

  function toggle() {
    open.value = !open.value
  }

  function close() {
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
  })

  onBeforeUnmount(() => {
    document.removeEventListener('click', onDocClick)
    document.removeEventListener('keydown', onKey)
  })

  return { open, rootRef, toggle, close }
}
