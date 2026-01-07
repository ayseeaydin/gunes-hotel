import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import tr from './tr.json'
import en from './en.json'
import it from './it.json'

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      tr: { translation: tr },
      en: { translation: en },
      it: { translation: it }
    },
    fallbackLng: 'tr',
    supportedLngs: ['tr', 'en', 'it'],
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage']
    },
    interpolation: {
      escapeValue: false
    },
    debug: false,
    react: {
      useSuspense: false
    }
  })

export default i18n
