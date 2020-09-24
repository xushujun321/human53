// 关于多语言实现
import Vue from 'vue'
import Vuei18n from 'vue-i18n'
// 进行存储
import Cookie from 'js-cookie'
// 语言包
import elementEN from 'element-ui/lib/locale/lang/en'
import elementZH from 'element-ui/lib/locale/lang/zh-CN'

import customZH from './zh' // 引入自定义中文包
import customEN from './en' // 引入自定义英文包

Vue.use(Vuei18n)

export default new Vuei18n({
  locale: Cookie.get('languang') || 'zh',
  messages: {
    en: {
      ...elementEN,
      ...customEN
    },
    zh: {
      ...elementZH,
      ...customZH
    }
  }
})
