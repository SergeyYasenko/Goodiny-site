import type { DeviceFilterOption, ObjectTypeFilterOption, PortfolioProject } from '../types/projectsPage'

export const PROJECTS_HERO_TITLE =
  'За 3+ лет реализовано 40+ уникальных проектов для застройщиков'

export const PROJECTS_HERO_LEAD =
  'Офисы продаж, выставочные стенды, государственные объекты. Каждый проект — измеримый результат.'

export const OBJECT_TYPE_FILTERS: readonly ObjectTypeFilterOption[] = [
  { id: 'residential', label: 'Жилой' },
  { id: 'commercial', label: 'Коммерческий' },
  { id: 'education', label: 'Образование' },
] as const

export const DEVICE_FILTERS: readonly DeviceFilterOption[] = [
  { id: 'xl', label: 'GOODINI XL' },
  { id: 'ultra', label: 'GOODINI Ultra' },
  { id: 'desk', label: 'GOODINI Digital Desk' },
  { id: 'galaxy', label: 'GOODINI Galaxy' },
] as const

export const PORTFOLIO_PROJECTS: readonly PortfolioProject[] = [
  {
    id: '1',
    imageSrc: '/image/ContactsPage/project1.jpeg',
    developer: 'АСИ',
    projectHeading: 'Проект',
    projectValue: 'Ботаника',
    objectTypeIds: ['residential'],
    deviceIds: ['xl'],
  },
  {
    id: '2',
    imageSrc: '/image/ContactsPage/project2.jpeg',
    developer: 'ССК',
    projectHeading: 'Проект',
    projectValue: 'Октябрь Парк',
    objectTypeIds: ['residential', 'commercial'],
    deviceIds: ['ultra'],
  },
  {
    id: '3',
    imageSrc: '/image/ContactsPage/project3.jpeg',
    developer: 'СОВА',
    projectHeading: 'Проекты',
    projectValue: 'ЖК Пульс; ЖК Темп',
    objectTypeIds: ['residential'],
    deviceIds: ['galaxy', 'desk'],
  },
  {
    id: '4',
    imageSrc: '/image/ContactsPage/project4.jpeg',
    developer: 'ГК Родина',
    projectHeading: 'Проект',
    projectValue: 'Союз',
    objectTypeIds: ['residential'],
    deviceIds: ['xl'],
  },
  {
    id: '5',
    imageSrc: '/image/ContactsPage/project5.jpeg',
    developer: 'Первый Трест',
    projectHeading: 'Проект',
    projectValue: 'Атлантис',
    objectTypeIds: ['residential', 'education'],
    deviceIds: ['ultra', 'galaxy'],
  },
  {
    id: '6',
    imageSrc: '/image/ContactsPage/project6.jpeg',
    developer: 'ГК Семья',
    projectHeading: 'Проект',
    projectValue: 'Аманауз',
    objectTypeIds: ['commercial', 'residential'],
    deviceIds: ['desk'],
  },
]
