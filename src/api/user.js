import request from '@/utils/request'

export function login(data) {
  return request({
    // 注意：因为在vue.config.js的后端接口就是已经写好是
    // 'http://ihrm-java.itheima.net/api'，所以不用重写
    url: '/sys/login',
    method: 'post',
    data
  })
}
// 获取用户资料接口
export function getUserInfo() {
  return request({
    url: '/sys/profile',
    method: 'post'
    // 注意：这里没有带上token的参数，是因为我们在打开任何带安全权限的门都需要token
    // 我们可以在axios拦截器中统一注入token
    // 'Authorization': `Bearer ${token}`
  })
}

// 我们发现头像并不在接口的返回体中（接口原因），
// 我们可以通过另一个接口来获取头像，并把头像合并到当前的资料中
export function getUserDetailById(id) {
  return request({
    url: `/sys/user/${id}`
  })
}
