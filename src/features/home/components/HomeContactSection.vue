<script setup>
import { HOME_CONTACT } from '../constants/homeContact.js'
</script>

<template>
  <section v-scroll-reveal class="contact" id="contacts" aria-labelledby="contact-heading">
    <div class="contact__inner">
      <h2 id="contact-heading" class="contact__heading">
        <span class="contact__heading-line">Контактная</span>
        <span class="contact__heading-line contact__heading-line--accent">Информация</span>
      </h2>

      <div class="contact__layout">
        <div class="contact__main">
          <p class="contact__brand">{{ HOME_CONTACT.company }}</p>
          <address class="contact__address">
            <span v-for="(line, i) in HOME_CONTACT.addressLines" :key="i">{{ line }}</span>
          </address>

          <ul class="contact__channels" role="list">
            <li class="contact__channel">
              <img class="contact__channel-icon" src="/icons/mail.svg" alt="" width="24" height="24" />
              <a class="contact__link" :href="HOME_CONTACT.emailHref">{{ HOME_CONTACT.email }}</a>
            </li>
            <li class="contact__channel">
              <img class="contact__channel-icon" src="/icons/phone.svg" alt="" width="24" height="24" />
              <a class="contact__link" :href="HOME_CONTACT.phoneHref">{{ HOME_CONTACT.phone }}</a>
            </li>
          </ul>

          <a class="contact__cta" :href="HOME_CONTACT.emailHref">Связаться с нами</a>
        </div>

        <div class="contact__map" aria-hidden="true">
          <div class="contact__map-frame">
            <img
              class="contact__map-img"
              :src="HOME_CONTACT.mapImage"
              alt=""
              loading="lazy"
              decoding="async"
            />
            <div class="contact__pin">
              <span class="contact__pin-label">{{ HOME_CONTACT.mapCity }}</span>
              <span class="contact__pin-dot" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.contact {
  flex-shrink: 0;
  background: var(--home-footer-bg, #121212);
  color: #fff;
  font-family: 'Roboto', system-ui, sans-serif;
  padding: var(--site-section-pad-y) 0;
}

.contact__inner {
  width: 100%;
  max-width: var(--home-container-max, 1230px);
  margin-inline: auto;
  padding-inline: var(--home-container-pad-x, 15px);
  box-sizing: border-box;
}

.contact__heading {
  margin: 0 0 clamp(32px, 5vw, 48px);
  display: flex;
  flex-direction: column;
  gap: 0.12em;
  font-size: clamp(28px, 2.5vw + 0.5rem, 44px);
  font-weight: 900;
  line-height: 1.1;
  letter-spacing: -0.02em;
}

.contact__heading-line {
  display: block;
}

.contact__heading-line--accent {
  color: var(--home-accent, #2a6ed8);
}

.contact__layout {
  display: grid;
  grid-template-columns: minmax(0, 7fr) minmax(0, 13fr);
  align-items: center;
  gap: clamp(28px, 4vw, 48px);
}

.contact__main {
  min-width: 0;
  max-width: min(440px, 100%);
}

.contact__brand {
  margin: 0 0 16px;
  font-size: clamp(20px, 1.8vw, 28px);
  font-weight: 900;
  letter-spacing: 0.06em;
}

.contact__address {
  margin: 0 0 28px;
  display: flex;
  flex-direction: column;
  gap: 4px;
  font-size: clamp(14px, 1.15vw, 16px);
  font-weight: 400;
  font-style: normal;
  line-height: 1.5;
  color: rgba(255, 255, 255, 0.88);
}

.contact__channels {
  list-style: none;
  margin: 0 0 28px;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.contact__channel {
  display: flex;
  align-items: center;
  gap: 12px;
  min-width: 0;
}

.contact__channel-icon {
  flex-shrink: 0;
  display: block;
  filter: brightness(0) invert(1);
  opacity: 0.75;
}

.contact__link {
  font-size: clamp(14px, 1.15vw, 16px);
  font-weight: 500;
  color: #fff;
  text-decoration: none;
  transition: color 0.15s ease;
}

.contact__link:hover {
  color: var(--home-accent, #2a6ed8);
}

.contact__cta {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 48px;
  padding: 0 28px;
  border-radius: 999px;
  font-size: 15px;
  font-weight: 600;
  color: #fff;
  text-decoration: none;
  background: linear-gradient(180deg, rgba(60, 64, 72, 0.95) 0%, rgba(36, 38, 44, 0.98) 100%);
  border: 1px solid rgba(255, 255, 255, 0.18);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.35);
  transition:
    filter 0.15s ease,
    border-color 0.15s ease;
}

.contact__cta:hover {
  filter: brightness(1.08);
  border-color: rgba(255, 255, 255, 0.28);
}

.contact__map {
  min-width: 0;
  width: 100%;
}

.contact__map-frame {
  position: relative;
  width: 100%;
  max-width: none;
  aspect-ratio: 888 / 460;
  border-radius: 20px;
  overflow: visible;
}

.contact__map-img {
  position: absolute;
  inset: 0;
  display: block;
  width: 100%;
  height: 100%;
  object-fit: contain;
  object-position: center right;
  border-radius: 16px;
  opacity: 0.95;
}

.contact__pin {
  position: absolute;
  left: 58%;
  top: 38%;
  transform: translate(calc(-50% + 10px), calc(-100% - 30px));
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  pointer-events: none;
}

.contact__pin-label {
  padding: 8px 14px;
  border-radius: 10px;
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 0.04em;
  color: #fff;
  background: rgba(48, 52, 60, 0.72);
  border: 1px solid rgba(255, 255, 255, 0.12);
  backdrop-filter: blur(10px);
  white-space: nowrap;
}

.contact__pin-dot {
  width: 12px;
  height: 12px;
  border-radius: 3px;
  background: #fff;
  box-shadow: 0 0 0 3px rgba(47, 143, 255, 0.45);
}

@media (max-width: 900px) {
  .contact__layout {
    grid-template-columns: 1fr;
    align-items: start;
  }

  .contact__main {
    max-width: 100%;
  }

  .contact__map-img {
    object-position: center;
  }
}
</style>
