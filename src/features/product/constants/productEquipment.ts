import type { ProductTextCard, ProductVideoCard } from '../types/productEquipment'

/** Путь относительно `public` (без ведущего `/`) — учитывается Vite `base` */
function publicAsset(path: string): string {
  const base = import.meta.env.BASE_URL ?? '/'
  const clean = path.replace(/^\//, '')
  return base.endsWith('/') ? `${base}${clean}` : `${base}/${clean}`
}

/**
 * Ролики: основной webm из public/image/ProjectsPage/videos/,
 * запасной mp4 из public/video/product/ (после scripts/compress-product-videos.sh).
 * GALAXY: прозрачный фон — Galaxy_alpha.webm (scripts/encode-galaxy-alpha-webm.sh).
 */
export const PRODUCT_VIDEO_CARDS: ProductVideoCard[] = [
  {
    id: 'xl',
    title: 'GOODINI XL',
    sources: [
      { src: publicAsset('image/ProjectsPage/videos/XL_.webm'), type: 'video/webm' },
      { src: publicAsset('video/product/xl.mp4'), type: 'video/mp4' },
    ],
    detailHref: '/#contacts',
  },
  {
    id: 'digital-desk',
    title: 'GOODINI DIGITAL DESK',
    sources: [
      { src: publicAsset('image/ProjectsPage/videos/Table_.webm'), type: 'video/webm' },
      { src: publicAsset('video/product/digital-desk.mp4'), type: 'video/mp4' },
    ],
    detailHref: '/#contacts',
  },
  {
    id: 'galaxy',
    title: 'GOODINI GALAXY',
    sources: [
      { src: publicAsset('image/ProjectsPage/videos/Galaxy_alpha.webm'), type: 'video/webm' },
      { src: publicAsset('video/product/galaxy.mp4'), type: 'video/mp4' },
    ],
    detailHref: '/#contacts',
  },
  {
    id: 'ultra',
    title: 'GOODINI ULTRA',
    sources: [
      { src: publicAsset('image/ProjectsPage/videos/Ultra_.webm'), type: 'video/webm' },
      { src: publicAsset('video/product/ultra.mp4'), type: 'video/mp4' },
    ],
    detailHref: '/#contacts',
  },
]

export const PRODUCT_TEXT_CARD: ProductTextCard = {
  id: 'model-range',
  title: 'Модельный ряд',
  text:
    'Линейка голографических стоек. 4 модели голографических стоек, современные решения для привлечения внимания и вау-эффекта.',
}
