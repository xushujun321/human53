
import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'
import router from '@/router'
const Timeout = 7200 // 时间为两个小时
import { getTimeStamp } from '@/utils/auth'

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // 设置请求的基础地址
  timeout: 5000 // 定义超时时间
}) // 创建新实例

service.interceptors.request.use(config => {
  if (store.getters.token) {
    // 如果超时的话 就直接退出
    if (CheckIsOutTime()) {
      // 登出操作
      store.dispatch('user/lgout') // 登出
      router.push('/login') // 跳转到登录
      return Promise.reject(new Error('token超时了'))
    }
    //  判断有无token
    config.headers['Authorization'] = `Bearer ${store.getters.token}` // 让每个请求携带token-- ['X-Token']为自定义key 请根据实际情况自行修改
  }
  return config // 返回配置 继续请求
}, error => {
  return Promise.reject(error) // 处理请求发生前的错误
}) // 请求拦截器

// 检查事件是否过期
const CheckIsOutTime = function() {
  const currentTime = new Date().getTime() // 当前时间
  const time = getTimeStamp() ? getTimeStamp() : 0
  // 时间戳是毫秒的 所以要除以1000
  return ((currentTime - time) / 1000) >= Timeout
}

service.interceptors.response.use(response => {
  //   接收数据
  const { success, data, message } = response.data
  if (success) {
    // 如果success 说明执行是OK的 可以继续往下执行 可以直接将data返回
    return data // 直接返回数据
  } else {
    Message.error(message) // 提示错误信息
    return Promise.reject(new Error(message)) // 此时需要人为的reject当前的执行链 因为错了
  }
}, error => {
  if (error.response.data.code === 10002) {
    Message.error('token超时')
    // 当发现是10002状态码的时候 进行处理
    store.dispatch('user/lgout') // 调用登出操作
    router.push('/login')
  } else {
    Message.error(error.message) // 提示错误信息
    return Promise.reject(error)
  }
}) // 响应拦截器

service.interceptors.request.use(config => {
  // 判断是否存在token
  if (store.getters.token) {
    // 如果存在，就进行注入
    config.headers['Authorization'] = `Bearer ${store.getters.token}`
  }
  return config
}, error => {
  Message.error(error.message)
  return Promise.reject(error)
})

export default service // 导出新实例

