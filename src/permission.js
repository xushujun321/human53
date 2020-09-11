// 专门处理路由权限
import router from '@/router' // 引入路由实例
import store from '@/store' // 引入vuex实例
import NProgress from 'nprogress' // 引入进度条模块
import 'nprogress/nprogress.css' // 引入进度条样式
const whiteList = ['/login', '/404'] // 白名单 表示不需要强制token存在的页面

// 路由守卫
router.beforeEach(async(to, from, next) => {
  NProgress.start() // 开启进度条
  // 判断是否存在token值
  if (store.getters.token) {
    // 存在token值
    // 去的页面是否是登录页
    if (to.path === '/login') {
      // 如果是，就跳转到主页
      next('/')
    } else {
      // 如果没有资料，需要获取资料
      if (!store.state.user.userInfo.userId) {
        // 获取资料
        await store.dispatch('user/getUserInfo')
      }
      // 不是登录页，直接通过
      next()
    }
    NProgress.done()// 关闭进度条
  } else {
    // 不存在token值，判断是否在白名单
    if (whiteList.indexOf(to.path) > -1) {
      // 是白名单,直接通过
      next()
    } else {
      // 不是白名单，直接调到登录页
      next('/login')
      NProgress.done()// 关闭进度条
    }
  }
})
