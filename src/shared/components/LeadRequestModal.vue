<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'
import {
  PROJECTS_LEAD_CONSENT,
  PROJECTS_LEAD_FORM_SUBTITLE,
  PROJECTS_LEAD_FORM_TITLE,
  PROJECTS_LEAD_LABEL_NAME,
  PROJECTS_LEAD_LABEL_PHONE,
  PROJECTS_LEAD_PLACEHOLDER_NAME,
  PROJECTS_LEAD_PLACEHOLDER_PHONE,
  PROJECTS_LEAD_SUBMIT,
  PROJECTS_LEAD_SUCCESS,
} from '../../features/projects/constants/projectsLead'
import { useProjectsLeadForm } from '../../features/projects/composables/useProjectsLeadForm'
import { useLeadRequestModal } from '../composables/useLeadRequestModal'

const { isLeadRequestModalOpen, closeLeadRequestModal } = useLeadRequestModal()
const { name, phone, consent, errors, submitSuccess, onPhoneInput, submit } = useProjectsLeadForm()
const initialBodyOverflow = ref<string | null>(null)
const initialBodyPaddingRight = ref<string | null>(null)

function onEsc(e: KeyboardEvent): void {
  if (e.key === 'Escape') closeLeadRequestModal()
}

function handlePhoneInput(e: Event): void {
  onPhoneInput(e)
}

function handleSubmit(e: Event): void {
  e.preventDefault()
  submit()
}

function restoreBodyStyles(): void {
  document.body.style.overflow = initialBodyOverflow.value ?? ''
  document.body.style.paddingRight = initialBodyPaddingRight.value ?? ''
}

