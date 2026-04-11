<script setup lang="ts">
import type { ProductProcessAccent } from '../types/productProcess'

defineProps<{
  num: string
  title: string
  body: string
  badge: string
  accent: ProductProcessAccent
}>()
</script>

<template>
  <article class="process-card" :class="`process-card--${accent}`">
    <div class="process-card__head">
      <span class="process-card__num" aria-hidden="true">{{ num }}</span>
      <h3 class="process-card__title">{{ title }}</h3>
    </div>
    <p class="process-card__body">{{ body }}</p>
    <p class="process-card__badge">{{ badge }}</p>
  </article>
</template>

<style scoped>
.process-card {
  --ring: #888;
  --num-color: #fff;
  --badge-bg: rgba(255, 255, 255, 0.1);
  --badge-br: rgba(255, 255, 255, 0.14);

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  min-width: 0;
  min-height: 100%;
  padding: clamp(20px, 2.8vw, 28px) clamp(16px, 2.2vw, 22px);
  border-radius: clamp(22px, 2.8vw, 30px);
  background: rgba(255, 255, 255, 0.045);
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.04);
  box-sizing: border-box;
}

.process-card--green {
  --ring: #3dd68c;
  --num-color: #fff;
  --badge-bg: rgba(61, 214, 140, 0.22);
  --badge-br: rgba(61, 214, 140, 0.45);
}

.process-card--blue {
  --ring: #2a6ed8;
  --num-color: #2a6ed8;
  --badge-bg: rgba(47, 143, 255, 0.2);
  --badge-br: rgba(47, 143, 255, 0.42);
}

.process-card--purple {
  --ring: #b07cff;
  --num-color: #b07cff;
  --badge-bg: rgba(176, 124, 255, 0.2);
  --badge-br: rgba(176, 124, 255, 0.42);
}

.process-card--red {
  --ring: #ff6b6b;
  --num-color: #ff6b6b;
  --badge-bg: rgba(255, 107, 107, 0.18);
  --badge-br: rgba(255, 107, 107, 0.4);
}

.process-card__head {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: clamp(14px, 2vw, 20px);
  margin-bottom: clamp(12px, 2vw, 16px);
}

.process-card__num {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  border: 2px solid var(--ring);
  font-size: 15px;
  font-weight: 800;
  line-height: 1;
  letter-spacing: 0.02em;
  color: var(--num-color);
  background: rgba(0, 0, 0, 0.2);
  flex-shrink: 0;
}

.process-card__title {
  margin: 0;
  font-size: clamp(18px, 1.5vw, 22px);
  font-weight: 800;
  line-height: 1.2;
  letter-spacing: -0.02em;
  color: #fff;
}

.process-card__body {
  margin: 0 0 clamp(20px, 3vw, 28px);
  flex: 1 1 auto;
  font-size: clamp(14px, 1.1vw, 16px);
  font-weight: 400;
  line-height: 1.55;
  color: rgba(255, 255, 255, 0.78);
}

.process-card__badge {
  margin: auto 0 0;
  padding: 8px 16px;
  border-radius: 999px;
  font-size: clamp(13px, 1vw, 14px);
  font-weight: 700;
  line-height: 1.25;
  color: #fff;
  background: var(--badge-bg);
  border: 1px solid var(--badge-br);
}
</style>
