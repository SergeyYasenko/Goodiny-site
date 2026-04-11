<script setup lang="ts">
import ProductEquipmentSection from '../features/product/components/ProductEquipmentSection.vue'
</script>

<template>
  <div class="product-page">
    <ProductEquipmentSection />
  </div>
</template>

<style scoped>
.product-page {
  flex: 1;
  display: flex;
  flex-direction: column;
  background: var(--page-bg, #1f1f1f);
}
</style>
