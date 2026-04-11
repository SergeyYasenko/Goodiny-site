export interface ProductVideoSource {
  src: string
  type: string
}

export interface ProductVideoCard {
  id: string
  title: string
  /** Порядок: предпочтительный формат первым (например webm, затем mp4) */
  sources: ProductVideoSource[]
  detailHref: string
}

export interface ProductTextCard {
  id: string
  title: string
  text: string
}
