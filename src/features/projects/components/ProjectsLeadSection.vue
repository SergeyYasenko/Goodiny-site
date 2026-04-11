<script setup lang="ts">
import { HOME_CONTACT } from '../../home/constants/homeContact.js'
import {
  PROJECTS_LEAD_TITLE,
  PROJECTS_LEAD_TEXT,
  PROJECTS_LEAD_FORM_TITLE,
  PROJECTS_LEAD_FORM_SUBTITLE,
  PROJECTS_LEAD_LABEL_NAME,
  PROJECTS_LEAD_LABEL_PHONE,
  PROJECTS_LEAD_PLACEHOLDER_NAME,
  PROJECTS_LEAD_PLACEHOLDER_PHONE,
  PROJECTS_LEAD_CONSENT,
  PROJECTS_LEAD_SUBMIT,
  PROJECTS_LEAD_SUCCESS,
} from '../constants/projectsLead'
import { useProjectsLeadForm } from '../composables/useProjectsLeadForm'

const {
  name,
  phone,
  consent,
  errors,
  submitSuccess,
  onPhoneInput,
  submit,
} = useProjectsLeadForm()

function handlePhoneInput(e: Event) {
  onPhoneInput(e)
}

function handleSubmit(e: Event) {
  e.preventDefault()
  submit()
}

const phoneDisplay = `+${HOME_CONTACT.phone}`
</script>

