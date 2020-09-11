const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  // 在根级的getters上，将state的user文件内的token值
  token: state => state.user.token, // 方便其他模块更好的访问token
  name: state => state.user.userInfo.username, // 只映射用户名的名字
  userId: state => state.user.userInfo.userId, // 建立用户id的映射
  staffPhoto: state => state.user.userInfo.staffPhoto // 建立用户头像的映射
}
export default getters
