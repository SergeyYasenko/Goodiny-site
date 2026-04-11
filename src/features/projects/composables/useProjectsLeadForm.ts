import { ref } from 'vue'
import { HOME_CONTACT } from '../../home/constants/homeContact.js'

export interface LeadFormErrors {
  name?: string
  phone?: string
  consent?: string
}

function digitsOnly(s: string): string {
  return s.replace(/\D/g, '')
}

/** Нормализация к 11 цифрам, первая — 7 (РФ). */
function normalizeRuPhoneDigits(input: string): string {
  let d = digitsOnly(input)
  if (d.startsWith('8')) d = '7' + d.slice(1)
  if (d.length > 0 && !d.startsWith('7')) d = '7' + d
  return d.slice(0, 11)
}

/** Маска +7 (XXX) XXX-XX-XX, не более 10 цифр после кода страны. */
function formatRuPhoneInput(input: string): string {
  let d = digitsOnly(input)
  if (d.startsWith('8')) d = '7' + d.slice(1)
  if (d.length > 0 && !d.startsWith('7')) d = '7' + d
  d = d.slice(0, 11)
  if (d.length === 0) return ''
  if (d.length === 1) return '+7'
  const rest = d.slice(1)
  const a = rest.slice(0, 3)
  const b = rest.slice(3, 6)
  const c = rest.slice(6, 8)
  const last = rest.slice(8, 10)
  if (rest.length < 3) {
    return '+7 (' + a
  }
  if (rest.length === 3) {
    return '+7 (' + a + ')'
  }
  let out = '+7 (' + a + ') ' + b
  if (rest.length <= 6) return out
  out += '-' + c
  if (rest.length <= 8) return out
  out += '-' + last
  return out
}

function isValidRuPhone(digits: string): boolean {
  if (digits.length !== 11 || !digits.startsWith('7')) return false
  return true
}

export function useProjectsLeadForm() {
  const name = ref('')
  const phone = ref('')
  const consent = ref(false)
  const errors = ref<LeadFormErrors>({})
  const submitSuccess = ref(false)

  function validate(): boolean {
    const next: LeadFormErrors = {}
    const n = name.value.trim()
    if (!n) {
      next.name = 'Укажите имя'
    } else if (n.length < 2) {
      next.name = 'Имя слишком короткое'
    }

    const pd = normalizeRuPhoneDigits(phone.value)
    if (!isValidRuPhone(pd)) {
      next.phone = 'Введите номер в формате +7 (XXX) XXX-XX-XX'
    }

    if (!consent.value) {
      next.consent = 'Необходимо согласие на обработку данных'
    }

    errors.value = next
    return Object.keys(next).length === 0
  }

  function onPhoneInput(e: Event) {
    const el = e.target as HTMLInputElement
    const formatted = formatRuPhoneInput(el.value)
    phone.value = formatted
    if (el.value !== formatted) {
      el.value = formatted
    }
    if (errors.value.phone) {
      errors.value = { ...errors.value, phone: undefined }
    }
  }

  function submit(): void {
    submitSuccess.value = false
    if (!validate()) return

    const subject = encodeURIComponent('Заявка с сайта — страница проектов')
    const body = encodeURIComponent(
      `Имя: ${name.value.trim()}\nТелефон: ${phone.value}\n`,
    )
    window.location.href = `${HOME_CONTACT.emailHref}?subject=${subject}&body=${body}`

    submitSuccess.value = true
    name.value = ''
    phone.value = ''
    consent.value = false
    errors.value = {}
  }

  return {
    name,
    phone,
    consent,
    errors,
    submitSuccess,
    validate,
    onPhoneInput,
    submit,
  }
}
