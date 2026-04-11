<script setup lang="ts">
import type { PortfolioProject } from '../types/projectsPage'

defineProps<{
  project: PortfolioProject
}>()
</script>

<template>
  <article class="proj-card">
    <img
      class="proj-card__img"
      :src="project.imageSrc"
      :alt="`${project.developer}, ${project.projectValue}`"
      width="1200"
      height="675"
      loading="lazy"
      decoding="async"
    />
    <div class="proj-card__gradient" aria-hidden="true" />
    <div class="proj-card__meta">
      <p class="proj-card__line">
        <span class="proj-card__label">Застройщик:</span>
        {{ project.developer }}
      </p>
      <p class="proj-card__line">
        <span class="proj-card__label">{{ project.projectHeading }}:</span>
        {{ project.projectValue }}
      </p>
    </div>
  </article>
</template>

<style scoped>
.proj-card {
  position: relative;
  border-radius: clamp(20px, 2.5vw, 28px);
  overflow: hidden;
  background: #141414;
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.35);
}

.proj-card__img {
  display: block;
  width: 100%;
  height: auto;
  aspect-ratio: 16 / 9;
  object-fit: cover;
  object-position: center;
}

.proj-card__gradient {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0) 35%,
    rgba(0, 0, 0, 0.45) 70%,
    rgba(0, 0, 0, 0.82) 100%
  );
  pointer-events: none;
}

.proj-card__meta {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  padding: clamp(18px, 3vw, 28px) clamp(18px, 3vw, 28px) clamp(20px, 3.5vw, 32px);
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.proj-card__line {
  margin: 0;
  font-size: clamp(14px, 1.15vw, 17px);
  font-weight: 500;
  line-height: 1.4;
  color: #fff;
  text-shadow: 0 1px 14px rgba(0, 0, 0, 0.65);
}

.proj-card__label {
  font-weight: 800;
  margin-right: 4px;
}
</style>
