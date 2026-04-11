<script setup lang="ts">
import { ref, computed } from 'vue'
import { useHorizontalDragTrack } from '../composables/useHorizontalDragTrack'
import type { VizPillItem } from '../types/vizPillStrip'

const props = defineProps<{
  items: VizPillItem[]
  /** Визуальный сдвиг ряда (как на макете). */
  stagger?: 'none' | 'start'
}>()

const trackRef = ref<HTMLElement | null>(null)
const { offsetPx, isDragging, onPointerDown, onPointerMove, onPointerUp, onPointerCancel } =
  useHorizontalDragTrack({ trackRef, infinite: false, finiteInitial: 'center' })

const trackStyle = computed(() => ({
  transform: `translate3d(${offsetPx.value}px, 0, 0)`,
}))
</script>

<template>
  <div
    class="pill-strip__viewport"
    :class="{
      'pill-strip__viewport--dragging': isDragging,
      'pill-strip__viewport--stagger': props.stagger === 'start',
    }"
    @pointerdown="onPointerDown"
    @pointermove="onPointerMove"
    @pointerup="onPointerUp"
    @pointercancel="onPointerCancel"
  >
    <div ref="trackRef" class="pill-strip__track" :style="trackStyle" role="list">
      <div v-for="(item, i) in items" :key="`${item.src}-${i}`" class="pill-strip__pill" role="listitem">
        <img
          class="pill-strip__img"
          :src="item.src"
          :alt="item.alt"
          width="400"
          height="112"
          loading="lazy"
          decoding="async"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.pill-strip__viewport {
  width: 100%;
  overflow: hidden;
  cursor: grab;
  touch-action: none;
  user-select: none;
  margin-bottom: clamp(10px, 2vw, 18px);
  mask-image: linear-gradient(90deg, transparent 0%, #000 10%, #000 90%, transparent 100%);
  -webkit-mask-image: linear-gradient(90deg, transparent 0%, #000 10%, #000 90%, transparent 100%);
}

.pill-strip__viewport--stagger .pill-strip__track {
  padding-inline-start: clamp(20px, 4vw, 56px);
}

.pill-strip__viewport--dragging {
  cursor: grabbing;
}

.pill-strip__track {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
  gap: clamp(16px, 2.5vw, 28px);
  width: max-content;
  padding-block: clamp(6px, 1.2vw, 12px);
  padding-inline: clamp(4px, 1vw, 8px);
  box-sizing: border-box;
  will-change: transform;
}

.pill-strip__pill {
  flex: 0 0 auto;
  position: relative;
  width: clamp(220px, 32vw, 340px);
  aspect-ratio: 18 / 5;
  border-radius: 9999px;
  overflow: hidden;
  background: #1a1a1a;
  box-shadow:
    inset 0 0 24px rgba(0, 0, 0, 0.5),
    0 8px 28px rgba(0, 0, 0, 0.35);
}

.pill-strip__img {
  position: absolute;
  inset: 0;
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  pointer-events: none;
}

@media (max-width: 520px) {
  .pill-strip__viewport {
    mask-image: none;
    -webkit-mask-image: none;
  }
}
</style>
