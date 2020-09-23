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
      // if (!store.state.user.userInfo.userId) {
      //   // 获取资料
      //   await store.dispatch('user/getUserInfo')
      // }
      // // 不是登录页，直接通过
      // next()
      // 简化版
      if (!store.state.user.userInfo.userId) {
        const { roles } = await store.dispatch('user/getUserInfo')
        // 此时 没有用户id, 也就是说第一次进来，并没有用户资料， 并没有关联
        // roles中有三项  apis, points  menus
        const routes = await store.dispatch('permission/filterRoutes', roles.menus) // 得到筛选的路由

        // router.addRoutes(routes) // 将动态路由添加到路由表,将404放在动态路由的后面
        router.addRoutes([...routes, { path: '*', redirect: '/404', hidden: true }]) // 添加到路由表
        // 如果进行了addRoutes，请用next（to.path），否则会导致刷新理由权限失效，这是已知缺陷
        next(to.path) // 这里一定要next(to.path) 也就是添加routes之后 进行 next(to.path)
      } else {
        // 当动态路由不存在的时候，再用next（）
        next()
      }
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

// 路由的后置守卫
router.afterEach(function() {
  // 关闭进度条
  NProgress.done() // 开启进度条
})