watch(isLeadRequestModalOpen, (open) => {
  if (open) {
    initialBodyOverflow.value = document.body.style.overflow
    initialBodyPaddingRight.value = document.body.style.paddingRight
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth
    document.body.style.overflow = 'hidden'
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`
    }
  }
})

onMounted(() => {
  document.addEventListener('keydown', onEsc)
})

onBeforeUnmount(() => {
  restoreBodyStyles()
  document.removeEventListener('keydown', onEsc)
})
</script>

<template>
  <Transition name="lead-modal-fade" @after-leave="restoreBodyStyles">
    <div
      v-if="isLeadRequestModalOpen"
      class="lead-modal"
      role="dialog"
      aria-modal="true"
      aria-labelledby="lead-modal-title"
      @click.self="closeLeadRequestModal"
    >
      <div class="lead-modal__card">
        <button type="button" class="lead-modal__close" aria-label="Закрыть форму" @click="closeLeadRequestModal">
          ×
        </button>

        <h3 id="lead-modal-title" class="lead-modal__title">{{ PROJECTS_LEAD_FORM_TITLE }}</h3>
        <p class="lead-modal__subtitle">{{ PROJECTS_LEAD_FORM_SUBTITLE }}</p>

        <form class="lead-modal__form" novalidate @submit="handleSubmit">
          <div class="lead-modal__field">
            <label class="lead-modal__label" for="global-lead-name">{{ PROJECTS_LEAD_LABEL_NAME }}</label>
            <input
              id="global-lead-name"
              v-model.trim="name"
              class="lead-modal__input"
              :class="{ 'lead-modal__input--invalid': errors.name }"
              type="text"
              name="name"
              autocomplete="name"
              :placeholder="PROJECTS_LEAD_PLACEHOLDER_NAME"
              :aria-invalid="errors.name ? 'true' : 'false'"
              :aria-describedby="errors.name ? 'global-lead-name-err' : undefined"
              @input="errors.name = undefined"
            />
            <p v-if="errors.name" id="global-lead-name-err" class="lead-modal__error" role="alert">
              {{ errors.name }}
            </p>
          </div>

          <div class="lead-modal__field">
            <label class="lead-modal__label" for="global-lead-phone">{{ PROJECTS_LEAD_LABEL_PHONE }}</label>
            <input
              id="global-lead-phone"
              class="lead-modal__input"
              :class="{ 'lead-modal__input--invalid': errors.phone }"
              type="tel"
              name="phone"
              autocomplete="tel"
              inputmode="tel"
              maxlength="18"
              :value="phone"
              :placeholder="PROJECTS_LEAD_PLACEHOLDER_PHONE"
              :aria-invalid="errors.phone ? 'true' : 'false'"
              :aria-describedby="errors.phone ? 'global-lead-phone-err' : undefined"
              @input="handlePhoneInput"
            />
            <p v-if="errors.phone" id="global-lead-phone-err" class="lead-modal__error" role="alert">
              {{ errors.phone }}
            </p>
          </div>

          <div class="lead-modal__field lead-modal__field--checkbox">
            <label class="lead-modal__check-label">
              <input
                v-model="consent"
                class="lead-modal__checkbox"
                type="checkbox"
                :aria-invalid="errors.consent ? 'true' : 'false'"
                :aria-describedby="errors.consent ? 'global-lead-consent-err' : undefined"
                @change="errors.consent = undefined"
              />
              <span class="lead-modal__check-text">{{ PROJECTS_LEAD_CONSENT }}</span>
            </label>
            <p v-if="errors.consent" id="global-lead-consent-err" class="lead-modal__error" role="alert">
              {{ errors.consent }}
            </p>
          </div>

          <button type="submit" class="lead-modal__submit">{{ PROJECTS_LEAD_SUBMIT }}</button>
        </form>

        <p v-if="submitSuccess" class="lead-modal__success" role="status">{{ PROJECTS_LEAD_SUCCESS }}</p>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.lead-modal {
  position: fixed;
  inset: 0;
  z-index: 120;
  display: grid;
  place-items: center;
  padding: 18px;
  background: rgba(8, 10, 14, 0.74);
  backdrop-filter: blur(6px);
}

.lead-modal__card {
  position: relative;
  width: min(560px, 100%);
  max-height: calc(100dvh - 36px);
  overflow: auto;
  border-radius: 20px;
  padding: clamp(18px, 2.4vw, 28px);
  background: linear-gradient(180deg, rgba(29, 33, 42, 0.98), rgba(20, 23, 30, 0.98));
  border: 1px solid rgba(255, 255, 255, 0.14);
  box-shadow: 0 20px 48px rgba(0, 0, 0, 0.45);
}

.lead-modal__close {
  position: absolute;
  top: 12px;
  right: 12px;
  width: 36px;
  height: 36px;
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  background: rgba(255, 255, 255, 0.06);
  color: #fff;
  font-size: 24px;
  line-height: 1;
  cursor: pointer;
}

.lead-modal__title {
  margin: 0 0 8px;
  padding-right: 36px;
  font-size: clamp(24px, 2vw + 0.3rem, 34px);
  font-weight: 900;
  line-height: 1.12;
  color: var(--home-accent, #2a6ed8);
}

.lead-modal__subtitle {
  margin: 0 0 20px;
  color: rgba(255, 255, 255, 0.88);
}

.lead-modal__form {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.lead-modal__field {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.lead-modal__field--checkbox {
  gap: 6px;
}

.lead-modal__label {
  font-weight: 600;
}

.lead-modal__input {
  width: 100%;
  min-height: 46px;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  background: rgba(255, 255, 255, 0.04);
  color: #fff;
  padding: 0 14px;
}

.lead-modal__input::placeholder {
  color: rgba(255, 255, 255, 0.58);
}

.lead-modal__input--invalid {
  border-color: #ff7c7c;
}

.lead-modal__check-label {
  display: flex;
  align-items: flex-start;
  gap: 10px;
}

.lead-modal__checkbox {
  width: 18px;
  height: 18px;
  margin-top: 2px;
}

.lead-modal__check-text {
  color: rgba(255, 255, 255, 0.9);
  line-height: 1.45;
}

.lead-modal__error {
  margin: 0;
  color: #ff9f9f;
  font-size: 13px;
}

.lead-modal__submit {
  min-height: 48px;
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.24);
  background: var(--home-accent, #2a6ed8);
  color: #fff;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
}

.lead-modal__success {
  margin: 14px 0 0;
  color: #b8ddff;
  line-height: 1.45;
}

@media (max-width: 640px) {
  .lead-modal {
    padding: 10px;
  }

  .lead-modal__card {
    width: 100%;
    max-height: calc(100dvh - 20px);
    border-radius: 16px;
    padding: 16px 14px;
  }

  .lead-modal__title {
    font-size: 24px;
  }
}

.lead-modal-fade-enter-active,
.lead-modal-fade-leave-active {
  transition: opacity 0.22s ease;
}

.lead-modal-fade-enter-active .lead-modal__card,
.lead-modal-fade-leave-active .lead-modal__card {
  transition:
    transform 0.26s cubic-bezier(0.22, 1, 0.36, 1),
    opacity 0.22s ease;
}

.lead-modal-fade-enter-from,
.lead-modal-fade-leave-to {
  opacity: 0;
}

.lead-modal-fade-enter-from .lead-modal__card,
.lead-modal-fade-leave-to .lead-modal__card {
  transform: translate3d(0, 8px, 0) scale(0.98);
  opacity: 0;
}

@media (prefers-reduced-motion: reduce) {
  .lead-modal-fade-enter-active,
  .lead-modal-fade-leave-active,
  .lead-modal-fade-enter-active .lead-modal__card,
  .lead-modal-fade-leave-active .lead-modal__card {
    transition: none;
  }
}
</style>
