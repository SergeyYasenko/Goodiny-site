<script setup>
import HomeHeroMain from '../features/home/components/HomeHeroMain.vue'
import HomeVisualizationSection from '../features/home/components/HomeVisualizationSection.vue'
import HomeProcessSection from '../features/home/components/HomeProcessSection.vue'
import HomeTour3dSection from '../features/home/components/HomeTour3dSection.vue'
import HomeContactSection from '../features/home/components/HomeContactSection.vue'
import SkolkovoWidget from '../features/home/components/SkolkovoWidget.vue'
</script>

<template>
  <div class="home">
    <section class="home__hero" aria-label="Главный экран">
      <div class="home__bg" />
      <div class="home__scrim" />
      <HomeHeroMain />
    </section>
    <HomeVisualizationSection />
    <HomeProcessSection />
    <HomeTour3dSection />
    <HomeContactSection />
    <SkolkovoWidget />
  </div>
</template>

<style scoped>
.home {
  position: relative;
  display: flex;
  flex-direction: column;
  flex: 1;
  font-family: 'Roboto', system-ui, sans-serif;
  color: #fff;
  background: var(--page-bg, #1f1f1f);
}

.home__hero {
  position: relative;
  display: flex;
  flex-direction: column;
  min-height: calc(100dvh - var(--app-header-offset, 100px));
  min-height: calc(100vh - var(--app-header-offset, 100px));
  flex-shrink: 0;
  overflow: hidden;
}

.home__bg {
  position: absolute;
  inset: 0;
  background-color: #14161c;
  background-image: var(--home-bg-image);
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
}

.home__scrim {
  position: absolute;
  inset: 0;
  background: radial-gradient(
    ellipse 80% 65% at 50% 42%,
    rgba(8, 10, 14, 0.08) 0%,
    rgba(8, 10, 14, 0.35) 72%,
    rgba(8, 10, 14, 0.55) 100%
  );
  pointer-events: none;
}
</style>
