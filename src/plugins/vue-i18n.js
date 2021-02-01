import Vue from 'vue'
import VueI18n from 'vue-i18n'
import en from '../locales/en'

Vue.use(VueI18n)

// Create VueI18n instance with options
const i18n = new VueI18n({
  locale:
    // We should be defaulting to Swedish
    typeof localStorage.getItem('language') !== 'string'
      ? 'en'
      : localStorage.getItem('language'),
  fallbackLocale: 'en',
  messages: { en }
})

export const uiLangs = [{ title: 'English', code: 'en' }]

export const changeLanguage = lang => {
  i18n.locale = lang.code
  localStorage.setItem('language', lang.code)
  document.querySelector('html').setAttribute('lang', lang.code)
}

export default i18n
