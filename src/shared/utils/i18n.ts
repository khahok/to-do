import { createI18n } from 'vue-i18n'
import en from '@/locales/en.json'
import km from '@/locales/km.json'

let currentLang = localStorage.getItem('currentLang')

export const i18n = createI18n({
  locale: currentLang || 'en',
  fallbackLocale: process.env.VUE_APP_I18N_FALLBACK_LOCALE || 'km',

  messages: {
    en: en,
    km: km
  }
})
