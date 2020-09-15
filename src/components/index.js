// 公共组件的全局注册

import pageTools from './PageTools'

export default {
  install(Vue) {
    Vue.component('pageTools', pageTools)
  }
}
