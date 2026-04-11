<script setup lang="ts">
import AboutWhySection from '../features/about/components/AboutWhySection.vue'
import AboutPathSection from '../features/about/components/AboutPathSection.vue'
import AboutPeopleSection from '../features/about/components/AboutPeopleSection.vue'
import AboutPartnersSection from '../features/about/components/AboutPartnersSection.vue'
</script>

<template>
  <div class="about-page">
    <AboutWhySection />
    <AboutPathSection />
    <AboutPeopleSection />
    <AboutPartnersSection />
  </div>
</template>

<style scoped>
.about-page {
  flex: 1;
  display: flex;
  flex-direction: column;
  font-family: 'Roboto', system-ui, sans-serif;
  color: #fff;
  background: var(--page-bg, #1f1f1f);
}
</style>
