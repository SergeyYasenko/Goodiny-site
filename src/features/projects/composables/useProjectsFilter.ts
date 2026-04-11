import { computed, ref } from 'vue'
import { PORTFOLIO_PROJECTS } from '../constants/projectsPage'
import type { PortfolioProject, ProjectDeviceId, ProjectObjectTypeId } from '../types/projectsPage'

function normalize(s: string): string {
  return s.trim().toLowerCase()
}

function projectSearchBlob(p: PortfolioProject): string {
  return normalize(`${p.developer} ${p.projectValue}`)
}

export function useProjectsFilter() {
  const searchQuery = ref('')
  const selectedObjectTypeId = ref<ProjectObjectTypeId | null>(null)
  const selectedDeviceId = ref<ProjectDeviceId | null>(null)

  const filteredProjects = computed(() => {
    const q = normalize(searchQuery.value)
    return PORTFOLIO_PROJECTS.filter((p) => {
      if (q && !projectSearchBlob(p).includes(q)) return false
      if (selectedObjectTypeId.value && !p.objectTypeIds.includes(selectedObjectTypeId.value)) {
        return false
      }
      if (selectedDeviceId.value && !p.deviceIds.includes(selectedDeviceId.value)) {
        return false
      }
      return true
    })
  })

  function toggleObjectType(id: ProjectObjectTypeId) {
    selectedObjectTypeId.value = selectedObjectTypeId.value === id ? null : id
  }

  function toggleDevice(id: ProjectDeviceId) {
    selectedDeviceId.value = selectedDeviceId.value === id ? null : id
  }

  return {
    searchQuery,
    selectedObjectTypeId,
    selectedDeviceId,
    filteredProjects,
    toggleObjectType,
    toggleDevice,
  }
}
