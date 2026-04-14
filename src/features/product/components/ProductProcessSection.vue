<script setup lang="ts">
import ProductProcessStepCard from './ProductProcessStepCard.vue'
import { useLeadRequestModal } from '../../../shared/composables/useLeadRequestModal'
import {
  PRODUCT_PROCESS_SECTION_TITLE_PREFIX,
  PRODUCT_PROCESS_SECTION_TITLE_ACCENT,
  PRODUCT_PROCESS_STEPS,
  PRODUCT_PROCESS_CTA_TITLE,
  PRODUCT_PROCESS_CTA_LEAD,
} from '../constants/productProcess'

const { openLeadRequestModal } = useLeadRequestModal()
</script>

<template>
  <section v-scroll-reveal class="product-process" aria-labelledby="product-process-heading">
    <h2 id="product-process-heading" class="product-process__title">
      {{ PRODUCT_PROCESS_SECTION_TITLE_PREFIX }}<span class="product-process__title-accent">{{ PRODUCT_PROCESS_SECTION_TITLE_ACCENT }}</span>
    </h2>

    <div class="product-process__grid-wrap">
      <ul class="product-process__grid" role="list">
        <li v-for="step in PRODUCT_PROCESS_STEPS" :key="step.num" class="product-process__cell" role="listitem">
          <ProductProcessStepCard
            :num="step.num"
            :title="step.title"
            :body="step.body"
            :badge="step.badge"
            :accent="step.accent"
          />
        </li>
      </ul>
    </div>

    <div class="product-process__cta-block">
      <h3 class="product-process__cta-title">{{ PRODUCT_PROCESS_CTA_TITLE }}</h3>
      <p class="product-process__cta-lead">{{ PRODUCT_PROCESS_CTA_LEAD }}</p>
      <button type="button" class="product-process__cta" @click="openLeadRequestModal">
        Оставить заявку
      </button>
    </div>
  </section>
</template>

<style scoped>
.product-process {
  width: 100%;
  margin-top: var(--site-section-pad-y);
  margin-bottom: 0;
  color: #fff;
  font-family: 'Roboto', system-ui, sans-serif;
}

.product-process__title {
  margin: 0 auto clamp(40px, 6vw, 64px);
  max-width: min(48rem, 100%);
  font-size: clamp(24px, 2.2vw + 0.5rem, 40px);
  font-weight: 900;
  line-height: 1.15;
  letter-spacing: -0.02em;
  text-align: center;
  text-wrap: balance;
  color: #fff;
}

.product-process__title-accent {
  color: var(--home-accent, #2a6ed8);
}

.product-process__grid-wrap {
  width: 100%;
  max-width: min(44rem, 100%);
  margin-inline: auto;
  box-sizing: border-box;
}

.product-process__grid {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: clamp(16px, 2.8vw, 24px);
  align-items: stretch;
}

.product-process__cell {
  margin: 0;
  min-width: 0;
}

.product-process__cta-block {
  margin-top: clamp(48px, 8vw, 88px);
  text-align: center;
  max-width: min(36rem, 100%);
  margin-inline: auto;
}

.product-process__cta-title {
  margin: 0 0 clamp(16px, 2.5vw, 22px);
  font-size: clamp(22px, 2vw + 0.5rem, 34px);
  font-weight: 900;
  line-height: 1.15;
  letter-spacing: -0.02em;
  color: #fff;
}

.product-process__cta-lead {
  margin: 0 0 clamp(28px, 5vw, 40px);
  font-size: clamp(15px, 1.2vw, 17px);
  font-weight: 400;
  line-height: 1.55;
  color: rgba(255, 255, 255, 0.82);
}

.product-process__cta {
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
  cursor: pointer;
  transition: filter 0.15s ease;
}

.product-process__cta:hover {
  filter: brightness(1.08);
}

.product-process__cta:focus-visible {
  outline: 2px solid var(--home-accent, #2a6ed8);
  outline-offset: 3px;
}

@media (max-width: 720px) {
  .product-process__grid {
    grid-template-columns: 1fr;
  }
}
</style>
