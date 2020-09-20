// 公共组件的全局注册

// 左右布局的组件
import pageTools from './PageTools'
// 导入Excel组件
import UploadExcel from './UploadExcel'
// 引进图片全局
import ImageUpload from './ImageUpload'
// 上传图片的练习
// import ImageUpload2 from './ImageUpload/index2.vue'

export default {
  install(Vue) {
    Vue.component('pageTools', pageTools) // 注册工具栏组件
    Vue.component('UploadExcel', UploadExcel)// 注册导入excel组件
    Vue.component('ImageUpload', ImageUpload)// 图片上传组件
    // Vue.component('ImageUpload2', ImageUpload2)// 图片上传组件
  }
}
