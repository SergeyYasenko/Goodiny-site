export type ProductProcessAccent = 'green' | 'blue' | 'purple' | 'red'

export interface ProductProcessStep {
  num: string
  title: string
  body: string
  badge: string
  accent: ProductProcessAccent
}
