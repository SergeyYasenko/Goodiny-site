<script setup>
import { RouterView } from 'vue-router'
import HomeSiteHeader from './features/home/components/HomeSiteHeader.vue'
import HomeFooter from './features/home/components/HomeFooter.vue'
</script>

<template>
  <div class="app-shell">
    <HomeSiteHeader />
    <main class="main main--site">
      <RouterView v-slot="{ Component, route }">
        <Transition name="page-fade" mode="out-in">
          <component :is="Component" :key="route.fullPath" />
        </Transition>
      </RouterView>
    </main>
    <HomeFooter />
  </div>
</template>

<style src="./features/home/homeScreenTokens.css"></style>

<style scoped>
.app-shell {
  min-height: 100dvh;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: var(--page-bg, #1f1f1f);
}

.main--site {
  flex: 1;
  width: 100%;
  min-height: 0;
  display: flex;
  flex-direction: column;
}
</style>

<style>
.page-fade-enter-active,
.page-fade-leave-active {
  transition: opacity 0.28s ease;
}

.page-fade-enter-from,
.page-fade-leave-to {
  opacity: 0;
}
</style>
