import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import en from './locales/en'
import vi from './locales/vi'

export const SUPPORTED_LANGUAGES = [
  { code: 'en', label: 'English' },
  { code: 'vi', label: 'Tiếng Việt' },
] as const

export type LangCode = (typeof SUPPORTED_LANGUAGES)[number]['code']

const savedLang = localStorage.getItem('lang') as LangCode | null
const defaultLang: LangCode = savedLang ?? 'en'

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    vi: { translation: vi },
  },
  lng: defaultLang,
  fallbackLng: 'en',
  interpolation: { escapeValue: false },
})

export function setLanguage(lang: LangCode) {
  i18n.changeLanguage(lang)
  localStorage.setItem('lang', lang)
}

export default i18n
