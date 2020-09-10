// 引进token的获取、设置、删除的方法
import { getToken, setToken, removeToken } from '@/utils/auth'
// 引进封装好的接口
import { login } from '@/api/user'
const state = {
  token: getToken()// 获取token
}
const mutations = {
  // 重新设置vuex中的token
  settoken(state, token) {
    state.token = token // 将token值设置给vuex
    setToken(token)// 同步token到缓存内
  },
  // 删除并清空vuex中的token
  removetoken(state) {
    state.token = null // 将token设置成空
    removeToken() // 删除token
  }
}
const actions = {
  // 登录请求
  async login(context, data) {
    // 发送请求
    const res = await login(data)
    // 登录成功时
    // if (res.data.success) {
    context.commit('settoken', res)
    // context.commit('settoken', res.data.data)// 将获取到的token赋值到vuex中
    // }
  }
}

// 注释代码 并导出默认配置
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
