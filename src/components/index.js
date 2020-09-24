// 公共组件的全局注册

// 左右布局的组件
import pageTools from './PageTools'
// 导入Excel组件
import UploadExcel from './UploadExcel'
// 引进图片全局
import ImageUpload from './ImageUpload'
// 全屏插件的注册
import ScreenFull from './ScreenFull'
// 动态组件的注册
import ThemePicker from './ThemePicker'
// 上传图片的练习
// import ImageUpload2 from './ImageUpload/index2.vue'

export default {
  install(Vue) {
    Vue.component('pageTools', pageTools) // 注册工具栏组件
    Vue.component('UploadExcel', UploadExcel)// 注册导入excel组件
    Vue.component('ImageUpload', ImageUpload)// 图片上传组件
    Vue.component('ScreenFull', ScreenFull)// 全屏插件
    Vue.component('ThemePicker', ThemePicker)// 动态主题插件
    // Vue.component('ImageUpload2', ImageUpload2)// 图片上传组件
  }
}
