<script setup>
import { ref, computed, watch, onUnmounted } from 'vue'
import { RouterLink, useRoute } from 'vue-router'

const navOpen = ref(false)
const route = useRoute()

function sectionHref(hash) {
  return route.path === '/' ? `#${hash}` : `/#${hash}`
}

const ctaHref = computed(() => (route.path === '/' ? '#contacts' : '/#contacts'))

const links = computed(() => [
  { label: 'Продукт', to: '/product', isRoute: true },
  { label: 'О нас', to: '/about', isRoute: true },
  { label: 'Проекты', to: '/projects', isRoute: true },
  { label: 'Контакты', href: sectionHref('contacts'), hash: 'contacts', isRoute: false },
])

/**
 * @param {{ isRoute: boolean; to?: string; hash?: string }} item
 */
function isNavActive(item) {
  if (item.isRoute && item.to) {
    return route.path === item.to || route.path.startsWith(`${item.to}/`)
  }
  if ('hash' in item && item.hash) {
    return route.hash === `#${item.hash}`
  }
  return false
}

function closeMenu() {
  navOpen.value = false
}

watch(navOpen, (open) => {
  document.body.style.overflow = open ? 'hidden' : ''
})

onUnmounted(() => {
  document.body.style.overflow = ''
})
</script>

<template>
  <header class="site-header">
    <div class="site-header__inner">
      <RouterLink to="/" class="brand" @click="closeMenu">
        <img
          class="brand__mark"
          src="/icons/logo.svg"
          alt="GOODINI"
          width="109"
          height="100"
        />
      </RouterLink>

      <button
        type="button"
        class="menu-btn"
        :aria-expanded="navOpen"
        aria-label="Меню"
        @click="navOpen = !navOpen"
      >
        <span class="menu-btn__bar" />
        <span class="menu-btn__bar" />
        <span class="menu-btn__bar" />
      </button>

      <div
        class="nav-shell"
        :class="{ 'nav-shell--open': navOpen }"
        @click.self="closeMenu"
      >
        <nav class="nav-pill" aria-label="Основная навигация">
          <template v-for="item in links" :key="item.label">
            <RouterLink
              v-if="item.isRoute"
              class="nav-pill__link"
              :class="{ 'nav-pill__link--active': isNavActive(item) }"
              :aria-current="isNavActive(item) ? 'page' : undefined"
              :to="item.to"
              @click="closeMenu"
            >
              {{ item.label }}
            </RouterLink>
            <a
              v-else
              class="nav-pill__link"
              :class="{ 'nav-pill__link--active': isNavActive(item) }"
              :aria-current="isNavActive(item) ? 'page' : undefined"
              :href="item.href"
              @click="closeMenu"
            >
              {{ item.label }}
            </a>
          </template>
          <a class="nav-pill__cta" :href="ctaHref" @click="closeMenu">Связаться с нами</a>
        </nav>
      </div>
    </div>
  </header>
</template>

<style scoped>
.site-header {
  position: sticky;
  top: 0;
  z-index: 20;
  width: 100%;
  box-sizing: border-box;
  background-color: var(--page-bg, #1f1f1f);
}

.site-header__inner {
  display: flex;
  align-items: center;
  gap: 16px;
  width: 100%;
  max-width: var(--home-container-max, 1230px);
  margin-inline: auto;
  box-sizing: border-box;
  padding: var(--home-header-pad-y) var(--home-container-pad-x, 15px);
}

.brand {
  flex: 0 0 auto;
  display: flex;
  align-items: center;
  line-height: 0;
}

.brand__mark {
  display: block;
  width: 109px;
  height: 100px;
  object-fit: contain;
}

.menu-btn {
  display: none;
  flex: 0 0 auto;
  flex-direction: column;
  justify-content: center;
  gap: 5px;
  width: 44px;
  height: 44px;
  padding: 0;
  border: 1px solid rgba(255, 255, 255, 0.22);
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.06);
  cursor: pointer;
}

.menu-btn__bar {
  display: block;
  height: 2px;
  width: 20px;
  margin-inline: auto;
  border-radius: 2px;
  background: #fff;
}

.nav-shell {
  flex: 1 1 auto;
  min-width: 0;
  display: flex;
  justify-content: stretch;
}

.nav-pill {
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  align-items: center;
  gap: var(--home-nav-cell-gap);
  width: 100%;
  min-width: 0;
  padding: var(--home-nav-pad-outer-y) var(--home-nav-pad-outer-x);
  border-radius: 999px;
  background: var(--home-nav-bg);
  border: 1px solid var(--home-nav-border);
  box-shadow: 0 10px 36px rgba(0, 0, 0, 0.35);
}

.nav-pill__link,
.nav-pill__cta {
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 0;
  padding: var(--home-nav-link-pad-y) 0.5rem;
  border-radius: 999px;
  font-size: var(--home-nav-font);
  font-weight: 500;
  line-height: 1.2;
  color: #fff;
  text-align: center;
  transition:
    background 0.15s ease,
    color 0.15s ease;
}

.nav-pill__link {
  white-space: nowrap;
}

.nav-pill__link--active {
  color: var(--home-accent, #2a6ed8);
}

.nav-pill__cta {
  background: var(--home-nav-cta-bg);
  border: 1px solid var(--home-nav-cta-border);
  white-space: nowrap;
}

.nav-pill__link:hover {
  background: rgba(255, 255, 255, 0.07);
}


.nav-pill__cta:hover {
  background: rgba(255, 255, 255, 0.2);
}

@media (max-width: 1100px) {
  .nav-pill__link,
  .nav-pill__cta {
    padding-inline: 0.35rem;
    font-size: clamp(12px, 1.2vw, 15px);
  }
}

@media (max-width: 900px) {
  .site-header__inner {
    flex-wrap: nowrap;
    align-items: center;
  }

  .brand__mark {
    width: min(109px, 26vw);
    height: auto;
    aspect-ratio: 109 / 100;
  }

  .menu-btn {
    display: flex;
    margin-left: auto;
    position: relative;
    z-index: 25;
  }

  .brand {
    position: relative;
    z-index: 25;
  }

  .nav-shell {
    position: fixed;
    inset: 0;
    z-index: 18;
    display: none;
    flex: none;
    width: 100%;
    max-width: none;
    margin: 0;
    box-sizing: border-box;
    padding: calc(
        var(--home-header-pad-y) * 2 + max(44px, min(109px, 26vw) * 100 / 109) + 12px
      )
      var(--home-container-pad-x, 15px) max(24px, env(safe-area-inset-bottom, 0px));
    align-items: flex-start;
    justify-content: center;
    overflow-y: auto;
    background: rgba(15, 15, 15, 0.78);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
  }

  .nav-shell--open {
    display: flex;
  }

  .nav-pill {
    width: 100%;
    max-width: var(--home-container-max, 1230px);
    margin-inline: auto;
    grid-template-columns: 1fr;
    border-radius: 16px;
    padding: 8px;
    gap: 6px;
  }

  .nav-pill__link,
  .nav-pill__cta {
    width: 100%;
    padding: var(--home-nav-link-pad-y) var(--home-nav-cta-pad-x);
  }
}
</style>
