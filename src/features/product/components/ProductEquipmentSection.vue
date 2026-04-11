<script setup lang="ts">
import { computed } from 'vue'
import ProductEquipmentVideoCard from './ProductEquipmentVideoCard.vue'
import ProductEquipmentTextCard from './ProductEquipmentTextCard.vue'
import ProductProcessSection from './ProductProcessSection.vue'
import ProductVisualizationStripsSection from './ProductVisualizationStripsSection.vue'
import { PRODUCT_TEXT_CARD, PRODUCT_VIDEO_CARDS } from '../constants/productEquipment'

const rowTop = computed(() => PRODUCT_VIDEO_CARDS.slice(0, 2))
const rowBottomVideos = computed(() => PRODUCT_VIDEO_CARDS.slice(2, 4))
</script>

<template>
  <div class="product-equip">
    <header class="product-equip__hero">
      <h1 class="product-equip__hero-title">
        Архитектурная <span class="product-equip__accent">голограмма</span> для офиса продаж
      </h1>
      <p class="product-equip__hero-lead">
        Программно-аппаратный комплекс для 3D-визуализации новостроек. Покупатель видит квартиру до её
        существования — и принимает решение на месте.
      </p>
    </header>

    <section class="product-equip__block" aria-labelledby="equipment-heading">
      <h2 id="equipment-heading" class="product-equip__section-title">Оборудование</h2>

      <div class="product-equip__grid">
        <ProductEquipmentVideoCard
          v-for="card in rowTop"
          :key="card.id"
          class="product-equip__cell product-equip__cell--half"
          wide
          :title="card.title"
          :sources="card.sources"
          :detail-href="card.detailHref"
        />
        <ProductEquipmentTextCard
          class="product-equip__cell product-equip__cell--third"
          :title="PRODUCT_TEXT_CARD.title"
          :text="PRODUCT_TEXT_CARD.text"
        />
        <ProductEquipmentVideoCard
          v-for="card in rowBottomVideos"
          :key="card.id"
          class="product-equip__cell product-equip__cell--third"
          :title="card.title"
          :sources="card.sources"
          :detail-href="card.detailHref"
        />
      </div>
    </section>

    <ProductVisualizationStripsSection />

    <ProductProcessSection />
  </div>
</template>

<style scoped>
.product-equip {
  width: 100%;
  max-width: var(--home-container-max, 1230px);
  margin-inline: auto;
  padding: var(--site-section-pad-y) var(--home-container-pad-x, 15px);
  box-sizing: border-box;
  color: #fff;
  font-family: 'Roboto', system-ui, sans-serif;
}

.product-equip__hero {
  text-align: center;
  margin-bottom: var(--site-section-pad-y);
}

.product-equip__hero-title {
  margin: 0 auto clamp(28px, 5vw, 48px);
  max-width: min(920px, 100%);
  font-size: clamp(28px, 2.5vw + 0.5rem, 48px);
  font-weight: 900;
  line-height: 1.12;
  letter-spacing: -0.02em;
  text-wrap: balance;
  color: #fff;
}

.product-equip__accent {
  color: var(--home-accent, #2a6ed8);
}

.product-equip__hero-lead {
  margin: 0 auto;
  max-width: min(760px, 100%);
  font-size: clamp(15px, 1.2vw, 18px);
  font-weight: 400;
  line-height: 1.55;
  color: rgba(255, 255, 255, 0.88);
}

.product-equip__block {
  margin: 0;
}

.product-equip__section-title {
  margin: 0 0 clamp(40px, 6vw, 72px);
  font-size: clamp(26px, 2.2vw + 0.5rem, 40px);
  font-weight: 900;
  line-height: 1.12;
  letter-spacing: -0.02em;
  text-align: center;
  color: #fff;
}

.product-equip__grid {
  display: grid;
  grid-template-columns: repeat(6, minmax(0, 1fr));
  gap: clamp(24px, 4vw, 40px);
  align-items: stretch;
}

.product-equip__cell--half {
  grid-column: span 3;
}

.product-equip__cell--third {
  grid-column: span 2;
}

@media (max-width: 900px) {
  .product-equip__cell--half,
  .product-equip__cell--third {
    grid-column: 1 / -1;
  }
}
</style>
