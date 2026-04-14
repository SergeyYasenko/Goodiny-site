<script setup>
import { useSkolkovoPopover } from '../composables/useSkolkovoPopover.js'

const { open, rootRef, toggle } = useSkolkovoPopover()
</script>

<template>
  <div ref="rootRef" class="sk">
    <Transition name="sk-pop">
      <div v-if="open" class="sk__panel" role="dialog" aria-label="Сколково">
        <p class="sk__label">Сколково</p>
        <div class="sk__card">
          <p class="sk__text">
            Мы являемся резидентами <span class="sk__hl">Сколково</span>
          </p>
          <div class="sk__badge" aria-hidden="true">
            <img class="sk__badge-img" src="/icons/SK.svg" alt="" width="40" height="40" />
          </div>
        </div>
      </div>
    </Transition>

    <button type="button" class="sk__fab" aria-label="Информация о резидентстве Сколково" @click.stop="toggle">
      <span class="sk__fab-inner">
        <img class="sk__fab-img" src="/icons/SK.svg" alt="" width="52" height="52" />
      </span>
    </button>
  </div>
</template>

<style scoped>
.sk {
  position: fixed;
  right: var(--home-header-pad-x);
  bottom: calc(var(--home-sk-bottom) + env(safe-area-inset-bottom, 0px));
  z-index: 50;
  width: 52px;
  height: 52px;
}

.sk__panel {
  position: absolute;
  right: calc(100% + 12px);
  top: 50%;
  transform: translateY(-50%);
  width: min(calc(100vw - 2 * var(--home-header-pad-x) - 64px), 360px);
}

.sk__label {
  margin: 0 0 6px 2px;
  font-size: 12px;
  font-weight: 500;
  line-height: 1;
  color: rgba(255, 255, 255, 0.5);
}

.sk__card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 16px 24px;
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 18px 48px rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(14px);
}

.sk__text {
  margin: 0;
  font-size: 16px;
  font-weight: 700;
  line-height: 1.35;
  color: #fff;
  text-align: left;
}

.sk__hl {
  color: var(--home-sk-green);
}

.sk__badge {
  flex-shrink: 0;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  overflow: hidden;
  line-height: 0;
}

.sk__badge-img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  display: block;
}

.sk__fab {
  position: relative;
  z-index: 1;
  width: 52px;
  height: 52px;
  padding: 0;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  background: transparent;
  filter: drop-shadow(0 10px 24px rgba(0, 0, 0, 0.35));
}

.sk__fab-inner {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  border-radius: 12px;
  overflow: hidden;
  line-height: 0;
  transition: filter 0.15s ease, transform 0.15s ease;
}

.sk__fab-img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  display: block;
}

.sk__fab:hover .sk__fab-inner {
  filter: brightness(1.04);
  transform: scale(1.02);
}

.sk-pop-enter-active,
.sk-pop-leave-active {
  transition:
    opacity 0.32s cubic-bezier(0.22, 1, 0.36, 1),
    transform 0.32s cubic-bezier(0.22, 1, 0.36, 1);
}

.sk-pop-enter-from,
.sk-pop-leave-to {
  opacity: 0;
  transform: translate3d(8px, -50%, 0);
}

@media (max-width: 640px) {
  .sk__panel {
    right: calc(100% + 8px);
    width: min(calc(100vw - 2 * var(--home-header-pad-x) - 60px), 300px);
  }
}
</style>
