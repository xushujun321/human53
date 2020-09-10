// const getters = {
//   sidebar: state => state.app.sidebar,
//   device: state => state.app.device,
//   token: state => state.user.token,
//   avatar: state => state.user.avatar,
//   name: state => state.user.name
// }
// export default getters

const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  // 在根级的getters上，将state的user文件内的token值
  token: state => state.user.token // 方便其他模块更好的访问token
}
export default getters