<template>
  <section class="proj-lead" id="lead" aria-labelledby="proj-lead-heading">
    <div class="proj-lead__grid">
      <div class="proj-lead__info">
        <h2 id="proj-lead-heading" class="proj-lead__title">{{ PROJECTS_LEAD_TITLE }}</h2>
        <p class="proj-lead__text">{{ PROJECTS_LEAD_TEXT }}</p>
        <div class="proj-lead__contacts">
          <a class="proj-lead__contact" :href="HOME_CONTACT.phoneHref">{{ phoneDisplay }}</a>
          <a class="proj-lead__contact" :href="HOME_CONTACT.emailHref">{{ HOME_CONTACT.email }}</a>
        </div>
      </div>

      <div class="proj-lead__form-wrap">
        <h3 class="proj-lead__form-title">{{ PROJECTS_LEAD_FORM_TITLE }}</h3>
        <p class="proj-lead__form-sub">{{ PROJECTS_LEAD_FORM_SUBTITLE }}</p>

        <form class="proj-lead__form" novalidate @submit="handleSubmit">
          <div class="proj-lead__field">
            <label class="proj-lead__label" for="proj-lead-name">{{ PROJECTS_LEAD_LABEL_NAME }}</label>
            <input
              id="proj-lead-name"
              v-model.trim="name"
              class="proj-lead__input"
              :class="{ 'proj-lead__input--invalid': errors.name }"
              type="text"
              name="name"
              autocomplete="name"
              :placeholder="PROJECTS_LEAD_PLACEHOLDER_NAME"
              :aria-invalid="errors.name ? 'true' : 'false'"
              :aria-describedby="errors.name ? 'proj-lead-name-err' : undefined"
              @input="errors.name = undefined"
            />
            <p v-if="errors.name" id="proj-lead-name-err" class="proj-lead__error" role="alert">
              {{ errors.name }}
            </p>
          </div>

          <div class="proj-lead__field">
            <label class="proj-lead__label" for="proj-lead-phone">{{ PROJECTS_LEAD_LABEL_PHONE }}</label>
            <input
              id="proj-lead-phone"
              class="proj-lead__input"
              :class="{ 'proj-lead__input--invalid': errors.phone }"
              type="tel"
              name="phone"
              autocomplete="tel"
              inputmode="tel"
              maxlength="18"
              :value="phone"
              :placeholder="PROJECTS_LEAD_PLACEHOLDER_PHONE"
              :aria-invalid="errors.phone ? 'true' : 'false'"
              :aria-describedby="errors.phone ? 'proj-lead-phone-err' : undefined"
              @input="handlePhoneInput"
            />
            <p v-if="errors.phone" id="proj-lead-phone-err" class="proj-lead__error" role="alert">
              {{ errors.phone }}
            </p>
          </div>

          <div class="proj-lead__field proj-lead__field--checkbox">
            <label class="proj-lead__check-label">
              <input
                v-model="consent"
                class="proj-lead__checkbox"
                type="checkbox"
                :aria-invalid="errors.consent ? 'true' : 'false'"
                :aria-describedby="errors.consent ? 'proj-lead-consent-err' : undefined"
                @change="errors.consent = undefined"
              />
              <span class="proj-lead__check-text">{{ PROJECTS_LEAD_CONSENT }}</span>
            </label>
            <p v-if="errors.consent" id="proj-lead-consent-err" class="proj-lead__error" role="alert">
              {{ errors.consent }}
            </p>
          </div>

          <button type="submit" class="proj-lead__submit">{{ PROJECTS_LEAD_SUBMIT }}</button>
        </form>

        <p v-if="submitSuccess" class="proj-lead__success" role="status">{{ PROJECTS_LEAD_SUCCESS }}</p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.proj-lead {
  margin-top: var(--site-section-pad-y);
  padding-top: clamp(24px, 4vw, 40px);
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.proj-lead__grid {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  gap: clamp(32px, 6vw, 64px);
  align-items: start;
}

.proj-lead__title {
  margin: 0 0 clamp(16px, 2.5vw, 22px);
  font-size: clamp(22px, 2vw + 0.5rem, 34px);
  font-weight: 900;
  line-height: 1.15;
  letter-spacing: -0.02em;
  color: #fff;
}

.proj-lead__text {
  margin: 0 0 clamp(28px, 5vw, 44px);
  font-size: clamp(15px, 1.2vw, 17px);
  line-height: 1.55;
  color: rgba(255, 255, 255, 0.88);
}

.proj-lead__contacts {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
}

.proj-lead__contact {
  font-size: clamp(15px, 1.15vw, 17px);
  font-weight: 500;
  color: rgba(255, 255, 255, 0.92);
  text-decoration: none;
  transition: color 0.15s ease;
}

.proj-lead__contact:hover {
  color: var(--home-accent, #2a6ed8);
}

.proj-lead__contact:focus-visible {
  outline: 2px solid var(--home-accent, #2a6ed8);
  outline-offset: 3px;
  border-radius: 4px;
}

.proj-lead__form-title {
  margin: 0 0 10px;
  font-size: clamp(22px, 2vw + 0.5rem, 32px);
  font-weight: 900;
  line-height: 1.15;
  letter-spacing: -0.02em;
  color: var(--home-accent, #2a6ed8);
}

.proj-lead__form-sub {
  margin: 0 0 clamp(22px, 3.5vw, 28px);
  font-size: clamp(14px, 1.1vw, 16px);
  line-height: 1.45;
  color: rgba(255, 255, 255, 0.88);
}

.proj-lead__form {
  display: flex;
  flex-direction: column;
  gap: clamp(18px, 2.5vw, 22px);
}

.proj-lead__field {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.proj-lead__field--checkbox {
  gap: 6px;
}

.proj-lead__label {
  font-size: 15px;
  font-weight: 600;
  color: #fff;
}

.proj-lead__input {
  width: 100%;
  box-sizing: border-box;
  min-height: 48px;
  padding: 12px 14px;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.22);
  background: rgba(0, 0, 0, 0.28);
  color: #fff;
  font-size: 16px;
  font-family: inherit;
  outline: none;
  transition:
    border-color 0.15s ease,
    box-shadow 0.15s ease;
}

.proj-lead__input::placeholder {
  color: rgba(255, 255, 255, 0.4);
}

.proj-lead__input:hover {
  border-color: rgba(255, 255, 255, 0.32);
}

.proj-lead__input:focus-visible {
  border-color: var(--home-accent, #2a6ed8);
  box-shadow: 0 0 0 1px rgba(47, 143, 255, 0.35);
}

.proj-lead__input--invalid {
  border-color: rgba(255, 107, 107, 0.75);
}

.proj-lead__error {
  margin: 0;
  font-size: 13px;
  line-height: 1.35;
  color: #ff8a8a;
}

.proj-lead__check-label {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  cursor: pointer;
  font-size: 14px;
  line-height: 1.45;
  color: rgba(255, 255, 255, 0.88);
}

.proj-lead__checkbox {
  width: 18px;
  height: 18px;
  margin-top: 2px;
  flex-shrink: 0;
  accent-color: var(--home-accent, #2a6ed8);
  cursor: pointer;
}

.proj-lead__check-text {
  user-select: none;
}

.proj-lead__submit {
  align-self: flex-start;
  min-height: 50px;
  padding: 0 clamp(28px, 4vw, 40px);
  margin-top: 4px;
  border: none;
  border-radius: 999px;
  font-size: 15px;
  font-weight: 700;
  font-family: inherit;
  color: #fff;
  background: var(--home-accent, #2a6ed8);
  cursor: pointer;
  transition: filter 0.15s ease;
}

.proj-lead__submit:hover {
  filter: brightness(1.08);
}

.proj-lead__submit:focus-visible {
  outline: 2px solid #fff;
  outline-offset: 3px;
}

.proj-lead__success {
  margin: clamp(16px, 2.5vw, 22px) 0 0;
  font-size: 14px;
  line-height: 1.5;
  color: rgba(120, 220, 160, 0.95);
}

@media (max-width: 800px) {
  .proj-lead__grid {
    grid-template-columns: 1fr;
  }
}
</style>
