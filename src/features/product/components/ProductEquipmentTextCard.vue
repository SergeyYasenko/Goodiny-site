<script setup lang="ts">
defineProps<{
  title: string
  text: string
}>()
</script>

<template>
  <article class="text-card">
    <h3 class="text-card__title">{{ title }}</h3>
    <p class="text-card__body">{{ text }}</p>
  </article>
</template>

<style scoped>
.text-card {
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-width: 0;
  min-height: clamp(260px, 38vw, 420px);
  padding: clamp(22px, 3vw, 32px) clamp(20px, 2.8vw, 28px);
  border-radius: clamp(20px, 2.5vw, 28px);
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-sizing: border-box;
}

.text-card__title {
  margin: 0 0 clamp(12px, 2vw, 18px);
  font-size: clamp(17px, 1.5vw, 22px);
  font-weight: 800;
  line-height: 1.2;
  letter-spacing: -0.02em;
  color: #fff;
}

.text-card__body {
  margin: 0;
  font-size: clamp(14px, 1.1vw, 16px);
  font-weight: 400;
  line-height: 1.55;
  color: rgba(255, 255, 255, 0.82);
}
</style>
