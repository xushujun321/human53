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
