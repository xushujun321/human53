// Vuex的权限模块

import { asyncRoutes, constantRoutes } from '@/router' // 引入静态路由
const state = {
  routes: constantRoutes // 当前的用户路由 包括 静态路由和动态路由
}

const mutations = {
//    更新state数据 routes为增加的参数
  setRoutes(state, routes) {
    state.routes = [...constantRoutes, ...routes] // 每次都是静态的 + 动态的
    // 这里为什么不再state.routes的基础上追加 ? 因为还有登出操作，万一用户换人了，权限变了，那么就会出现
    // 后一个人同时拥有了前一个人和自己的权限 业务就不正确了
  }
}
const actions = {
  // 筛选路由
  async filterRoutes(context, menus) {
    const routes = []
    menus.forEach(item => {
    //  item是权限标识
      if (asyncRoutes.some(obj => obj.menusName === item)) {
      // 如果从动态路由表中能找到对应标识的内容
      // 注意，我们这里只处理了模块 并没有逐个路由的去处理
        routes.push(...asyncRoutes.filter(obj => obj.menusName === item))
      }
    })
    // 最终得出的routes就是需要增加的路由
    context.commit('setRoutes', routes) // 更新到state
    return routes
  }
}
export default {
  namespaced: true,
  state,
  actions,
  mutations
}
