<script setup lang="ts">
import { RouterLink } from 'vue-router'
import VizPillStrip from '../../../shared/components/VizPillStrip.vue'
import {
  PRODUCT_VIZ_STRIPS_HEADING,
  PRODUCT_VIZ_STRIP_TOP,
  PRODUCT_VIZ_STRIP_BOTTOM,
} from '../constants/productVisualizationStrips'
</script>

<template>
  <section class="product-viz" aria-labelledby="product-viz-heading">
    <div class="product-viz__inner">
      <h2 id="product-viz-heading" class="product-viz__heading">
        {{ PRODUCT_VIZ_STRIPS_HEADING }}
      </h2>
    </div>

    <div class="product-viz__strips-wrap" aria-label="Примеры проектов">
      <VizPillStrip :items="PRODUCT_VIZ_STRIP_TOP" />
      <VizPillStrip :items="PRODUCT_VIZ_STRIP_BOTTOM" stagger="start" />
    </div>

    <div class="product-viz__inner product-viz__inner--cta">
      <RouterLink class="product-viz__cta" :to="{ name: 'home', hash: '#contacts' }">
        Оставить заявку
      </RouterLink>
    </div>
  </section>
</template>

<style scoped>
.product-viz {
  width: 100%;
  margin-top: var(--site-section-pad-y);
  margin-bottom: 0;
  color: #fff;
  font-family: 'Roboto', system-ui, sans-serif;
}

.product-viz__inner {
  width: 100%;
  max-width: var(--home-container-max, 1230px);
  margin-inline: auto;
  padding-inline: var(--home-container-pad-x, 15px);
  box-sizing: border-box;
}

.product-viz__inner--cta {
  display: flex;
  justify-content: center;
  margin-top: clamp(28px, 5vw, 48px);
}

.product-viz__heading {
  margin: 0 auto clamp(32px, 5vw, 56px);
  max-width: min(56rem, 100%);
  font-size: clamp(20px, 1.75vw + 0.65rem, 36px);
  font-weight: 900;
  line-height: 1.15;
  letter-spacing: -0.02em;
  text-align: center;
  text-wrap: balance;
  color: #fff;
}

.product-viz__strips-wrap {
  width: 100%;
  max-width: var(--home-container-max, 1230px);
  margin-inline: auto;
  padding-inline: var(--home-container-pad-x, 15px);
  box-sizing: border-box;
}

.product-viz__cta {
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

.product-viz__cta:hover {
  filter: brightness(1.08);
}

.product-viz__cta:focus-visible {
  outline: 2px solid var(--home-accent, #2a6ed8);
  outline-offset: 3px;
}
</style>
