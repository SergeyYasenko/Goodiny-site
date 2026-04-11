<script setup>
</script>

<template>
  <div class="hero-main">
    <h1 class="hero-main__title">
      Помогаем застройщикам продавать
      <span class="hero-main__accent">быстрее</span>
      и дороже
    </h1>
    <a class="hero-main__cta" href="#lead">Оставить заявку</a>
  </div>
</template>

<style scoped>
.hero-main {
  position: relative;
  z-index: 10;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--home-hero-gap);
  width: 100%;
  max-width: var(--home-container-max, 1230px);
  margin-inline: auto;
  box-sizing: border-box;
  padding: 24px var(--home-container-pad-x, 15px) clamp(28px, 5vh, 48px);
  text-align: center;
}

.hero-main__title {
  margin: 0;
  max-width: var(--home-title-max);
  width: 100%;
  font-size: var(--home-title-fs);
  font-weight: 900;
  line-height: var(--home-title-lh);
  letter-spacing: var(--home-title-tracking);
  color: #fff;
  text-wrap: balance;
  text-shadow: 0 2px 24px rgba(0, 0, 0, 0.4);
}

.hero-main__accent {
  color: var(--home-accent);
}

.hero-main__cta {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: var(--home-cta-h);
  min-width: min(100%, 280px);
  padding: 0 var(--home-cta-pad-x);
  border-radius: 999px;
  font-size: var(--home-cta-fs);
  font-weight: 700;
  line-height: 1;
  color: #fff;
  background: var(--home-accent);
  border: 1px solid rgba(255, 255, 255, 0.22);
  box-shadow: 0 12px 36px rgba(47, 143, 255, 0.38);
  transition: filter 0.15s ease, box-shadow 0.15s ease;
}

.hero-main__cta:hover {
  filter: brightness(1.05);
  box-shadow: 0 16px 44px rgba(47, 143, 255, 0.45);
}
</style>
