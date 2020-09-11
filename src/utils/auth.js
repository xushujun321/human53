import Cookies from 'js-cookie'

const TokenKey = 'hrsaas53-token' // 存储token的key值
// 获取token值的方法
export function getToken() {
  return Cookies.get(TokenKey)
}
// 设置token值的方法
export function setToken(token) {
  return Cookies.set(TokenKey, token)
}
// 删除token的方法
export function removeToken() {
  return Cookies.remove(TokenKey)
}

const TimeKey = 'hr-saas-timestamp' // 存储时间戳

// 设置时间戳
export function setTimeStamp() {
  return Cookies.set(TimeKey, new Date().getTime())
}
// 获取时间戳
export function getTimeStamp() {
  return Cookies.get(TimeKey)
}
