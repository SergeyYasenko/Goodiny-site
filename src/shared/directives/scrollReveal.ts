import type { Directive, DirectiveBinding } from 'vue'

export interface ScrollRevealOptions {
  delayMs?: number
}

const cleanupMap = new WeakMap<HTMLElement, () => void>()

function isReducedMotion(): boolean {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function getDelayMs(binding: DirectiveBinding<ScrollRevealOptions | number | undefined>): number {
  const v = binding.value
  if (typeof v === 'number') return v
  if (v && typeof v === 'object' && typeof v.delayMs === 'number') return v.delayMs
  return 0
}

export const scrollRevealDirective: Directive<HTMLElement, ScrollRevealOptions | number | undefined> = {
  mounted(el, binding) {
    el.classList.add('gi-reveal')

    const delayMs = getDelayMs(binding)

    if (isReducedMotion()) {
      el.classList.add('gi-reveal--visible')
      return
    }

    let done = false
    let observer: IntersectionObserver | null = null
    let raf1 = 0
    let raf2 = 0

    const reveal = () => {
      if (done) return
      done = true
      if (delayMs > 0) {
        el.style.transitionDelay = `${delayMs}ms`
      }
      el.classList.add('gi-reveal--visible')
      observer?.disconnect()
      observer = null
    }

    const trySync = () => {
      if (done) return
      const r = el.getBoundingClientRect()
      const vh = window.innerHeight || document.documentElement.clientHeight
      const vw = window.innerWidth || document.documentElement.clientWidth
      if (r.bottom > 0 && r.top < vh && r.right > 0 && r.left < vw) {
        reveal()
      }
    }

    const onLoad = () => trySync()

    const cleanup = () => {
      cancelAnimationFrame(raf1)
      cancelAnimationFrame(raf2)
      window.removeEventListener('load', onLoad)
      observer?.disconnect()
      observer = null
    }

    try {
      if (!('IntersectionObserver' in window)) {
        reveal()
        return
      }

      observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) reveal()
          }
        },
        { threshold: 0, rootMargin: '0px' },
      )
      observer.observe(el)

      trySync()
      raf1 = requestAnimationFrame(() => {
        trySync()
        raf2 = requestAnimationFrame(trySync)
      })

      window.addEventListener('load', onLoad, { once: true })
      cleanupMap.set(el, cleanup)
    } catch {
      reveal()
      cleanupMap.set(el, cleanup)
    }
  },

  unmounted(el) {
    cleanupMap.get(el)?.()
    cleanupMap.delete(el)
  },
}
