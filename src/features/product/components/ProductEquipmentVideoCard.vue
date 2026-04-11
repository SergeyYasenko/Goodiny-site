<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import type { ProductVideoSource } from '../types/productEquipment'

const props = withDefaults(
  defineProps<{
    title: string
    sources: ProductVideoSource[]
    detailHref: string
    wide?: boolean
  }>(),
  { wide: false },
)

const videoEl = ref<HTMLVideoElement | null>(null)

const videoKey = computed(() => props.sources.map((s) => s.src).join('|'))

function tryPlay() {
  const el = videoEl.value
  if (!el) return
  el.defaultMuted = true
  el.muted = true
  el.setAttribute('muted', '')
  void el.play().catch(() => {
    /* autoplay до взаимодействия */
  })
}

onMounted(() => tryPlay())
</script>

<template>
  <article class="video-card" :class="{ 'video-card--wide': props.wide }">
    <div class="video-card__media">
      <video
        :key="videoKey"
        ref="videoEl"
        class="video-card__video"
        autoplay
        loop
        muted
        playsinline
        disablePictureInPicture
        disableRemotePlayback
        controlslist="nodownload noplaybackrate"
        preload="auto"
        @contextmenu.prevent
        @loadeddata="tryPlay"
        @canplay="tryPlay"
      >
        <source v-for="(s, i) in props.sources" :key="i" :src="s.src" :type="s.type" />
      </video>
      <div class="video-card__scrim" aria-hidden="true" />
    </div>
    <h3 class="video-card__title">{{ props.title }}</h3>
    <a class="video-card__link" :href="props.detailHref" aria-label="Подробнее о продукте">
      <span class="video-card__link-inner" aria-hidden="true">
        <svg class="video-card__arrow" width="18" height="18" viewBox="0 0 24 24" fill="none">
          <path
            d="M7 7L17 17M17 17H9M17 17V9"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </span>
    </a>
  </article>
</template>

<style scoped>
.video-card {
  --video-card-min-h: clamp(260px, 42vw, 440px);
  position: relative;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: minmax(var(--video-card-min-h), auto);
  min-width: 0;
  width: 100%;
  border-radius: clamp(20px, 2.5vw, 28px);
  overflow: hidden;
  background: #141414;
  border: 1px solid rgba(255, 255, 255, 0.08);
}

.video-card--wide {
  --video-card-min-h: clamp(220px, 36vw, 400px);
}

.video-card__media {
  grid-column: 1;
  grid-row: 1;
  position: relative;
  z-index: 0;
  min-height: var(--video-card-min-h);
  width: 100%;
  background: #1a1a1a;
}

.video-card__video {
  position: absolute;
  inset: 0;
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  pointer-events: none;
}

.video-card__scrim {
  position: absolute;
  inset: 0;
  z-index: 1;
  background: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0.5) 0%,
    transparent 38%,
    transparent 62%,
    rgba(0, 0, 0, 0.3) 100%
  );
  pointer-events: none;
}

.video-card__title {
  grid-column: 1;
  grid-row: 1;
  position: relative;
  z-index: 2;
  align-self: start;
  justify-self: start;
  margin: 0;
  padding: clamp(18px, 2.5vw, 26px) clamp(18px, 2.5vw, 24px) 0;
  font-size: clamp(17px, 1.5vw, 22px);
  font-weight: 800;
  line-height: 1.2;
  letter-spacing: -0.02em;
  color: #fff;
  text-shadow: 0 2px 16px rgba(0, 0, 0, 0.45);
  pointer-events: none;
}

.video-card__link {
  grid-column: 1;
  grid-row: 1;
  position: relative;
  z-index: 3;
  align-self: end;
  justify-self: end;
  margin: 0 clamp(14px, 2vw, 20px) clamp(14px, 2vw, 20px) 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.14);
  border: 1px solid rgba(255, 255, 255, 0.22);
  color: #fff;
  text-decoration: none;
  backdrop-filter: blur(8px);
  transition:
    background 0.15s ease,
    transform 0.15s ease;
}

.video-card__link:hover {
  background: rgba(255, 255, 255, 0.22);
  transform: scale(1.04);
}

.video-card__link-inner {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.18);
}

.video-card__arrow {
  display: block;
}
</style>
