import { ref } from 'vue'

const isOpen = ref(false)

export function useLeadRequestModal() {
  function openLeadRequestModal(): void {
    isOpen.value = true
  }

  function closeLeadRequestModal(): void {
    isOpen.value = false
  }

  return {
    isLeadRequestModalOpen: isOpen,
    openLeadRequestModal,
    closeLeadRequestModal,
  }
}
