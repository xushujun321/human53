import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en' // lang i18n

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'
import components from './components'

import '@/icons' // icon
import '@/permission' // permission control

// 完成对于所有指令的全局注册
import * as Directives from '@/directives/index' // 引入自定义指令
// Object.keys（）遍历对象，取得所有的key，得到的是数组格式，所以可以forEach（）
Object.keys(Directives).forEach(key => {
  // 全局注册Vue.directive（指令名称，对象）
  Vue.directive(key, Directives[key])
})

// set ElementUI lang to EN
Vue.use(ElementUI, { locale })
Vue.use(components)
// 如果想要中文版 element-ui，按如下方式声明
// Vue.use(ElementUI)

import * as filters from '@/filters' // 引入工具类

Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key]) // 注册全局过滤器
})

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
