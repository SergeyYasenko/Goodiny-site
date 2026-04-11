export type ProjectObjectTypeId = 'residential' | 'commercial' | 'education'

export type ProjectDeviceId = 'xl' | 'ultra' | 'desk' | 'galaxy'

export interface PortfolioProject {
  id: string
  imageSrc: string
  developer: string
  projectHeading: 'Проект' | 'Проекты'
  projectValue: string
  objectTypeIds: readonly ProjectObjectTypeId[]
  deviceIds: readonly ProjectDeviceId[]
}

export interface ObjectTypeFilterOption {
  id: ProjectObjectTypeId
  label: string
}

export interface DeviceFilterOption {
  id: ProjectDeviceId
  label: string
  indent?: boolean
}
