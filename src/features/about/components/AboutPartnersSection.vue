<script setup lang="ts">
import { ref, computed } from 'vue'
import { usePartnersMarquee } from '../composables/usePartnersMarquee'

interface PartnerLogo {
  src: string
  alt: string
}

const PARTNER_IDS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] as const

const logos: PartnerLogo[] = PARTNER_IDS.map((n) => ({
  src: `/icons/partners/partner${n}.png`,
  alt: `Партнёр ${n}`,
}))

const FALLBACK_LOGO = '/icons/logo.svg'

function onLogoError(event: Event) {
  const el = event.target as HTMLImageElement
  if (el.dataset.fallbackApplied === '1') return
  el.dataset.fallbackApplied = '1'
  el.src = FALLBACK_LOGO
}

const showroomCtaHref =
  'mailto:goodini.3d@gmail.com?subject=%D0%97%D0%B0%D0%BF%D0%B8%D1%81%D1%8C%20%D0%BD%D0%B0%20%D0%BF%D1%80%D0%B5%D0%B7%D0%B5%D0%BD%D1%82%D0%B0%D1%86%D0%B8%D1%8E%20%D0%B2%20%D1%88%D0%BE%D1%83%D1%80%D1%83%D0%BC'

const legalLines = [
  'ООО «ГУДИНИ», ИНН 6164123919, ОГРН 1186196045584.',
  'Контакты: Москва, Инновационный центр Сколково, ул. Малевича, д. 1.',
]

const trackRef = ref<HTMLElement | null>(null)
const { offsetPx, isDragging, onPointerDown, onPointerMove, onPointerUp, onPointerCancel } =
  usePartnersMarquee({ trackRef, infinite: true, speedPxPerSecond: 44 })

const trackStyle = computed(() => ({
  transform: `translate3d(${offsetPx.value}px, 0, 0)`,
}))
</script>

<template>
  <section v-scroll-reveal class="partners" aria-labelledby="partners-heading">
    <div class="partners__inner">
      <h2 id="partners-heading" class="partners__title">Наши партнеры</h2>

      <div
        class="partners__viewport"
        :class="{ 'partners__viewport--dragging': isDragging }"
        @pointerdown="onPointerDown"
        @pointermove="onPointerMove"
        @pointerup="onPointerUp"
        @pointercancel="onPointerCancel"
      >
        <div ref="trackRef" class="partners__track" :style="trackStyle">
          <div data-marquee-segment class="partners__segment" role="list">
            <div v-for="(logo, i) in logos" :key="`a-${i}`" class="partners__logo-wrap" role="listitem">
              <img
                class="partners__logo"
                :src="logo.src"
                :alt="logo.alt"
                width="160"
                height="80"
                loading="lazy"
                @error="onLogoError"
              />
            </div>
          </div>
          <div data-marquee-segment class="partners__segment" aria-hidden="true">
            <div v-for="(logo, i) in logos" :key="`b-${i}`" class="partners__logo-wrap">
              <img
                class="partners__logo"
                :src="logo.src"
                alt=""
                width="160"
                height="80"
                loading="lazy"
                @error="onLogoError"
              />
            </div>
          </div>
        </div>
      </div>

      <a class="partners__cta" :href="showroomCtaHref">Записаться на презентацию в шоурум</a>

      <div class="partners__legal">
        <p v-for="(line, i) in legalLines" :key="i" class="partners__legal-line">{{ line }}</p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.partners {
  flex-shrink: 0;
  padding: var(--site-section-pad-y) 0;
  color: #fff;
  background: var(--page-bg, #1f1f1f);
}

.partners__inner {
  width: 100%;
  max-width: var(--home-container-max, 1230px);
  margin-inline: auto;
  padding-inline: var(--home-container-pad-x, 15px);
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.partners__title {
  margin: 0 0 clamp(48px, 8vw, 80px);
  font-size: clamp(28px, 2.5vw + 0.5rem, 44px);
  font-weight: 900;
  line-height: 1.12;
  letter-spacing: -0.02em;
  color: #fff;
}

.partners__viewport {
  width: 100%;
  overflow: hidden;
  cursor: grab;
  touch-action: none;
  user-select: none;
  margin-bottom: clamp(48px, 8vw, 80px);
  mask-image: linear-gradient(
    90deg,
    transparent 0%,
    #000 12%,
    #000 88%,
    transparent 100%
  );
  -webkit-mask-image: linear-gradient(
    90deg,
    transparent 0%,
    #000 12%,
    #000 88%,
    transparent 100%
  );
}

.partners__viewport--dragging {
  cursor: grabbing;
}

.partners__track {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  width: max-content;
  will-change: transform;
}

.partners__segment {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
  gap: clamp(40px, 6vw, 72px);
  padding-inline: clamp(32px, 5vw, 56px);
  box-sizing: border-box;
}

.partners__logo-wrap {
  flex: 0 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  width: clamp(120px, 18vw, 168px);
  height: clamp(56px, 10vw, 80px);
}

.partners__logo {
  display: block;
  max-width: 100%;
  max-height: 100%;
  width: auto;
  height: auto;
  object-fit: contain;
  filter: grayscale(0.08) brightness(1.05);
  pointer-events: none;
}

.partners__cta {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 52px;
  padding: 0 clamp(28px, 4vw, 40px);
  border-radius: 999px;
  font-size: clamp(14px, 1.1vw, 16px);
  font-weight: 700;
  line-height: 1.2;
  color: #fff;
  text-decoration: none;
  background: var(--home-accent, #2a6ed8);
  border: 1px solid rgba(255, 255, 255, 0.22);
  transition: filter 0.15s ease;
}

.partners__cta:hover {
  filter: brightness(1.08);
}

.partners__legal {
  margin-top: clamp(28px, 5vw, 44px);
  max-width: 52rem;
}

.partners__legal-line {
  margin: 0;
  font-size: clamp(12px, 0.95vw, 14px);
  font-weight: 400;
  line-height: 1.5;
  color: rgba(255, 255, 255, 0.72);
}

.partners__legal-line + .partners__legal-line {
  margin-top: 6px;
}

@media (max-width: 520px) {
  .partners__viewport {
    mask-image: none;
    -webkit-mask-image: none;
  }
}
</style>
