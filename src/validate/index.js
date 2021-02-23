import Vue from 'vue'
import VeeValidate, { Validator } from 'vee-validate'
import VueI18n from 'vue-i18n'
import validateRules from './validation'
/*eslint-disable */
import zh_CN from 'vee-validate/dist/locale/zh_CN'
Vue.use(VueI18n)
const i18n = new VueI18n({
  locale: 'zh_CN',
  fallbackLocale: 'zh_CN',
  messages: {
    zh_CN
  }
})
Vue.use(VeeValidate, {
  delay: 0,
  i18n,
  i18nRootKey: 'validations',
  errorBagName: 'errors2',
  fieldsBagName: 'fields',
  events: 'input|blur',
  dictionary: {
    zh_CN
  }
})
Object.keys(validateRules).forEach(key => {
  Validator.extend(key, validateRules[key])
})
