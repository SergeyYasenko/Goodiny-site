<script setup>
import { RouterLink } from 'vue-router'
import { HOME_CONTACT, HOME_SOCIAL_LINKS } from '../constants/homeContact.js'
import { useCookieConsent } from '../composables/useCookieConsent.js'

const { visible, accept } = useCookieConsent()
</script>

<template>
  <footer v-scroll-reveal class="foot" id="site-footer" aria-label="Подвал сайта">
    <div class="foot__inner">
      <RouterLink to="/" class="foot__logo-link">
        <img class="foot__logo" src="/icons/logo.svg" alt="GOODINI" width="145" height="119" />
      </RouterLink>

      <ul class="foot__social" role="list">
        <li v-for="item in HOME_SOCIAL_LINKS" :key="item.label">
          <a
            class="foot__social-link"
            :href="item.href"
            target="_blank"
            rel="noopener noreferrer"
            :aria-label="item.label"
          >
            <img class="foot__social-icon" :src="item.icon" alt="" width="40" height="40" />
          </a>
        </li>
      </ul>

      <div class="foot__contacts">
        <a class="foot__contact-row" :href="HOME_CONTACT.emailHref">
          <img class="foot__contact-icon" src="/icons/mail.svg" alt="" width="22" height="22" />
          <span>{{ HOME_CONTACT.email }}</span>
        </a>
        <a class="foot__contact-row" :href="HOME_CONTACT.phoneHref">
          <img class="foot__contact-icon" src="/icons/phone.svg" alt="" width="22" height="22" />
          <span>{{ HOME_CONTACT.phone }}</span>
        </a>
      </div>
    </div>

    <div v-if="visible" class="cookie" role="dialog" aria-labelledby="cookie-title" aria-live="polite">
      <div class="cookie__icon" aria-hidden="true">
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="14" cy="14" r="12" fill="#c9763d" fill-opacity="0.35" />
          <circle cx="14" cy="14" r="8" stroke="#e8a066" stroke-width="1.5" />
          <circle cx="11" cy="12" r="1.2" fill="#e8a066" />
          <circle cx="16" cy="11" r="1" fill="#e8a066" />
          <circle cx="15" cy="16" r="1" fill="#e8a066" />
        </svg>
      </div>
      <h3 id="cookie-title" class="cookie__title">Мы используем cookie</h3>
      <p class="cookie__text">
        Они помогают нам понять, как вы взаимодействуете с нашим сайтом, и сделать его удобнее и лучше.
      </p>
      <button type="button" class="cookie__btn" @click="accept">Принять</button>
    </div>
  </footer>
</template>

<style scoped>
.foot {
  position: relative;
  flex-shrink: 0;
  background: var(--home-footer-bg, #121212);
  color: #fff;
  font-family: 'Roboto', system-ui, sans-serif;
  padding: var(--site-section-pad-y) 0 clamp(100px, 14vw, 140px);
}

.foot__inner {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: clamp(24px, 4vw, 32px);
  width: 100%;
  max-width: var(--home-container-max, 1230px);
  margin-inline: auto;
  padding-inline: var(--home-container-pad-x, 15px);
  padding-top: clamp(40px, 6vw, 56px);
  box-sizing: border-box;
}

.foot__logo-link {
  line-height: 0;
  display: block;
  transition: opacity 0.15s ease;
}

.foot__logo-link:hover {
  opacity: 0.9;
}

.foot__logo {
  display: block;
  width: min(145px, 38vw);
  height: auto;
  object-fit: contain;
}

.foot__social {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  gap: 16px;
}

.foot__social-link {
  display: flex;
  line-height: 0;
  border-radius: 50%;
  transition:
    transform 0.15s ease,
    filter 0.15s ease;
}

.foot__social-link:hover {
  transform: translateY(-2px);
  filter: brightness(1.12);
}

.foot__social-icon {
  display: block;
  width: 40px;
  height: 40px;
}

.foot__contacts {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: clamp(16px, 3vw, 32px);
}

.foot__contact-row {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  font-size: clamp(13px, 1.1vw, 15px);
  font-weight: 500;
  color: rgba(255, 255, 255, 0.9);
  text-decoration: none;
  transition: color 0.15s ease;
}

.foot__contact-row:hover {
  color: var(--home-accent, #2a6ed8);
}

.foot__contact-icon {
  flex-shrink: 0;
  filter: brightness(0) invert(1);
  opacity: 0.7;
}

.cookie {
  position: fixed;
  right: max(16px, var(--home-container-pad-x, 15px));
  bottom: max(16px, var(--home-sk-bottom, 24px));
  z-index: 60;
  width: min(340px, calc(100vw - 32px));
  padding: 18px 18px 16px;
  border-radius: 16px;
  background: rgba(30, 32, 38, 0.96);
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 16px 48px rgba(0, 0, 0, 0.45);
  box-sizing: border-box;
}

.cookie__icon {
  margin-bottom: 10px;
}

.cookie__title {
  margin: 0 0 8px;
  font-size: 15px;
  font-weight: 800;
  line-height: 1.25;
}

.cookie__text {
  margin: 0 0 14px;
  font-size: 12px;
  font-weight: 400;
  line-height: 1.45;
  color: rgba(255, 255, 255, 0.78);
}

.cookie__btn {
  width: 100%;
  min-height: 44px;
  padding: 0 16px;
  border: none;
  border-radius: 12px;
  font-family: inherit;
  font-size: 14px;
  font-weight: 700;
  color: #fff;
  background: var(--home-accent, #2a6ed8);
  cursor: pointer;
  transition: filter 0.15s ease;
}

.cookie__btn:hover {
  filter: brightness(1.06);
}

@media (max-width: 520px) {
  .foot__contacts {
    flex-direction: column;
  }
}
</style>
