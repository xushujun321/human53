// 引进token的获取、设置、删除的方法,设置时间戳，获取时间戳
import { getToken, setToken, removeToken, setTimeStamp } from '@/utils/auth'
// 引进封装好的接口
import { login, getUserInfo, getUserDetailById } from '@/api/user'
// 引进重置路由的方法
import { resetRouter } from '@/router'
const state = {
  token: getToken(), // 获取token
  // 因为我们会在getters中引用userinfo的变量，如果设置为null，则会引起异常和报错
  userInfo: { }// 用户信息
}
const mutations = {
  // 重新设置vuex中的token
  settoken(state, token) {
    state.token = token // 将token值设置给vuex
    setToken(token)// 同步token到缓存内
  },
  // 删除并清空vuex中的token
  removeToken(state) {
    state.token = null // 将token设置成空
    removeToken() // 删除token
  },
  // 将整个的个人信息设置到用户的vuex数据中
  setUserInfo(state, user) {
    state.userInfo = { ...user }
  },
  // 删除用户信息
  removeUserInfo(state) {
    state.userInfo = { }// 重新赋值
  }
}
const actions = {
  // 登录请求
  async login(context, data) {
    // 发送请求
    const res = await login(data)
    // 登录成功时
    context.commit('settoken', res)
    setTimeStamp() // 设置时间戳
  },
  // 获取用户详情
  async getUserInfo(context) {
    // 发送请求
    const reslute = await getUserInfo()
    // console.log(reslute)
    // 通过另一个接口来获取头像
    const baseInfo = await getUserDetailById(reslute.userId)
    const baseRuslt = { ...reslute, ...baseInfo }
    // 将整个的个人信息设置到用户的vuex数据中,把头像合并到当前的资料中
    context.commit('setUserInfo', baseRuslt)
    return baseRuslt// 这里是为了后面调用actions时获取到完整数据
  },
  // 退出登录aciton
  async lgout(context) {
    context.commit('removeToken') // 删除token
    context.commit('removerUserInfo') // 删除用户资料
    resetRouter() // 重置路由
    context.commit('permission/setRoutes', [], { root: true }) // 设置路由为空
  }
}

// 注释代码 并导出默认配置
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
