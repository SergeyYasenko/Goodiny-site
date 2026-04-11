import { ref, onMounted } from 'vue'

const STORAGE_KEY = 'goodini-cookie-consent'

/**
 * @returns {{ visible: import('vue').Ref<boolean>, accept: () => void }}
 */
export function useCookieConsent() {
  const visible = ref(false)

  function accept() {
    try {
      localStorage.setItem(STORAGE_KEY, '1')
    } catch {
      /* ignore */
    }
    visible.value = false
  }

  onMounted(() => {
    try {
      visible.value = localStorage.getItem(STORAGE_KEY) !== '1'
    } catch {
      visible.value = true
    }
  })

  return { visible, accept }
}
