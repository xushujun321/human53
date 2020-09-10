// import axios from 'axios'
// import { MessageBox, Message } from 'element-ui'
// import store from '@/store'
// import { getToken } from '@/utils/auth'

import axios from 'axios'
import { Message } from 'element-ui'

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // 设置请求的基础地址
  timeout: 5000 // 定义超时时间
}) // 创建新实例
service.interceptors.request.use() // 请求拦截器
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
  Message.error(error.message) // 提示错误信息
  return Promise.reject(error)
}) // 响应拦截器
export default service // 导出新实例

